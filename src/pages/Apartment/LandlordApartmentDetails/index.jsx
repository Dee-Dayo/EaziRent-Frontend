import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import StarRating from "../../../components/StarRating";
import FilledButton from "../../../components/FilledButton";
import  style from './index.module.css'
import AddApartmentImageDialog from "../AddApartmentImageDialog";
import API_BASE_URL from "../../../apiConfig";

const LandlordApartmentDetails = ()=>{
    const {id} = useParams();
    const[apartment, setApartment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleApartmentDialog = () =>{
        setOpenDialog(true);
    }
    const handleCloseDialog = () =>{
        setOpenDialog(false);
    }
    useEffect(() => {
        const fetchApartmentDetails = async ()=>{
            try{
                const response = await axios.get(`${API_BASE_URL}/api/v1/apartment/findBy${id}`);
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
        <>
            <div className={style.property_apartments}>
                <h1>Apartment {apartment.number}</h1>
                <p>Price: {apartment.price} Naira</p>
                <StarRating rating={apartment.ratings}/>
                <p>Type: {apartment.rentType}</p>
                <p>Subtype: {apartment.subType}</p>
                <p>Available: {apartment.isAvailable ? "Yes" : "No"}</p>
                <FilledButton onClick={handleApartmentDialog} name="Add more pictures"/>
            </div>
            <div className={style.apartment_images}>
                {apartment.mediaUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Apartment ${apartment.number} - ${index + 1}`}
                        className="apartment-image"
                    />
                ))}
                {openDialog && (
                    <AddApartmentImageDialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        apartmentId={id}
                    />
                )}
            </div>

        </>
    )

}

export default LandlordApartmentDetails;