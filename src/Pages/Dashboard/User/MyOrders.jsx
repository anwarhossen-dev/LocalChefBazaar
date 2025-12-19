
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppLoading from "../../../Components/Shared/AppLoading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaApplePay } from "react-icons/fa";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch orders for the current user
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/by-user/${user.email}`);
      return res.data;
    },
  });

  // Payment handler
  const handlePayment = async (order) => {
    if (!order?._id) return;

    try {
      const res = await axiosSecure.post("/order-payment-checkout", {
        orderId: order._id,
        price: Number(order.price),
        quantity: Number(order.quantity),
        mealName: order.mealName,
        userEmail: order.userEmail, // must match backend
      });

      if (res?.data?.url) {
        // Redirect to Stripe checkout
        window.location.assign(res.data.url);
      } else {
        Swal.fire("Payment Error", "Unable to start payment.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Payment Error", err?.response?.data?.message || "Try again.", "error");
    }
  };

  // Cancel/Delete handler
  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel it",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/orders/${orderId}`);
        if (res.data?.deletedCount || res.status === 200) {
          Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
          refetch();
        } else {
          Swal.fire("Error!", "Could not cancel the order.", "error");
        }
      } catch (error) {
        console.error("Cancel order error:", error);
        Swal.fire("Error!", "Could not cancel the order.", "error");
      }
    }
  };

  if (isLoading) return <AppLoading />;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">My Orders: {orders.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Food Name</th>
              <th>Order Status</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Order Time</th>
              <th>Chef</th>
              <th>Chef ID</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const canPay = order.paymentStatus === "pending";
              const canCancel =
                order.orderStatus !== "delivered" && order.paymentStatus !== "paid";

              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.mealName}</td>
                  <td>
                    <span className="badge badge-info">{order.orderStatus}</span>
                  </td>
                  <td>${order.price}</td>
                  <td>{order.quantity}</td>
                  <td>{new Date(order.orderTime).toLocaleDateString()}</td>
                  <td>{order.chefName}</td>
                  <td>{order.chefId}</td>
                  <td>
                    {order.paymentStatus === "paid" ? (
                      <span className="badge bg-green-500 text-white">Paid</span>
                    ) : (
                      <span className="badge bg-orange-400 text-black">Pending</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    {canPay && (
                      <button
                        onClick={() => handlePayment(order)}
                        className="btn btn-sm btn-warning flex items-center gap-1"
                      >
                        <FaApplePay /> Pay
                      </button>
                    )}
                    <Link
                      to={`/OrderPage/${order._id}`}
                      className="btn btn-sm btn-info flex items-center justify-center"
                    >
                      <FaEye />
                    </Link>
                    {canCancel && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center mt-10">You have not placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
