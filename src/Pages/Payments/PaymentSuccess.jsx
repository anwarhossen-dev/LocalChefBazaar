


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { IoBagCheckOutline } from 'react-icons/io5';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment-success`, {
          params: { sessionId }, // <-- pass sessionId correctly
        });
        console.log('Payment verified:', res.data);
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Could not verify payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return <p className="text-center mt-10">Verifying your payment...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        {error ? (
          <p className="text-red-500 mb-6">{error}</p>
        ) : (
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
        )}
        <Link
          to="/my-orders"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;


