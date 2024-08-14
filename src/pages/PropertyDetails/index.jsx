import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApartmentCard from '../../components/ApartmentCard';
import defaultLandlordImage from '../../assets/landlord.png';
import StarRating from '../../components/StarRating';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/property/findBy${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (!property) {
        return <div>Loading...</div>;
    }

    const landlordName = property.landlordName || 'Landlord';
    const landlordImage = property.landlordMediaUrl === 'default' ? defaultLandlordImage : property.landlordMediaUrl;

    return (
        <div className="property-details-container">
            <div className="landlord-info">
                <img
                    src={landlordImage}
                    alt={landlordName}
                    className="landlord-image"
                />
                <h2 className="landlord-name">{landlordName}</h2>
                <StarRating rating={property.landlordRating} />
                <p className="agent-phone">Agent Phone: {property.agentPhoneNumber}</p>
            </div>
            <div className="property-apartments">
                <div className="property-grid">
                    {property.apartments.map((apartment) => (
                        <ApartmentCard key={apartment.id} apartment={apartment} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
