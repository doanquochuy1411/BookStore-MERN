export interface FormCheckout {
    name: string
    email: string
    phone: string
    address: AddressType
    product_ids: string[]
    total_price: number
}

export interface AddressType {
    street: string
    city: string
    country: string
    state: string
    zipcode: string
}