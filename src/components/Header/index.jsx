import style from "./index.module.css";
import logo from "../../assets/logo.png"
import FilledButton from "../FilledButton";
import React, {useState} from "react";
import Hamburger from "hamburger-react"
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const isMobile = window.innerWidth <= 1080;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={style.nav}>
                <div className={style.image}>
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
                                    <p>About Us</p>
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
                            <p>Home</p>
                            <p>Apartments</p>
                            <Link to={"/about"}><p>About us</p></Link>
                            <p>Our Service</p>
                            <p>Contact</p>
                        </div>

                        <div className={style.btn}>
                            <p className={style.loginBtn}>Login</p>
                            <FilledButton name={"Sign Up"} whereTo={"signup"}/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Header;