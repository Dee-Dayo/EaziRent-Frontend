import React from 'react';
import virtualTourIcon from '../../../assets/virtual tour.png';
import bestDealIcon from '../../../assets/best deal.png';
import expertIcon from '../../../assets/expert.png'
import style from './index.module.css';

const MakeEasy = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2>
                    We make it easy for <span className={style.highlight}>tenants and landlords</span>.
                </h2>
                <p>
                    Whether it's selling your current home, getting financing, or buying a new home, we make it easy and efficient. The best part? You'll save a bunch of money and time with our services.
                </p>
            </div>
            <div className={style.features}>
                <div className={style.featureItem}>
                    <img src={virtualTourIcon} alt="Virtual Tour Icon" />
                    <h3>Virtual home tour</h3>
                    <p>You can communicate directly with landlords and we provide you with a virtual tour before you buy or rent the property.</p>
                </div>
                <div className={style.featureItem}>
                    <img src={bestDealIcon} alt="Best Deal Icon" />
                    <h3>Find the best deal</h3>
                    <p>Browse thousands of properties, save your favorites and set up search alerts so you don't miss the best home deal!</p>
                </div>
                <div className={style.featureItem}>
                    <img src={expertIcon} alt="Expert Icon" />
                    <h3>Get expert advice</h3>
                    <p>Find the right home with our expert advice and guides to make informed decisions.</p>
                </div>
            </div>
            <div className={style.stats}>
                <div className={style.statItem}>
                    <h4>7.4%</h4>
                    <p>Property Return Rate</p>
                </div>
                <div className={style.statItem}>
                    <h4>3,856</h4>
                    <p>Property in Sell & Rent</p>
                </div>
                <div className={style.statItem}>
                    <h4>2,540</h4>
                    <p>Daily Completed Transactions</p>
                </div>
            </div>
        </div>
    );
}

export default MakeEasy;
