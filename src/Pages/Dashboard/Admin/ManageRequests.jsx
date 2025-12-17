import React from 'react';


import Loading from '../../../Components/Shared/Loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageRequests = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    // get all requests fron backend 

    const {data: requests = [], isLoading} = useQuery({
        queryKey: ["all-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests')
            return res.data
        }
    })

    const handleApprove = async (req) => {
        console.log("clicked", req)
        const res = await axiosSecure.patch(`/requests/update/${req._id}`,{
            requestStatus: "approved",
            userEmail: req.userEmail,
            requestType: req.requestType,
        });

        if(res.data.success ){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request approved successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            queryClient.invalidateQueries(["all-requests"]);
            queryClient.invalidateQueries(["user-profile", req.userEmail]);
            queryClient.invalidateQueries(["pending-request", req.userEmail]);
        }
    }



    const handleReject = async (req) => {
        console.log("reject clicked", req)
        const res = await axiosSecure.patch(`/requests/update/${req._id}`, {
            requestStatus: "rejected",
        })
        if(res.data.success){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Request rejected successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            queryClient.invalidateQueries(["all-requests"]);
            queryClient.invalidateQueries(["user-profile", req.userEmail]);
            queryClient.invalidateQueries(["pending-request", req.userEmail]);
            
        }
    }

    if(isLoading) return <Loading/>


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Requests: {requests.length} </h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Request Type</th>
                            <th>Status</th>
                            <th>Request Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td className="capitalize">{req.requestType}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold text-white rounded-full capitalize
      ${req.requestStatus === "pending" && "bg-orange-500"}
      ${req.requestStatus === "approved" && "bg-green-600"}
      ${req.requestStatus === "rejected" && "bg-red-600"}
    `}
                                    >
                                        {req.requestStatus}
                                    </span>
                                </td>
                                <td>{new Date(req.requestTime).toLocaleString()}</td>

                                <td className="flex gap-2">
                                    {/* Accept Button */}
                                    <button onClick={() => handleApprove(req)} disabled={req.requestStatus !== "pending"} className={`px-3 py-1 rounded text-white ${req.requestStatus !== "pending" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
                                        Accept
                                    </button>

                                    {/* Reject Button */}
                                    <button onClick={() => handleReject(req)} disabled={req.requestStatus !== "pending"} className={`px-3 py-1 rounded text-white ${req.requestStatus !== "pending" ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRequests;