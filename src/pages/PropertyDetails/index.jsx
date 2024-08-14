import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApartmentCard from '../../components/ApartmentCard';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/property/findBy${id}`);
                console.log(response);
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

    return (
        <div className="property-grid-container">
            <h1>{property.type}</h1>
            <p>{property.lga}, {property.state}</p>
            <div className="property-grid">
                {property.apartments.map(apartment => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}
            </div>
        </div>
    );
};

export default PropertyDetails;
