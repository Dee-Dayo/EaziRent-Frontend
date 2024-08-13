import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AllProperties.css';
import style from "../Home/Hero/index.module.css";
import FilledButton from "../../components/FilledButton";

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

    return (
        <div className="property-grid-container">
            <div className="location">
                <h1>All Properties</h1>
                <p>Explore all available properties</p>
            </div>

            <div className={style.searchArea}>
                <select name="state">
                    <option value="">Lagos</option>
                    <option value="">Abuja</option>
                </select>
                <select name="type">
                    <option value="">One Room</option>
                    <option value="">Room & Parlour</option>
                    <option value="">3 Bedroom Flat</option>
                    <option value="">Double Shared Room</option>
                    <option value="">Quad Shared Room</option>
                    <option value="">Boy's Quarters</option>
                </select>
                <select name="rent-type">
                    <option value="">Yearly</option>
                    <option value="">Monthly</option>
                    <option value="">Half Yearly</option>
                </select>
                <FilledButton name={"Search"}/>
            </div>

            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property}/>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;
