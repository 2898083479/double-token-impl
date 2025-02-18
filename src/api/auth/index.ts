import axios from 'axios';
import { ResponseStatusCode } from './types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getNewToken } from "./token";

axios.defaults.baseURL = "https://intern-examine-backend-api.vercel.app/api";

let isRefreshing = false;
let promiseQueue: ((token: string) => void)[] = [];

const process = (token: string) => {
    promiseQueue.forEach(setToken => setToken(token));
    promiseQueue = [];
}

const addToQueue = (setToken: (token: string) => void) => {
    promiseQueue.push(setToken);
}

export const setupAxiosInterceptors = (router: AppRouterInstance) => {
    axios.interceptors.response.use(
        async (response) => {
            if (response.data.code === ResponseStatusCode.unauthorized) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const { code, data } = await getNewToken();
                    if (code === ResponseStatusCode.success) {
                        localStorage.setItem("accessToken", data.accessToken);
                        response.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                        return axios(response.config);
                    } else {
                        router.push("/user/signin")
                    }
                    isRefreshing = false;
                    process(data.accessToken);
                }

                return new Promise((resolve) => {
                    addToQueue((token: string) => {
                        response.config.headers['Authorization'] = `Bearer ${token}`;
                        resolve(axios(response.config))
                    })
                })
            }
            return response;
        }
    );
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
