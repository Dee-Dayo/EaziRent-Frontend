import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container">
            <ClipLoader color={"#3498db"} loading={true} size={60} />
        </div>
    );
};

export default Spinner;
