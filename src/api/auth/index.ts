import axios from 'axios';
import { toast } from "sonner";
import { ResponseStatusCode } from './types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getNewToken } from "./token";

axios.defaults.baseURL = "https://intern-examine-backend-api.vercel.app/api";

export const setupAxiosInterceptors = (router: AppRouterInstance) => {
    axios.interceptors.response.use(
        async (response) => {
            const { data } = response
            const { code } = data
            console.log('code', code)
            if (code === ResponseStatusCode.unauthorized) {
                // TODO: 調用refresh token 獲取最新 token
                const {code, message, token} = await getNewToken(localStorage.getItem("refreshToken") || "")
                if (code === ResponseStatusCode.unauthorized) {
                    localStorage.setItem("accessToken", token)
                    console.log('refresh token', localStorage.getItem("accessToken"))
                }
            }
            return response
        },
        (error) => {
            toast.error(error.data?.message || "系统错误");
            const response = {
                status: 200,
                data: {
                    code: error.data?.code || ResponseStatusCode.error,
                    message: error.data?.message || "System error",
                    data: {}
                }
            }
            return Promise.resolve(response);
        }
    )
}

export interface IRequest {
    path: string;
    params?: any;
    headers?: any;
    token?: string;
}

export interface IResponse {
    category: string;
    code: ResponseStatusCode,
    message: string,
}

export interface IPostReqest extends IRequest {
    data?: any;
}

export const postReq = async ({ path, data = {}, params = {}, headers = {}, token }: IPostReqest) => {
    return await axios.post(path, data, {
        params,
        headers: {
            ...token && {
                'Authorization': `Bearer ${token}`
            },
            'Content-Type': 'application/json',
            ...headers
        }
    });
}

export const getReq = async ({ path, params = {}, headers = {}, token }: IRequest) => {
    return await axios.get(path, {
        params,
        headers: {
            ...token && {
                'Authorization': `Bearer ${token}`
            },
            ...headers
        }
    });
}

export const formPostReq = async ({ path, data, params, headers = {} }: IRequest & { data: FormData }) => {
    return await axios.post(path, data, {
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
}
