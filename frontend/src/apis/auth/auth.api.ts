import { AxiosError } from "axios";
import { AdminLoginPayload } from "../../types/login.type";
import fetcherApi from "../fetcher";

const adminLogin = async (payload: AdminLoginPayload) => {
    try {
        const response = await fetcherApi.post("/auth/admin", payload);
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

export { adminLogin }