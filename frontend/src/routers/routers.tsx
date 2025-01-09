import { useRoutes } from "react-router";
import LayoutMain from "../layouts/LayoutMain";
import Home from "../pages/home/Home";

const useRouteElements = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <LayoutMain />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: "admin",
                    element: <div>Hello admin</div>
                },

            ]
        }
    ])

    return element
}

export default useRouteElements;