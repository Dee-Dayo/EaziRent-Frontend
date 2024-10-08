import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Hamburger from "hamburger-react";
import FilledButton from "../FilledButton";
import style from "./index.module.css";
import logo from "../../assets/logo.png";
import API_BASE_URL from "../../apiConfig";

const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = !!Cookies.get("EasyRentAuthToken");
    const navigate = useNavigate();

    useEffect(() => {
        const wakeUpBackend = async () => {
            try {
                await axios.get(`${API_BASE_URL}/api/v1/property/all`);
            } catch (error) {
                console.error('Error waking up the backend:', error);
            }
        };

        wakeUpBackend();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1080);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const handleLogoClick = () => handleNavigation("/home");

    const handleLogout = async () => {
        try {
            const token = Cookies.get("EasyRentAuthToken");
            const endpoint = `${API_BASE_URL}/api/v1/auth/logout`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(endpoint, null, config);

            if (response.status === 204) {
                Cookies.remove("EasyRentAuthToken");
                handleNavigation("/home");
            } else {
                toast.error("An error occurred. Please try again later");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later");
        }
    };

    return (
        <div className={style.nav}>
            <div className={style.image} onClick={handleLogoClick}>
                <img src={logo} alt="logo" />
            </div>

            {isMobile ? (
                <>
                    <div className={style.hamburger}>
                        <Hamburger toggled={isOpen} toggle={setIsOpen} color="#000929" />
                    </div>
                    {isOpen && (
                        <div className={style.mobileMenu}>
                            <div className={style.midSection}>
                                <p onClick={() => handleNavigation("/home")}>Home</p>
                                <p onClick={() => handleNavigation("/properties")}>Properties</p>
                                <p onClick={() => handleNavigation("/about")}>About Us</p>
                                <p onClick={() => handleNavigation("/contact")}>Contact</p>
                            </div>
                            <div className={style.btn}>
                                {isAuthenticated ? (
                                    <p className={style.loginBtn} onClick={handleLogout}>Logout</p>
                                ) : (
                                    <>
                                        <p className={style.loginBtn} onClick={() => handleNavigation("/login")}>Login</p>
                                        <FilledButton name={"Sign Up"} whereTo={"/signup"} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={style.midSection}>
                        <p onClick={() => handleNavigation("/home")}>Home</p>
                        <p onClick={() => handleNavigation("/properties")}>Properties</p>
                        <p onClick={() => handleNavigation("/about")}>About Us</p>
                        <p onClick={() => handleNavigation("/contact")}>Contact</p>
                    </div>
                    <div className={style.btn}>
                        {isAuthenticated ? (
                            <p className={style.loginBtn} onClick={handleLogout}>Logout</p>
                        ) : (
                            <>
                                <p className={style.loginBtn} onClick={() => handleNavigation("/login")}>Login</p>
                                <FilledButton name={"Sign Up"} whereTo={"/signup"} />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;
