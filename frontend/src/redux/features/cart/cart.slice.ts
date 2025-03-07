import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Book } from '../../../types/book.type';
import { SuccessNotify } from '../../../utils/notify';

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
                state.cartItems.push({ ...payload, quantity: 1 })
                SuccessNotify("Product Added to the Cart");
            } else {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
                SuccessNotify("Product quantity in the Cart: " + existingItem.quantity)
            }
        },
        increaseQuantity: (
            state: CartState,
            { payload }: PayloadAction<Book>
        ) => {
            const existingItem = state.cartItems.find(item => item._id === payload._id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.cartItems.push({ ...payload, quantity: 1 })
            }
        },
        decreaseQuantity: (
            state: CartState,
            { payload }: PayloadAction<Book>
        ) => {
            const existingItem = state.cartItems.find(item => item._id === payload._id);
            if (existingItem?.quantity && existingItem?.quantity > 0) {
                existingItem.quantity = (existingItem.quantity || 1) - 1;
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
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer;