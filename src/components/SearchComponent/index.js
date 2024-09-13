import React, { useState } from 'react';
import styles from './index.module.css';
import FilledButton from "../FilledButton";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../../apiConfig";

const SearchComponent = () => {
    const [state, setState] = useState('');
    const [type, setType] = useState('');
    const [rentType, setRentType] = useState('');
    const navigate = useNavigate();


    const handleSearch = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/apartment/filter`, {
                state,
                type,
                rentType
            });
            navigate('/apartments', { state: { apartments: response.data.data.apartments } });
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    return (
        <div className={styles.searchArea}>
            <select name="state" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="LAGOS">Lagos</option>
            </select>

            <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="ONE_ROOM">One Room</option>
                <option value="ROOM_AND_PARLOUR">Room & Parlour</option>
                <option value="THREE_BEDROOM_FLAT">3 Bedroom Flat</option>
                <option value="STUDIO">Studio</option>
                <option value="DOUBLE_SHARED_ROOM">Double Shared Room</option>
                <option value="QUAD_SHARED_ROOM">Quad Shared Room</option>
                <option value="BOYS_QUARTERS">Boy's Quarters</option>
                <option value="LOFT">Loft</option>
            </select>

            <select name="rent-type" value={rentType} onChange={(e) => setRentType(e.target.value)}>
                <option value="">Select Rent Type</option>
                <option value="YEARLY">Yearly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="HALF_YEARLY">Half Yearly</option>
            </select>

            <FilledButton name="Search" onClick={handleSearch} />
        </div>
    );
};

export default SearchComponent;
