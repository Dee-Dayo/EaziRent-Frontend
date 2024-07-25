import style from "./index.module.css";
import React from "react";

const FilledButton = ({name}) =>{
    return (
        <div className={style.btn}>
            <p className={style.signupBtn}><a href="/signup">{name}</a></p>
        </div>
    )
}

export default FilledButton;