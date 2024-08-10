import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import './PropertyGrid.css';
import FilledButton from "../../../components/FilledButton";

const PropertyGrid = () => {
    const [properties, setProperties] = useState([]);
    const [displayCount] = useState(3);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/property/all');
                console.log(response);

                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>Based on your location</h1>
                <p>Some of our picked properties near your location</p>
            </div>

            <div className="property-grid">
                {properties.slice(0, displayCount).map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
            <div className="browse-button-container">
                <FilledButton name={'Browse more properties'}/>
            </div>
        </div>
    );
};

export default PropertyGrid;
