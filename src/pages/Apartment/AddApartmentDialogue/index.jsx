import React, {useState} from "react";
import * as Yup from "yup";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Modal from "react-modal";
import style from "../../AddPropertyDialog/index.module.css";
import {Field, Form, Formik} from "formik";
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {useParams} from "react-router-dom";
import API_BASE_URL from "../../../apiConfig";

const AddApartmentDialogue = ({open, onClose}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams()

    const validationSchema = Yup.object().shape({
        price: Yup.number().required("Please enter a valid price"),
        type: Yup.string().oneOf(['ONE_ROOM', 'ROOM_AND_PARLOUR', 'THREE_BEDROOM_FLAT', 'STUDIO',
            'DOUBLE_SHARED_ROOM', 'QUAD_SHARED_ROOM','BOYS_QUARTERS', 'LOFT','MULTIPLE_ROOMS','TWO_BEDROOM_FLAT'])
            .required(),
        rentType: Yup.string().oneOf(['MONTHLY', 'YEARLY', 'HALF_YEARLY']).required(),
        mediaFile: Yup.mixed().required('An image is required'),

    });
    const handleAddApartment = async (values, {resetForm}) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('mediaFile', values.mediaFile);
        formData.append('type', values.type);
        formData.append('price', values.price);
        formData.append('rentType', values.rentType);

        try {
            const token = document.cookie.split('=')[1];
            formData.append('propertyId', id);
            const response = await axios.post(`${API_BASE_URL}/api/v1/apartment/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                toast.success("Apartment added successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                resetForm();
                onClose();
            } else {
                toast.error('Failed to add apartment. Please try again.', {
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
    }
        return (
            <Modal
                isOpen={open}
                onRequestClose={onClose}
                className={style.dialog}
                overlayClassName={style.dialogOverlay}
            >
                <Formik
                    initialValues={{
                        price: '',
                        type: '',
                        rentType: '',
                        number: '',
                        mediaFile: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddApartment}
                >
                    {({ setFieldValue, values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <div>
                                <Field
                                    className={style.holder}
                                    type="number"
                                    name="price"
                                    placeholder="Enter aparment price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.price && touched.price ? 'darkred' : 'inherit'}}
                                />
                                {errors.price && touched.price &&
                                    <div className={style.error}>{errors.price}</div>}
                            </div>

                            <div>
                                <Field
                                    as="select"
                                    className={style.holder}
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.type && touched.type ? 'darkred' : 'inherit'}}
                                >
                                    <option value="" label="Select rent type"/>
                                    <option value="ONE_ROOM" label="ONE ROOM"/>
                                    <option value="ROOM_AND_PARLOUR" label="ROOM AND PARLOUR"/>
                                    <option value="THREE_BEDROOM_FLAT" label="THREE BEDROOM FLAT"/>
                                    <option value="STUDIO" label="STUDIO"/>
                                    <option value="DOUBLE_SHARED_ROOM" label="DOUBLE SHARED ROOM"/>
                                    <option value="QUAD_SHARED_ROOM" label="QUAD_SHARED_ROOM"/>
                                    <option value="BOYS_QUARTERS" label="BOYS QUARTERS"/>
                                    <option value="LOFT" label="LOFT"/>
                                    <option value="MULTIPLE_ROOMS" label="MULTIPLE ROOMS"/>
                                    <option value="TWO_BEDROOM_FLAT" label="TWO BEDROOM FLAT"/>
                                </Field>
                                {errors.type && touched.type &&
                                    <div className={style.error}>{errors.type}</div>}
                            </div>

                            <div>
                                <Field
                                    as="select"
                                    className={style.holder}
                                    name="rentType"
                                    value={values.rentType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.rentType && touched.rentType ? 'darkred' : 'inherit'}}
                                >
                                    <option value="" label="Select rent type"/>
                                    <option value="YEARLY" label="YEARLY"/>
                                    <option value="HALF_YEARLY" label="HALF YEARLY"/>
                                    <option value="MONTHLY" label="MONTHY"/>
                                </Field>
                                {errors.rentType && touched.rentType &&
                                    <div className={style.error}>{errors.rentType}</div>}
                            </div>

                            <div>
                                <Field
                                    className={style.holder}
                                    type="number"
                                    name="number"
                                    placeholder="Enter aparment number"
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{borderColor: errors.number && touched.number ? 'darkred' : 'inherit'}}
                                />
                                {errors.number && touched.number &&
                                    <div className={style.error}>{errors.number}</div>}
                            </div>

                            <div>
                                <input
                                    className={style.holder}
                                    name="mediaFile"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue("mediaFile", event.currentTarget.files[0]);
                                    }}
                                    style={{borderColor: errors.mediaFile && touched.mediaFile ? 'darkred' : 'inherit'}}
                                />
                                {errors.mediaFile && touched.mediaFile &&
                                    <div className={style.error}>{errors.mediaFile}</div>}
                            </div>

                            <div className={style.button}>
                                <button type="submit" className={style.btn}>
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <Icon width={24} height={24} icon={loadingLoop}/>
                                        </div>
                                    ) : (
                                        'Add Apartment'
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <ToastContainer/>
            </Modal>
        );


}
export default AddApartmentDialogue