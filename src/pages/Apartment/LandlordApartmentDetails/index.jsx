import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import StarRating from "../../../components/StarRating";
import FilledButton from "../../../components/FilledButton";

const LandlordApartmentDetails = ()=>{
    const {id} = useParams();
    const[apartment, setApartment] = useState(null);

    const handleCloseDialogue = () =>{

    }

    useEffect(() => {
        const fetchApartmentDetails = async ()=>{
            try{
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/apartment/findBy${id}`);
                setApartment(response.data.data);
            }
            catch(error) {
                console.error('Error fetching apartment details:', error);
            }
        }
        fetchApartmentDetails();
    })
    if(!apartment){
        return <div>No apartments</div>
    }
    return (
        <div>
            <div className="property-apartments">
                <h1>Apartment {apartment.number}</h1>
                <p>Price: {apartment.price} Naira</p>
                <StarRating rating={apartment.ratings}/>
                <p>Type: {apartment.rentType}</p>
                <p>Subtype: {apartment.subType}</p>
                <p>Available: {apartment.isAvailable ? "Yes" : "No"}</p>
                <FilledButton onClick={handleCloseDialogue} name="Edit Apartment"/>
            </div>
            <div className="apartment-images">
                {apartment.mediaUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Apartment ${apartment.number} - ${index + 1}`}
                        className="apartment-image"
                    />
                ))}
            </div>
        </div>
    )

}

export default LandlordApartmentDetails;