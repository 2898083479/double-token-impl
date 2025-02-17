"use client"

import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/api/auth/user"
import { useState } from "react"
import { ResponseStatusCode } from "@/api/auth/types"
import { useRouter } from "next/navigation"
import { setupAxiosInterceptors } from "@/api/auth"

interface IUserInfo {
  email: string
  username: string
  bio: string
}

export default function UserPanelPage() {
  const router = useRouter()
  const [data, setData] = useState<IUserInfo | null>(null)

  async function onSubmit() {
    const { code, message, data } = await getUserProfile(localStorage.getItem("accessToken") || "")
    if (code === ResponseStatusCode.success) {
      console.log('user access token', localStorage.getItem("accessToken"))
      setData(data)
      return
    }
    setupAxiosInterceptors(router)
    setData(null)
    console.log('user access token', localStorage.getItem("accessToken"))
    return
  }

  return (
    <>
      <Button type="submit" onClick={onSubmit}>
        Get User Profile
      </Button>
      {data ? (
        <div>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
          <p>BIO: {data.bio}</p>
        </div>
      ) : (
        <div>No response data</div>
      )}
    </>
  )
}