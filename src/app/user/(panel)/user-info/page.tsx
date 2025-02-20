"use client"

import { Button } from "@/components/ui/button"
import { getUserProfile } from "@/api/auth/user"
import { useState } from "react"
import { ResponseStatusCode } from "@/api/auth/types"
import { useRouter } from "next/navigation"

interface IUserInfo {
  email: string
  username: string
  bio: string
}

export const UserPanelPage = () => {
  const router = useRouter()
  const [data, setData] = useState<IUserInfo | null>(null)

  const onSubmit = async () => {
    const { code, data, message } = await getUserProfile(localStorage.getItem("accessToken") || "")
    console.log(message, data)
    if (code === ResponseStatusCode.success) {
      setData(data)
      return
    }
  }

  const onClick = async () => {
    onSubmit();
    await new Promise(resolve => setTimeout(resolve, 80));
    onSubmit();
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button
          type="submit"
          onClick={onClick}
          className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
        >
          Get User Info
        </Button>
        <Button
          className="bg-[#17C964] text-white hover:bg-[#17C964]/80"
          type="button"
          onClick={() =>
            router.push("/user/test")
          }
        >
          Test
        </Button>
      </div>
      {data ? (
        <div>
          <p>Email: {data.email}</p>
          <p>Username: {data.username}</p>
          <p>BIO: {data.bio}</p>
        </div>
      ) : (
        <div>No response data</div>
      )}
    </div>
  )
}

export default UserPanelPage;