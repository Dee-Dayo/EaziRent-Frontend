import React from 'react';
import styles from './ApartmentList.module.css';
import StarRating from "../../components/StarRating";

const ApartmentList = ({ apartments }) => {
    return (
        <div className={styles.apartmentList}>
            {apartments.map(apartment => (
                <div key={apartment.id} className={styles.apartmentItem}>
                    <img
                        src={apartment.mediaUrls ? apartment.mediaUrls[0] : '/default.png'}
                        alt={`Apartment ${apartment.number}`}
                        className={styles.apartmentImage}
                    />
                    <div className={styles.apartmentDetails}>
                        <h3>Apartment {apartment.number}</h3>
                        <p>Price: ${apartment.price}</p>
                        <p>Rent Type: {apartment.rentType}</p>
                        <p>Type: {apartment.subType}</p>
                        <p>Status: {apartment.isAvailable ? 'Available' : 'Not Available'}</p>
                        <StarRating rating={apartment.ratings} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApartmentList;
