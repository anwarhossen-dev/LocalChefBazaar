


// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import AppLoading from "../../../Components/Shared/AppLoading";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { FaEye, FaTrash, FaApplePay } from "react-icons/fa";

// const MyOrders = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: orders = [], isLoading, refetch } = useQuery({
//         queryKey: ["myOrders", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/orders/by-user/${user.email}`);
//             return res.data;
//         },
//     });

//     // Payment
//     const handlePayment = async (order) => {
//         const result = await Swal.fire({
//             title: `Pay $${order.price}?`,
//             html: `<p>Meal: <strong>${order.mealName}</strong></p>
//              <p>Quantity: ${order.quantity}</p>
//              <p>Chef: ${order.chefName}</p>`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Pay with Apple Pay",
//             cancelButtonText: "Cancel",
//         });

//         if (result.isConfirmed) {
//             try {
//                 const res = await axiosSecure.post("/order-payment-checkout", {
//                     orderId: order._id,
//                     price: order.price,
//                     quantity: order.quantity,
//                     mealName: order.mealName,
//                     userEmail: order.userEmail,
//                 });
//                 window.location.assign(res.data.url);
//             } catch (error) {
//                 console.error(error);
//                 Swal.fire({
//                     icon: "error",
//                     title: "Payment Failed",
//                     text: "Could not start payment. Try again.",
//                 });
//             }
//         }
//     };

//     // Cancel/Delete
//     const handleCancel = async (orderId) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to cancel this order?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, Delete it",
//             cancelButtonText: "No",
//         });

//         if (result.isConfirmed) {
//             try {
//                 const res = await axiosSecure.delete(`/orders/${orderId}`);
//                 if (res.data?.deletedCount || res.status === 200) {
//                     Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
//                     refetch();
//                 } else {
//                     Swal.fire("Error!", "Could not cancel the order.", "error");
//                 }
//             } catch (error) {
//                 console.error("Cancel order error:", error);
//                 Swal.fire("Error!", "Could not cancel the order.", "error");
//             }
//         }
//     };

//     if (isLoading) return <AppLoading />;

//     return (
//         <div className="p-5">
//             <h1 className="text-3xl font-bold mb-6">My Orders: {orders.length}</h1>

//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     <thead>
//                         <tr>
//                             <th>Sl No</th>
//                             <th>Food Name</th>
//                             <th>Order Status</th>
//                             <th>Price</th>
//                             <th>Quantity</th>
//                             <th>Delivery Time</th>
//                             <th>Chef Name</th>
//                             <th>Chef Id</th>
//                             <th>Payment Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order, index) => {
//                             const canPay =
//                                 order.orderStatus === "accepted" &&
//                                 order.paymentStatus === "pending";
//                             const canCancel =
//                                 order.orderStatus !== "delivered" &&
//                                 order.paymentStatus !== "paid";

//                             return (
//                                 <tr key={order._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{order.mealName}</td>
//                                     <td>
//                                         <span className="badge badge-info">{order.orderStatus}</span>
//                                     </td>
//                                     <td>${order.price}</td>
//                                     <td>{order.quantity}</td>
//                                     <td>{new Date(order.orderTime).toLocaleDateString()}</td>
//                                     <td>{order.chefName}</td>
//                                     <td>{order.chefId}</td>
//                                     <td>
//                                         {order.paymentStatus === "paid" ? (
//                                             <span className="badge bg-green-500 text-white">Paid</span>
//                                         ) : (
//                                             <span className="badge bg-orange-400 text-black">Pending</span>
//                                         )}
//                                     </td>
//                                     <td className="flex gap-2">
//                                         {canPay && (
//                                             <button
//                                                 onClick={() => handlePayment(order)}
//                                                 className="btn btn-sm btn-warning text-black flex items-center gap-1"
//                                             >
//                                                 <FaApplePay /> Pay
//                                             </button>
//                                         )}
//                                         <Link
//                                             to={`/order/${order._id}`}
//                                             className="btn btn-sm btn-info text-white"
//                                         >
//                                             <FaEye />
//                                         </Link>
//                                         {canCancel && (
//                                             <button
//                                                 onClick={() => handleCancel(order._id)}
//                                                 className="btn btn-sm btn-error text-white"
//                                             >
//                                                 <FaTrash />
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>

//                 {orders.length === 0 && (
//                     <p className="text-center mt-10 text-gray-500">
//                         You have not placed any orders yet.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;



