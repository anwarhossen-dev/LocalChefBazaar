import React from "react";
import { Link } from "react-router";
import logo from "../../assets/Logo1.png";
import FooterOrchestrator from "../Dashboard/Footer/FooterOrchestrator";
import Container from "./Container";
import { motion as Motion } from "framer-motion";

const Footer = () => {
    return (
        <FooterOrchestrator>
            {({ data }) => (
                <footer className="bg-slate-950 text-white pt-24 pb-12 overflow-hidden relative">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/20 blur-[120px] rounded-full -mt-[150px] pointer-events-none"></div>

                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
                            {/* Brand Section */}
                            <div className="space-y-8">
                                <Link to="/" className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                                        <img src={logo} alt="logo" className="w-8 h-8 object-contain brightness-0 invert" />
                                    </div>
                                    <span className="text-2xl font-black tracking-tighter">ChefBazaar</span>
                                </Link>
                                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                    Crafting authentic culinary connections between local artisans and passionate food lovers.
                                </p>
                                <div className="flex items-center gap-4">
                                    {data.socials.map((social, idx) => (
                                        <Motion.a
                                            key={idx}
                                            href={social.url}
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${social.color}`}
                                        >
                                            <social.icon size={18} />
                                        </Motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Navigation</h3>
                                <ul className="space-y-4">
                                    {data.navigation.map((link, idx) => (
                                        <li key={idx}>
                                            <Link to={link.path} className="text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Support</h3>
                                <ul className="space-y-4">
                                    {data.support.map((link, idx) => (
                                        <li key={idx}>
                                            <Link to={link.path} className="text-slate-400 hover:text-white font-bold transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter / Contact */}
                            <div className="space-y-8">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8">Contact Us</h3>
                                <div className="space-y-4 text-slate-400 font-bold">
                                    <p className="hover:text-white transition-colors cursor-pointer">{data.contact.email}</p>
                                    <p className="hover:text-white transition-colors cursor-pointer">{data.contact.phone}</p>
                                    <p>{data.contact.address}</p>
                                </div>
                                <div className="pt-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex">
                                        <input 
                                            type="text" 
                                            placeholder="Join the waitlist" 
                                            className="bg-transparent border-none outline-none px-4 py-2 text-sm font-bold flex-1"
                                        />
                                        <button className="bg-primary text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                            <p className="text-slate-500 text-sm font-bold">
                                © {new Date().getFullYear()} Local Chef Bazaar. Built with ❤️ for artisans.
                            </p>
                            <div className="flex items-center gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
                                <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
                                <span className="hover:text-primary cursor-pointer transition-colors">Twitter</span>
                                <span className="hover:text-primary cursor-pointer transition-colors">Dribbble</span>
                            </div>
                        </div>
                    </Container>
                </footer>
            )}
        </FooterOrchestrator>
    );
};

export default Footer;