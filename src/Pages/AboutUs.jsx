import React from "react";
import PageTransition from "../Components/Shared/PageTransition";
import { FaUtensils, FaUsers, FaHeart } from "react-icons/fa";

const AboutUs = () => {
    return (
        <PageTransition>
            <div className="pt-28 pb-20 bg-base-100 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                        Our Story
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        ChefBazaar started with a simple idea: that the best food isn't found in factories, but in the kitchens of passionate local chefs.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section className="bg-slate-50 dark:bg-slate-800/50 py-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold">Connecting Kitchens to Communities</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                We are building a world where everyone has access to healthy, home-cooked meals while empowering local culinary artists to turn their passion into a sustainable business.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-4 bg-primary/10 rounded-2xl">
                                    <FaUtensils className="text-primary text-2xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Authentic Flavors</h4>
                                    <p className="text-slate-500">Every dish is prepared using traditional recipes and fresh ingredients.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-primary/20 rounded-[3rem] rotate-3 absolute inset-0 -z-10"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800" 
                                alt="Chef cooking" 
                                className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaHeart />, title: "Made with Love", desc: "Our chefs treat every order like they are cooking for their own family." },
                            { icon: <FaUsers />, title: "Community First", desc: "Supporting local economies and fostering connections through food." },
                            { icon: <FaUtensils />, title: "Zero Compromise", desc: "We maintain the highest standards of hygiene and ingredient quality." }
                        ].map((val, i) => (
                            <div key={i} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform">
                                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-primary/30">
                                    {val.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default AboutUs;