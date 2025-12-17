import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
import useAuth from "../../Hooks/useAuth";

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
        logOut().catch((error) => console.error("Logout Error:", error));
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