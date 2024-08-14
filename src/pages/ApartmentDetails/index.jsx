import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import './ApartmentDetails.css';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/apartment/findBy${id}`);
                setApartment(response.data.data);
            } catch (error) {
                console.error('Error fetching apartment details:', error);
            }
        };

        fetchApartmentDetails();
    }, [id]);

    if (!apartment) {
        return <div>Loading...</div>;
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

export default ApartmentDetails;
