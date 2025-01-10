import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Book } from '../../../types/book.type';
import Swal from 'sweetalert2';

export interface CartState {
    cartItems: Book[];
}

const initialState: CartState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state: CartState,
            { payload }: PayloadAction<Book>
        ) => {
            const existingItem = state.cartItems.find(item => item._id === payload._id);
            if (!existingItem) {
                state.cartItems.push(payload)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already Added to the Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                })
            }
        },
        removeFromCart: (
            state: CartState,
            { payload }: PayloadAction<Book>
        ) => {
            state.cartItems = state.cartItems.filter(item => item._id !== payload._id)
        },
        clearCart: (
            state: CartState
        ) => {
            state.cartItems = []
        }
    },
})

// Export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer;