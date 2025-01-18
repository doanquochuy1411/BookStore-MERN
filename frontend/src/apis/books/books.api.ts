import { AxiosError } from "axios";
import { ResponseApiType } from "../../types/util.type"
import fetcherApi from "../fetcher"
import { Book } from "../../types/book.type";

const fetchAllBooks = async () => {
    try {
        const response = await fetcherApi.get<ResponseApiType>("/books");
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

const fetchBookById = async (id: string) => {
    try {
        const response = await fetcherApi.get<ResponseApiType>(`/books/${id}`);
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

const addBook = async (data: Book) => {
    try {
        const response = await fetcherApi.post<ResponseApiType>(`/books`, data);
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

const updateBook = async (id: string, payload: Book) => {
    try {
        const response = await fetcherApi.put<ResponseApiType>(`/books/${id}`, payload);
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

const deleteBook = async (id: string) => {
    try {
        const response = await fetcherApi.delete<ResponseApiType>(`/books/${id}`);
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

export { fetchAllBooks, fetchBookById, addBook, updateBook, deleteBook }