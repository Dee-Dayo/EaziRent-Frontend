import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner/Spinner';
import Cookies from 'js-cookie';

const VerifyPaymentPage = () => {
    const { apartmentId } = useParams(); // Getting apartmentId from path
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Page loaded with apartmentId:", apartmentId);

        const queryParams = new URLSearchParams(window.location.search);
        const reference = queryParams.get('reference');
        console.log("Reference from query params:", reference);

        const verifyPayment = async () => {
            const token = Cookies.get('EasyRentAuthToken');
            if (!token) {
                console.error("No token found, redirecting to login");
                navigate('/login');
                return;
            }

            try {
                console.log("Verifying payment with reference:", reference);
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
                    console.log("Payment verification successful");
                    setTimeout(() => {
                        navigate(`/apartments/${apartmentId}`);
                    }, 3000);
                } else {
                    console.error("Payment verification failed with status:", response.status);
                    toast.error('Payment verification failed.');
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                toast.error('Error verifying payment. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (reference && apartmentId) {
            verifyPayment();
        } else {
            console.error("Missing reference or apartmentId");
        }
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
