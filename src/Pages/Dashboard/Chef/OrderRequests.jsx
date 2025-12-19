// import React from 'react';
// import useAuth from '../../../Hooks/useAuth';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import Swal from 'sweetalert2';

// const OrderRequests = () => {
//     const {user} = useAuth()
//     const axiosSecure = useAxiosSecure();
//     const chefEmail = user?.email
//     const {data: orders = [],refetch} = useQuery({
//         queryKey: ["chefOrders",],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/orders/by-chef/${chefEmail}`);
//             return res.data
//         }
//     })

//     const updateOrderStatus = async(id,status) => {
//         try{
//             const res = await axiosSecure.patch(`/orders/update/${id}`,{status})
//             if(res.data.success){
//                 Swal.fire("Success", `Order ${status}`,"success")
//                 refetch()
//             }
//         }catch (error){
//             Swal.fire("Error", "Something wrong", error)
//         }
//     }
    
    
//     return (
//         <div className="overflow-x-auto">
//             <table className="table table-zebra">
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
//                     {orders.map((order, index) => {
//                         const statusFlags = {
//                             cancelled: order.orderStatus === "cancelled",
//                             accepted: order.orderStatus === "accepted",
//                             delivered: order.orderStatus === "delivered",
//                             pending: order.orderStatus === "pending",
//                         }
//                         return (
//                             <tr key={order._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{order.mealName}</td>
//                                 <td>{order.price}</td>
//                                 <td>{order.quantity}</td>
//                                 <td>{order.orderStatus}</td>

//                                 <td>{order.userEmail}</td>
//                                 <td>{new Date(order.orderTime).toDateString()}</td>
//                                 <td>{order.paymentStatus}</td>
//                                 <td>
//                                     <div className="flex gap-1">
//                                         <button className={`btn btn-sm ${statusFlags.pending ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.pending} onClick={() => updateOrderStatus(order._id, "cancelled")}>
//                                             Cancel
//                                         </button>

//                                         <button className={`btn btn-sm ${statusFlags.pending ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.pending} onClick={() => updateOrderStatus(order._id, "accepted")}>
//                                             Accept
//                                         </button>
//                                         <button className={`btn btn-sm ${statusFlags.accepted ? "bg-yellow-500 text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.accepted} onClick={() => updateOrderStatus(order._id, "delivered")}>
                                            
//                                             Deliver
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };


import React from 'react';
import useAuth from '../../../Hooks/useAuth';
//import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const OrderRequests = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();
    const chefEmail = user?.email
    const {data: orders = [],refetch} = useQuery({
        queryKey: ["chefOrders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/by-chef/${chefEmail}`);
            return res.data
        }
    })
    console.log(chefEmail)

    const updateOrderStatus = async(id,status) => {
        try{
            const res = await axiosSecure.patch(`/orders/update/${id}`,{status})
            if(res.data.success){
                Swal.fire("Success", `Order ${status}`,"success")
                refetch()
            }
        }catch (error){
            Swal.fire("Error", "Something wrong", error)
        }
    }
    
    
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
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
                        const statusFlags = {
                            cancelled: order.orderStatus === "cancelled",
                            accepted: order.orderStatus === "accepted",
                            delivered: order.orderStatus === "delivered",
                            pending: order.orderStatus === "pending",
                        }
                        return (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.mealName}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <span className="badge bg-amber-400 text-black">{order.orderStatus}</span>
                                </td>

                                <td>{order.userEmail}</td>
                                <td>{new Date(order.orderTime).toDateString()}</td>
                                <td>
                                    <span className='badge bg-green-400 text-black'>{order.paymentStatus}</span>
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        <button className={`btn btn-sm ${statusFlags.pending ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.pending} onClick={() => updateOrderStatus(order._id, "cancelled")}>
                                            Cancel
                                        </button>

                                        <button className={`btn btn-sm ${statusFlags.pending ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.pending} onClick={() => updateOrderStatus(order._id, "accepted")}>
                                            Accept
                                        </button>
                                        <button className={`btn btn-sm ${statusFlags.accepted ? "bg-yellow-500 text-black" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`} disabled={!statusFlags.accepted} onClick={() => updateOrderStatus(order._id, "delivered")}>
                                            Deliver
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderRequests;