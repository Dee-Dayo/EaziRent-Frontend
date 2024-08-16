import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import FilledButton from "../../components/FilledButton";
import {jwtDecode} from "jwt-decode";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Decode the token from cookies
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
                const decodedToken = jwtDecode(token);
                const email = decodedToken.email; // Adjust as per your token payload
                console.log(token)

                // Fetch properties with email address
                const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/findByLandlord', {
                    email: email
                });

                setProperties(response.data.response.properties); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>All Properties</h1>
            </div>
            <FilledButton name={"Add Property"} onClick={"/"} whereTo={"/"}/>

            <div className="property-grid">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <PropertyCard key={property.id} property={property}/>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default LandlordProperties;
