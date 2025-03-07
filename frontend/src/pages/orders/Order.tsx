import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrderByEmail } from '../../apis/orders/orders.api'
import { FormCheckout } from '../../types/checkout.type'
import { useAuth } from '../../context/AuthContext'
import { DiVim } from 'react-icons/di'

const Order = () => {
    const { currentUser } = useAuth();

    const { data: orders = [], isLoading, isError } = useQuery<any[]>({
        queryKey: ["order"],
        queryFn: () => getOrderByEmail(currentUser.email),
        gcTime: 0,
        staleTime: 0,
    })

    console.log(orders)

    isLoading && <div>Loading...</div>
    isError && <div>Error getting order data</div>

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                orders.length === 0 ?
                    (<div>No orders found!</div>) :
                    (
                        orders.map((order, index) => (
                            <div key={order._id} className='border-b mb-4 pb-4'>
                                <p className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</p>
                                <p className='text-gray-600'>Name: {order?.name}</p>
                                <p className='text-gray-600'>Email: {order?.email}</p>
                                <p className='text-gray-600'>Phone: {order?.phone}</p>
                                <p className='text-gray-600'>Total Price: {order?.totalPrice}</p>
                                <h3 className='font-semibold mt-2'>Address:</h3>
                                <p>{order?.address?.city}, {order?.address?.state}, {order?.address?.country}, {order?.address?.zipcode}</p>
                            </div>
                        ))
                    )
            }
        </div>
    )
}

export default Order