import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const BranchesManagement = () => {
    // Dummy branches data
    const [branches, setBranches] = useState([
        { id: 1, name: "Downtown Main Branch", location: "123 Business Rd, City Center", manager: "John Doe", status: "Active", employees: 42, revenue: "$154,200" },
        { id: 2, name: "Westside Kitchen", location: "45 West Avenue, Suburbia", manager: "Jane Smith", status: "Active", employees: 28, revenue: "$98,450" },
        { id: 3, name: "North Hills Express", location: "88 North Blvd, Retail Park", manager: "Mike Johnson", status: "Inactive", employees: 15, revenue: "$45,300" },
        { id: 4, name: "Southside Delivery Hub", location: "200 South St, Industrial Zone", manager: "Sarah Connor", status: "Active", employees: 35, revenue: "$112,800" },
    ]);

    const handleEdit = (branch) => {
        Swal.fire({
            title: 'Edit Branch',
            text: `You clicked edit for ${branch.name}. Demo mode only.`,
            icon: 'info'
        });
    };

    const handleDelete = (branch) => {
        Swal.fire({
            title: `Delete ${branch.name}?`,
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setBranches(branches.filter(b => b.id !== branch.id));
                Swal.fire('Deleted!', 'The branch has been deleted.', 'success');
            }
        });
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <Helmet>
                <title>Branches Management - Local Chef Bazaar</title>
            </Helmet>
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Branches Management</h2>
                    <p className="text-gray-500 mt-1">Manage your restaurant locations and hubs</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2" onClick={() => Swal.fire('Demo', 'Add Branch modal goes here', 'info')}>
                    <FaPlus /> Add New Branch
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-4">
                    <div className="stat-title text-blue-800 font-semibold">Total Branches</div>
                    <div className="stat-value text-blue-600">{branches.length}</div>
                </div>
                <div className="stat bg-green-50 rounded-xl shadow-sm border border-green-100 p-4">
                    <div className="stat-title text-green-800 font-semibold">Active Branches</div>
                    <div className="stat-value text-green-600">
                        {branches.filter(b => b.status === "Active").length}
                    </div>
                </div>
                <div className="stat bg-yellow-50 rounded-xl shadow-sm border border-yellow-100 p-4">
                    <div className="stat-title text-yellow-800 font-semibold">Total Employees</div>
                    <div className="stat-value text-yellow-600">
                        {branches.reduce((acc, curr) => acc + curr.employees, 0)}
                    </div>
                </div>
            </div>

            {/* Branches Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Branch Name</th>
                                <th>Location</th>
                                <th>Manager</th>
                                <th>Employees</th>
                                <th>Revenue</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map(branch => (
                                <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="font-semibold text-gray-800">{branch.name}</td>
                                    <td className="text-gray-600 text-sm max-w-[200px] truncate">{branch.location}</td>
                                    <td>{branch.manager}</td>
                                    <td>{branch.employees}</td>
                                    <td className="font-medium text-green-600">{branch.revenue}</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            branch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {branch.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleEdit(branch)}
                                                className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(branch)}
                                                className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {branches.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No branches found. 
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BranchesManagement;
