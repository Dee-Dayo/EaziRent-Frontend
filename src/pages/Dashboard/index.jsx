import React from 'react';
import StarRating from '../../components/StarRating';
import './index,module.css';

const Dashboard = () => {
    const user_data = localStorage.getItem('user_data');
    const user  = JSON.parse(user_data) || {};

    return (
        <div className="dashboard-container">
            <div className="user-info">
                <img
                    src={user.mediaUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="user-image"
                />
                <h2 className="user-name">Welcome, {user.firstName} {user.lastName}</h2>
                <StarRating rating={user.rating} />
                <p className="user-email">Email: {user.email}</p>
                <p className="response-time">Last Login: {user.responseTime}</p>
                <p className="user-role">Role: {user.role}</p>
            </div>
        </div>
    );
};

export default Dashboard;
