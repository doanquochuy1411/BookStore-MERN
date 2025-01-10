import { useRoutes } from "react-router";
import LayoutMain from "../layouts/LayoutMain";
import Home from "../pages/home/Home";
import PATH from "./Path";
import Register from "../pages/register/Register";
import CartPage from "../pages/books/CartPage";
import Login from "../pages/login/Login";

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
                    element: <div>Order</div>
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
                }

            ]
        }
    ])

    return element
}

export default useRouteElements;