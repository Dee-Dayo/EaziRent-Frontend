import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from "../StarRating";
import './ApartmentCard.css';

const ApartmentCard = ({ apartment }) => {
    return (
        <Link to={`/apartment/${apartment.id}`} className="apartment-card-link">
            <div className="apartment-card">
                <img
                    src={apartment.mediaUrls[0]}
                    alt={apartment.subType}
                    className="apartment-image"
                />
                <div className="apartment-info">
                    <h3 className="apartment-subtype">{apartment.subType}</h3>
                    <p className="apartment-number">Apartment #{apartment.number}</p>
                    <p className="apartment-price">Price: {apartment.price} Naira</p>
                    <p className="apartment-rent-type">Rent Type: {apartment.rentType}</p>
                    <StarRating rating={apartment.ratings} />
                </div>
            </div>
        </Link>
    );
};

export default ApartmentCard;
