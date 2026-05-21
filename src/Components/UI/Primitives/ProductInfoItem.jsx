import React from 'react';

const ProductInfoItem = ({ icon: Icon, label, value, colorClass = "text-slate-400" }) => {
    return (
        <div className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${colorClass} group-hover:scale-110 transition-transform`}>
                {Icon && <Icon size={18} />}
            </div>
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</div>
                <div className="text-base font-bold text-slate-700">{value || "N/A"}</div>
            </div>
        </div>
    );
};

export default ProductInfoItem;
