export interface FormCheckout {
    name: string
    email: string
    phone: string
    address: AddressType
    productIds: string[]
    totalPrice: number
}

export interface AddressType {
    street: string
    city: string
    country: string
    state: string
    zipcode: string
}