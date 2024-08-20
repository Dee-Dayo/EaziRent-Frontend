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
                //eazirent-latest.onrender.com
                const response = await axios.get('http://localhost:8080/api/v1/property/all');
                const fetchedProperties = response.data.properties;

                // Reverse the order of properties
                const reversedProperties = fetchedProperties.reverse();

                setProperties(reversedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    if (!properties.length) {
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
