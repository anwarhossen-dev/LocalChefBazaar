// import React from 'react';
// import { Helmet } from 'react-helmet';
// //import { Helmet } from 'react-helmet';

// const PaymentCancelled = () => {
//     return (
//         <div>
//             <Helmet>
//                 <title>Payment Cancelled</title>
//             </Helmet>
//             <h2 className="text4xl">Payment Canceled</h2>
//         </div>
//     );
// };

// export default PaymentCancelled;

import React from "react";
import { Helmet } from "react-helmet";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Helmet>
        <title>Payment Cancelled</title>
      </Helmet>

      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard/my-orders"
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
