import React from 'react';
import { useLocation } from 'react-router-dom';

const ApartmentLists = () => {
    const location = useLocation();
    const apartments = location.state?.apartments || [];

    return (
        <div>
            <h1>Available Apartments</h1>
            {apartments.length > 0 ? (
                apartments.map((apartment, index) => (
                    <div key={index}>
                        <img src={apartment.imageUrl} alt={`Apartment ${index + 1}`} />
                        <p>Apartment Number: {apartment.apartmentNumber}</p>
                        <p>Price: {apartment.price}</p>
                        <p>Rating: {apartment.rating}</p>
                        <p>Rent Type: {apartment.rentType}</p>
                        <p>Subtype: {apartment.subtype}</p>
                    </div>
                ))
            ) : (
                <p>No apartments found.</p>
            )}
        </div>
    );
};

export default ApartmentLists;
