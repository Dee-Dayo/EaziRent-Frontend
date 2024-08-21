import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import LandLordApartmentCard from "../../Apartment/LandlordApartmentCard";

const LandlordPropertyDetails = () => {
    const {id} = useParams();
    const [apartments, setApartments] = useState(null);
    useEffect(() => {
        const fetchApartments = async ()=>{
            try {
                const response = await axios.get(`https://eazirent-latest.onrender.com/api/v1/apartment/all${id}`)
                setApartments(response.data);
            }
            catch(error) {
                console.error('Error fetching apartment details:', error);
            }
        };
        fetchApartments()

    }, [id]);

    if (!apartments) {
        return <div>..loading</div>
    }
    return (
        <div className="property-apartments">
            <div className="property-grid">
                {apartments.map((apartment) => (
                    <LandLordApartmentCard key={apartment.id} apartment={apartment}/>
                ))}
            </div>
        </div>

    )
}

export default LandlordPropertyDetails;