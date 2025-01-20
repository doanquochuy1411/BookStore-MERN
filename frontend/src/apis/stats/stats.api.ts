import { AxiosError } from "axios";
import { ResponseApiType } from "../../types/util.type";
import fetcherApi from "../fetcher"

const getStats = async () => {
    try {
        const response = await fetcherApi.get<ResponseApiType>("/admin");
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

export { getStats }