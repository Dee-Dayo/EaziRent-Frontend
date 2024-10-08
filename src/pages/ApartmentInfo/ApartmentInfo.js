import React from 'react';
import { useLocation } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import '../ApartmentDetails/ApartmentDetails.css';

const ApartmentInfo = () => {
    const location = useLocation();
    const { apartment } = location.state || {};

    if (!apartment) {
        return (
            <div>
                <h1>No apartment details available</h1>
            </div>
        );
    }

    return (
        <div className="apartment-details-container">
            <div className="apartment-info">
                <h1>Apartment {apartment.number}</h1>
                <p>Price: {apartment.price} Naira</p>
                <StarRating rating={apartment.ratings} />
                <p>Type: {apartment.rentType}</p>
                <p>Subtype: {apartment.subType}</p>
                <p>Available: {apartment.isAvailable ? "Yes" : "No"}</p>
            </div>
            <div className="apartment-images">
                {apartment.mediaUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Apartment ${apartment.number} - ${index + 1}`}
                        className="apartment-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default ApartmentInfo;
