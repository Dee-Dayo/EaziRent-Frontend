import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import StarRating from '../../components/StarRating';
import './index,module.css';
import defaultProfileImage from '../../assets/landlord.png';
import AddPropertyDialog from '../../pages/AddPropertyDialog';
import FilledButton from "../../components/FilledButton";
import AddAccountDialog from "../AddAccountDialog/AddAccountDialog";
import API_BASE_URL from "../../apiConfig";

const Dashboard = () => {
    const navigate = useNavigate();
    const user_data = localStorage.getItem('user_data');
    const user = JSON.parse(user_data) || {};
    const [openDialog, setOpenDialog] = useState(false);
    const [openAccountDialog, setOpenAccountDialog] = useState(false);
    const [renterDetails, setRenterDetails] = useState(null);
    const profileImage = user?.mediaUrl && user.mediaUrl !== "default"
        ? user.mediaUrl
        : defaultProfileImage;

    useEffect(() => {
        if (user?.role === "RENTER") {
            fetchRenterDetails();
        }
    }, [user?.role, user?.email]);

    const fetchRenterDetails = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/renter/findByEmail`, {
                email: user.email,
            });
            console.log(response)
            setRenterDetails(response.data);
            console.log('Renter details:', response.data);
        } catch (error) {
            console.error('Error fetching renter details:', error);
        }
    };

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
    const handleViewApartmentClick = () => {
        navigate('/apartment-info', { state: { apartment: renterDetails?.data?.apartment } });
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

            {user?.role === "RENTER" && renterDetails && (
                <div className="add-property">
                    <FilledButton name="View Apartment" onClick={handleViewApartmentClick} />
                    <FilledButton name="View Landlord" />
                </div>
            )}

            {user?.role === "LANDLORD" && (
                <div className="add-property">
                    <FilledButton name="Add Property" onClick={handleAddPropertyClick} />
                    <FilledButton name="View properties" onClick={handlePropertiesClick} />
                    <FilledButton name="Add Account" onClick={handleAddAccountClick} />
                </div>
            )}

            <AddPropertyDialog open={openDialog} onClose={handleCloseDialog} />
            <AddAccountDialog open={openAccountDialog} onClose={handleCloseAccountDialog} />
        </div>
    );
};

export default Dashboard;
