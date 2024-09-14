import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ApartmentCard from '../../components/ApartmentCard';
import defaultLandlordImage from '../../assets/landlord.png';
import StarRating from '../../components/StarRating';
import './PropertyDetails.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRatings from "../../components/StarRatings";
import Cookies from "js-cookie";
import API_BASE_URL from "../../apiConfig";
import Modal from 'react-modal';
import Spinner from "../../components/Spinner/Spinner";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [landlordReviews, setLandlordReviews] = useState([]);
    const [isLandlordDialogOpen, setIsLandlordDialogOpen] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/property/findBy${id}`);
                setProperty(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleViewReviews = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/renter/getPropertyReviews${id}`);
            const reviewsData = response.data.data.reviews;
            setReviews(reviewsData);
            setIsDialogOpen(true);
        } catch (error) {
            console.error('Error fetching property reviews:', error);
            toast.error('Error fetching reviews.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleViewLandlordReviews = async () => {
        try {
            console.log('landlord id ', property.landlordId)
            const response = await axios.get(`${API_BASE_URL}/api/v1/renter/getLandlordReviews${property.landlordId}`);
            const landlordReviewsData = response.data.data.reviews;
            setLandlordReviews(landlordReviewsData);
            setIsLandlordDialogOpen(true);
        } catch (error) {
            console.error('Error fetching landlord reviews:', error);
            toast.error('Error fetching landlord reviews.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasRated = Cookies.get(`rated_${property.id}`);
        if (hasRated) {
            toast.error('You have already rated this property.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        setIsSubmitting(true);
        const payload = {
            propertyId: property.id,
            rating: rating,
            comment: comment,
            email: localStorage.getItem("email")
        }
        const token = Cookies.get("EasyRentAuthToken");
        if (!token) {
            toast.error('User is not authenticated. Please log in.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/renter/reviewProperty`, payload, config);

            if (response.data.status) {
                Cookies.set(`rated_${property.id}`, true, { expires: 365 });
                toast.success('Thanks. Your review has been submitted successfully!!!', {
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
            toast.error('Error submitting review: ' + error.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const customModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    };

    const closeModal = () => {
        setIsDialogOpen(false);
        setIsLandlordDialogOpen(false);
    };

    if (loading) {
        return <Spinner />;
    }

    if (!property) {
        return <Spinner />;
    }

    return (
        <div className="property-details-container">
            <div className="landlord-info">
                <img
                    src={property.landlordMediaUrl === 'default' ? defaultLandlordImage : property.landlordMediaUrl}
                    alt={property.landlordName || 'Landlord'}
                    className="landlord-image"
                />
                <h2 className="landlord-name">Owner: {property.landlordName || 'Landlord'}</h2>
                <StarRating rating={property.landlordRating} />
                <p className="agentName">Agent Name: {property.agentName}</p>
                <p className="agentPhone">Agent Phone: {property.agentPhoneNumber}</p>
                <button onClick={handleViewLandlordReviews}>
                    View Landlord Reviews
                </button>
            </div>

            <div className="property-apartments">
                <div className="property-grid">
                    {property.apartments.map((apartment) => (
                        <ApartmentCard key={apartment.id} apartment={apartment} />
                    ))}
                </div>
            </div>

            <div className="review-section">
                <button onClick={handleViewReviews}>
                    View All Property Reviews
                </button>

                <h3>Leave a Review</h3>
                <form onSubmit={handleSubmit}>
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

                <ToastContainer />

                <Modal
                    isOpen={isDialogOpen}
                    onRequestClose={closeModal}
                    style={customModalStyles}
                    contentLabel="Property Reviews"
                >
                    <h2>Property Reviews</h2>
                    <button onClick={closeModal}>Close</button>
                    <ul>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <li key={review.reviewId} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd' }}>
                                    <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                                    <div><strong>Rating:</strong> <StarRating rating={review.rating} /></div>
                                    <p><strong>Comment:</strong> {review.comment}</p>
                                    <p><strong>Review Date:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                                </li>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </ul>
                </Modal>

                <Modal
                    isOpen={isLandlordDialogOpen}
                    onRequestClose={closeModal}
                    style={customModalStyles}
                    contentLabel="Landlord Reviews"
                >
                    <h2>Landlord Reviews</h2>
                    <button onClick={closeModal}>Close</button>
                    <ul>
                        {landlordReviews.length > 0 ? (
                            landlordReviews.map((review) => (
                                <li key={review.reviewId} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd' }}>
                                    <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                                    <div><strong>Rating:</strong> <StarRating rating={review.rating} /></div>
                                    <p><strong>Comment:</strong> {review.comment}</p>
                                    <p><strong>Review Date:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                                </li>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </ul>
                </Modal>
            </div>
        </div>
    );
};

export default PropertyDetails;
