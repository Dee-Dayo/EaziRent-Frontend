import style from './index.module.css';
import image1 from './../../../assets/juno.jpg'
import image2 from './../../../assets/juno_apartment2.jpg'


const MidSection = ()=>{
    return(
        <div className={style.container}>
            <div className={style.text_section}>
                <h1>About Us</h1>
                <p>EaziRent, your trusted partner in managing and securing your ideal living spaces. Finding the perfect home is more than just a transaction—it's about creating a space where memories are made and lives are lived.
                    Our platform is built on the principles of transparency, efficiency, and reliability. Whether you’re a landlord looking to list your property or a tenant in search of your next home, our innovative tools and dedicated team are here to assist you every step of the way. We offer comprehensive services, from property listings and virtual tours to secure payment processing and lease management, all designed to simplify your experience.
                    We believe in fostering a community of trust. We work closely with property owners to ensure that every listing is accurately represented and maintained to the highest standards. For renters, we provide a wealth of resources and support to help you make informed decisions and find a home that suits your lifestyle and needs.
                    Our commitment extends beyond the initial lease signing. We continue to support our users throughout their rental journey, offering maintenance request tools, payment reminders. With EaziRent, you can rest assured that your rental experience will be smooth, safe, and satisfying.
                    Join us at EaziRent, and let’s find your perfect place together.</p>
                <div className={style.offerSection}>
                    <h3>We try to offer you best possible homes to stay</h3>
                </div>
            </div>
            <div className={style.pic_section}>
                <img className={style.first_image_section} src={image1} alt={""}/>
                <img className={style.second_pic} src={image2} alt={""}/>
            </div>
        </div>
    )
}
export default MidSection