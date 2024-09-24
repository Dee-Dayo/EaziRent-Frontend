import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating';
import FilledButton from "../../components/FilledButton";
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApartmentDetails.css';
import API_BASE_URL from "../../apiConfig";
import StarRatings from "../../components/StarRatings";
import Spinner from "../../components/Spinner/Spinner";

const formatString = (str) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const ApartmentDetails = () => {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApartmentDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/apartment/findBy${id}`);
                setApartment(response.data.data);
            } catch (error) {
                console.error('Error fetching apartment details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApartmentDetails();
    }, [id]);

    const handlePaymentClick = () => {
        const token = Cookies.get('EasyRentAuthToken');

        if (!token) {
            toast.warning('You need to be a registered user to rent an apartment.');
            setTimeout(() => {
                navigate('/signup', { state: { apartmentId: id } });
            }, 3000);
        } else {
            navigate(`/pay/${id}`);
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();
        const token = Cookies.get("EasyRentAuthToken");

        if (!token) {
            toast.error('User is not authenticated. Please log in.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        if (rating === 0) {
            toast.error('Please select a rating.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        if (comment.trim() === '') {
            toast.error('Please write a comment.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        setIsSubmitting(true);
        const payload = {
            propertyId: apartment.propertyId,
            apartmentId: apartment.id,
            email: localStorage.getItem("email"),
            rating: rating,
            comment: comment,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/apartment/review`, payload, config);
            if (response.data.status) {
                toast.success('Thanks. Your review has been submitted successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                });
                setRating(0);
                setComment('');
            } else {
                toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review: ' + error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!apartment) {
        return <div>No apartment details available.</div>;
    }

    return (
        <div className="apartment-details-container">
            <ToastContainer />
            <div className="apartment-info">
                <h1>Apartment {apartment.number}</h1>
                <p><strong>Price: </strong>{apartment.price} Naira</p>
                <StarRating rating={apartment.ratings} />
                <p><strong>Type: </strong> {formatString(apartment.rentType)}</p>
                <p><strong>Subtype: </strong> {formatString(apartment.subType)}</p>
                <p><strong>Available: </strong> {apartment.isAvailable ? "Yes" : "No"}</p>
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

            <div className="review-section">
                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmitReview}>
                    <StarRatings rating={rating} onRatingChange={handleRatingChange} />
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
            </div>
        </div>
    );
};

export default ApartmentDetails;
