import { AxiosError } from "axios";
import { FormCheckout } from "../../types/checkout.type"
import { ResponseApiType } from "../../types/util.type"
import fetcherApi from "../fetcher"

const createOrder = async (payload: FormCheckout) => {
    try {
        const response = await fetcherApi.post<ResponseApiType>("/orders", payload);
        return response.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = error.response;
            throw new Error(
                response?.data?.message || "An unexpected error occurred."
            );
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

const getOrderByEmail = async (email: string) => {
    try {
        const response = await fetcherApi.get<ResponseApiType>(`orders/email/${email}`)
        return response.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const response = error.response;
            throw new Error(
                response?.data?.message || "An unexpected error occurred."
            );
        } else {
            throw new Error("An unexpected error occurred.")
        }
    }
}

export { createOrder, getOrderByEmail }