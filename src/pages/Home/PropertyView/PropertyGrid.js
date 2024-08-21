import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../../components/PropertyCard/PropertyCard';
import Spinner from '../../../components/Spinner/Spinner'; // Import the Spinner
import './PropertyGrid.css';
import FilledButton from "../../../components/FilledButton";

const PropertyGrid = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [displayCount] = useState(4);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://eazirent-latest.onrender.com/api/v1/property/all');

                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchProperties();
    }, []);

    if (loading) { // Show the Spinner while loading
        return <Spinner />;
    }

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
                <FilledButton name={'Browse more properties'} whereTo={"/properties"}/>
            </div>
        </div>
    );
};

export default PropertyGrid;
