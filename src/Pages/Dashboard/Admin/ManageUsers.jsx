// import React from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import Loading from '../../../Components/Shared/Loading';
// import Swal from 'sweetalert2';

// const ManageUsers = () => {
//     const axiosSecure = useAxiosSecure()
//     const queryClient = useQueryClient()

//     const {data: users= [], isloading} = useQuery({
//         queryKey: ["users"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/users")
//             return res.data
//         }
//     })

//     const handleFraud = async (user) => {
//         await axiosSecure.patch(`/users/fraud/${user.email}`)
//          .then(()=> {
//             Swal.fire({
//                 position:"center",
//                 icon: "success",
//                 title: "User marked Fraud",
//                 showConfirmButton: false,
//                 timer: 1500,
//             })
//          })
//          queryClient.invalidateQueries("users")
//     }

//     if(isloading) return <Loading/>
//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Manage Users: {users.length}</h2>

//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>User Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user._id}>
//                                 <td>{user.displayName}</td>
//                                 <td>{user.email}</td>

//                                 {/* Role */}
//                                 <td className="capitalize">{user.role}</td>

//                                 {/* Status Badge */}
//                                 <td>
//                                     <span
//                                         className={`px-2 py-1 text-xs rounded-full text-white capitalize
//                       ${user.status === "active" && "bg-green-600"}
//                       ${user.status === "fraud" && "bg-red-600"}
//                     `}
//                                     >
//                                         {user.status}
//                                     </span>
//                                 </td>

//                                 {/* Make Fraud Button */}
//                                 <td>
//                                     <button
//                                         onClick={() => handleFraud(user)}
//                                         disabled={user.status === "fraud"}
//                                         className={`px-3 py-1 rounded text-white
//                       ${user.role === "admin" ? "hidden" : ""}
//                       ${user.status === "fraud" ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
//                     `}
//                                     >
//                                         Make Fraud
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;


import React from "react";
//import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../Components/Shared/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: users = [], isloading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleFraud = async (user) => {
        await axiosSecure.patch(`/users/fraud/${user.email}`).then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User marked Fraud",
                showConfirmButton: false,
                timer: 1500,
            });
        });
        queryClient.invalidateQueries("users");
    };

    if (isloading) return <Loading />;
    return (
        <div className="p-6">
            <Helmet>
                <title>Manage Users</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Manage Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} data-aos="fade-up" data-aos-delay={index * 50}>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>

                                {/* Role */}
                                <td className="capitalize">{user.role}</td>

                                {/* Status Badge */}
                                <td>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full text-white capitalize
                      ${user.status === "active" && "bg-green-600"}
                      ${user.status === "fraud" && "bg-red-600"}
                    `}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* Make Fraud Button */}
                                <td>
                                    <button
                                        onClick={() => handleFraud(user)}
                                        disabled={user.status === "fraud"}
                                        className={`px-3 py-1 rounded text-white
                      ${user.role === "admin" ? "hidden" : ""}
                      ${user.status === "fraud" && "bg-gray-400 cursor-not-allowed items-center"}
                      ${user.status !== "fraud" && "bg-red-600 hover:bg-red-700"}
                    `}
                                    >
                                        Make Fraud
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

export default ManageUsers;