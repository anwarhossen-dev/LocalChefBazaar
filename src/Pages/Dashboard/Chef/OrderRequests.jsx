

import React from 'react';
//import useAuth from '../../../Hooks/useAuth';
//import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const OrderRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const chefEmail = user?.email;

    // Fetch chef orders
    const { data: orders = [], refetch } = useQuery({
        queryKey: ["chefOrders", chefEmail],
        enabled: !!chefEmail, // only fetch when chefEmail exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/by-chef/${chefEmail}`);
            return res.data;
        },
    });

    // Update order status
    const updateOrderStatus = async (id, status) => {
        try {
            const res = await axiosSecure.patch(`/orders/update/${id}`, { status });
            if (res.data.success) {
                Swal.fire("Success", `Order ${status}`, "success");
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", error);
        }
    };

    return (
        <div className="overflow-x-auto p-4">
            <Helmet>
                <title>Order Requests</title>
            </Helmet>

            <h2 className="text-2xl font-semibold mb-4">Order Requests</h2>

            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Order Status</th>
                        <th>User Email</th>
                        <th>Order Time</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        const isStatus = (status) => order.orderStatus === status;

                        return (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.mealName}</td>
                                <td>${order.price}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <span className={`badge ${isStatus("pending") ? "bg-blue-400" : isStatus("accepted") ? "bg-green-400" : isStatus("cancelled") ? "bg-red-400" : "bg-yellow-400"} text-black`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td>{order.userEmail}</td>
                                <td>{new Date(order.orderTime).toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${order.paymentStatus === "paid" ? "bg-green-400" : "bg-gray-300"} text-black`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex gap-2 flex-wrap">
                                        {/* Cancel */}
                                        <button
                                            className={`btn btn-sm ${isStatus("pending") ? "bg-red-500 text-white" : "btn-disabled"}`}
                                            disabled={!isStatus("pending")}
                                            onClick={() => updateOrderStatus(order._id, "cancelled")}
                                        >
                                            Cancel
                                        </button>

                                        {/* Accept */}
                                        <button
                                            className={`btn btn-sm ${isStatus("pending") ? "bg-green-500 text-white" : "btn-disabled"}`}
                                            disabled={!isStatus("pending")}
                                            onClick={() => updateOrderStatus(order._id, "accepted")}
                                        >
                                            Accept
                                        </button>

                                        {/* Deliver */}
                                        <button
                                            className={`btn btn-sm ${isStatus("accepted") ? "bg-yellow-500 text-black" : "btn-disabled"}`}
                                            disabled={!isStatus("accepted")}
                                            onClick={() => updateOrderStatus(order._id, "delivered")}
                                        >
                                            Deliver
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {orders.length === 0 && (
                <p className="text-center mt-4 text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default OrderRequests;


// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { Helmet } from 'react-helmet';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const OrderRequests = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const chefEmail = user?.email;

//     // 🔹 Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     // Fetch chef orders
//     const { data: orders = [], refetch } = useQuery({
//         queryKey: ["chefOrders", chefEmail],
//         enabled: !!chefEmail,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/orders/by-chef/${chefEmail}`);
//             return res.data;
//         },
//     });

//     // 🔹 Pagination calculations
//     const totalPages = Math.ceil(orders.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

//     // Update order status
//     const updateOrderStatus = async (id, status) => {
//         try {
//             const res = await axiosSecure.patch(`/orders/update/${id}`, { status });
//             if (res.data.success) {
//                 Swal.fire("Success", `Order ${status}`, "success");
//                 refetch();
//             }
//         } catch (error) {
//             Swal.fire("Error", "Something went wrong", "error");
//         }
//     };

//     return (
//         <div className="overflow-x-auto p-4">
//             <Helmet>
//                 <title>Order Requests</title>
//             </Helmet>

//             <h2 className="text-2xl font-semibold mb-4">Order Requests</h2>

//             <table className="table table-zebra w-full">
//                 <thead>
//                     <tr>
//                         <th>Sl No</th>
//                         <th>Food Name</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Order Status</th>
//                         <th>User Email</th>
//                         <th>Order Time</th>
//                         <th>Payment Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentOrders.map((order, index) => {
//                         const isStatus = (status) => order.orderStatus === status;

//                         return (
//                             <tr key={order._id}>
//                                 <th>{startIndex + index + 1}</th>
//                                 <td>{order.mealName}</td>
//                                 <td>${order.price}</td>
//                                 <td>{order.quantity}</td>
//                                 <td>
//                                     <span
//                                         className={`badge ${
//                                             isStatus("pending")
//                                                 ? "bg-blue-400"
//                                                 : isStatus("accepted")
//                                                 ? "bg-green-400"
//                                                 : isStatus("cancelled")
//                                                 ? "bg-red-400"
//                                                 : "bg-yellow-400"
//                                         } text-black`}
//                                     >
//                                         {order.orderStatus}
//                                     </span>
//                                 </td>
//                                 <td>{order.userEmail}</td>
//                                 <td>{new Date(order.orderTime).toLocaleString()}</td>
//                                 <td>
//                                     <span
//                                         className={`badge ${
//                                             order.paymentStatus === "paid"
//                                                 ? "bg-green-400"
//                                                 : "bg-gray-300"
//                                         } text-black`}
//                                     >
//                                         {order.paymentStatus}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <div className="flex gap-2 flex-wrap">
//                                         <button
//                                             className={`btn btn-sm ${
//                                                 isStatus("pending")
//                                                     ? "bg-red-500 text-white"
//                                                     : "btn-disabled"
//                                             }`}
//                                             disabled={!isStatus("pending")}
//                                             onClick={() =>
//                                                 updateOrderStatus(order._id, "cancelled")
//                                             }
//                                         >
//                                             Cancel
//                                         </button>

//                                         <button
//                                             className={`btn btn-sm ${
//                                                 isStatus("pending")
//                                                     ? "bg-green-500 text-white"
//                                                     : "btn-disabled"
//                                             }`}
//                                             disabled={!isStatus("pending")}
//                                             onClick={() =>
//                                                 updateOrderStatus(order._id, "accepted")
//                                             }
//                                         >
//                                             Accept
//                                         </button>

//                                         <button
//                                             className={`btn btn-sm ${
//                                                 isStatus("accepted")
//                                                     ? "bg-yellow-500 text-black"
//                                                     : "btn-disabled"
//                                             }`}
//                                             disabled={!isStatus("accepted")}
//                                             onClick={() =>
//                                                 updateOrderStatus(order._id, "delivered")
//                                             }
//                                         >
//                                             Deliver
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>

//             {/* 🔹 Pagination Controls */}
//             {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-2 mt-4">
//                     <button
//                         className="btn btn-sm"
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                         Prev
//                     </button>

//                     {[...Array(totalPages).keys()].map((page) => (
//                         <button
//                             key={page}
//                             className={`btn btn-sm ${
//                                 currentPage === page + 1
//                                     ? "btn-primary"
//                                     : "btn-outline"
//                             }`}
//                             onClick={() => setCurrentPage(page + 1)}
//                         >
//                             {page + 1}
//                         </button>
//                     ))}

//                     <button
//                         className="btn btn-sm"
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}

//             {orders.length === 0 && (
//                 <p className="text-center mt-4 text-gray-500">No orders found.</p>
//             )}
//         </div>
//     );
// };

// export default OrderRequests;
