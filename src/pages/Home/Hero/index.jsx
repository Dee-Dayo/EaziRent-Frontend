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
                    <select name="state">
                        <option value="">Lagos</option>
                        <option value="">Abuja</option>
                    </select>
                    <select name="type">
                        <option value="">One Room</option>
                        <option value="">Room & Parlour</option>
                        <option value="">3 Bedroom Flat</option>
                        <option value="">Double Shared Room</option>
                        <option value="">Quad Shared Room</option>
                        <option value="">Boy's Quarters</option>
                    </select>
                    <select name="rent-type">
                        <option value="">Yearly</option>
                        <option value="">Monthly</option>
                        <option value="">Half Yearly</option>
                    </select>
                    <FilledButton name={"Search"}/>
                </div>
            </div>
            <img src={picture} alt="house"/>
        </div>
    )
}

export default Hero;
