import Layout from "../components/Layout";
import Home from "../pages/Home";
import SignUp from "../pages/Auth/Register";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Auth/Login";
import ContactUs from "../pages/ContactUs";

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
            },
            {
                path: "about",
                element: <AboutUs/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "contact",
                element: <ContactUs/>
            }
        ]
    },
    {path: "signup", element: <SignUp/>}
]