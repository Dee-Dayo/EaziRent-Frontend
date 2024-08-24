import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import StarRating from '../../components/StarRating';
import './index,module.css';
import defaultProfileImage from '../../assets/landlord.png';
import AddPropertyDialog from '../../pages/AddPropertyDialog';
import FilledButton from "../../components/FilledButton";
import AddAccountDialog from "../AddAccountDialog/AddAccountDialog";

const Dashboard = () => {
    const navigate = useNavigate();
    const user_data = localStorage.getItem('user_data');
    const user = JSON.parse(user_data) || {};
    const [openDialog, setOpenDialog] = useState(false);
    const [openAccountDialog, setOpenAccountDialog] = useState(false);

    const profileImage = user?.mediaUrl && user.mediaUrl !== "default"
        ? user.mediaUrl
        : defaultProfileImage;

    const handleAddPropertyClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handlePropertiesClick = () => {
        navigate('/dashboard/properties');
    };

    const handleAddAccountClick = () => {
        setOpenAccountDialog(true);
    };

    const handleCloseAccountDialog = () => {
        setOpenAccountDialog(false);
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

            {user?.role === "LANDLORD" && (
                <div className="add-property">
                    <FilledButton name="Add Property" onClick={handleAddPropertyClick} />
                    <FilledButton name="View properties" onClick={handlePropertiesClick}/>
                    <FilledButton name="Add Account" onClick={handleAddAccountClick} />
                </div>
            )}

            <AddPropertyDialog open={openDialog} onClose={handleCloseDialog} />
            <AddAccountDialog open={openAccountDialog} onClose={handleCloseAccountDialog} />
        </div>
    );
};

export default Dashboard;
