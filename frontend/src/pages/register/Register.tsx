import { SubmitHandler, useForm } from "react-hook-form"
import { LoginPayload } from "../../types/login.type"
import { Link, useNavigate } from "react-router"
import { FaGoogle } from "react-icons/fa"
import { useAuth } from "../../context/AuthContext"
import { SuccessNotify } from "../../utils/notify"
import { useState } from "react"
import { Spin } from "../../components/Loading/Loading"

const Register = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginPayload>()
    const { registerUser, signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginPayload> = (data) => {
        setLoading(true);
        registerUser(data).then(() => {
            SuccessNotify("User registered successfully!");
            navigate("/login");
        }).catch((error) => {
            setError("email", { type: "manual", message: error.message || "Registration failed. Please try again." });
        }).finally(() => setLoading(false))
    }

    const handelGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                alert("Login with google successfully!")
                navigate("/");
            }).catch((error) => {
                alert("Google sign in failed!")
                console.error(error)
            })
    }

    return (
        <div className="h-full border flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Register</h2>

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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none w-36 h-10">
                            {loading ? <Spin /> : "Register"}
                        </button>
                    </div>

                    <p
                        className="align-baseline font-medium mt-4 text-sm">
                        Have an account? Please <Link to="/auth" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </p>

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
                </form>
            </div>
        </div>
    )
}

export default Register