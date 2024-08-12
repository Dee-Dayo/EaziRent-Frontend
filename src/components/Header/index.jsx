import style from "./index.module.css";
import logo from "../../assets/logo.png"
import FilledButton from "../FilledButton";
import React, {useState} from "react";
import Hamburger from "hamburger-react"
import {useNavigate} from "react-router-dom";



const Header = () => {
    const isMobile = window.innerWidth <= 1080;
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogoClick = () => {
        navigate("/home");
    }
    const handleAboutClick = ()=>{
        navigate("/about");
    }
    const handleContactClick =()=>{
        navigate("/contact");
    }
    const handlePropertiesClick = () => {
        navigate("/properties")
    }

    return (
        <>
            <div className={style.nav}>
                <div className={style.image} onClick={handleLogoClick}>
                    <img src={logo} alt="logo"/>
                </div>

                {isMobile ? (
                    <>
                        <div className={style.hamburger}>
                            <Hamburger toggled={isOpen} toggle={setIsOpen} color="#5cb30b"/>
                        </div>
                        {isOpen && (
                            <div className={style.mobileMenu}>
                                <div className={style.midSection}>
                                    <p><a href="/home" style={{textDecoration: "none", color: "#4d4d4d"}}> Home</a></p>
                                    <p onClick={handleAboutClick}>About Us</p>
                                    <p><a href="/service" style={{textDecoration: "none", color: "#4d4d4d"}}>Our
                                        Service</a></p>
                                </div>

                                <div className={style.btn}>
                                    <p className={style.loginBtn}><a href="/login">Login</a></p>
                                    <FilledButton name={"Sign Up"}/>
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
                            <p>Our Service</p>
                            <p onClick={handleContactClick}>Contact</p>
                        </div>

                        <div className={style.btn}>
                            <p className={style.loginBtn} onClick={handleLogin}>Login</p>
                            <FilledButton name={"Sign Up"} whereTo={"signup"}/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Header;