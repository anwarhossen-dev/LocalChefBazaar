// // import React from 'react';
// // import CustomerOrderDataRow from '../../../Components/Dashboard/TableRows/CustomerOrderDataRow';
// // import { useQuery } from '@tanstack/react-query';
// // import axios from 'axios';
// // import useAuth from '../../../hooks/useAuth';
// // import LoadingSpinner from '../../../Components/Shared/LoadingSpinner';

// // const MyOrders = () => {
// //   const {user} = useAuth

// //    const {data: orders = [], isLoading} = useQuery({
// //     queryKey: ['orders', user?.email],
// //     queryFn: async()=>{
// //       const result = await axios(`${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`)
// //       return result.data
// //     },
// //   })

// //   console.log(orders)

// //    if (isLoading) return <LoadingSpinner />

// //     return (
// //       //   <>
// //       //   <div className='container mx-auto px-4 sm:px-8'>
// //       //   <div className='py-8'>
// //       //     <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
// //       //       <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
// //       //         <table className='min-w-full leading-normal'>
// //       //           <thead>
// //       //             <tr>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Image
// //       //               </th>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Name
// //       //               </th>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Category
// //       //               </th>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Price
// //       //               </th>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Quantity
// //       //               </th>
// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Status
// //       //               </th>

// //       //               <th
// //       //                 scope='col'
// //       //                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //       //               >
// //       //                 Action
// //       //               </th>
// //       //             </tr>
// //       //           </thead>
// //       //           <tbody>
// //       //             {orders.map(order => (
// //       //               <CustomerOrderDataRow key={order._id} order={order} />
// //       //             ))}
// //       //           </tbody>
// //       //         </table>
// //       //       </div>
// //       //     </div>
// //       //   </div>
// //       // </div>
            
// //       //   </>


// //       <>
// //       <div className='container mx-auto px-4 sm:px-8'>
// //         <div className='py-8'>
// //           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
// //             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
// //               <table className='min-w-full leading-normal'>
// //                 <thead>
// //                   <tr>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Image
// //                     </th>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Name
// //                     </th>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Category
// //                     </th>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Price
// //                     </th>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Quantity
// //                     </th>
// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Status
// //                     </th>

// //                     <th
// //                       scope='col'
// //                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
// //                     >
// //                       Action
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {orders.map(order => (
// //                     <CustomerOrderDataRow key={order._id} order={order} />
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //     );
// // };

// // export default MyOrders;



// import React from "react";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// // import { Link } from "react-router";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // import useAuth from "../../hooks/useAuth";
// import { format } from "date-fns";
// import CustomerOrderDataRow from "../../../Components/Dashboard/TableRows/CustomerOrderDataRow";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: orders = [] } = useQuery({
//     queryKey: ["orders", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders?email=${user?.email}`);
//       return res.data;
//     },
//   });
//   console.log(orders);

//   return (
//     // <div>
//     //   <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
//     //   <div className="grid gap-4">
//     //     {orders.map((order) => (
//     //       <div key={order._id} className="bg-white rounded-lg shadow p-6">
//     //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//     //           <div>
//     //             <h3 className="font-semibold text-lg">{order.MealName}</h3>
//     //             <p className=" text-gray-600">
//     //               {format(new Date(order.orderTime), "dd MMM yyyy, hh:mm a")}
//     //             </p>
//     //             <p className="text-sm text-gray-500 mt-1 mb-2">
//     //               {order.quantity} items • ${order.price}
//     //             </p>
//     //             <span
//     //               className={`px-4 py-2  rounded-full text-sm font-medium ${
//     //                 order.orderStatus === "delivered"
//     //                   ? "bg-green-100 text-green-700"
//     //                   : order.orderStatus === "rejected"
//     //                   ? "bg-red-300 text-red-800"
//     //                   : "bg-yellow-300 text-yellow-800"
//     //               }`}
//     //             >
//     //               {order.orderStatus}
//     //             </span>
//     //           </div>
//     //           <div className={`px-4 py-2  rounded-full text-sm font-medium ${
//     //             order.paymentStatus === "paid" ? (
//     //               "bg-green-100 text-green-700"
//     //             ) : order.paymentStatus === "pending" ? (
//     //               "bg-yellow-300 text-yellow-800"
//     //             ) : (
//     //               <Link to="/" className="bg-red-100 text-red-700">
//     //                 pay
//     //               </Link>
//     //             )
//     //           }`}>
//     //             {order.paymentStatus}
//     //           </div>
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>

//     <>
//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Food Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Order Status
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Quantity
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                      Delivery Time
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                      Chef Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                      Chef ID 
//                     </th>

//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Payment Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <CustomerOrderDataRow key={order._id} order={order} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyOrders;

import React from "react";
import useAuth from "../../../Hooks/useAuth";
//import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../../Components/Shared/AppLoading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],isLoading, } = useQuery({
        queryKey: ["myOrders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/by-user/${user?.email}`);
            return res.data;
        },
    });
    const handlePayment = async (order) => {
        const res = await axiosSecure.post("/order-payment-checkout", {
            price : order.price,
            quantity: order.quantity,
            mealName: order.mealName,
            orderId: order._id,
            userEmail: order.userEmail,
        })
        console.log("Stripe URL:", res.data.url);
        window.location.href = res.data.url
    }
    if (isLoading) return <AppLoading />;
    return (
        <div>
            <h1 className="text-3xl my-5 ml-5 font-bold">My Orders: {orders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Food Name</th>
                            <th>Order Status</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delivery Time</th>
                            <th>Chef Name</th>
                            <th>Chef Id</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const showPayButton = order.orderStatus === "accepted" && order.paymentStatus === "pending";
                            return (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>{order.mealName}</td>
                                    <td>
                                        <span className="badge bg-green-100 text-black">{order.orderStatus}</span>
                                    </td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{new Date(order.orderTime).toDateString()}</td>
                                    <td>{order.chefName}</td>
                                    <td>{order.chefId}</td>
                                    <td>
                                        <span className="badge bg-orange-500 text-black">{order.paymentStatus}</span>
                                    </td>
                                    <td>
                                        {showPayButton && (
                                            <button className="btn btn-sm bg-amber-300 text-black" onClick={() => handlePayment(order)}>
                                                Pay
                                            </button>
                                        )}
                                        {order.paymentStatus === "paid" && <button className="badge bg-green-400 text-black">Paid</button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;