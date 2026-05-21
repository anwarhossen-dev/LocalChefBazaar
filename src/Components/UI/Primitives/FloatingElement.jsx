import React from 'react';
import { motion as Motion } from 'framer-motion';

const FloatingElement = ({ children, duration = 4, delay = 0, y = 20 }) => {
    return (
        <Motion.div
            animate={{
                y: [0, -y, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay
            }}
        >
            {children}
        </Motion.div>
    );
};

export default FloatingElement;
