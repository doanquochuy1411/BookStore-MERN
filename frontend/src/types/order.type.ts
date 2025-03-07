import { Book } from "./book.type";

export interface PayLoadAddToCart {
    productId: string,
    quantity: number,
}

export interface Cart {
    user: {
        userId: string,
        email: string,
    },
    products: [
        {
            product: Book,
            quantity: number
        }
    ],
}