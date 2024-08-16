import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApartmentCard from '../../components/ApartmentCard';
import defaultLandlordImage from '../../assets/landlord.png';
import StarRating from '../../components/StarRating';
import './PropertyDetails.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRatings from "../../components/StarRatings";
import Cookies from "js-cookie";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/property/findBy${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const payload = {
            propertyId: property.id,
            rating: rating,
            comment: comment,
            email: localStorage.getItem("email")
        }
        const token = Cookies.get("EasyRentAuthToken");
        console.log("token", token);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            //TODO: change url to deployed endpoint
            const url = 'https://eazirent-latest.onrender.com/api/v1/renter/reviewProperty';
            const response = await axios.post(url, payload, config);
            console.log(response.data);
            if (response.data.status) {
                console.log("reached here");
                toast.success('Thanks. Your review has been submitted successfully!!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRating(0);
                setComment('');
            } else {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            const message = error.response.data.data ? error.response.data.data
                : error.response.data.message ? error.response.data.message : 'An error occurred';
            toast.error('Error submitting review: ' + message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });        } finally {
            setIsSubmitting(false);
        }
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    const landlordName = property.landlordName || 'Landlord';
    const landlordImage = property.landlordMediaUrl === 'default' ? defaultLandlordImage : property.landlordMediaUrl;

    return (
        <div className="property-details-container">
            <div className="landlord-info">
                <img
                    src={landlordImage}
                    alt={landlordName}
                    className="landlord-image"
                />
                <h2 className="landlord-name">Owner: {landlordName}</h2>
                <StarRating rating={property.landlordRating}/>
                <p className="agentName">Agent Name: {property.agentName}</p>
                <p className="agentPhone">Agent Phone: {property.agentPhoneNumber}</p>

                <img
                    src={property.mediaUrl}
                    alt={"property "+property.id}
                />
            </div>

            <div className="property-apartments">
                <div className="property-grid">
                    {property.apartments.map((apartment) => (
                        <ApartmentCard key={apartment.id} apartment={apartment}/>
                    ))}
                </div>
            </div>

            <div className="review-section">
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit}>
                    <StarRatings rating={rating} onRatingChange={handleRatingChange}/>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your comment here..."
                        rows="4"
                        cols="50"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default PropertyDetails;
