import Layout from "../components/Layout";
import Home from "../pages/Home";
import SignUp from "../pages/Auth/Register";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/Auth/Login";
import ContactUs from "../pages/ContactUs";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import ApartmentDetails from "../pages/ApartmentDetails";
import ApartmentLists from "../pages/ApartmentsLists";
import Payment from "../pages/Payment/Payment";

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
                path: "contact",
                element: <ContactUs/>
            },
            {
                path: "properties",
                element: <Properties/>
            },
            {
                path:"/property/:id",
                element: <PropertyDetails/>
            },
            {
                path: "/apartment/:id",
                element: <ApartmentDetails/>
            },
            {
                path: "/apartments",
                element: <ApartmentLists/>
            },
            {
                path: "/payment",
                element: <Payment/>
            }
        ]
    },
    {path: "signup", element: <SignUp/>},
    {path: "login", element: <Login/>}
]