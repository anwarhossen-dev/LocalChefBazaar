import React from "react";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo3.png";

const Footer = () => {
    return (
        <footer className="w-full py-8 md:py-12 bg-secondary shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
                {/* ✅ 1. Logo + Description */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <Link to="/">
                        <img src={logo} alt="Website Logo" className="w-24 sm:w-28 mb-3" />
                    </Link>
                    <p className="opacity-90 text-xs sm:text-sm leading-relaxed max-w-xs">LocalChefBazaar — discover homemade meals, local chefs, and authentic flavors crafted with love.</p>
                </div>

                {/* ✅ 2. Routes */}
                <div className="text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold mb-3">Routes</h3>
                    <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/aboutUs" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactUs" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/chefs" className="hover:underline">
                                Chefs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* ✅ 3. Working Hours */}
                <div className="text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold mb-3">Working Hours</h3>
                    <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                        <li>Mon – Fri: 9 AM – 10 PM</li>
                        <li>Saturday: 10 AM – 11 PM</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>

                {/* ✅ 4. Contact Details */}
                <div className="text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                        <li>Email: support@localchefbazaar.com</li>
                        <li>Phone: +880 1234 567 821</li>
                        <li>Address: chattogram, Bangladesh</li>
                    </ul>
                </div>

                {/* ✅ 5. Social Links */}
                <div className="text-center sm:text-left">
                    <h3 className="text-base md:text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex flex-col gap-2 md:gap-3 items-center sm:items-start">
                        <a href="#" className="flex items-center gap-2 hover:opacity-80 min-h-[44px]">
                            <FaFacebookSquare className="text-2xl md:text-3xl" />
                            <span className="text-sm md:text-lg font-semibold">Facebook</span>
                        </a>

                        <a href="#" className="flex items-center gap-2 hover:opacity-80 min-h-[44px]">
                            <FaGithubSquare className="text-2xl md:text-3xl" />
                            <span className="text-sm md:text-lg font-semibold">GitHub</span>
                        </a>

                        <a href="#" className="flex items-center gap-2 hover:opacity-80 min-h-[44px]">
                            <FaLinkedin className="text-2xl md:text-3xl" />
                            <span className="text-sm md:text-lg font-semibold">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ✅ Divider */}
            <div className="border border-gray-400 mt-6 md:mt-8 w-full max-w-7xl mx-auto px-4"></div>

            {/* ✅ Bottom Section */}
            <div className="text-center mt-4 text-xs sm:text-sm opacity-70">© {new Date().getFullYear()} LocalChefBazaar — All Rights Reserved.</div>
        </footer>
    );
};

export default Footer;