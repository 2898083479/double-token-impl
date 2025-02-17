import { IResponse, getReq } from "../index"

interface Response extends IResponse {
    data: {
        email: string
        username: string
        bio: string
    }
}

export const getUserProfile = async (token: string): Promise<Response> => {
    const response = await getReq({
        path: "/auth/user-info",
        token
    })
    return response.data
}