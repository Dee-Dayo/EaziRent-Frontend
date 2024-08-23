import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllProperties.css';
import {jwtDecode} from "jwt-decode";
import LandlordPropertyCard from "./LandlordPropertyCard";
import Spinner from "../../components/Spinner/Spinner";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {

                const token = document.cookie.split('=')[1];
                const decodedToken = jwtDecode(token);
                const email = decodedToken.principal;

                const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/findByLandlord', {
                    email: email
                });

                setProperties(response.data.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return <Spinner/>;
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
