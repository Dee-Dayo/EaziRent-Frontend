import React from 'react';
import houseIcon from '../../../assets/house.png';
import insuranceIcon from '../../../assets/insurance.png';
import priceTagIcon from '../../../assets/price.png';
import style from './index.module.css';

const FindNewHome =() => {
    return (
        <div className={style.container}>
            <div className={style.section}>
                <h2>The new way to find your new home</h2>
                <p>Find your dream place to live in with more than 10k+ properties listed.</p>
                <button>Browse Properties</button>
                <img src={houseIcon} alt="House Icon" />
            </div>
            <div>
                <div className={style.section}>
                    <img src={insuranceIcon} alt="Insurance Icon"/>
                    <h2>Property Insurance</h2>
                    <p>We offer our customer property protection of liability coverage and insurance for their better
                        life.</p>
                </div>
                <div className={style.section}>
                    <img src={priceTagIcon} alt="Price Tag Icon"/>
                    <h2>Best Price</h2>
                    <p>Not sure what you should be charging for your property? No need to worry, let us do the numbers
                        for you.</p>
                </div>

            </div>
        </div>
    );
}

export default FindNewHome;
