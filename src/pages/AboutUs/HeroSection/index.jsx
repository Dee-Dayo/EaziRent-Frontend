import image1 from './../../../assets/about_us_hero_image.png'
import style from './index.module.css'
const HeroSection = () => {
    return(
        <div className={style.container}>
            <div>
                <img src={image1} alt={"image"}/>
            </div>

            <div>
                <h2>Your peace of mind,<br/>our priority</h2>
                <p>Curabitur efficitur ante vel mi bibendum, et maximus nisl ultricies. Morbi nec tempus dui, sit amet facilisis nisl.
                    Curabitur efficitur luctus enim nec sollicitudin. Fusce venenatis venenatis lorem eu accumsan. Nunc sit amet mi vitae odio porttitor feugiat. Sed quis sem elementum, viverra ligula at, lobortis magna. Praesent congue nibh in dolor rutrum, et euismod quam elementum.
                    Mauris justo felis, iaculis quis sagittis sit amet, feugiat vitae est. Aliquam porta ex elit, sit amet rutrum turpis egestas viverra. Quisque at libero purus.</p>
            </div>
        </div>
    )
}

export default HeroSection