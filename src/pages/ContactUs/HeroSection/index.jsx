import style from "./index.module.css";
import picture1 from "../../../assets/Rectangle 133.png";

const HeroSection = () => {
    return (
        <div className={style.container}>
            <div className={style.text_section}>
                <h1>Contact Us</h1>
                <p>We are always here to answer your questions</p>
                <p>Reach out and we'll get back to you as soon as possible</p>
            </div>
            <div className={style.picture_connect_section}>
                <img src={picture1} alt={"picture"}/>
                <div className={style.text_subSection}>
                    <h3>Connect with us</h3>
                    <p><span className={style.textTitle}>Email</span> eazirenthomes@hotmail.com</p>
                    <p><span className={style.textTitle}>Phone</span> 09022332244</p>
                    <p><span className={style.textTitle}>Address</span> Adesanya street, Adekunle, Yaba</p>
                </div>

            </div>
        </div>
    )
}
export default HeroSection;