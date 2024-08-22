import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import Spinner from '../../components/Spinner/Spinner'; // Import the Spinner
import './AllProperties.css';
import SearchComponent from "../../components/SearchComponent";

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://eazirent-latest.onrender.com/api/v1/property/all');
                const fetchedProperties = response.data.properties;
                

                // Reverse the order of properties
                const reversedProperties = fetchedProperties.reverse();

                setProperties(reversedProperties);
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
