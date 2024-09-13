import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRatings from "../../components/StarRatings";
import { toast, ToastContainer } from 'react-toastify';
import defaultProfileImage from '../../assets/landlord.png';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from "../../apiConfig";
import './LandlordDetails.css';

const LandlordDetails = () => {
    const { landlordId } = useParams();
    const [landlord, setLandlord] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchLandlordDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/landlord/findBy/${landlordId}`);
                setLandlord(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching landlord details:', error);
            }
        };

        fetchLandlordDetails();
    }, [landlordId]);

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
            landlordId: landlordId,
            rating: rating,
            comment: comment,
            renterId: localStorage.getItem('user_id')
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/renter/reviewLandlord`, payload);

            if (response.data.status) {
                toast.success('Thanks! Your review has been submitted successfully.', {
                    position: "top-right",
                    autoClose: 5000,
                });
                setRating(0);
                setComment('');
            } else {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review: ' + (error.response?.data?.message || 'An error occurred'), {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!landlord) {
        return <div>Loading...</div>;
    }

    const profileImage = landlord.profilePictureUrl || defaultProfileImage;

    return (
        <div className="landlord-details-container">
            <div className="landlord-info">
                <img src={profileImage} alt={landlord.firstName} className="landlord-image" />
                <h2>{landlord.firstName} {landlord.lastName}</h2>
                <StarRatings rating={landlord.rating} />
            </div>

            <div className="review-section">
                <h3>Rate and Review Landlord</h3>
                <form onSubmit={handleSubmit}>
                    <StarRatings rating={rating} onRatingChange={handleRatingChange} />
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Write your review here..."
                        rows="4"
                        cols="50"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LandlordDetails;
