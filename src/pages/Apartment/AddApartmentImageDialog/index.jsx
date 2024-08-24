import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Modal from "react-modal";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import {jwtDecode} from "jwt-decode";
import style from "./index.module.css";


const AddApartmentImageDialog = ({open, onClose}) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {apartmentId} = useParams();
     const token = document.cookie.split('=')[1];
     console.log("Token", token)
     const decodedToken = jwtDecode(token)
     const userEmail = decodedToken.principal
    console.log("Email", userEmail)
    console.log("apartmentId", apartmentId);
    const HandleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prevFiles => [...prevFiles, ...files]);
    };

    const uploadImages = async (isFinalUpload = false) => {
        setIsSubmitting(true);
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append('mediaFiles', file));
        formData.append('email', userEmail);
        formData.append('imageFiles', imageFiles);

        try {
            const response = await axios.post(`https://eazirent-latest.onrender.com/api/v1/apartment/upload-media/${apartmentId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            if (isFinalUpload) {
                toast.success("Upload complete!");
                setImageFiles([]); // Reset state after final upload
                onClose(); // Close the modal after submission
            }
        } catch (error) {
            toast.error("Error uploading images.");
            console.error('Error uploading images:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            className={style.dialog}
            overlayClassName={style.dialogOverlay}
        >
            <h2>Upload Images for Apartment</h2>
            <ToastContainer />
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={HandleFileChange}
            />

            <div className={style.buttonGroup}>
                <button
                    onClick={() => uploadImages(false)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Icon icon={loadingLoop} /> : "Upload More"}
                </button>
                <button
                    onClick={() => uploadImages(true)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Icon icon={loadingLoop} /> : "Done"}
                </button>
                <button onClick={onClose} disabled={isSubmitting}>Cancel</button>
            </div>
        </Modal>
    );
};

export default AddApartmentImageDialog;