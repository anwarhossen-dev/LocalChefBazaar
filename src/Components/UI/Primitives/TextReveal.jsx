import React from 'react';
import { motion as Motion } from 'framer-motion';

const TextReveal = ({ children, className = "", delay = 0 }) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <Motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.8, 
                    delay, 
                    ease: [0.16, 1, 0.3, 1] 
                }}
            >
                {children}
            </Motion.div>
        </div>
    );
};

export default TextReveal;
