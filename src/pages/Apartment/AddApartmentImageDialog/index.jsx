import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import { Icon } from "@iconify/react";
import {jwtDecode} from "jwt-decode";
import style from "./index.module.css";

const AddApartmentImageDialog = ({ open, onClose, apartmentId }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = document.cookie.split("=")[1];
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.principal;

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleUpload = async () => {
        if (imageFiles.length === 0) {
            toast.warn("Please select at least one image to upload.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("mediaFiles", file));
        formData.append("email", userEmail);

        try {
            const response = await axios.post(
                `https://eazirent-latest.onrender.com/api/v1/apartment/upload-media/${apartmentId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            toast.success("Images uploaded successfully!");
            setImageFiles([]); // Reset state after upload
            onClose(); // Close the dialog after successful upload
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
                disabled={isSubmitting}
            />
            {isSubmitting && <Icon icon={loadingLoop} className={style.loadingIcon} />}

            <div className={style.buttonGroup}>
                <button
                    onClick={handleUpload}
                    disabled={isSubmitting || imageFiles.length === 0}
                >
                    {isSubmitting ? "Uploading..." : "Upload"}
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
