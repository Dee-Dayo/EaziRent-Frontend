import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/apartment/findBy${id}`);
                // console.log(response);
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
        <div>
            <h1>Apartment {apartment.number}</h1>
            <img src={apartment.mediaUrls[0]} alt={`Apartment ${apartment.number}`} />
            <p>Price: {apartment.price}</p>
            <p>Rating: {apartment.ratings}</p>
            <p>Type: {apartment.rentType}</p>
            <p>Subtype: {apartment.subType}</p>
            <p>Available: {apartment.isAvailable ? "Yes" : "No"}</p>
        </div>
    );
};

export default ApartmentDetails;
