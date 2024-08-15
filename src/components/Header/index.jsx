import style from "./index.module.css";
import logo from "../../assets/logo.png";
import FilledButton from "../FilledButton";
import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

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
    const handleAboutClick = () => handleNavigation("/about");
    const handleContactClick = () => handleNavigation("/contact");
    const handlePropertiesClick = () => handleNavigation("/properties");
    const handleLogin = () => handleNavigation("/login");

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
                                <p onClick={() => handleNavigation("/login")}>Login</p>
                                <FilledButton name={"Sign Up"} whereTo={"signup"} />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={style.midSection}>
                        <p onClick={handleLogoClick}> Home</p>
                        <p onClick={handlePropertiesClick}>Properties</p>
                        <p onClick={handleAboutClick}>About Us</p>
                        <p onClick={handleContactClick}>Contact</p>
                    </div>

                    <div className={style.btn}>
                        <p className={style.loginBtn} onClick={handleLogin}>Login</p>
                        <FilledButton name={"Sign Up"} whereTo={"signup"} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;