// // MyOrders.jsx
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import AppLoading from "../../../Components/Shared/AppLoading";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { FaEye, FaTrash, FaApplePay } from "react-icons/fa";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders/by-user/${user.email}`);
//       return res.data;
//     },
//   });

//   // Payment
//   const handlePayment = async (order) => {
//     const result = await Swal.fire({
//       title: `Pay $${order.price}?`,
//       html: `<p>Meal: <strong>${order.mealName}</strong></p>
//              <p>Quantity: ${order.quantity}</p>
//              <p>Chef: ${order.chefName}</p>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Pay with Apple Pay",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.post("/order-payment-checkout", {
//           orderId: order._id,
//           price: order.price,
//           quantity: order.quantity,
//           mealName: order.mealName,
//           userEmail: order.userEmail,
//         });
//         // Redirect to Stripe checkout
//         window.location.assign(res.data.url);
//       } catch (error) {
//         console.error(error);
//         Swal.fire("Payment Failed", "Could not start payment. Try again.", "error");
//       }
//     }
//   };

//   // Cancel/Delete
//   const handleCancel = async (orderId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to cancel this order?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete it",
//       cancelButtonText: "No",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/orders/${orderId}`);
//         if (res.data?.deletedCount || res.status === 200) {
//           Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
//           refetch();
//         } else {
//           Swal.fire("Error!", "Could not cancel the order.", "error");
//         }
//       } catch (error) {
//         console.error("Cancel order error:", error);
//         Swal.fire("Error!", "Could not cancel the order.", "error");
//       }
//     }
//   };

//   if (isLoading) return <AppLoading />;

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-6">My Orders: {orders.length}</h1>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>Sl</th>
//               <th>Food Name</th>
//               <th>Order Status</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Order Time</th>
//               <th>Chef</th>
//               <th>Chef ID</th>
//               <th>Payment</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => {
//               // Show Pay button whenever payment is pending
//               const canPay = order.paymentStatus === "pending";
//               const canCancel = order.orderStatus !== "delivered" && order.paymentStatus !== "paid";

//               return (
//                 <tr key={order._id}>
//                   <td>{index + 1}</td>
//                   <td>{order.mealName}</td>
//                   <td>
//                     <span className="badge badge-info">{order.orderStatus}</span>
//                   </td>
//                   <td>${order.price}</td>
//                   <td>{order.quantity}</td>
//                   <td>{new Date(order.orderTime).toLocaleDateString()}</td>
//                   <td>{order.chefName}</td>
//                   <td>{order.chefId}</td>
//                   <td>
//                     {order.paymentStatus === "paid" ? (
//                       <span className="badge bg-green-500 text-white">Paid</span>
//                     ) : (
//                       <span className="badge bg-orange-400 text-black">Pending</span>
//                     )}
//                   </td>
//                   <td className="flex gap-2">
//                     {canPay && (
//                       <button
//                         onClick={() => handlePayment(order)}
//                         className="btn btn-sm btn-warning flex items-center gap-1"
//                       >
//                         <FaApplePay /> Pay
//                       </button>
//                     )}
//                     <Link to={`/order/${order._id}`} className="btn btn-sm btn-info">
//                       <FaEye />
//                     </Link>
//                     {canCancel && (
//                       <button onClick={() => handleCancel(order._id)} className="btn btn-sm btn-error">
//                         <FaTrash />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {orders.length === 0 && <p className="text-center mt-10">You have not placed any orders yet.</p>}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import AppLoading from "../../../Components/Shared/AppLoading";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { FaEye, FaTrash, FaApplePay } from "react-icons/fa";
// import OrderPage from "../../OrderPage/OrderPage ";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // Fetch orders
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders/by-user/${user.email}`);
//       return res.data;
//     },
//   });

//   // Payment handler
//   const handlePayment = async (order) => {
//     if (!order?._id || !order.price || !order.quantity || !order.mealName || !order.userEmail) {
//       Swal.fire("Invalid Order", "Order data is incomplete.", "error");
//       return;
//     }

//     const totalAmount = order.price * order.quantity; // total price

//     const result = await Swal.fire({
//       title: `Pay $${totalAmount}?`,
//       html: `<p>Meal: <strong>${order.mealName}</strong></p>
//              <p>Quantity: ${order.quantity}</p>
//              <p>Chef: ${order.chefName}</p>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Pay with Apple Pay",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         // Validate payload before sending
//         const payload = {
//           orderId: order._id,
//           price: Number(order.price),       // make sure price is number
//           quantity: Number(order.quantity), // make sure quantity is number
//           mealName: order.mealName,
//           email: order.userEmail,           // match backend expected field
//         };

//         console.log("Payment Payload:", payload);

//         const res = await axiosSecure.post("/order-payment-checkout", payload);

//         if (res?.data?.url) {
//           // Redirect to Stripe checkout
//           window.location.assign(res.data.url);
//         } else {
//           Swal.fire("Payment Error", "No checkout URL returned.", "error");
//         }
//       } catch (error) {
//         console.error("Payment error:", error);
//         Swal.fire(
//           "Payment Failed",
//           error?.response?.data?.message || "Could not start payment. Try again.",
//           "error"
//         );
//       }
//     }
//   };

