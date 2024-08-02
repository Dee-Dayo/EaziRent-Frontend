import React from 'react';
import picture from "../../../assets/hero.png";
import style from "./index.module.css";
import FilledButton from "../../../components/FilledButton";

const Hero = () => {
    return (
        <div className={style.heroSection}>
            <div className={style.header}>
                <div>
                    <h1>Let's hunt for your dream residence</h1>
                    <p>Explore our range of beautiful properties with separate accommodation suitable for you.</p>
                </div>
                <div className={style.searchArea}>
                    <input type="text" placeholder="Location"/>
                    <select name="type">
                        <option value="">Condo</option>
                        <option value="">Duplex</option>
                        <option value="">Hostel</option>
                        <option value="">Bungalow</option>
                    </select>
                    <select name="price-range">
                        <option value="">100k - 450k</option>
                        <option value="">500k - 1Mk</option>
                        <option value="">1.5Mk - 3Mk</option>
                    </select>
                    <FilledButton name={"Search"}/>
                </div>
            </div>
            <img src={picture} alt="house"/>
        </div>
    )
}

export default Hero;
