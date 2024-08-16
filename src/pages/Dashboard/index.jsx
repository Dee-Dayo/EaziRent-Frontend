import React, { useState } from 'react';
import StarRating from '../../components/StarRating';
import './index,module.css';
import { useLocation } from "react-router-dom";
import defaultProfileImage from '../../assets/landlord.png';
import AddPropertyDialog from '../../pages/AddPropertyDialog';
import FilledButton from "../../components/FilledButton";

const Dashboard = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const [openDialog, setOpenDialog] = useState(false);

    // Determine the profile image to use
    const profileImage = user?.mediaUrl && user.mediaUrl !== "default"
        ? user.mediaUrl
        : defaultProfileImage;

    // Handler for opening the add property dialog
    const handleAddPropertyClick = () => {
        setOpenDialog(true);
    };

    // Handler for closing the add property dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <img
                    src={profileImage}
                    alt={`${user?.firstName || "User"} ${user?.lastName || ""}`}
                    className="user-image"
                />
                <h2 className="user-name">Welcome, {user?.firstName} {user?.lastName}</h2>
                <StarRating rating={user?.rating || 0} />
                <p className="user-email">Email: {user?.email}</p>
                <p className="response-time">Last Login: {user?.responseTime}</p>
                <p className="user-role">Role: {user?.role}</p>
            </div>

            {/* Conditionally render the Add Property button if the user is a LANDLORD */}
            {user?.role === "LANDLORD" && (
                <div className="add-property">
                    <FilledButton name="Add Property" onClick={handleAddPropertyClick} />
                </div>
            )}

            {/* Render the AddPropertyDialog component */}
            <AddPropertyDialog open={openDialog} onClose={handleCloseDialog} />
        </div>
    );
};

export default Dashboard;
