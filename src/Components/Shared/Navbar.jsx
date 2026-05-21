import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const handleLogout = () => {
        logOut().catch((error) => toast.error("Logout Error: " + error.message));
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/meals" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                    Meals
                </NavLink>
            </li>
            <li>
                <NavLink to="/kitchens" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                    Kitchens
                </NavLink>
            </li>
            <li>
                <NavLink to="/blog" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                    Blog
                </NavLink>
            </li>
            <li>
                <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                    Contact
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/dashboard/myProfile" className={({ isActive }) => (isActive ? "text-primary font-black scale-110 px-4 transition-all" : "px-4 font-bold text-slate-600 hover:text-primary transition-all")}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2 px-4' : 'py-6 px-6'}`}>
            <div className={`navbar max-w-7xl mx-auto rounded-[2.5rem] transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-2xl shadow-slate-200/50 border border-white/20' : 'bg-transparent'}`}>
                {/* LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <Link to={"/"} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                            <img src={logo} alt="logo" className="w-6 h-6 object-contain brightness-0 invert" />
                        </div>
                        <span className={`text-xl font-black tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-slate-800' : 'text-slate-800'}`}>ChefBazaar</span>
                    </Link>
                </div>

                {/* CENTER (Desktop Only) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2">{links}</ul>
                </div>

                {/* RIGHT (Desktop Only) */}
                <div className="navbar-end hidden lg:flex items-center gap-6">
                    <label className="swap swap-rotate text-slate-600 hover:text-primary transition-colors">
                        <input type="checkbox" onChange={handleThemeToggle} checked={theme === "dark"} />
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71,.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.707.293,1,1,0,0,0,.707-1.707l-.71-.71A1,1,0,0,0,4.93,6.34Zm12.72,9.9a1,1,0,0,0-.71,.71l.71,.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5ZM18.36,7.05l.71-.71a1,1,0,1,0-1.41-1.41l-.71,.71a1,1,0,0,0,1.41,1.41ZM19,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-1,6.34a1,1,0,0,0-1.41,0l-.71,.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,18.36,17.34Z"/></svg>
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.05,0,0,1,9.08,5.49a8.59,8.15,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    </label>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/20">
                                <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" title={user?.displayName} />
                            </div>
                            <button onClick={handleLogout} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-black text-sm hover:bg-primary transition-all active:scale-95">
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="font-black text-sm text-slate-800 hover:text-primary transition-colors">Sign In</Link>
                            <Link to="/register" className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>

                {/* MOBILE SECTION */}
                <div className="navbar-end flex lg:hidden items-center gap-4">
                    {user && (
                        <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/20">
                            <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" title={user?.displayName} />
                        </div>
                    )}

                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-6 shadow-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] w-80 border border-slate-100 gap-4">
                            {links}
                            <div className="divider opacity-10"></div>
                            <div className="flex items-center justify-between px-4">
                                <span className="font-bold text-slate-500 text-sm">Theme</span>
                                <input type="checkbox" className="toggle toggle-primary" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </div>
                            {user ? (
                                <li><button onClick={handleLogout} className="btn btn-primary rounded-2xl text-white font-black mt-4">Log Out</button></li>
                            ) : (
                                <div className="flex flex-col gap-2 mt-4">
                                    <Link to="/login" className="btn btn-ghost rounded-2xl font-black">Sign In</Link>
                                    <Link to="/register" className="btn btn-primary rounded-2xl text-white font-black">Join Now</Link>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
