import React from 'react';
import './PropertyGrid.css';
import bed from "../../../assets/Bed.png";

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img src={property.mediaUrl} alt={property.type} className="property-image" />
            <div className="property-info">
                <div className="property-type">{property.address.lga}</div>
                <h3 className="property-name">{property.type}</h3>
                <div className="property-location">
                    <span>{property.lga}, {property.state}</span>
                </div>
                <div className="property-details">
                    <img src={bed} alt="bed"/>
                    <div>{property.noOfApartments} apartments</div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
