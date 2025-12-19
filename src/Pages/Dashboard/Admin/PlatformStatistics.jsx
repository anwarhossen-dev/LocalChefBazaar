// // import React from "react";
// // import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";


// // import AppLoading from "../../../Components/Shared/AppLoading";
// // import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";



// // const PlatformStatistics = () => {
// //     const axiosSecure = useAxiosSecure();

// //     // Fetch all stats together
// //     const { data: stats = {}, isLoading } = useQuery({
// //         queryKey: ["platform-stats"],
// //         queryFn: async () => {
// //             try{
// //                 const [payments, users, pending, delivered] = await Promise.all([
// //                 axiosSecure.get("/admin/stats/totalPayments"), 
// //                 axiosSecure.get("/admin/stats/totalUsers"), 
// //                 axiosSecure.get("/admin/stats/ordersPending"), 
// //                 axiosSecure.get("/admin/stats/orderDelivered")
// //             ]);

// //             return {
// //                 totalPayments: payments.data.totalPayments,
// //                 totalUsers: users.data.totalUsers,
// //                 pendingOrders: pending.data.pendingOrders,
// //                 deliveredOrders: delivered.data.deliveredOrders,
// //             };
// //             }catch(error){
// //                 console.log("Failed to fatch apis", error)
// //                 return {}
// //             }
// //         },
// //     });

// //     if (isLoading) return <AppLoading />;

// //     // Pie chart data
// //     const pieData = [
// //         { name: "Pending Orders", value: stats.pendingOrders },
// //         { name: "Delivered Orders", value: stats.deliveredOrders },
// //     ];

// //     const COLORS = ["#FFBB28", "#00C49F"];

// //     // Bar chart data
// //     const barData = [
// //         { name: "Payments", amount: stats.totalPayments },
// //         { name: "Users", amount: stats.totalUsers },
// //     ];

// //     return (
// //         <div className="p-6 space-y-10">
// //             {/* ---------- TOP CARDS ---------- */}
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
// //                     <h2 className="text-xl text-black font-bold">Total Payments</h2>
// //                     <p className="text-3xl text-black font-semibold">${stats.totalPayments}</p>
// //                 </div>

// //                 <div className="bg-green-100 p-6 rounded-lg shadow text-center">
// //                     <h2 className="text-xl text-black font-bold">Total Users</h2>
// //                     <p className="text-3xl text-black font-semibold">{stats.totalUsers}</p>
// //                 </div>

// //                 <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
// //                     <h2 className="text-xl text-black font-bold">Pending Orders</h2>
// //                     <p className="text-3xl text-black font-semibold">{stats.pendingOrders}</p>
// //                 </div>

// //                 <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
// //                     <h2 className="text-xl text-black font-bold">Delivered Orders</h2>
// //                     <p className="text-3xl text-black font-semibold">{stats.deliveredOrders}</p>
// //                 </div>
// //             </div>

// //             {/* ---------- PIE CHART ---------- */}
// //             <div className="text-center">
// //                 <h1 className="text-3xl font-bold">Delivered and Pending Orders</h1>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow flex justify-center overflow-x-auto">
// //                 <PieChart width={350} height={300}>
// //                     <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
// //                         {pieData.map((entry, index) => (
// //                             <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                         ))}
// //                     </Pie>
// //                     <Tooltip />
// //                     <Legend />
// //                 </PieChart>
// //             </div>

// //             {/* ---------- BAR CHART ---------- */}
// //             <div className="text-center">
// //                 <h1 className="text-3xl font-bold">Payments and Plateform Users</h1>
// //             </div>
// //             <div className="bg-white p-6 rounded-lg shadow flex justify-center overflow-x-auto">
// //                 <BarChart width={450} height={300} data={barData}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="name" />
// //                     <YAxis />
// //                     <Tooltip />
// //                     <Legend />
// //                     <Bar dataKey="amount" fill="#8884d8" />
// //                 </BarChart>
// //             </div>
// //         </div>
// //     );
// // };


// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import AppLoading from "../../../Components/Shared/AppLoading";
// import { Helmet } from "react-helmet";


// const PlatformStatistics = () => {
//     const axiosSecure = useAxiosSecure();

//     // Fetch all stats together
//     const { data: stats = {}, isLoading } = useQuery({
//         queryKey: ["platform-stats"],
//         queryFn: async () => {
//             try{
//                 const [payments, users, pending, delivered] = await Promise.all([
//                 axiosSecure.get("/admin/stats/totalPayments"), 
//                 axiosSecure.get("/admin/stats/totalUsers"), 
//                 axiosSecure.get("/admin/stats/ordersPending"), 
//                 axiosSecure.get("/admin/stats/orderDelivered")
//             ]);

//             return {
//                 totalPayments: payments.data.totalPayments,
//                 totalUsers: users.data.totalUsers,
//                 pendingOrders: pending.data.pendingOrders,
//                 deliveredOrders: delivered.data.deliveredOrders,
//             };
//             }catch(error){
//                 console.log("Failed to fatch apis", error)
//                 return {}
//             }
//         },
//     });

//     if (isLoading) return <AppLoading />;

//     // Pie chart data
//     const pieData = [
//         { name: "Pending Orders", value: stats.pendingOrders },
//         { name: "Delivered Orders", value: stats.deliveredOrders },
//     ];

//     const COLORS = ["#FFBB28", "#00C49F"];

//     // Bar chart data
//     const barData = [
//         { name: "Payments", amount: stats.totalPayments },
//         { name: "Users", amount: stats.totalUsers },
//     ];

