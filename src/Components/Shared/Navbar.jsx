
// // import { Link } from "react-router";
// // import { useState } from "react";
// // import useAuth from "../../../hooks/useAuth";
// // import avatarImg from "../../../assets/images/placeholder.jpg";
// // import { AiOutlineMenu } from "react-icons/ai";
// // import logoImg from '../../../assets/Logo.png'
// // import Container from "../Container";


// // const Navbar = () => {
// //   const { user, logOut } = useAuth();
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="fixed mx-auto top-0 w-10/12 bg-base-100 z-50 shadow ">
// //       {/* <Container> */}
// //         <div className="navbar mx-auto justify-between px-4 md:px-6">

// //           {/* Left: Logo + Name */}
// //           <div className="flex-1">
// //             <Link to="/" className="flex items-left gap-2">
// //               <img src={logoImg} alt="logo" className="w-12" />
// //               <span className="text-xl font-bold">Local Chef Bazaar</span>
// //             </Link>
// //           </div>

// //           {/* Middle: Desktop Navigation */}
// //           <div className="hidden md:flex gap-6">
// //             <Link to="/" className="link link-hover font-semibold">Home</Link>
// //           {/* <Link to="/mealsDetails" className="link link-hover font-semibold">Meals</Link> */}

// //             {user && (
// //               <Link to="/dashboard" className="link link-hover font-semibold">
// //                 Dashboard
// //               </Link>
// //             )}
// //           </div>

// //           {/* Right: Auth / Profile */}
// //           <div className="flex-none">
// //             {/* Mobile Menu Button */}
// //             <div
// //               onClick={() => setIsOpen(!isOpen)}
// //               className="btn btn-ghost md:hidden p-2 rounded-full"
// //             >
// //               <AiOutlineMenu size={22} />
// //             </div>

// //             {/* Desktop Profile Area */}
// //             <div className="hidden md:flex items-center gap-3">
// //               {!user ? (
// //                 <>
// //                   <Link to="/login" className="btn btn-sm btn-outline">
// //                     Login
// //                   </Link>
// //                   <Link to="/register" className="btn btn-sm btn-primary">
// //                     Register
// //                   </Link>
// //                 </>
// //               ) : (
// //                 <>
// //                   <button onClick={logOut} className="btn btn-sm btn-error text-white">
// //                     Logout
// //                   </button>

// //                   <img
// //                     src={user.photoURL || avatarImg}
// //                     referrerPolicy="no-referrer"
// //                     alt="profile"
// //                     className="w-10 h-10 rounded-full border"
// //                   />
// //                 </>
// //               )}
// //             </div>

// //             {/* Mobile Dropdown Menu */}
// //             {isOpen && (
// //               <div className="absolute right-4 top-16 bg-base-100 shadow-lg rounded-lg p-4 w-48 flex flex-col space-y-2 md:hidden">

// //                 <Link to="/" className="hover:bg-base-200 p-2 rounded">
// //                   Home
// //                 </Link>

// //                 <Link to="/meals" className="hover:bg-base-200 p-2 rounded">
// //                   Meals
// //                 </Link>
// //                 <Link to="/mealsDetails" className="hover:bg-base-200 p-2 rounded">
// //                   Meals
// //                 </Link>
// //                 <Link to="/add-Order" className="hover:bg-base-200 p-2 rounded">
// //                   Order History
// //                 </Link>

// //                 {/* {user && (
// //                   <Link to="/dashboard" className="hover:bg-base-200 p-2 rounded">
// //                     Dashboard
// //                   </Link>
// //                 )} */}
// //                 {user && (
// //                   <>
// //                     <Link to="/dashboard" className="hover:bg-base-200 p-2 rounded">Dashboard</Link>
// //                     <Link to="/order" className="hover:bg-base-200 p-2 rounded">Order</Link>
// //                   </>
// //                 )}

// //                 <div className="divider my-1"></div>

// //                 {!user ? (
// //                   <>
// //                     <Link
// //                       to="/login"
// //                       className="hover:bg-base-200 p-2 rounded"
// //                     >
// //                       Login
// //                     </Link>
// //                     <Link
// //                       to="/register"
// //                       className="hover:bg-base-200 p-2 rounded"
// //                     >
// //                       Register
// //                     </Link>
// //                   </>
// //                 ) : (
// //                   <>
// //                   <button onClick={logOut} className="btn btn-sm btn-error text-white">Logout</button>
// //                   <img
// //                     src={user.photoURL || avatarImg}
// //                     alt="profile"
// //                     className="w-10 h-10 rounded-full border"
// //                   />
// //                 </>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       {/* </Container> */}
// //     </div>
// //   );
// // };

// // export default Navbar;


// import { useContext, useEffect, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";

// // Auth Context
// //import { AuthContext } from "../../providers/AuthContext";

// // Icons
// import {
//   Menu,
//   X,
//   LogOut,
//   LayoutDashboard,
//   UserCircle,
//   CookingPot,
// } from "lucide-react";
// import { IoHome } from "react-icons/io5";
// import Swal from "sweetalert2";
// import Logo from "./Logo";
// import { AuthContext } from "../../providers/AuthContext";


// export default function Navbar() {
//   const { user, logOut } = useContext(AuthContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const userDropdownRef = useRef(null);

