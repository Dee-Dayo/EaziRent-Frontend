import logo from "../../assets/logo.png";
import linkedin from "../../assets/linkedin.png";
import style from "./index.module.css";

const Footer = () => {
    const year = new Date().getFullYear();
    const dayoLinkedIn = "https://www.linkedin.com/in/akindayo-akinyemi-3b3685248/";
    const victorLinkedIn = "https://www.linkedin.com/in/msonter-victor-053816269/";
    const orishaLinkedIn = "https://www.linkedin.com/in/orisha/";

    return (
        <div className={style.footer}>
            <img src={logo} alt="logo" className={style.logo}/>
            <p className={style.copyright}>Copyright © {year} EaziRent. All rights reserved</p>
            <div className={style.icons}>
                <a href={dayoLinkedIn} target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="LinkedIn" className={style.icon}/>
                </a>
                <a href={victorLinkedIn} target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="LinkedIn" className={style.icon}/>
                </a>
                <a href={orishaLinkedIn} target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="LinkedIn" className={style.icon}/>
                </a>
            </div>
        </div>
    );
};

export default Footer;
