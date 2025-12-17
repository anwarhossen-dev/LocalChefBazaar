import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";

const ContactUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
            {/* ✅ Page Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">Contact Us</h1>

            {/* ✅ Contact Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt /> Address
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">Dhaka, Bangladesh</p>
                </div>

                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <IoCallOutline /> Phone
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">+880 1234 567 890</p>
                </div>

                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <HiOutlineMailOpen /> Email
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">support@localchefbazaar.com</p>
                </div>
            </div>

            {/* ✅ Contact Form */}
            <div
                className="max-w-2xl mx-auto text-black bg-[#d8e6d5] p-4 sm:p-6 md:p-8 rounded-xl shadow-md 
                            transition-all duration-300 hover:shadow-xl"
            >
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Send Us a Message</h2>

                <form className="space-y-4 sm:space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full border border-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5
                                       focus:outline-none transition-all duration-300 text-sm sm:text-base
                                        focus:border-primary min-h-[44px]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full border border-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5
                                       focus:outline-none transition-all duration-300 text-sm sm:text-base
                                        focus:border-primary min-h-[44px]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            rows="5"
                            placeholder="Write your message..."
                            className="w-full border border-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5
                                       focus:outline-none transition-all duration-300 text-sm sm:text-base
                                        focus:border-primary"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#00382f] text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base
                                   transition-all duration-300 hover:bg-[#00473d] min-h-[44px]"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* ✅ Working Hours */}
            <div className="text-center mt-10 sm:mt-12 opacity-80">
                <h3 className="text-base sm:text-lg font-semibold mb-2">🕒 Working Hours</h3>
                <p className="text-sm sm:text-base">Mon – Fri: 9 AM – 10 PM</p>
                <p className="text-sm sm:text-base">Saturday: 10 AM – 11 PM</p>
                <p className="text-sm sm:text-base">Sunday: Closed</p>
            </div>
        </div>
    );
};

export default ContactUs;