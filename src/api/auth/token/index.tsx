import { IResponse, postReq } from "../index"

interface IGetNewTokenResponse extends IResponse {
    token: string
}

export const getNewToken = async (refreshToken: string): Promise<IGetNewTokenResponse> => {
    const response = await postReq({
        path: "/auth/refresh-token",
        data: {
            refreshToken
        }
    })
    return response.data
}