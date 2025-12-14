import { Outlet } from 'react-router'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
//import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex bg-white'>
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout


// import { BarChart3, ChefHat, FileText, Heart, Package, Plus, ShoppingBag, Star, User, Users } from "lucide-react";
// import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import AddMeal from "../Pages/Dashboard/Chef/AddMeal";
// import Favorite from "../Pages/Dashboard/Customer/Favorite";
// import AddReview from "../Pages/Dashboard/Customer/AddReview";
// // import {
// //   Menu,
// //   X,
// //   User,
// //   ShoppingBag,
// //   Star,
// //   Heart,
// //   ChefHat,
// //   Plus,
// //   Package,
// //   Users,
// //   FileText,
// //   BarChart3,
// //   LogOut,
// // } from "lucide-react";

// // Navigation Hook
// const useNavigation = () => {
//   const [currentPath, setCurrentPath] = useState("/dashboard/profile");

//   const navigate = (path) => {
//     setCurrentPath(path);
//   };

//   return { currentPath, navigate };
// };

// // App Component
// export default function App() {
//   const [user, setUser] = useState({ role: "user", name: "John Doe" });
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { currentPath, navigate } = useNavigation();

//   const userMenuItems = [
//     { path: "/dashboard/profile", icon: User, label: "My Profile" },
//     { path: "/dashboard/orders", icon: ShoppingBag, label: "My Orders" },
//     { path: "/dashboard/reviews", icon: Star, label: "My Reviews" },
//     { path: "/dashboard/favorites", icon: Heart, label: "Favorite Meals" },
//   ];

//   const chefMenuItems = [
//     { path: "/dashboard/profile", icon: User, label: "My Profile" },
//     { path: "/dashboard/create-meal", icon: Plus, label: "Create Meal" },
//     { path: "/dashboard/my-meals", icon: ChefHat, label: "My Meals" },
//     {
//       path: "/dashboard/order-requests",
//       icon: Package,
//       label: "Order Requests",
//     },
//   ];

//   const adminMenuItems = [
//     { path: "/dashboard/profile", icon: User, label: "My Profile" },
//     { path: "/dashboard/manage-users", icon: Users, label: "Manage Users" },
//     {
//       path: "/dashboard/manage-requests",
//       icon: FileText,
//       label: "Manage Requests",
//     },
//     {
//       path: "/dashboard/statistics",
//       icon: BarChart3,
//       label: "Platform Statistics",
//     },
//   ];

//   const getMenuItems = () => {
//     switch (user.role) {
//       case "chef":
//         return chefMenuItems;
//       case "admin":
//         return adminMenuItems;
//       default:
//         return userMenuItems;
//     }
//   };

//   const menuItems = getMenuItems();

//   const handleRoleSwitch = (role) => {
//     setUser({ ...user, role });
//     setSidebarOpen(false);
//     navigate("/dashboard/profile");
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     setSidebarOpen(false);
//   };

//   // Render current page
//   const renderPage = () => {
//     switch (currentPath) {
//       case "/dashboard/profile":
//         return <MyProfile />;
//       case "/dashboard/orders":
//         return <MyOrders />;
//       case "/dashboard/reviews":
//         return <AddReview />;
//       case "/dashboard/favorites":
//         return <Favorite />;
//       case "/dashboard/create-meal":
//         return <AddMeal />;
//       case "/dashboard/my-meals":
//         return <MyMeals />;
//       case "/dashboard/order-requests":
//         return <OrderRequests />;
//       case "/dashboard/manage-users":
//         return <ManageUsers />;
//       case "/dashboard/manage-requests":
//         return <ManageRequests />;
//       case "/dashboard/statistics":
//         return <Statistics />;
//       default:
//         return <MyProfile />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Header */}
//       <div className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
//         <div className="flex items-center justify-between p-4">
//           <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
//             {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-6 border-b">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {user.role === "chef"
//                 ? "👨‍🍳 Chef"
//                 : user.role === "admin"
//                 ? "⚙️ Admin"
//                 : "🍽️ Food"}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">{user.name}</p>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 overflow-y-auto">
//             <ul className="space-y-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = currentPath === item.path;
//                 return (
//                   <li key={item.path}>
//                     <button
//                       onClick={() => handleNavigate(item.path)}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left cursor-pointer ${
//                         isActive
//                           ? "bg-orange-50 text-primary"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       <Icon size={20} />
//                       <span className="font-medium">{item.label}</span>
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>

//           {/* Role Switcher (Demo) */}
//           <div className="p-4 border-t">
//             <p className="text-xs text-gray-500 mb-2">Switch Role (Demo):</p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleRoleSwitch("user")}
//                 className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
//               >
//                 User
//               </button>
//               <button
//                 onClick={() => handleRoleSwitch("chef")}
//                 className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
//               >
//                 Chef
//               </button>
//               <button
//                 onClick={() => handleRoleSwitch("admin")}
//                 className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
//               >
//                 Admin
//               </button>
//             </div>
//           </div>

//           {/* Logout */}
//           <div className="p-4 border-t">
//             <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//               <LogOut size={20} />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
//         <div className="p-4 lg:p-8">{renderPage()}</div>
//       </main>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnHover={false}
//         draggable
//         theme="light"
//       />
//     </div>
//   );
// }