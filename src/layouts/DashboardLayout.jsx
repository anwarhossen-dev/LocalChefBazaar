

import { useEffect, useState } from "react";
import { GoListOrdered, GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline, IoRestaurantOutline } from "react-icons/io5";
import { TbLogout2, TbReportAnalytics } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../assets/Logo.png";
import { 
    FaUser, FaUsersSlash, FaCashRegister, FaUtensils, 
    FaCalendarAlt, FaMotorcycle, FaTruck,
    FaUsers, FaMoneyBillWave, FaUndo
} from "react-icons/fa";
import { 
    MdInventory, MdAccountBalance,
    MdAttachMoney, MdBusiness, MdLoyalty, MdWebAsset,
    MdBackup, MdKitchen, MdTableRestaurant, MdNoMeals
} from "react-icons/md";
import { LuListEnd } from "react-icons/lu";
import { GiHotMeal, GiMeal } from "react-icons/gi";
import { VscPreview } from "react-icons/vsc";
import { CiSquareQuestion } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
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
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:overflow-visible is-drawer-close:w-16 is-drawer-open:w-72">
                    {/* Sidebar content here */}
                    <div className="w-full">
                        {/* Logo */}
                        <div className="p-4 border-b border-base-300">
                            <Link to={"/"}>
                                <img src={Logo} alt="logo" className="w-24 h-10 mx-auto is-drawer-close:hidden" />
                                <div className="is-drawer-open:hidden flex justify-center">
                                    <IoRestaurantOutline className="text-2xl text-primary" />
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Menu */}
                        <div className="overflow-y-auto h-[calc(100vh-120px)] p-2">
                            <ul className="menu menu-sm space-y-1">
                                {/* Dashboard Home */}
                                <li>
                                    <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                        <IoHomeOutline className="text-lg" />
                                        <span className="is-drawer-close:hidden">Homepage</span>
                                    </Link>
                                </li>

                                {/* Profile */}
                                <li>
                                    <NavLink
                                        to="/dashboard/myProfile"
                                        data-tip="My Profile"
                                        className={({ isActive }) =>
                                            `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                        }
                                    >
                                        <FaUser className="text-lg" />
                                        <span className="is-drawer-close:hidden">My Profile</span>
                                    </NavLink>
                                </li>

                                {/* Admin Features */}
                                {role === "admin" && (
                                    <>
                                        {/* Divider */}
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">ADMIN PANEL</div>
                                        </li>

                                        {/* POS System */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/pos"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="POS System"
                                            >
                                                <FaCashRegister className="text-lg" />
                                                <span className="is-drawer-close:hidden">POS System</span>
                                            </NavLink>
                                        </li>

                                        {/* Orders Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageOrders"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Orders Management"
                                            >
                                                <GoListOrdered className="text-lg" />
                                                <span className="is-drawer-close:hidden">Orders Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Kitchen Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/kitchen"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Kitchen Management"
                                            >
                                                <MdKitchen className="text-lg" />
                                                <span className="is-drawer-close:hidden">Kitchen Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Tables Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/tables"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Tables Management"
                                            >
                                                <MdTableRestaurant className="text-lg" />
                                                <span className="is-drawer-close:hidden">Tables Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Reservations */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/reservations"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Reservations"
                                            >
                                                <FaCalendarAlt className="text-lg" />
                                                <span className="is-drawer-close:hidden">Reservations</span>
                                            </NavLink>
                                        </li>

                                        {/* Menu Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/menu"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Menu Management"
                                            >
                                                <FaUtensils className="text-lg" />
                                                <span className="is-drawer-close:hidden">Menu Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Inventory Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/inventory"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Inventory Management"
                                            >
                                                <MdInventory className="text-lg" />
                                                <span className="is-drawer-close:hidden">Inventory Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Suppliers Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/suppliers"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Suppliers Management"
                                            >
                                                <FaTruck className="text-lg" />
                                                <span className="is-drawer-close:hidden">Suppliers Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Staff Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageUsers"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Staff Management"
                                            >
                                                <FaUsersSlash className="text-lg" />
                                                <span className="is-drawer-close:hidden">Staff Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Riders Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/riders"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Riders Management"
                                            >
                                                <FaMotorcycle className="text-lg" />
                                                <span className="is-drawer-close:hidden">Riders Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Customers Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/customers"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Customers Management"
                                            >
                                                <FaUsers className="text-lg" />
                                                <span className="is-drawer-close:hidden">Customers Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Financial Management */}
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">FINANCIAL</div>
                                        </li>

                                        {/* Payroll System */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/payroll"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Payroll System"
                                            >
                                                <FaMoneyBillWave className="text-lg" />
                                                <span className="is-drawer-close:hidden">Payroll System</span>
                                            </NavLink>
                                        </li>

                                        {/* Accounting */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/accounting"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Accounting"
                                            >
                                                <MdAccountBalance className="text-lg" />
                                                <span className="is-drawer-close:hidden">Accounting</span>
                                            </NavLink>
                                        </li>

                                        {/* Expenses */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/expenses"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Expenses Management"
                                            >
                                                <MdAttachMoney className="text-lg" />
                                                <span className="is-drawer-close:hidden">Expenses Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Reports & Analytics */}
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">ANALYTICS</div>
                                        </li>

                                        {/* Platform Statistics */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/Statistics"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Platform Statistics"
                                            >
                                                <FcStatistics className="text-lg" />
                                                <span className="is-drawer-close:hidden">Platform Statistics</span>
                                            </NavLink>
                                        </li>

                                        {/* Reports */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/reports"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Reports"
                                            >
                                                <TbReportAnalytics className="text-lg" />
                                                <span className="is-drawer-close:hidden">Reports (50+)</span>
                                            </NavLink>
                                        </li>

                                        {/* System Management */}
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">SYSTEM</div>
                                        </li>

                                        {/* Branches Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/branches"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Branches Management"
                                            >
                                                <MdBusiness className="text-lg" />
                                                <span className="is-drawer-close:hidden">Branches Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Loyalty Program */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/loyalty"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Loyalty Program"
                                            >
                                                <MdLoyalty className="text-lg" />
                                                <span className="is-drawer-close:hidden">Loyalty Program</span>
                                            </NavLink>
                                        </li>

                                        {/* Website Management */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/website"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Website Management"
                                            >
                                                <MdWebAsset className="text-lg" />
                                                <span className="is-drawer-close:hidden">Website Management</span>
                                            </NavLink>
                                        </li>

                                        {/* Database Backup */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/backup"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Database Backup"
                                            >
                                                <MdBackup className="text-lg" />
                                                <span className="is-drawer-close:hidden">Database Backup</span>
                                            </NavLink>
                                        </li>

                                        {/* Return Orders */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/returns"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Return Orders"
                                            >
                                                <FaUndo className="text-lg" />
                                                <span className="is-drawer-close:hidden">Return Orders</span>
                                            </NavLink>
                                        </li>

                                        {/* Manage Requests */}
                                        <li>
                                            <NavLink
                                                to="/dashboard/manageRequests"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Manage Requests"
                                            >
                                                <CiSquareQuestion className="text-lg" />
                                                <span className="is-drawer-close:hidden">Manage Requests</span>
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {/* User Features */}
                                {role === "user" && (
                                    <>
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">MY ACCOUNT</div>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/myOrders"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="My Orders"
                                            >
                                                <GoListOrdered className="text-lg" />
                                                <span className="is-drawer-close:hidden">My Orders</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/myReview"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="My Reviews"
                                            >
                                                <VscPreview className="text-lg" />
                                                <span className="is-drawer-close:hidden">My Reviews</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/favouriteMeal"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Favourite Meals"
                                            >
                                                <GiMeal className="text-lg" />
                                                <span className="is-drawer-close:hidden">Favourite Meals</span>
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {/* Chef Features */}
                                {role === "chef" && (
                                    <>
                                        <li className="is-drawer-close:hidden">
                                            <div className="divider divider-start text-xs font-bold text-base-content/60">CHEF PANEL</div>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/createMeal"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Create Meal"
                                            >
                                                <GiHotMeal className="text-lg" />
                                                <span className="is-drawer-close:hidden">Create Meal</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/myMeals"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="My Meals"
                                            >
                                                <MdNoMeals className="text-lg" />
                                                <span className="is-drawer-close:hidden">My Meals</span>
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink
                                                to="/dashboard/orderRequests"
                                                className={({ isActive }) =>
                                                    `is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive ? "bg-primary text-white" : ""}`
                                                }
                                                data-tip="Order Requests"
                                            >
                                                <LuListEnd className="text-lg" />
                                                <span className="is-drawer-close:hidden">Order Requests</span>
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Logout Button */}
                        <div className="p-4 border-t border-base-300">
                            <Link 
                                onClick={handleLogout} 
                                className="btn btn-ghost btn-sm w-full is-drawer-close:tooltip is-drawer-close:tooltip-right" 
                                data-tip="Logout"
                            >
                                <TbLogout2 className="text-lg" />
                                <span className="is-drawer-close:hidden">Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;