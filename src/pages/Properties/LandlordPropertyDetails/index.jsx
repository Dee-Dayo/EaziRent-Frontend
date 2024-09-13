import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import LandLordApartmentCard from "../../Apartment/LandlordApartmentCard";
import FilledButton from "../../../components/FilledButton";
import style from './index.module.css'
import AddApartmentDialogue from "../../Apartment/AddApartmentDialogue";
import API_BASE_URL from "../../../apiConfig";

const LandlordPropertyDetails = () => {
    const {id} = useParams();
    const [apartments, setApartments] = useState(null);
    const token = document.cookie.split('=')[1];
    const [openDialogue, setOpenDialogue] = useState(false);

    const handleAddApartmentDialog = ()=> {
        setOpenDialogue(true);
    }
    const handleCloseDialogue = () => {
        setOpenDialogue(false);
    }

    useEffect(() => {
        const fetchApartments = async ()=>{
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/apartment/all${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                setApartments(response.data.apartments);
            }
            catch(error) {
                console.error('Error fetching apartment details:', error);
            }

        };
        fetchApartments()

    }, );


    return (
        <div className={style.property_apartments}>
            <h2 className={style.no_apartments}>My Apartments</h2>
            <FilledButton onClick={handleAddApartmentDialog} name="Add Apartment"/>
            <div className="property-apartments">
                {apartments && apartments.length > 0 ? (
                    <div className="property-grid">
                        {apartments.map((apartment) => (
                            <LandLordApartmentCard key={apartment.id} apartment={apartment} />
                        ))}
                    </div>
                ) : (
                    <p className={style.no_apartments}>No apartments found</p>
                )}
                <AddApartmentDialogue open={openDialogue} onClose={handleCloseDialogue}/>
            </div>

        </div>

    )
}

export default LandlordPropertyDetails;