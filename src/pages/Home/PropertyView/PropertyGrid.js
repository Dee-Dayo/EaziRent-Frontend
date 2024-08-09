import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './PropertyGrid.css';

const PropertyGrid = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/property/all');
                console.log(response.data.properties);
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="property-grid">
            {properties && properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
};

export default PropertyGrid;
