import React from 'react';
import { motion as Motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, secondaryValue, secondaryLabel }) => {
    return (
        <Motion.div 
            whileHover={{ y: -5 }}
            className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 group ${colorClass}`}
        >
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {Icon && <Icon className="text-2xl" />}
            </div>
            <div>
                <div className="text-slate-500 font-medium text-sm">{title}</div>
                <div className="text-3xl font-black text-slate-800">{value}</div>
                {secondaryValue && (
                    <div className="text-xs text-slate-400 mt-1 font-medium">
                        {secondaryLabel}: {secondaryValue}
                    </div>
                )}
            </div>
        </Motion.div>
    );
};

export default StatCard;
