import React from "react";
import style from "./index.module.css";

const FilledButton = ({ name, onClick }) => {
    return (
        <div className={style.btn} onClick={onClick}>
            <p className={style.signupBtn}>{name}</p>
        </div>
    );
};

export default FilledButton;
