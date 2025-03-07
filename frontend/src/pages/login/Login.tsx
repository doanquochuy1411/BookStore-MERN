import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { LoginPayload } from "../../types/login.type"
import { FaGoogle } from "react-icons/fa"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import { Spin } from "../../components/Loading/Loading"
import { } from 'react-toastify'
import { SuccessNotify } from "../../utils/notify"

const Login = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginPayload>()
    const { login, signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginPayload> = (data) => {
        setLoading(true);
        login(data)
            .then(() => {
                navigate("/");
            }).catch((error) => {
                console.log("Lỗi rồi")
                setError("email", { type: "manual", message: error.message || "Registration failed. Please try again." });
            }).finally(
                () => setLoading(false)
            )
    }

    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                // alert("Login with google successfully!")
                navigate("/");
            }).catch((error) => {
                alert("Google sign in failed!")
                SuccessNotify("Login successfully");
                console.error(error)
            })
    }

    return (
        <div className="h-full border flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                            {...register("email", { required: true })}
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
                    {(errors.email || errors.password) && <p className="text-red-500 text-xs italic mb-3">Please enter valid email and password</p>}
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none w-28 h-10">
                            {loading ? <Spin /> : "Login"}
                            {/* <Spin /> */}
                        </button>
                    </div>

                    <p
                        className="align-baseline font-medium mt-4 text-sm">
                        Haven't an account? Please <Link to="/auth/register" className="text-blue-500 hover:text-blue-700">Registers</Link>
                    </p>

                </form>
                {/* google sign in */}
                <div className="mt-4">
                    <button
                        onClick={handelGoogleSignIn}
                        className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                        <FaGoogle className="mr-2" />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login