import image1 from './../../../assets/ikorodu-lagos.jpg'
import style from './index.module.css'
const HeroSection = () => {
    return(
        <div className={style.container}>
            <div>
                <img src={image1} alt={"image"}/>
            </div>

            <div className={style.text_section}>
                <h1>Your peace of mind,<br/>our priority</h1>
                <p>Take the hassle out of property management with our all-in-one rental app.
                </p>
                <p>From listing properties to managing tenant interactions and processing payments, everything you need is just a tap away.</p>
                <p>Designed for both landlords and tenants, our app simplifies the rental process, saving you time and effort. Experience a smarter, more efficient way to manage your rentals—get started today!</p>
            </div>
        </div>
    )
}

export default HeroSection