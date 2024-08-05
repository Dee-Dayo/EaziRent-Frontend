import style from "./index.module.css";
import React from "react";

const FilledButton = ({name, whereTo}) =>{
    return (
        <div className={style.btn}>
            <p className={style.signupBtn}><a href={whereTo}>{name}</a></p>
        </div>
    )
}

export default FilledButton;