import { SubmitHandler, useForm } from 'react-hook-form'
import { AdminLoginPayload } from '../../types/login.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminLogin } from '../../apis/auth/auth.api'
import { ACCESS_TOKEN, removeLocalStorage, setLocalStorage } from '../../helpers/helper'
import { useNavigate } from 'react-router'

const AdminLogin = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AdminLoginPayload>()

    const navigate = useNavigate();

    const { mutate: handelLogin } = useMutation({
        mutationKey: ["adminLogin"],
        mutationFn: (payload: AdminLoginPayload) => adminLogin(payload),
        onSuccess: (res) => {
            if (res) {
                setLocalStorage(ACCESS_TOKEN, res.accessToken);
                setTimeout(() => {
                    removeLocalStorage(ACCESS_TOKEN);
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000) // 1 hour
            }

            alert("Admin login successfully!")
            navigate("/dashboard")
        },
        onError: (err) => {
            console.log("Failed to login as admin", err)
            alert("Failed to login as admin!")
        }
    });

    const onSubmit: SubmitHandler<AdminLoginPayload> = (data) => {
        handelLogin(data)
    }

    return (
        <div className="h-screen border flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="userName">User Name</label>
                        <input
                            type="userName"
                            id="userName"
                            placeholder="userName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                            {...register("userName", { required: true })}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                            {...register("password", { required: true })}
                        />
                    </div>
                    {(errors.userName || errors.password) && <p className="text-red-500 text-xs italic mb-3">Please enter valid user name and password</p>}
                    <div>
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default AdminLogin