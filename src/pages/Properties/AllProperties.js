import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import SearchComponent from "../../components/SearchComponent";

const AllProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://eazirent-latest.onrender.com/api/v1/property/all');
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    if (!properties) {
        return <div>Loading...</div>;
    }

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>All Properties</h1>
                <p>Explore all available properties</p>
            </div>

            <SearchComponent/>

            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
