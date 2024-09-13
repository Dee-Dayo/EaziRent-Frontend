import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import { Icon } from "@iconify/react";
import {jwtDecode} from "jwt-decode";
import style from "./index.module.css";
import API_BASE_URL from "../../../apiConfig";

const AddApartmentImageDialog = ({ open, onClose, apartmentId }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = document.cookie.split('=')[1];
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleDoneClick = async () => {
        if (imageFiles.length === 0) {
            toast.error("Please select images to upload.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("mediaFiles", file));
        formData.append("id", apartmentId);
        formData.append("email", userEmail);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/apartment/upload-media`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Images uploaded successfully!");
            setImageFiles([]);
            onClose();
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

            {imageFiles.length > 0 && (
                <div>
                    <div>
                        {imageFiles.map((file, index) => (
                            <div key={index} className={style.fileName}>
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isSubmitting && <Icon icon={loadingLoop} />}
            <div className={style.buttonGroup}>
                <button
                    onClick={handleDoneClick}
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
