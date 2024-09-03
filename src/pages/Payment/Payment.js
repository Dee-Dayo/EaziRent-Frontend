import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

const PaymentPage = () => {
    const { id: apartmentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentUrl = async () => {
            const token = Cookies.get('EasyRentAuthToken');

            if (!token) {
                navigate('/login');
                return;
            }

            if (!apartmentId) {
                toast.error('Apartment ID is missing.');
                navigate('/');
                return;
            }

            setIsLoading(true);

            try {
                const response = await axios.post(
                    'https://eazirent-latest.onrender.com/api/v1/paystack/pay',
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            apartmentId: apartmentId,
                        },
                    }
                );

                if (response.status === 200) {
                    const paymentData = response.data.data;
                    const paystackResponse = JSON.parse(paymentData);
                    const paymentUrl = paystackResponse.data.authorization_url;

                    if (paymentUrl) {
                        window.location.href = paymentUrl;
                    } else {
                        toast.error('Payment URL could not be retrieved. Please try again later.');
                        setTimeout(() => {
                            navigate('/');
                        }, 3000);
                    }
                } else {
                    toast.error('Failed to initialize payment. Please try again.');
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toast.error('You are not authorized to make this payment.');
                } else {
                    toast.error('Error initiating payment. Try again later.');
                }
                console.error('Error initiating payment:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentUrl();
    }, [apartmentId, navigate]);

    return (
        <div className="payment-page-container">
            <ToastContainer />
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <h1>Complete Your Payment</h1>
                    <p>Please wait while we redirect you to the payment page.</p>
                </>
            )}
        </div>
    );
};

export default PaymentPage;
