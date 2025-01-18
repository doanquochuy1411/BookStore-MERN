export interface ResponseApiType<T = never> {
    code: number;
    data: T;
    message: string;
    status: string;
}