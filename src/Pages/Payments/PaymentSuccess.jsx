

// // import axios from 'axios';
// // import React, { useEffect } from 'react';
// // import { Link, useSearchParams } from 'react-router';
// // import { IoBagCheckOutline } from 'react-icons/io5'

// // const PaymentSuccess = () => {

// //       const [searchParams] = useSearchParams()
// //   const sessionId = searchParams.get('session_id')
// //   useEffect(() => {
// //     if (sessionId) {
// //       axios.get(`${import.meta.env.VITE_API_URL}/payment-success`, {
// //         sessionId,
// //       })
// //     }
// //   }, [sessionId])
// //     return (
// //        <div className='flex flex-col items-center justify-center'>
// //       <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
// //         <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
// //         <h1 className='text-3xl font-bold text-gray-800 mb-2'>
// //           Payment Successful!
// //         </h1>
// //         <p className='text-gray-600 mb-6'>
// //           Thank you for your purchase. Your order is being processed.
// //         </p>
// //         <Link
// //           to='/dashboard/my-orders'
// //           className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
// //         >
// //           Go to My Orders
// //         </Link>
// //       </div>
// //     </div>
// //     );
// // };

// // export default PaymentSuccess;



// import axios from 'axios'
// import React, { useEffect, useRef } from 'react'
// import { Link, useSearchParams } from 'react-router'
// import { IoBagCheckOutline } from 'react-icons/io5'

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams()
  
//   const sessionId = searchParams.get('session_id')
  
// const called = useRef(false)

//   useEffect(() => {
//   if (!sessionId || called.current) return
//   called.current = true

//   axios.get(`${import.meta.env.VITE_API_URL}/payment-success`, {
//     params: { session_id: sessionId },
//   }).catch(console.error)
// }, [sessionId])

//   return (
//     <div className='flex flex-col items-center justify-center'>
//       <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
//         <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
//         <h1 className='text-3xl font-bold text-gray-800 mb-2'>
//           Payment Successful!
//         </h1>
//         <p className='text-gray-600 mb-6'>
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <Link
//           to='/dashboard/my-orders'
//           className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
//         >
//           Go to My Orders
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default PaymentSuccess


import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
//import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    console.log(sessionId) 
    useEffect(()=> {
        let ignore = false;
        if(sessionId && !ignore){
            axiosSecure.patch(`/order-payment-success?session_id=${sessionId}`)
        }
        return () => {ignore = true}
    }, [sessionId, axiosSecure])

    const handleGoBack = () => {
        navigate("/dashboard/myOrders");
    }
    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold">Payment Successful</h1>
            <p>We have received your payment</p>
            <button onClick={handleGoBack} className="btn btn-outline btn-primary mt-4">
                Go Back to My Orders
            </button>
        </div>
    );
};

export default PaymentSuccess;