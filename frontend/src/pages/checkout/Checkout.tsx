import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { RootState } from "../../redux/store"
import { Book } from "../../types/book.type"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormCheckout } from "../../types/checkout.type"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../../apis/orders/orders.api"
import PATH from "../../routers/Path"

const Checkout = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const navigate = useNavigate();

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const totalPrice: number = Math.round(
        cartItems.reduce((acc: number, item: Book) => acc + item.newPrice, 0) * 100
    ) / 100;

    const { currentUser } = useAuth();
    // console.log(currentUser)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormCheckout>()

    const { mutate: handelCreateOrder, isPending } = useMutation({
        mutationKey: ['createOrder'],
        mutationFn: (payload: FormCheckout) => createOrder(payload),
        onSuccess: () => {
            alert("Your order has beenCreated order successfully")
            navigate(PATH.ORDER)
        },
        onError: (err) => {
            console.log("failed to create order: ", err)
            alert("Failed to create order")
        }
    })

    const onSubmit: SubmitHandler<FormCheckout> = (data) => {
        const newOrder = {
            ...data,
            productIds: cartItems.map((item) => item._id),
            totalPrice: totalPrice
        }

        handelCreateOrder(newOrder)
    }

    isPending && <div>Loading....</div>

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delevary</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input
                                                type="text" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                {...register("name", { required: true })}
                                            />
                                            {(errors.name) && <p className="text-red-500 text-xs italic mb-3">Please enter valid full name</p>}

                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="text" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                // defaultValue="email@gmail.com"
                                                // placeholder="email@domain.com"
                                                {...register("email", { required: true })}
                                            />

                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                type="number" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890"
                                                {...register("phone", { required: true })}
                                            />
                                            {(errors.phone) && <p className="text-red-500 text-xs italic mb-3">Please enter valid phone</p>}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="street">Address / Street</label>
                                            <input

                                                type="text" id="street" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""

                                                {...register("address.street", { required: true })}
                                            />
                                            {(errors.address?.street) && <p className="text-red-500 text-xs italic mb-3">Please enter valid street</p>}

                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""
                                                {...register("address.city", { required: true })}
                                            />
                                            {(errors.address?.city) && <p className="text-red-500 text-xs italic mb-3">Please enter valid city</p>}

                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country / region</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                    {...register("address.country", { required: true })}
                                                />
                                                {(errors.address?.country) && <p className="text-red-500 text-xs italic mb-3">Please enter valid country</p>}

                                                <button tabIndex={-1} className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex={-1} className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State / province</label>
                                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                <input
                                                    id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                                    {...register("address.state", { required: true })}
                                                />
                                                {(errors.address?.state) && <p className="text-red-500 text-xs italic mb-3">Please enter valid state</p>}

                                                <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex={-1} className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                type="text" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder=""
                                                {...register("address.zipcode", { required: true })}
                                            />
                                            {(errors.address?.zipcode) && <p className="text-red-500 text-xs italic mb-3">Please enter valid zipcode</p>}

                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    onClick={() => setIsChecked(!isChecked)}
                                                    type="checkbox" name="billing_same" id="billing_same" className="form-checkbox"
                                                />
                                                <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link to="/terms" className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link to="/policy" className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                            </div>
                                        </div>



                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    disabled={!isChecked}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place an Order</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Checkout