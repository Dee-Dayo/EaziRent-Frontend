import React from 'react';
import { useLocation } from 'react-router-dom';
import ApartmentCard from "../../components/ApartmentCard";
import './ApartmentLists.css'

const ApartmentLists = () => {
    const location = useLocation();
    const apartments = location.state?.apartments || [];

    return (
        <div className="container">
            <h1>Available Apartments</h1>
            {apartments.length > 0 ? (
                <div className="apartment-list">
                    {apartments.map((apartment, index) => (
                        <ApartmentCard key={index} apartment={apartment} />
                    ))}
                </div>
            ) : (
                <p>No apartments found.</p>
            )}
        </div>
    );
};

export default ApartmentLists;