//     return (
//         <div className="p-6 space-y-10">
//             <Helmet>
//                 <title>Platform Statistics</title>
//             </Helmet>
//             {/* ---------- TOP CARDS ---------- */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
//                     <h2 className="text-xl text-black font-bold">Total Payments</h2>
//                     <p className="text-3xl text-black font-semibold">${stats.totalPayments}</p>
//                 </div>

//                 <div className="bg-green-100 p-6 rounded-lg shadow text-center">
//                     <h2 className="text-xl text-black font-bold">Total Users</h2>
//                     <p className="text-3xl text-black font-semibold">{stats.totalUsers}</p>
//                 </div>

//                 <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
//                     <h2 className="text-xl text-black font-bold">Pending Orders</h2>
//                     <p className="text-3xl text-black font-semibold">{stats.pendingOrders}</p>
//                 </div>

//                 <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
//                     <h2 className="text-xl text-black font-bold">Delivered Orders</h2>
//                     <p className="text-3xl text-black font-semibold">{stats.deliveredOrders}</p>
//                 </div>
//             </div>

//             {/* ---------- PIE CHART ---------- */}
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold">Delivered and Pending Orders</h1>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex justify-center overflow-x-auto">
//                 <PieChart width={350} height={300}>
//                     <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
//                         {pieData.map((entry, index) => (
//                             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </div>

//             {/* ---------- BAR CHART ---------- */}
//             <div className="text-center">
//                 <h1 className="text-3xl font-bold">Payments and Plateform Users</h1>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex justify-center overflow-x-auto">
//                 <BarChart width={450} height={300} data={barData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="amount" fill="#8884d8" />
//                 </BarChart>
//             </div>
//         </div>
//     );
// };


// export default PlatformStatistics;
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../../Components/Shared/AppLoading";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure(); // ✅ call hook here

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      try {
        const [payments, users, pending, delivered] = await Promise.all([
          axiosSecure.get("/admin/stats/totalPayments"),
          axiosSecure.get("/admin/stats/totalUsers"),
          axiosSecure.get("/admin/stats/ordersPending"),
          axiosSecure.get("/admin/stats/ordersDelivered")
        ]);

        return {
          totalPayments: payments.data.totalPayments,
          totalUsers: users.data.totalUsers,
          pendingOrders: pending.data.pendingOrders,
          deliveredOrders: delivered.data.deliveredOrders
        };
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        return {};
      }
    }
  });

  if (isLoading) return <AppLoading />;

  const pieData = [
    { name: "Pending Orders", value: stats.pendingOrders },
    { name: "Delivered Orders", value: stats.deliveredOrders }
  ];

  const barData = [
    { name: "Total Payments", amount: stats.totalPayments },
    { name: "Total Users", amount: stats.totalUsers }
  ];

  const COLORS = ["#FFBB28", "#00C49F"];

  return (
    <div className="p-6 space-y-10">
      <Helmet><title>Platform Statistics</title></Helmet>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Total Payments</h2>
          <p className="text-3xl font-semibold">${stats.totalPayments}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Pending Orders</h2>
          <p className="text-3xl font-semibold">{stats.pendingOrders}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold">Delivered Orders</h2>
          <p className="text-3xl font-semibold">{stats.deliveredOrders}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Orders Overview</h1>
        <PieChart width={350} height={300}>
          <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Bar Chart */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Payments & Users</h1>
        <BarChart width={450} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default PlatformStatistics;


// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
// import { useQuery } from "@tanstack/react-query";
// import AppLoading from "../../../Components/Shared/AppLoading";
// import { Helmet } from "react-helmet";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// const PlatformStatistics = () => {
//   // Fetch stats from backend
//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["platform-stats"],
//     queryFn: async () => {
//       try {
//         const [payments, users, pending, delivered] = await Promise.all([
//           useAxiosSecure.get("/admin/stats/totalPayments"),
//           useAxiosSecure.get("/admin/stats/totalUsers"),
//           useAxiosSecure.get("/admin/stats/ordersPending"),
//           useAxiosSecure.get("/admin/stats/ordersDelivered")
//         ]);

//         return {
//           totalPayments: payments.data.totalPayments,
//           totalUsers: users.data.totalUsers,
//           pendingOrders: pending.data.pendingOrders,
//           deliveredOrders: delivered.data.deliveredOrders
//         };
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//         return {};
//       }
//     }
//   });

//   if (isLoading) return <AppLoading />;

//   const pieData = [
//     { name: "Pending Orders", value: stats.pendingOrders },
//     { name: "Delivered Orders", value: stats.deliveredOrders }
//   ];

//   const barData = [
//     { name: "Total Payments", amount: stats.totalPayments },
//     { name: "Total Users", amount: stats.totalUsers }
//   ];

//   const COLORS = ["#FFBB28", "#00C49F"];

//   return (
//     <div className="p-6 space-y-10">
//       <Helmet><title>Platform Statistics</title></Helmet>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
//           <h2 className="text-xl font-bold">Total Payments</h2>
//           <p className="text-3xl font-semibold">${stats.totalPayments}</p>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg shadow text-center">
//           <h2 className="text-xl font-bold">Total Users</h2>
//           <p className="text-3xl font-semibold">{stats.totalUsers}</p>
//         </div>
//         <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
//           <h2 className="text-xl font-bold">Pending Orders</h2>
//           <p className="text-3xl font-semibold">{stats.pendingOrders}</p>
//         </div>
//         <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
//           <h2 className="text-xl font-bold">Delivered Orders</h2>
//           <p className="text-3xl font-semibold">{stats.deliveredOrders}</p>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Orders Overview</h1>
//         <PieChart width={350} height={300}>
//           <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
//             {pieData.map((entry, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//       {/* Bar Chart */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">Payments & Users</h1>
//         <BarChart width={450} height={300} data={barData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="amount" fill="#8884d8" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default PlatformStatistics;
