import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, getLocalStorage } from "../helpers/helper";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetcherApi: AxiosInstance = axios.create({
    baseURL: baseUrl
})

fetcherApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    // if (getLocalStorage(ACCESS_TOKEN)) {
    //     config.headers.Authorization = `Bearer ${getLocalStorage(ACCESS_TOKEN)}`
    //     //     config.headers["Content-Type"] =
    //     //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    // }

    if (apiKey) {
        config.headers["x-api-key"] = apiKey
    }

    return config;
})

fetcherApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    }
)

export default fetcherApi;