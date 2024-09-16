import React from 'react';
import { useLocation } from 'react-router-dom';
import ReviewForm from "../ReviewLandlord/ReviewForm";
import './LandlordDetails.css';
import { ToastContainer } from 'react-toastify';

const LandlordDetails = () => {
    const location = useLocation();
    const { landlordId, renterId, landlordName, landlordProfileImage } = location.state;

    return (
        <div className="landlord-details-container">
            <div className="landlord-info">
                <img src={landlordProfileImage} alt="Landlord" className="landlord-image" />
                <h2 className="landlord-name">{landlordName}</h2>
            </div>

            <div className="review-section">
                <h3>Leave a Review</h3>
                <ReviewForm landlordId={landlordId} renterId={renterId} />
                 <ToastContainer />
            </div>
        </div>
    );
};

export default LandlordDetails;