//   // Cancel/Delete
//   const handleCancel = async (orderId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to cancel this order?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete it",
//       cancelButtonText: "No",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/orders/${orderId}`);
//         if (res.data?.deletedCount || res.status === 200) {
//           Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
//           refetch();
//         } else {
//           Swal.fire("Error!", "Could not cancel the order.", "error");
//         }
//       } catch (error) {
//         console.error("Cancel order error:", error);
//         Swal.fire("Error!", "Could not cancel the order.", "error");
//       }
//     }
//   };

//   if (isLoading) return <AppLoading />;

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-6">My Orders: {orders.length}</h1>
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>Sl</th>
//               <th>Food Name</th>
//               <th>Order Status</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Order Time</th>
//               <th>Chef</th>
//               <th>Chef ID</th>
//               <th>Payment</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => {
//               const canPay = order.paymentStatus === "pending";
//               const canCancel =
//                 order.orderStatus !== "delivered" && order.paymentStatus !== "paid";

//               return (
//                 <tr key={order._id}>
//                   <td>{index + 1}</td>
//                   <td>{order.mealName}</td>
//                   <td>
//                     <span className="badge badge-info">{order.orderStatus}</span>
//                   </td>
//                   <td>${order.price}</td>
//                   <td>{order.quantity}</td>
//                   <td>{new Date(order.orderTime).toLocaleDateString()}</td>
//                   <td>{order.chefName}</td>
//                   <td>{order.chefId}</td>
//                   <td>
//                     {order.paymentStatus === "paid" ? (
//                       <span className="badge bg-green-500 text-white">Paid</span>
//                     ) : (
//                       <span className="badge bg-orange-400 text-black">Pending</span>
//                     )}
//                   </td>
//                   <td className="flex gap-2">
//                     {canPay && (
//                       <button
//                         onClick={() => handlePayment(order)}
//                         className="btn btn-sm btn-warning flex items-center gap-1"
//                       >
//                         <FaApplePay /> Pay
//                       </button>
//                     )}
//                     <Link
//                       to={`/orderPage/${OrderPage._id}`}
//                       className="btn btn-sm btn-info flex items-center justify-center"
//                     >
//                       <FaEye />
//                     </Link>
//                     {canCancel && (
//                       <button
//                         onClick={() => handleCancel(order._id)}
//                         className="btn btn-sm btn-error"
//                       >
//                         <FaTrash />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         {orders.length === 0 && (
//           <p className="text-center mt-10">You have not placed any orders yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;


// src/Pages/Dashboard/MyOrders/MyOrders.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaTrash, FaApplePay } from "react-icons/fa";

import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppLoading from "../../../Components/Shared/AppLoading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ================= FETCH ORDERS =================
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/by-user/${user.email}`
      );
      return res.data;
    },
  });

  // ================= PAYMENT =================
  const handlePayment = async (order) => {
    if (!order?._id) {
      Swal.fire("Error", "Invalid order", "error");
      return;
    }

    const totalAmount = Number(order.price) * Number(order.quantity);

    const confirm = await Swal.fire({
      title: `Pay $${totalAmount}?`,
      html: `
        <p><strong>${order.mealName}</strong></p>
        <p>Quantity: ${order.quantity}</p>
        <p>Chef: ${order.chefName}</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
    });

    if (!confirm.isConfirmed) return;

    try {
      const payload = {
        orderId: order._id,
        price: Number(order.price),
        quantity: Number(order.quantity),
        mealName: order.mealName,
        email: order.userEmail,
      };

      const res = await axiosSecure.post(
        "/order-payment-checkout",
        payload
      );

      if (res?.data?.url) {
        window.location.href = res.data.url;
      } else {
        Swal.fire("Error", "No payment URL returned", "error");
      }
    } catch (err) {
      Swal.fire(
        "Payment Failed",
        err?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  // ================= CANCEL =================
  const handleCancel = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/orders/${orderId}`);
      Swal.fire("Cancelled", "Order cancelled successfully", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  };

  if (isLoading) return <AppLoading />;

  // ================= UI =================
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">
        My Orders ({orders.length})
      </h1>

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
                order.paymentStatus !== "paid" &&
                order.orderStatus !== "delivered";

              return (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.mealName}</td>
                  <td>
                    <span className="badge badge-info">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>${order.price}</td>
                  <td>{order.quantity}</td>
                  <td>
                    {new Date(order.orderTime).toLocaleDateString()}
                  </td>
                  <td>{order.chefName}</td>
                  <td>
                    {order.paymentStatus === "paid" ? (
                      <span className="badge bg-green-500 text-white">
                        Paid
                      </span>
                    ) : (
                      <span className="badge bg-orange-400 text-black">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="flex gap-2">
                    {canPay && (
                      <button
                        onClick={() => handlePayment(order)}
                        className="btn btn-sm btn-warning"
                      >
                        <FaApplePay /> Pay
                      </button>
                    )}

                    <Link
                      to={`/orderPage/${order._id}`}
                      className="btn btn-sm btn-info"
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
          <p className="text-center mt-10 text-gray-500">
            You have no orders yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
