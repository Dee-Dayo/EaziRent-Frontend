import logo from "../../assets/logo.png"
import facebook from "../../assets/facebook-f 1.png"
import insta from "../../assets/instagram 1.png"
import twitter from "../../assets/twitter 1.png"
import style from "./index.module.css"

const Footer = () => {
    return (
        <>
            <div className={style.footer}>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
                <div>
                    <h4>Rent an Apartment</h4>
                    <p>Find a property</p>
                    <p>Find an Apartment</p>
                    <p>Find a Landlord</p>
                </div>
                <div>
                    <h4>Service</h4>
                    <p>About us</p>
                    <p>Contact</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy &policy</p>
                </div>
            </div>
            <div className={style.footerCopyright}>
                <p>Copyright © 2020 Nexcent ltd. All rights reserved</p>
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