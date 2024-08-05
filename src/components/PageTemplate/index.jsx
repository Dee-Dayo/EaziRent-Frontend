import style from "./index.module.css";

const PageTemplate = ({image, title, description, children}) =>{
    return (
        <div className={style.container}>
            <img src={image} alt= "page diagram" className={style.image}/>
            <div className={style.heroText}>
                <h3>{title}</h3>
                <p>{description}</p>
                {children}
            </div>
        </div>
    )
}
export default PageTemplate;