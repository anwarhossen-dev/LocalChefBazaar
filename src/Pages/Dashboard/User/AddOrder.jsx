// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";
// import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';


const AddOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/orders/user/${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handlePayment = async (order) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-order-payment`,
        {
          orderId: order._id,
          mealName: order.mealName,
          price: order.price * order.quantity,
          userEmail: order.userEmail,
        }
      );

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment redirect error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200"
            >
              <h2 className="text-xl font-bold">{order.mealName}</h2>

              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>

              <p><strong>Price:</strong> ${order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>

              <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

              <p><strong>Chef:</strong> {order.chefName}</p>
              <p><strong>Chef ID:</strong> {order.chefId}</p>

              {/* Show Pay button only if accepted AND payment pending */}
              {order.orderStatus === "accepted" &&
                order.paymentStatus === "pending" && (
                  <button
                    onClick={() => handlePayment(order)}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                  >
                    Pay Now
                  </button>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default AddOrder;
