import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner/Spinner';
import Cookies from 'js-cookie';

const VerifyPaymentPage = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const reference = queryParams.get('reference');

        const verifyPayment = async () => {
            const token = Cookies.get('EasyRentAuthToken');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post(
                    `https://eazirent-latest.onrender.com/api/v1/paystack/verify/${reference}`,
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

                if (response.status === 201) {
                    toast.success('Payment successful!');
                    setTimeout(() => {
                        navigate(`/apartments/${apartmentId}`);
                    }, 3000);
                } else {
                    toast.error('Payment verification failed.');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                toast.error('Error verifying payment. Please try again.');
                console.error('Error verifying payment:', error);
            } finally {
                setIsLoading(false);
            }
        };

        verifyPayment();
    }, [apartmentId, navigate]);

    return (
        <div className="verify-payment-container">
            <ToastContainer />
            {isLoading ? (
                <div className="loading-container">
                    <h1>Verifying Payment</h1>
                    <p>Please wait while we verify your payment.</p>
                    <Spinner />
                </div>
            ) : (
                <div>
                    <h1>Payment Verification Complete</h1>
                </div>
            )}
        </div>
    );
};

export default VerifyPaymentPage;