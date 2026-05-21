import React from 'react';
import { motion as Motion } from 'framer-motion';

const PromoBanner = () => {
    return (
        <section className="container mx-auto px-6 py-10">
            <div className="relative rounded-[2.5rem] overflow-hidden h-[300px] md:h-[400px] shadow-xl group">
                <img 
                    src="https://images.unsplash.com/photo-1543083477-4f775bfda398?auto=format&fit=crop&q=80&w=2070"
                    alt="Fresh organic fruits and vegetables on display, promoting a special weekend offer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" // Changed duration
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-[0.3em] mb-4">
                            Special Weekend Offer
                        </h3>
                        <h2 className="text-white text-4xl md:text-6xl font-black mb-6">
                            Get Up To <span className="text-green-400">25% OFF</span> <br /> 
                            On All Organic Fruits
                        </h2>
                        <button className="bg-green-600 text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-green-600 transition-all duration-300 shadow-2xl active:scale-95">
                            Claim Discount Now
                        </button>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;