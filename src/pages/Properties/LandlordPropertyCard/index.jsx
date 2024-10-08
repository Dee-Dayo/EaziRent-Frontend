import {Link} from "react-router-dom";
import bed from "../../../assets/Bed.png";
import StarRating from "../../../components/StarRating";
import React from "react";

const LandlordPropertyCard = ({property})=>{
    return (
        <Link to={`/dashboard/property/${property.id}`} className="property-card-link">
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
                    </div>
                    <StarRating rating={property.averageRating} />
                </div>
            </div>
        </Link>
    );
}
export default LandlordPropertyCard;