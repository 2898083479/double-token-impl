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
    const { code, data } = await getUserProfile(localStorage.getItem("accessToken") || "")
    if (code === ResponseStatusCode.success) {
      setData(data)
      return
    } else {
      setupAxiosInterceptors(router)
      setData(null)
      return
    }
  }

  return (
    <div>
      <Button
        type="submit"
        onClick={onSubmit}
        className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
      >
        Get User Info
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
    </div>
  )
}