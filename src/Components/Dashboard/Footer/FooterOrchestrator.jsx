import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';

const footerData = {
    navigation: [
        { label: "Home", path: "/" },
        { label: "All Meals", path: "/meals" },
        { label: "Our Story", path: "/aboutUs" },
        { label: "Culinary Blog", path: "/blog" },
        { label: "Contact Us", path: "/contactUs" }
    ],
    support: [
        { label: "Help Center", path: "/contactUs" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Delivery Areas", path: "/contactUs" }
    ],
    contact: {
        email: "hello@chefbazaar.com",
        phone: "+880 1777 498 421",
        address: "Chattogram, Bangladesh"
    },
    socials: [
        { icon: FaFacebookF, url: "https://facebook.com", color: "hover:bg-blue-600" },
        { icon: FaInstagram, url: "https://instagram.com", color: "hover:bg-pink-600" },
        { icon: FaTwitter, url: "https://twitter.com", color: "hover:bg-sky-500" },
        { icon: FaLinkedinIn, url: "https://linkedin.com", color: "hover:bg-blue-700" },
        { icon: FaGithub, url: "https://github.com", color: "hover:bg-slate-900" }
    ]
};

const FooterOrchestrator = ({ children }) => {
    return children({ data: footerData });
};

export default FooterOrchestrator;
