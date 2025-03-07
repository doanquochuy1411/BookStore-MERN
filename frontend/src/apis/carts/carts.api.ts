import { AxiosError } from "axios";
import { PayLoadAddToCart } from "../../types/order.type";
import { ResponseApiType } from "../../types/util.type";
import fetcherApi from "../fetcher";

const getCart = async () => {
    try {
        const response = await fetcherApi.get<ResponseApiType>("/carts");
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

const addToCart = async (payload: PayLoadAddToCart) => {
    try {
        const response = await fetcherApi.post<ResponseApiType>("/carts", payload);
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

export { addToCart, getCart }