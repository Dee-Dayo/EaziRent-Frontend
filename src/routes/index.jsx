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
import Dashboard from "../pages/Dashboard";
import AddApartment from "../pages/Apartment";
import LandlordProperties from "../pages/Properties/LandlordProperties";
import LandlordPropertyDetails from "../pages/Properties/LandlordPropertyDetails";
import LandlordApartmentDetails from "../pages/Apartment/LandlordApartmentDetails";
import VerifyPaymentPage from "../pages/PaymentVerification/PaymentVerification";
import ApartmentInfo from "../pages/ApartmentInfo/ApartmentInfo";

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
                path: "/pay/:id",
                element: <Payment/>
            },
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/property/:id/apartments/add",
                element: <AddApartment/>
            },
            {
                path: "/dashboard/properties",
                element: <LandlordProperties/>
            },
            {
                path: "/dashboard/property/:id",
                element: <LandlordPropertyDetails/>
            },
            {
                path: "/dashboard/apartment/:id",
                element: <LandlordApartmentDetails/>
            },
            {
                path: "/verify-payment/:apartmentId",
                element: <VerifyPaymentPage/>
            },
            {
                path: "/apartment-info",
                element: <ApartmentInfo/>
            }
        ]
    },
    {path: "signup", element: <SignUp/>},
    {path: "login", element: <Login/>}
]