import logo from "../../assets/logo.png";
import facebook from "../../assets/facebook-f 1.png";
import insta from "../../assets/instagram 1.png";
import twitter from "../../assets/twitter 1.png";
import style from "./index.module.css";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className={style.footer}>
            <img src={logo} alt="logo" className={style.logo}/>
            <p className={style.copyright}>Copyright © {year} EaziRent. All rights reserved</p>
            <div className={style.icons}>
                <img src={insta} alt="Instagram" />
                <img src={facebook} alt="Facebook" />
                <img src={twitter} alt="Twitter" />
            </div>
        </div>
    );
};

export default Footer;
