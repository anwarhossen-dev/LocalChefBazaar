import React from 'react';
import { motion as Motion } from 'framer-motion';

const SectionHeader = ({ title, highlight, subtitle, align = 'center' }) => {
    const isCenter = align === 'center';
    
    return (
        <div className={`space-y-6 ${isCenter ? 'text-center' : 'text-left'}`}>
            <Motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-tight tracking-tight"
            >
                {title} <br className="hidden md:block" />
                <span className="text-primary">{highlight}</span>
            </Motion.h2>
            
            {subtitle && (
                <Motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-3xl ${isCenter ? 'mx-auto' : ''}`}
                >
                    {subtitle}
                </Motion.p>
            )}
        </div>
    );
};

export default SectionHeader;
