import React from 'react';
import '../../pages/Home/PropertyView/PropertyGrid.css';
import bed from "../../assets/Bed.png";
import StarRating from "../StarRating";

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img src={property.mediaUrl} alt={property.type} className="property-image" />
            <div className="property-info">
                <h3 className="property-name">{property.type}</h3>
                <div className="property-location">
                    <span>{property.lga}, {property.state}</span>
                </div>
                <div className="property-details">
                    <img src={bed} alt="bed"/>
                    <div>{property.noOfApartments} apartments</div>
                    <p>{property.id}</p>
                </div>
                <StarRating rating={property.averageRating} />
            </div>
        </div>
    );
};

export default PropertyCard;
