import { useRoutes } from "react-router";
import LayoutMain from "../layouts/LayoutMain";
import Home from "../pages/home/Home";
import PATH from "./Path";
import Register from "../pages/register/Register";
import CartPage from "../pages/books/CartPage";
import Login from "../pages/login/Login";
import Checkout from "../pages/checkout/Checkout";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/orders/Order";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/login/AdminLogin";

const useRouteElements = () => {
    let element = useRoutes([
        {
            path: PATH.HOME,
            element: <LayoutMain />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: PATH.ORDER,
                    element: <PrivateRoute><Order /></PrivateRoute>
                },
                {
                    path: PATH.LOGIN,
                    element: <Login />
                },
                {
                    path: PATH.REGISTER,
                    element: <Register />
                },
                {
                    path: PATH.CART,
                    element: <CartPage />
                },
                {
                    path: PATH.CHECKOUT,
                    element: <PrivateRoute><Checkout /></PrivateRoute>
                },
                {
                    path: PATH.BOOK_DETAILS,
                    element: <SingleBook />
                },
                {
                    path: PATH.ADMIN,
                    element: <AdminLogin />
                },
                {
                    path: PATH.DASHBOARD,
                    element: <AdminRoute><div>Admin Dashboard</div></AdminRoute>,
                    children: [
                        {
                            path: PATH.DASHBOARD,
                            element: <div>Dashboard Home</div>
                        },
                        {
                            path: PATH.ADD_NEW_BOOK,
                            element: <div>Add new book</div>
                        },
                        {
                            path: PATH.EDIT_BOOK,
                            element: <div>Edit book</div>
                        },
                        {
                            path: PATH.MANAGE_BOOK,
                            element: <div>Manage books</div>
                        },
                    ]
                },
            ]
        }
    ])

    return element
}

export default useRouteElements;