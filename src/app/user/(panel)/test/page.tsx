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

export default function TestPage() {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)
    const router = useRouter()
    async function onSubmit() {
        const { code, data } = await getUserProfile(localStorage.getItem("accessToken") || "")
        if (code === ResponseStatusCode.success) {
            setUserInfo(data)
        } else {
            setupAxiosInterceptors(router)
            setUserInfo(null)
        }
    }

    return (
        <div>
            <div className="flex gap-2">
                <Button
                    type="submit"
                    onClick={onSubmit}
                    className="bg-[#17C964] text-white hover:bg-[#17C964]/80"
                >
                    Test
                </Button>
                <Button
                    type="button"
                    className="bg-[#0C7FDA] text-white hover:bg-[#0C7FDA]/80"
                    onClick={() => {
                        router.push("/user/user-info")
                    }}
                >
                    User Info
                </Button>
            </div>
            {userInfo && (
                <div>
                    <p>Email: {userInfo.email}</p>
                    <p>Username: {userInfo.username}</p>
                    <p>Bio: {userInfo.bio}</p>
                </div>
            )}
        </div>
    )
}