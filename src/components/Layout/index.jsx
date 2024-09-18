import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div className="layout-container">
            <Header />
            <main className="layout-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
