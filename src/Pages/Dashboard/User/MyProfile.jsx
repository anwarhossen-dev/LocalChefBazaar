


import React from "react";
//import useAuth from "../../Hooks/useAuth";
//import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Shared/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch user profile
    const { data: profile = {}, isLoading: profileLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            console.log(res.data)
            return res.data;
        },
    });

    // Fetch pending request
    const { data: pendingRequest = [] } = useQuery({
        queryKey: ["pending-request", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data;
            
        },
    });

    const request = pendingRequest?.[0];
    const requestedType = request?.requestType;
    const requestStatus = request?.requestStatus;
    const isFinal = requestStatus === "approved" || requestStatus === "rejected";

    const handleRequest = async (requestType) => {
        const requestData = {
            _id: profile?._id,
            userName: profile?.displayName,
            userEmail: profile?.email,
            image: profile?.image,

            
            requestType,
        };

        try {
            const res = await axiosSecure.post("/requests", requestData);
            if (res.data.insertedId) {
                toast(`Your request to become a ${requestType} has been submitted.`);

                // Auto update UI without reload
                queryClient.invalidateQueries(["pending-request", user?.email]);
                queryClient.invalidateQueries(["user-profile", user?.email]);
            }
        } catch (error) {
            console.log("Error submitting request:", error);
        }
    };

    if (profileLoading) return <Loading />;
   

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10" data-aos="fade-up">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
                {/* IMAGE SECTION */}
                <div className="flex justify-center md:block md:flex-shrink-0" data-aos="zoom-in">
                    <img
                        src={profile?.image}
                        alt="User"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                           rounded-lg border object-cover"
                    />
                </div>

                {/* DETAILS SECTION */}
                <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-2 sm:space-y-3 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl text-black font-bold">
                            <strong>Name:</strong> {profile?.displayName}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Email:</strong> {profile?.email}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Address:</strong> {profile?.address}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Role:</strong> {profile?.role}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Status:</strong> {profile?.status}
                        </p>

                        {profile?.role === "chef" && (
                            <p className="text-sm sm:text-base text-black">
                                <strong>Chef Id:</strong> {profile?.chefId}
                            </p>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                        {profile?.role !== "admin" && !isFinal && (
                            <>
                                {profile?.role !== "chef" && (
                                    <button
                                        onClick={() => handleRequest("chef")}
                                        disabled={requestedType === "chef" && requestStatus === "pending"}
                                        className={`px-4 py-2 text-sm sm:text-base rounded transition duration-300 
                                    ${requestedType === "chef" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80 hover:scale-105"}`}
                                    >
                                        {requestedType === "chef" && requestStatus === "pending" ? "Requested" : "Be a Chef"}
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRequest("admin")}
                                    disabled={requestedType === "admin" && requestStatus === "pending"}
                                    className={`px-4 py-2 text-sm sm:text-base rounded transition duration-300 
                                ${requestedType === "admin" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-secondary hover:bg-secondary/80 hover:scale-105"}`}
                                >
                                    {requestedType === "admin" && requestStatus === "pending" ? "Requested" : "Be an Admin"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;


// import React from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import Loading from "../../../Components/Shared/Loading";

// const MyProfile = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     // Fetch user profile
//     const { data: profile = {}, isLoading: profileLoading } = useQuery({
//         queryKey: ["user-profile", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/${user.email}`);
//             return res.data;
//         },
//     });

//     // Fetch pending request
//     const { data: pendingRequest = [] } = useQuery({
//         queryKey: ["pending-request", user?.email],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/requests/${user.email}`);
//             return res.data;
//         },
//     });

//     const request = pendingRequest?.[0];
//     const requestedType = request?.requestType;
//     const requestStatus = request?.requestStatus;
//     const isFinal = requestStatus === "approved" || requestStatus === "rejected";

//     const handleRequest = async (requestType) => {
//         const requestData = {
//             _id: profile?._id,
//             userName: profile?.displayName,
//             userEmail: profile?.email,
//             image: profile?.photoURL,
//             requestType,
//         };

//         try {
//             const res = await axiosSecure.post("/requests", requestData);
//             if (res.data.insertedId) {
//                 alert(`Your request to become a ${requestType} has been submitted.`);

//                 // Invalidate queries to refresh UI
//                 queryClient.invalidateQueries(["pending-request", user?.email]);
//                 queryClient.invalidateQueries(["user-profile", user?.email]);
//             }
//         } catch (error) {
//             console.error("Error submitting request:", error);
//             alert("Failed to submit request. Please try again.");
//         }
//     };

//     if (profileLoading) return <Loading />;

//     // Generate fallback avatar using initials (e.g., "MM" for mama@mame.com)
//     const displayName = profile?.displayName || "User";
//     const initials = displayName
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2);

//     const fallbackAvatar = `https://ui-avatars.com/api/?name=${initials}&background=6366f1&color=fff&size=256&bold=true`;

//     return (
//         <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10" data-aos="fade-up">
//             <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
//                 <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8">
//                     {/* IMAGE SECTION */}
//                     <div className="flex justify-center md:justify-start" data-aos="zoom-in">
//                         <div className="relative">
//                             <img
//                                 src={profile?.photoURL || fallbackAvatar}
//                                 alt={displayName}
//                                 onError={(e) => {
//                                     e.target.onerror = null; // Prevent infinite loop
//                                     e.target.src = fallbackAvatar;
//                                 }}
//                                 className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-indigo-100 object-cover shadow-lg transition-all duration-300 hover:scale-105"
//                             />
//                             {/* Optional: Add a subtle online/active indicator */}
//                             <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
//                         </div>
//                     </div>

//                     {/* DETAILS SECTION */}
//                     <div className="flex-1 flex flex-col justify-between">
//                         <div className="space-y-4 text-center md:text-left">
//                             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                                 {profile?.displayName || "User Name"}
//                             </h2>

//                             <div className="space-y-2 text-gray-700">
//                                 <p className="text-base sm:text-lg">
//                                     <strong>Email:</strong> {profile?.email}
//                                 </p>
//                                 <p className="text-base sm:text-lg">
//                                     <strong>Address:</strong> {profile?.address || "Not provided"}
//                                 </p>
//                                 <p className="text-base sm:text-lg">
//                                     <strong>Role:</strong>{" "}
//                                     <span className="capitalize font-medium text-indigo-600">
//                                         {profile?.role || "user"}
//                                     </span>
//                                 </p>
//                                 <p className="text-base sm:text-lg">
//                                     <strong>Status:</strong>{" "}
//                                     <span className="capitalize font-medium text-green-600">
//                                         {profile?.status || "active"}
//                                     </span>
//                                 </p>

//                                 {profile?.role === "chef" && (
//                                     <p className="text-base sm:text-lg">
//                                         <strong>Chef ID:</strong>{" "}
//                                         <span className="font-mono bg-gray-100 px-2 py-1 rounded">
//                                             {profile?.chefId}
//                                         </span>
//                                     </p>
//                                 )}
//                             </div>
//                         </div>

//                         {/* REQUEST BUTTONS */}
//                         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                             {profile?.role !== "admin" && !isFinal && (
//                                 <>
//                                     {profile?.role !== "chef" && (
//                                         <button
//                                             onClick={() => handleRequest("chef")}
//                                             disabled={requestedType === "chef" && requestStatus === "pending"}
//                                             className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform 
//                                                 ${requestedType === "chef" && requestStatus === "pending"
//                                                     ? "bg-gray-400 text-white cursor-not-allowed"
//                                                     : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-md"
//                                                 }`}
//                                         >
//                                             {requestedType === "chef" && requestStatus === "pending"
//                                                 ? "Request Pending"
//                                                 : "Become a Chef"}
//                                         </button>
//                                     )}

//                                     <button
//                                         onClick={() => handleRequest("admin")}
//                                         disabled={requestedType === "admin" && requestStatus === "pending"}
//                                         className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform 
//                                             ${requestedType === "admin" && requestStatus === "pending"
//                                                 ? "bg-gray-400 text-white cursor-not-allowed"
//                                                 : "bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 shadow-md"
//                                             }`}
//                                     >
//                                         {requestedType === "admin" && requestStatus === "pending"
//                                             ? "Request Pending"
//                                             : "Become an Admin"}
//                                     </button>
//                                 </>
//                             )}

//                             {/* If request was approved/rejected */}
//                             {isFinal && requestStatus === "approved" && (
//                                 <p className="text-green-600 font-medium">
//                                     ✅ Your request to become {requestedType} has been approved!
//                                 </p>
//                             )}
//                             {isFinal && requestStatus === "rejected" && (
//                                 <p className="text-red-600 font-medium">
//                                     ❌ Your request was rejected.
//                                 </p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyProfile;