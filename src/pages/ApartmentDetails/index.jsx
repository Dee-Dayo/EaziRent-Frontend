import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import FilledButton from "../../components/FilledButton";
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApartmentDetails.css';

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/apartment/findBy${id}`);
                setApartment(response.data.data);
            } catch (error) {
                console.error('Error fetching apartment details:', error);
            }
        };

        fetchApartmentDetails();
    }, [id]);

    const handlePaymentClick = () => {
        const token = Cookies.get('EasyRentAuthToken');

        if (!token) {
            toast.warning('You need to be a registered user to rent an apartment.');
            setTimeout(() => {
                navigate('/signup');
            }, 3000)
        } else {
            navigate(`/pay/${id}`);
            console.log(id)
        }
    };

    if (!apartment) {
        return <div>Loading...</div>;
    }

    return (
        <div className="apartment-details-container">
            <ToastContainer />
            <div className="apartment-info">
                <h1>Apartment {apartment.number}</h1>
                <p>Price: {apartment.price} Naira</p>
                <StarRating rating={apartment.ratings} />
                <p>Type: {apartment.rentType}</p>
                <p>Subtype: {apartment.subType}</p>
                <p>Available: {apartment.isAvailable ? "Yes" : "No"}</p>
                <FilledButton name={'Rent Apartment'} onClick={handlePaymentClick} />
            </div>
            <div className="apartment-images">
                {apartment.mediaUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Apartment ${apartment.number} - ${index + 1}`}
                        className="apartment-image"
                    />
                ))}
            </div>
        </div>
    );
};

export default ApartmentDetails;
