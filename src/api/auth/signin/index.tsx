import { IResponse, formPostReq } from "../index"
export interface ISigninBody {
    email: string
    password: string
}

interface Response extends IResponse {
    data: {
        email: string
        username: string
        bio: string
        token: {
            accessToken: string
            refreshToken: string
        }
    }
}

export const signin = async (body: ISigninBody): Promise<Response> => {
    const formData = new FormData()
    formData.append("email", body.email)
    formData.append("password", body.password)

    const response = await formPostReq({
        path: "/auth/signin",
        data: formData
    })
    return response.data
}