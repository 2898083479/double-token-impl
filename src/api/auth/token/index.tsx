import { IResponse, postReq } from "../index"
interface IGetNewTokenResponse extends IResponse {
    data: {
        accessToken: string
    }
}

export const getNewToken = async (): Promise<IGetNewTokenResponse> => {
    const response = await postReq({
        path: "/auth/refresh-token",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
        }
    })
    return response.data
}