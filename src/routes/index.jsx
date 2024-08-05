import Layout from "../components/Layout";
import Home from "../pages/Home";
import SignUp from "../pages/Auth/Register";

export const ROUTES = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "",
                element:<Home/>
            },
            {
                path: "home",
                element: <Home/>
            }
        ]
    },
    {path: "signup", element: <SignUp/>}
]