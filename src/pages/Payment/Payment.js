import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import FilledButton from '../../components/FilledButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';

const PaymentPage = () => {
    const { id: apartmentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentUrl = async () => {
            const token = Cookies.get('EasyRentAuthToken');

            if (!token) {
                navigate('/login');
                return;
            }

            setIsLoading(true);

            try {
                const response = await axios.post(
                    'https://eazirent-latest.onrender.com/api/v1/paystack/pay',
                    { apartmentId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const paymentData = response.data;
                // if (paymentData.status) {
                //     setPaymentUrl(paymentData.data.authorization_url);
                // } else {
                //     toast.error('Payment functionality is not yet implemented. Redirecting to homepage...');
                //     setTimeout(() => {
                //         navigate('/');
                //     }, 3000);
                // }
            } catch (error) {
                toast.error('Payment functionality is not yet implemented. Try again later');
                console.error('Error initiating payment:', error);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentUrl();
    }, [apartmentId, navigate]);

    const handleRedirect = () => {
        if (paymentUrl) {
            window.location.href = paymentUrl;
        }
    };

    return (
        <div className="payment-page-container">
            <ToastContainer />
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <h1>Complete Your Payment</h1>
                    <p>Please click the button below to proceed with the payment.</p>
                    <FilledButton name="Proceed to Payment" onClick={handleRedirect} />
                </>
            )}
        </div>
    );
};

export default PaymentPage;
