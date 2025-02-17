'use client'

import * as React from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { EyeIcon, EyeOff, Loader } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTokenStore } from "@/app/user/store"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signin } from "@/api/auth/signin"
import { ResponseStatusCode } from "@/api/auth/types"
export default function SignInPage() {
  const { token, setToken, setRefreshToken } = useTokenStore()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const router = useRouter()
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Please enter email" }),
    password: z
      .string()
      .min(1, { message: "Please enter password" }),
  }).refine((data) => {
    if (data.password !== "12345678") {
      return false
    }
    return true
  }, {
    message: "Wrong password",
    path: ["password"]
  }).refine((data) => {
    if (data.email !== "test@gmail.com") {
      return false
    }
    return true
  }, {
    message: "The account has not been registered yet",
    path: ["email"]
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { code, message, data } = await signin(values)
    if (code === ResponseStatusCode.success) {
      localStorage.setItem("accessToken", data.token.accessToken)
      localStorage.setItem("refreshToken", data.token.refreshToken)
      router.push("/user/user-info")
    }
    if (code === ResponseStatusCode.error) {
      {
        message: "login failed"
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center text-[24px] leading-[32px] font-medium">
          Login
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage className="text-[#F31260]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        endContent={
                          <div className="flex items-center justify-center cursor-pointer">
                            {
                              passwordVisible ? (
                                <EyeIcon className="w-4 h-4" onClick={() => setPasswordVisible(false)} />
                              ) : (
                                <EyeOff className="w-4 h-4" onClick={() => setPasswordVisible(true)} />
                              )
                            }
                          </div>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end flex-col gap-2">
                <Button
                  className="flex justify-end text-[#0C7FDA]"
                  type="button"
                  variant="link"
                  size="sm"
                >
                  Forgot Password?
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0C7FDA] hover:bg-[#0C7FDA]/80"
                  disabled={!form.formState.isDirty}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader color="#a7aaae" />
                      Login
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
