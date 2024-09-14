import React from 'react';
import './Spinner.css';
import logo from '../../assets/logo.png'

const Spinner = () => {
    return (
        <div className="spinner-container">
            <img src={logo} alt="Loading..." className="loading-logo"/>
        </div>
    );
};

export default Spinner;