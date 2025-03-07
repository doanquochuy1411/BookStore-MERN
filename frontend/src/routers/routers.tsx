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
import LayoutDashboard from "../layouts/LayoutDashboard";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/ManageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook";
import LayoutAuth from "../layouts/LayoutAuth";

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
        }, {
            path: PATH.AUTH,
            element: <LayoutAuth />,
            children: [
                {
                    index: true,
                    element: <Login />
                },
                {
                    path: PATH.REGISTER,
                    element: <Register />
                },
                {
                    path: PATH.ADMIN,
                    element: <AdminLogin />
                }
            ]
        }
        , {
            path: PATH.DASHBOARD,
            element: <AdminRoute> <LayoutDashboard /></AdminRoute>,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: PATH.ADD_NEW_BOOK,
                    element: <AddBook />
                },
                {
                    path: PATH.EDIT_BOOK,
                    element: <UpdateBook />
                },
                {
                    path: PATH.MANAGE_BOOK,
                    element: <ManageBooks />
                },
            ]
        }
    ])

    return element
}

export default useRouteElements;