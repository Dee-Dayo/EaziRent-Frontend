import React, { useState } from 'react';
import './index.module.css';

const StarRatings = ({ rating, onRatingChange }) => {
    const [hover, setHover] = useState(null);

    const handleClick = (index) => {
        onRatingChange(index);
    };

    const handleMouseEnter = (index) => {
        setHover(index);
    };

    const handleMouseLeave = () => {
        setHover(null);
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                return (
                    <span
                        key={index}
                        className={`star ${starIndex <= (hover || rating) ? 'filled' : ''}`}
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRatings;
