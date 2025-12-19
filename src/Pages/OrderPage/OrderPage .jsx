import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AppLoading from "../../Components/Shared/AppLoading";

const OrderPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data } = await axiosSecure.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Order not found.");
        } else {
          setError("Failed to fetch order. Please try again later.");
        }
        console.error("Order fetch failed:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, axiosSecure]);

  if (loading) return <AppLoading />;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p><b>Meal:</b> {order.mealName}</p>
      <p><b>Price:</b> ${order.price}</p>
      <p><b>Quantity:</b> {order.quantity}</p>
      <p><b>Chef:</b> {order.chefName}</p>
      <p><b>Status:</b> {order.orderStatus}</p>
      <p><b>Payment:</b> {order.paymentStatus}</p>
    </div>
  );
};

export default OrderPage;
