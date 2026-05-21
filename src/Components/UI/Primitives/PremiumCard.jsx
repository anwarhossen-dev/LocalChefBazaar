import React from 'react';
import { motion as Motion } from 'framer-motion';

const PremiumCard = ({ children, className = "", delay = 0 }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.8, 
                delay, 
                type: "spring", 
                stiffness: 50 
            }}
            whileHover={{ y: -10 }}
            className={`bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden group transition-shadow duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] ${className}`}
        >
            {children}
        </Motion.div>
    );
};

export default PremiumCard;
