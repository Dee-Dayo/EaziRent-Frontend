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

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleAboutClick = () => {
        navigate("/about");
    };

    const handleContactClick = () => {
        navigate("/contact");
    };

    const handlePropertiesClick = () => {
        navigate("/properties");
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
                                <p onClick={handleLogoClick}>Home</p>
                                <p onClick={handlePropertiesClick}>Properties</p>
                                <p onClick={handleAboutClick}>About Us</p>
                                <p onClick={handleContactClick}>Contact</p>
                            </div>

                            <div className={style.btn}>
                                <p onClick={handleLogin}>Login</p>
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
