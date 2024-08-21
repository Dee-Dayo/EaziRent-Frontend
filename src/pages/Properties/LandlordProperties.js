import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import {jwtDecode} from "jwt-decode";
import LandlordPropertyCard from "./LandlordPropertyCard";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);
            try {

                const token = document.cookie.split('=')[1];
                const decodedToken = jwtDecode(token);
                const email = decodedToken.principal;

                // Fetch properties using the email from the decoded token
                const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/findByLandlord', {
                    email: email
                });

                setProperties(response.data.data.properties); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching properties:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);
    if (properties.length === 0) {
        return <div>No properties found for this landlord.</div>;
    }

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>My Properties</h1>
            </div>
            <div className="property-grid">
                {properties.map((property) => (
                    <LandlordPropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>

    );
};

export default LandlordProperties;
