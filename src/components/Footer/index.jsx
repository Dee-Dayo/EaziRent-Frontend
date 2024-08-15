import logo from "../../assets/logo.png"
import facebook from "../../assets/facebook-f 1.png"
import insta from "../../assets/instagram 1.png"
import twitter from "../../assets/twitter 1.png"
import style from "./index.module.css"

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <>
            <div className={style.footer}>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className={style.footerCopyright}>
                <p>Copyright © {year} Nexcent ltd. All rights reserved</p>
                <div className={style.icons}>
                    <img src={insta} alt="icon"/>
                    <img src={facebook} alt="icon"/>
                    <img src={twitter} alt="icon"/>
                </div>
            </div>

        </>
    )
}

export default Footer;