//   // Logout handler
//   const handleSignOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: user?.displayName
//         ? `${user.displayName}, you will be logged out!`
//         : "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#f97316",
//       cancelButtonColor: "#ef4444",
//       confirmButtonText: "Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logOut()
//           .then(() => {
//             Swal.fire("Logged out!", "See you again 👋", "success");
//             navigate("/login");
//           })
//           .catch((error) => console.log(error));
//       }
//     });
//   };

//   // Public menu
//   const menuItems = [
//     { name: "Home", path: "/", icon: IoHome },
//     { name: "Meals", path: "/meals", icon: CookingPot },
//   ];

//   // User dropdown menu
//   const userMenuItems = [
//     { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         userDropdownRef.current &&
//         !userDropdownRef.current.contains(event.target)
//       ) {
//         setUserDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Active link checker
//   const isActive = (path) => {
//     if (path === "/") return location.pathname === "/";
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <header className="bg-gray shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <Logo />
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`flex items-center font-medium transition-colors ${
//                     isActive(item.path)
//                       ? "text-orange-500"
//                       : "text-gray-700 hover:text-orange-500"
//                   }`}
//                 >
//                   <Icon className="w-4 h-4 mr-1" />
//                   {item.name}
//                 </Link>
//               );
//             })}

//             {user && (
//               <Link
//                 to="/dashboard"
//                 className={`flex items-center font-medium transition-colors ${
//                   isActive("/dashboard")
//                     ? "text-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`}
//               >
//                 <LayoutDashboard className="w-4 h-4 mr-1" />
//                 Dashboard
//               </Link>
//             )}
//           </nav>

//           {/* Right Section */}
//           <div className="flex items-center space-x-4">
//             {/* Desktop Auth */}
//             <div className="hidden sm:block relative" ref={userDropdownRef}>
//               {user ? (
//                 <>
//                   <button
//                     onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   >
//                     <img
//                       src={
//                         user.photoURL ||
//                         "https://i.ibb.co/8xM1d0B/avatar.png"
//                       }
//                       alt="User"
//                       className="w-10 h-10 rounded-full border"
//                     />
//                   </button>

//                   {userDropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
//                       {userMenuItems.map((item) => {
//                         const Icon = item.icon;
//                         return (
//                           <Link
//                             key={item.name}
//                             to={item.path}
//                             onClick={() => setUserDropdownOpen(false)}
//                             className="flex items-center px-4 py-2 hover:bg-orange-50"
//                           >
//                             <Icon className="w-5 h-5 mr-2" />
//                             {item.name}
//                           </Link>
//                         );
//                       })}

//                       <button
//                         onClick={handleSignOut}
//                         className="w-full flex items-center px-4 py-2 text-orange-500 hover:bg-orange-50"
//                       >
//                         <LogOut className="w-5 h-5 mr-2" />
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="space-x-2">
//                   <Link
//                     to="/login"
//                     className="bg-orange-500 text-white px-4 py-2 rounded font-semibold"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold"
//                   >
//                     Register
//                   </Link>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden"
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center px-4 py-2"
//                 >
//                   <Icon className="w-5 h-5 mr-2" />
//                   {item.name}
//                 </Link>
//               );
//             })}

//             {user && (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className="flex items-center px-4 py-2"
//                 >
//                   <LayoutDashboard className="w-5 h-5 mr-2" />
//                   Dashboard
//                 </Link>

//                 <button
//                   onClick={handleSignOut}
//                   className="flex items-center px-4 py-2 text-orange-500"
//                 >
//                   <LogOut className="w-5 h-5 mr-2" />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
//import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const handleLogout = () => {
        logOut().catch((error) => toast.error("Logout Error:", error));
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/meals" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    All Meals
                </NavLink>
            </li>
            <li>
                <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Contact Us
                </NavLink>
            </li>
            <li>
                <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    About Us
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/dashboard/myProfile" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-secondary shadow-sm sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-3">
                {/* LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <Link to={"/"}>
                        <img src={logo} alt="logo" className="w-20 h-8 sm:w-24 sm:h-10" />
                    </Link>
                </div>

                {/* CENTER (Desktop Only) */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal gap-4">{links}</ul>
                </div>

                {/* RIGHT (Desktop Only) */}
                <div className="navbar-end hidden md:flex items-center gap-3">
                    <label>
                        <input type="checkbox" className="toggle toggle-sm md:toggle-md" onChange={handleThemeToggle} checked={theme === "dark"} />
                    </label>

                    {user ? (
                        <>
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                                <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" title={user?.displayName} />
                            </div>

                            <button onClick={handleLogout} className="btn btn-sm md:btn-md btn-outline rounded-xl">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-sm md:btn-md btn-outline rounded-xl">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-sm md:btn-md btn-primary rounded-xl text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE SECTION */}
                <div className="navbar-end flex md:hidden items-center gap-2 ml-auto">
                    {/* Mobile User Image */}
                    {user && (
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                            <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" title={user?.displayName} />
                        </div>
                    )}

                    {/* Mobile Dropdown */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm min-h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-50">
                            {links}

                            <label className="ml-3 mt-2 flex items-center gap-2">
                                <input type="checkbox" className="toggle toggle-sm" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </label>

                            {user ? (
                                <li className="mt-2">
                                    <button onClick={handleLogout} className="btn btn-sm btn-outline w-full rounded-xl">
                                        Log Out
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="mt-2">
                                        <Link to="/login" className="btn btn-sm btn-outline w-full rounded-xl">
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="btn btn-sm btn-primary w-full mt-2 rounded-xl text-white">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;