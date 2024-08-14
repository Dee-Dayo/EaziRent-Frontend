import React, { useState } from 'react';
import styles from './index.module.css';
import FilledButton from "../FilledButton";
import axios from 'axios';

const SearchComponent = ({ onSearch }) => {
    const [state, setState] = useState('');
    const [type, setType] = useState('');
    const [rentType, setRentType] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/apartment/filterApartment', {
                state,
                type,
                rentType
            });
            onSearch(response.data.data.apartments);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    return (
        <div className={styles.searchArea}>
            <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
            </select>
            <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="One Room">One Room</option>
                <option value="Room & Parlour">Room & Parlour</option>
                <option value="3 Bedroom Flat">3 Bedroom Flat</option>
                <option value="Double Shared Room">Double Shared Room</option>
                <option value="Quad Shared Room">Quad Shared Room</option>
                <option value="Boy's Quarters">Boy's Quarters</option>
            </select>
            <select name="rent-type" value={rentType} onChange={(e) => setRentType(e.target.value)}>
                <option value="">Select Rent Type</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Half Yearly">Half Yearly</option>
            </select>
            <FilledButton name="Search" onClick={handleSearch} />
        </div>
    );
};

export default SearchComponent;
