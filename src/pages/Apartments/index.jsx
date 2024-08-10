import style from './index.module.css'
const ApartmentCard = ({apartment}) => {
    if (!apartment.isAvailable) {
        return null
    }

    return(
        <div>
            <div className={style.apartment_grid}>
                {apartment.mediaUrls.map((mediaUrl, index) => (
                    <div key={index} className={style.container}>
                        <img src={mediaUrl} alt=""/>
                    </div>
                ))}
            </div>
        </div>

    )
}
export default ApartmentCard