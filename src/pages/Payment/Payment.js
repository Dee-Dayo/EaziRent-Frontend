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
            const paystackResponse = JSON.parse(paymentData.data);
            const paymentUrl = paystackResponse.data.authorization_url;

            if (paymentUrl) {
                setPaymentUrl(paymentUrl);
            } else {
                toast.error('Payment initialization failed.');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            toast.error('Payment initialization failed. Try again later.');
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
                    {paymentUrl ? (
                        <FilledButton name="Proceed to Payment" onClick={handleRedirect} />
                    ) : (
                        <p>Payment could not be initiated. Please try again later.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default PaymentPage;
