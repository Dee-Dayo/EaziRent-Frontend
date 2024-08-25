import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import { Icon } from "@iconify/react";
import { jwtDecode } from "jwt-decode";
import style from "./index.module.css";

const AddApartmentImageDialog = ({ open, onClose, apartmentId }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = document.cookie.split('=')[1];
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.principal;

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);

        await uploadImages(files);
    };

    const uploadImages = async (files) => {
        setIsSubmitting(true);
        const formData = new FormData();
        files.forEach((file) => formData.append("mediaFiles", file));
        formData.append("email", userEmail);

        try {
            const response = await axios.post(
                `https://eazirent-latest.onrender.com/api/v1/apartment/upload-media/${apartmentId}`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            toast.success("Images uploaded successfully!");
            setImageFiles([]); // Reset state after upload
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error("You are not authorized to upload images.");
            } else {
                toast.error("Error uploading images.");
            }
            console.error("Error uploading images:", error);
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
                onChange={handleFileChange}
            />

            {isSubmitting && <Icon icon={loadingLoop} />}
            <div className={style.buttonGroup}>
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Done
                </button>
                <button
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default AddApartmentImageDialog;
