import React, { useState } from 'react';
import axios from 'axios';
import style from './index.module.css';

const AddApartment = () => {
    const {propertyId} = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('');
    const [rentType, setRentType] = useState('');
    const [number, setNumber] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setMediaFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('propertyId', propertyId);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('rentType', rentType);
        formData.append('number', number);
        formData.append('mediaFile', mediaFile);

        try {
            const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/apartment/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message || 'Apartment added successfully!');
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'An error occurred while adding the apartment.'
            );
        }
    };

    return (
        <div className={style.container}>
            <h2>Add Apartment</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="" disabled>
                            Select Type
                        </option>
                        <option value="ONE ROOM">ONE ROOM</option>
                        <option value="ROOM_AND_PARLOUR">ROOM AND PARLOUR</option>
                        <option value="THREE_BEDROOM_FLAT">THREE BEDROOM FLAT</option>
                        <option value="STUDIO">STUDIO</option>
                        <option value="QUAD_SHARED_ROOM">QUAD SHARED ROOM</option>
                        <option value="LOFT">LOFT</option>
                        <option value="QUAD_SHARED_ROOM">QUAD_SHARED_ROOM</option>
                    </select>
                </div>

                <div>
                    <label>Rent Type</label>
                    <select value={rentType} onChange={(e) => setRentType(e.target.value)} required>
                        <option value="" disabled>
                            Select Rent Type
                        </option>
                        <option value="MONTHLY">MONTHLY</option>
                        <option value="YEARLY">YEARLY</option>
                        <option value="HALF_YEARLY">HALF YEARLY</option>
                    </select>
                </div>

                <div>
                    <label>Apartment Number</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Media File</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>

                <button type="submit">Add Apartment</button>
            </form>
        </div>
    );
};

export default AddApartment;
