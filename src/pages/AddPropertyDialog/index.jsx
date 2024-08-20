import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import style from "./index.module.css";
import { toast, ToastContainer } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { Icon } from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { jwtDecode } from "jwt-decode";

const AddPropertyDialog = ({ open, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        addressNumber: Yup.string().required('Address number is required'),
        street: Yup.string().required('Street is required'),
        area: Yup.string().required('Area is required'),
        state: Yup.string().oneOf(['LAGOS', 'ABUJA', 'DELTA'], 'Invalid state selected').required('State is required'),
        lga: Yup.string().required('LGA is required'),
        noOfApartments: Yup.number().required('Number of apartments is required').min(1),
        type: Yup.string().required('Property type is required'),
        mediaFile: Yup.mixed().required('An image is required'),
    });

    const handleAddProperty = async (values, { resetForm }) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('mediaFile', values.mediaFile);
        formData.append('noOfApartments', values.noOfApartments);
        formData.append('type', values.type);
        formData.append('addressRequest.state', values.state);
        formData.append('addressRequest.number', values.addressNumber);
        formData.append('addressRequest.street', values.street);
        formData.append('addressRequest.area', values.area);
        formData.append('addressRequest.lga', values.lga);

        try {
            const token = document.cookie.split('=')[1]; // Adjust as needed
            const decodedToken = jwtDecode(token);
            const email = decodedToken.principal; // Adjust as per your token payload

            formData.append('email', email); // Add email to form data
            console.log(formData)
            //eazirent-latest.onrender.com
            const response = await axios.post('https://eazirent-latest.onrender.com/api/v1/property/add', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response)
            if (response.status === 201) {
                toast.success("Property added successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                resetForm();
                onClose();
            } else {
                toast.error('Failed to add property. Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            className={style.dialog}
            overlayClassName={style.dialogOverlay}
        >
            <Formik
                initialValues={{
                    addressNumber: '',
                    street: '',
                    area: '',
                    state: '',
                    lga: '',
                    noOfApartments: '',
                    type: '',
                    mediaFile: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddProperty}
            >
                {({ setFieldValue, values, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="addressNumber"
                                placeholder="Enter address number"
                                value={values.addressNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.addressNumber && touched.addressNumber ? 'darkred' : 'inherit' }}
                            />
                            {errors.addressNumber && touched.addressNumber &&
                                <div className={style.error}>{errors.addressNumber}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="street"
                                placeholder="Enter street"
                                value={values.street}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.street && touched.street ? 'darkred' : 'inherit' }}
                            />
                            {errors.street && touched.street &&
                                <div className={style.error}>{errors.street}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="area"
                                placeholder="Enter area"
                                value={values.area}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.area && touched.area ? 'darkred' : 'inherit' }}
                            />
                            {errors.area && touched.area &&
                                <div className={style.error}>{errors.area}</div>}
                        </div>

                        <div>
                            <Field
                                as="select"
                                className={style.holder}
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.state && touched.state ? 'darkred' : 'inherit' }}
                            >
                                <option value="" label="Select state" />
                                <option value="LAGOS" label="Lagos" />
                            </Field>
                            {errors.state && touched.state &&
                                <div className={style.error}>{errors.state}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="lga"
                                placeholder="Enter LGA"
                                value={values.lga}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.lga && touched.lga ? 'darkred' : 'inherit' }}
                            />
                            {errors.lga && touched.lga &&
                                <div className={style.error}>{errors.lga}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="number"
                                name="noOfApartments"
                                placeholder="Number of Apartments"
                                value={values.noOfApartments}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.noOfApartments && touched.noOfApartments ? 'darkred' : 'inherit' }}
                            />
                            {errors.noOfApartments && touched.noOfApartments &&
                                <div className={style.error}>{errors.noOfApartments}</div>}
                        </div>

                        <div>
                            <Field
                                as="select"
                                className={style.holder}
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.type && touched.type ? 'darkred' : 'inherit' }}
                            >
                                <option value="" label="Select type" />
                                <option value="HOSTEL" label="Hostel" />
                                <option value="DUPLEX" label="Duplex" />
                                <option value="BUNGALOW" label="Bungalow" />
                                <option value="CONDO" label="Condo" />
                            </Field>
                            {errors.type && touched.type &&
                                <div className={style.error}>{errors.type}</div>}
                        </div>

                        <div>
                            <input
                                className={style.holder}
                                name="mediaFile"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("mediaFile", event.currentTarget.files[0]);
                                }}
                                style={{ borderColor: errors.mediaFile && touched.mediaFile ? 'darkred' : 'inherit' }}
                            />
                            {errors.mediaFile && touched.mediaFile &&
                                <div className={style.error}>{errors.mediaFile}</div>}
                        </div>

                        <div className={style.button}>
                            <button type="submit" className={style.btn}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Icon width={24} height={24} icon={loadingLoop} />
                                    </div>
                                ) : (
                                    'Add Property'
                                )}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer />
        </Modal>
    );
};

export default AddPropertyDialog;
