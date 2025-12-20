

import React, { useEffect, useState } from "react";
import { GoListOrdered, GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
//import logo from "../../assets/logo1.png";
import Logo from "../assets/logo.png";
import { FaUser, FaUsersSlash } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useRole from "../../Hooks/useRole";
import { LuListEnd } from "react-icons/lu";
import { MdNoMeals } from "react-icons/md";
import { GiHotMeal, GiMeal } from "react-icons/gi";
import { VscPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { Helmet } from "react-helmet";
//import Aos from "aos";
import "aos/dist/aos.css";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Aos from "aos";
import { toast } from "react-toastify";
const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast("Logged out successfully");
                toast("Logged out successfully");
                navigate("/");
            })
            .catch((error) => console.error("Logout Error:", error));
    };
    return (
        <div className="drawer lg:drawer-open min-h-screen max-w-7xl mx-auto" data-aos="fade-in">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 shahdow-md flex justify-between px-2 sm:px-4">
                    <div className="flex items-center justify-center">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost btn-sm sm:btn-md min-h-11">
                            {/* Sidebar toggle icon */}
                            <GoSidebarCollapse className="text-lg sm:text-xl" />
                        </label>
                        <div className="px-2 sm:px-4 text-sm sm:text-base font-semibold">Local Chef Bazar</div>
                    </div>

                    <div className="relative flex items-center gap-2 sm:gap-3 pr-2 sm:pr-5">
                        <label>
                            <input type="checkbox" className="toggle toggle-sm sm:toggle-md" onChange={handleThemeToggle} checked={theme === "dark"} />
                        </label>
                        <img src={user?.photoURL} alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300" />
                        <div className="text-left hidden sm:block">
                            <p className="font-semibold text-sm">{user?.displayName}</p>
                            <p className="text-xs text-gray-500">{role}</p>
                        </div>
                    </div>
                </nav>

                {/* Page content here */}
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-40">
                    {/* Sidebar content here */}
                    <ul className="menu">
                        <li>
                            <Link to={"/"}>
                                <img src={Logo} alt="logo" className="w-24 h-10 mx-auto mb-4 is-drawer-close:hidden" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-20" data-tip="Homepage">
                                <IoHomeOutline className="text-xl" />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard/myProfile"
                                data-tip="My-Profile"
                                className={({ isActive }) =>
                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                }
                            >
                                <FaUser className="text-xl" />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </NavLink>
                        </li>
                        {role === "admin" && (
                            <>
                                <li>
                                    <NavLink
                                        to={"/dashboard/manageUsers"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Manage Users"
                                    >
                                        <FaUsersSlash className="text-xl" />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/manageRequests"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Manage Requests"
                                    >
                                        <CiSquareQuestion className="text-xl" />
                                        <span className="is-drawer-close:hidden">Manage Requests</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/Statistics"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Plateform Statistics"
                                    >
                                        <FcStatistics className="text-xl" />
                                        <span className="is-drawer-close:hidden">Plateform Statistics</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {role === "user" && (
                            <>
                                <li>
                                    <NavLink
                                        to={"/dashboard/myOrders"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="My Orders"
                                    >
                                        <GoListOrdered className="text-xl" />
                                        <span className="is-drawer-close:hidden">My Orders</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/myReview"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="My Review"
                                    >
                                        <VscPreview className="text-xl" />
                                        <span className="is-drawer-close:hidden">My Review</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/favouriteMeal"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Favourite Meal"
                                    >
                                        <GiMeal className="text-xl" />
                                        <span className="is-drawer-close:hidden">Favourite Meal</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {role === "chef" && (
                            <>
                                <li>
                                    <NavLink
                                        to={"/dashboard/createMeal"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Create Meal"
                                    >
                                        <GiHotMeal className="text-xl" />
                                        <span className="is-drawer-close:hidden">Create Meal</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/myMeals"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="My Meal"
                                    >
                                        <MdNoMeals className="text-xl" />
                                        <span className="is-drawer-close:hidden">My Meal</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/dashboard/orderRequests"}
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2 flex items-center gap-2 
      ${isActive ? "bg-orange-500 text-white font-semibold rounded-lg" : ""}`
                                        }
                                        data-tip="Order Requests"
                                    >
                                        <LuListEnd className="text-xl" />
                                        <span className="is-drawer-close:hidden">Order Requests</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <li>
                            <Link onClick={handleLogout} className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-10" data-tip="LogOut">
                                <TbLogout2 className="text-xl" />
                                <span className="is-drawer-close:hidden">LogOut</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;