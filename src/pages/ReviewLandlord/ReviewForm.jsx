import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from '../../components/StarRatings';
import { toast } from 'react-toastify';
import API_BASE_URL from "../../apiConfig";
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ landlordId, renterId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        }        setIsSubmitting(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/renter/reviewLandlord`, {
                landlordId,
                renterId,
                rating,
                comment
            });
            if (response.status === 200 && response.data.status){
                toast.success("Review submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setRating(0);
                setComment('');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                toast.error(response.data.message || "Error in response.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
           console.error('Error submitting review:', error);
            toast.error('Error submitting review: ' + (error.response?.data?.message || 'Something went wrong'), {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <StarRatings rating={rating} onRatingChange={setRating}/>
            <textarea
                rows="4"
                cols="50"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="review-comment"
                disabled={isSubmitting}
            />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

export default ReviewForm;
