import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import FilledButton from "../../components/FilledButton";
import {jwtDecode} from "jwt-decode";
import LandlordPropertyCard from "./LandlordPropertyCard";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {

                const token = document.cookie.split('=')[1];
                const decodedToken = jwtDecode(token);
                const email = decodedToken.email; // Adjust as per your token payload
                console.log(token)

                // Fetch properties using the email from the decoded token
                const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/findByLandlord', {
                    email: email
                });

                setProperties(response.data.data.properties); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (properties.length === 0) {
        return <div><h2>No properties found for this landlord.</h2></div>;
    }

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>My Properties</h1>
            </div>
            <FilledButton name={"Add Property"} onClick={"/"} whereTo={"/"}/>

            <div className="property-grid">
                {properties.map((property) => (
                    <LandlordPropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>

    );
};

export default LandlordProperties;
