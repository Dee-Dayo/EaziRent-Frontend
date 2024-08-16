import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import FilledButton from "../../components/FilledButton";
import {useLocation} from "react-router-dom";

const LandlordProperties = () => {
    const [properties, setProperties] = useState([]);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const landlordId = queryParams.get('landlordId');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`https://localhost:8080/api/v1/property/findByLanlordId/${landlordId}`);
                //eazirent-latest.onrender.com
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        if (landlordId) {
            fetchProperties();
        }
    }, [landlordId]);


    if (!properties) {
        return <div>Loading...</div>;
    }

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>All Properties</h1>
            </div>
            <FilledButton name={"Add Property"} onClick={"/"} whereTo={"/"}/>

            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>
    );
};

export default LandlordProperties;
