import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { API_URL } from "../../app.config"
import { RefreshToken, GetAccessToken } from "@/global/auth"

const errorHandler = async (error: AxiosError) => {

    // useAppStore().$patch({ isLoading: false })

    const config: AxiosRequestConfig | undefined = error?.config

    if (error.response?.status === 401) {
        const accessToken = await RefreshToken();
        if (config && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;


            return axios(config)
        }
    }

    return Promise.reject(error)
}

const requestHandler = (request: AxiosRequestConfig) => {
    // if (request.params && request.params.loading !== false)
    // useAppStore().$patch({ isLoading: true })
    if (request.headers)
        request.headers.Authorization = `Bearer ${GetAccessToken()}`

    return request
}

const responseHandler = (response: AxiosResponse) => {
    // useAppStore().$patch({ isLoading: false })
    return response
}

export const axiosIns = axios.create({
    baseURL: API_URL,
})

axiosIns.interceptors.request.use(requestHandler as any)
axiosIns.interceptors.response.use(responseHandler, errorHandler)