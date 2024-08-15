import React from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

const FilledButton = ({ name, onClick, whereTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (whereTo) {
            navigate(whereTo);
        }
    };

    return (
        <div className={style.btn} onClick={handleClick}>
            <p className={style.signupBtn}>{name}</p>
        </div>
    );
};

export default FilledButton;
