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

            ]
        }
    ])

    return element
}

export default useRouteElements;