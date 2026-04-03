import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaUndo, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const ReturnOrders = () => {
    // Dummy returns data
    const [returns, setReturns] = useState([
        { id: "RET-90412", orderId: "ORD-1642345678905", customer: "Alice Johnson", item: "Caesar Salad", reason: "Food was cold upon delivery", amount: "$14.99", date: "2024-04-03", status: "Pending" },
        { id: "RET-90411", orderId: "ORD-1642345678880", customer: "Bob Smith", item: "Spaghetti Bolognese", reason: "Wrong item delivered", amount: "$19.99", date: "2024-04-02", status: "Approved" },
        { id: "RET-90410", orderId: "ORD-1642345678750", customer: "Marcus Chef", item: "Grilled Salmon", reason: "Overcooked", amount: "$24.50", date: "2024-04-01", status: "Rejected" },
        { id: "RET-90409", orderId: "ORD-1642345678600", customer: "Diana Prince", item: "Vegan Bowl", reason: "Allergic reaction (contained nuts)", amount: "$16.00", date: "2024-03-30", status: "Pending" },
        { id: "RET-90408", orderId: "ORD-1642345678500", customer: "Ethan Hunt", item: "Beef Wellington", reason: "Delivery delayed by 2 hours", amount: "$45.00", date: "2024-03-29", status: "Approved" },
    ]);

    const handleApprove = (returnReq) => {
        Swal.fire({
            title: `Approve Return?`,
            text: `Authorize refund of ${returnReq.amount} for Order ${returnReq.orderId}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, Approve Refund'
        }).then((result) => {
            if (result.isConfirmed) {
                setReturns(returns.map(r => r.id === returnReq.id ? { ...r, status: "Approved" } : r));
                Swal.fire('Approved!', `Refund for ${returnReq.customer} has been processed.`, 'success');
            }
        });
    };

    const handleReject = (returnReq) => {
        Swal.fire({
            title: `Reject Return?`,
            text: `Deny refund request for Order ${returnReq.orderId}?`,
            icon: 'warning',
            input: 'text',
            inputPlaceholder: 'Reason for rejection...',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Reject'
        }).then((result) => {
            if (result.isConfirmed) {
                setReturns(returns.map(r => r.id === returnReq.id ? { ...r, status: "Rejected" } : r));
                Swal.fire('Rejected', 'The return request has been denied.', 'info');
            }
        });
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <Helmet>
                <title>Return Orders - Local Chef Bazaar</title>
            </Helmet>
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
                        <FaUndo className="text-primary" /> Return Orders
                    </h2>
                    <p className="text-gray-500 mt-1">Manage food return requests, disputes, and refunds.</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="stat-title text-gray-500 font-semibold">Total Returns</div>
                    <div className="stat-value text-gray-700">{returns.length}</div>
                    <div className="stat-desc">Lifetime</div>
                </div>
                <div className="stat bg-orange-50 rounded-xl shadow-sm border border-orange-100 p-4">
                    <div className="stat-figure text-orange-400"><FaExclamationCircle className="text-2xl"/></div>
                    <div className="stat-title text-orange-800 font-semibold">Pending Review</div>
                    <div className="stat-value text-orange-600">
                        {returns.filter(r => r.status === "Pending").length}
                    </div>
                </div>
                <div className="stat bg-green-50 rounded-xl shadow-sm border border-green-100 p-4">
                    <div className="stat-figure text-green-500"><FaCheckCircle className="text-2xl"/></div>
                    <div className="stat-title text-green-800 font-semibold">Approved Refunds</div>
                    <div className="stat-value text-green-600">
                        {returns.filter(r => r.status === "Approved").length}
                    </div>
                </div>
                <div className="stat bg-red-50 rounded-xl shadow-sm border border-red-100 p-4">
                    <div className="stat-title text-red-800 font-semibold">Total Refund Value</div>
                    <div className="stat-value text-red-600">$1,245.50</div>
                    <div className="stat-desc text-red-400">This month</div>
                </div>
            </div>

            {/* Returns Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Return Info</th>
                                <th>Reason</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-center">Resolution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returns.map(req => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td>
                                        <div className="font-semibold text-gray-800">{req.customer}</div>
                                        <div className="text-xs text-blue-600 font-mono mt-1">{req.orderId}</div>
                                        <div className="text-xs text-gray-500">{req.item}</div>
                                    </td>
                                    <td className="text-sm max-w-[200px] text-gray-600 break-words">{req.reason}</td>
                                    <td className="font-medium text-gray-800">{req.amount}</td>
                                    <td className="text-sm text-gray-500">{req.date}</td>
                                    <td>
                                        {req.status === 'Pending' && <span className="badge badge-warning gap-1"><FaExclamationCircle/> Pending</span>}
                                        {req.status === 'Approved' && <span className="badge badge-success text-white gap-1"><FaCheckCircle/> Refunded</span>}
                                        {req.status === 'Rejected' && <span className="badge badge-error text-white gap-1"><FaTimesCircle/> Rejected</span>}
                                    </td>
                                    <td>
                                        {req.status === "Pending" ? (
                                            <div className="flex justify-center gap-2">
                                                <button 
                                                    className="btn btn-xs btn-success text-white"
                                                    onClick={() => handleApprove(req)}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    className="btn btn-xs btn-error text-white"
                                                    onClick={() => handleReject(req)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center text-xs text-gray-400">Resolved</div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReturnOrders;
