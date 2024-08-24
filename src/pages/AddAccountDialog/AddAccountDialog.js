import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Field, Form, Formik } from "formik";
import Modal from 'react-modal';
import { Icon } from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import style from "./index.module.css";

const AddAccountDialog = ({ open, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');

    // Fetch bank list when the component mounts
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await axios.get('https://eazirent-latest.onrender.com/api/v1/paystack/banks');
                setBankList(response.data.data); // Adjust according to the API response structure
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };

        fetchBanks();
    }, []);

    const fetchAssociatedBanks = async (accountNumber) => {
        try {
            // Call your API to get the bank details based on the account number
            const response = await axios.get(`https://your-api-endpoint.com/resolve-bank?account_number=${accountNumber}`);
            // Update your bankList based on the response
            setBankList(response.data.data);
        } catch (error) {
            console.error('Error fetching associated banks:', error);
        }
    };

    const handleAccountNumberChange = (e, setFieldValue) => {
        const { value } = e.target;
        setAccountNumber(value);
        setFieldValue("accountNumber", value);
        // Fetch associated banks when account number changes
        if (value.length >= 10) { // Adjust length as needed
            fetchAssociatedBanks(value);
        }
    };

    const validationSchema = Yup.object().shape({
        accountNumber: Yup.string().required('Account number is required'),
        accountName: Yup.string().required('Account name is required'),
        bankName: Yup.string().required('Bank name is required'),
    });

    const handleAddAccountDetails = async (values, { resetForm }) => {
        setIsLoading(true);

        try {
            const token = document.cookie.split('=')[1]; // Adjust as needed
            const response = await axios.post('https://eazirent-latest.onrender.com/add-account-details', values, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                toast.success("Account details added successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                });
                resetForm();
                onClose();
            } else {
                toast.error('Failed to add account details. Please try again.', {
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
                    accountNumber: '',
                    accountName: '',
                    bankName: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddAccountDetails}
            >
                {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="accountNumber"
                                placeholder="Enter account number"
                                value={values.accountNumber}
                                onChange={(e) => handleAccountNumberChange(e, setFieldValue)}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.accountNumber && touched.accountNumber ? 'darkred' : 'inherit' }}
                            />
                            {errors.accountNumber && touched.accountNumber &&
                                <div className={style.error}>{errors.accountNumber}</div>}
                        </div>

                        <div>
                            <Field
                                className={style.holder}
                                type="text"
                                name="accountName"
                                placeholder="Enter account name"
                                value={values.accountName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.accountName && touched.accountName ? 'darkred' : 'inherit' }}
                            />
                            {errors.accountName && touched.accountName &&
                                <div className={style.error}>{errors.accountName}</div>}
                        </div>

                        <div>
                            <Field
                                as="select"
                                className={style.holder}
                                name="bankName"
                                value={values.bankName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ borderColor: errors.bankName && touched.bankName ? 'darkred' : 'inherit' }}
                            >
                                <option value="" label="Select bank" />
                                {bankList.map((bank) => (
                                    <option key={bank.code} value={bank.name}>
                                        {bank.name}
                                    </option>
                                ))}
                            </Field>
                            {errors.bankName && touched.bankName &&
                                <div className={style.error}>{errors.bankName}</div>}
                        </div>

                        <div className={style.button}>
                            <button type="submit" className={style.btn}>
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Icon width={24} height={24} icon={loadingLoop} />
                                    </div>
                                ) : (
                                    'Add Account Details'
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

export default AddAccountDialog;
