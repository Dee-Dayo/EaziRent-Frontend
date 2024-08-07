import React from 'react';
import houseIcon from '../../../assets/house.png';
import insuranceIcon from '../../../assets/insurance.png';
import priceTagIcon from '../../../assets/price.png';
import controlIcon from '../../../assets/control.png';
import commissionIcon from '../../../assets/commission.png';
import style from './index.module.css';
import FilledButton from "../../../components/FilledButton";

const FindNewHome = () => {
    return (
        <div className={style.container}>
            <div className={style.introSection}>
                <h1>The new way to find your new home</h1>
                <p>Find your dream place to live in with more than 10k+ properties listed.</p>
                <FilledButton name={"Browse Properties"}/>
                <img src={houseIcon} alt="House Icon" className={style.introImage} />
            </div>
            <div className={style.features}>
                <div className={style.featureItem}>
                    <img src={insuranceIcon} alt="Insurance Icon" />
                    <h3>Property Insurance</h3>
                    <p>We offer our customers property protection of liability coverage and insurance for their better life.</p>
                </div>
                <div className={style.featureItem}>
                    <img src={priceTagIcon} alt="Price Tag Icon" />
                    <h3>Best Price</h3>
                    <p>Not sure what you should be charging for your property? No need to worry, let us do the numbers for you.</p>
                </div>
                <div className={style.featureItem}>
                    <img src={commissionIcon} alt="Commission Icon" />
                    <h3>Lowest Commission</h3>
                    <p>You no longer have to negotiate commissions and hassle with other agents! It only costs 2%.</p>
                </div>
                <div className={style.featureItem}>
                    <img src={controlIcon} alt="Control Icon" />
                    <h3>Overall Control</h3>
                    <p>Get a virtual tour, and schedule visits before you rent any apartment. You get overall control.</p>
                </div>
            </div>
        </div>
    );
}
export default FindNewHome;
