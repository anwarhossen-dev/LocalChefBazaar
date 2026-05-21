// d:/B12-assigment-11/LocalChefBazaar/src/Components/Shared/MobileBottomNav.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { Home, Utensils, ShoppingBag, User } from 'lucide-react';
import { CartContext } from '../../providers/CartContext';
import { AuthContext } from '../../providers/AuthContext';

const MobileBottomNav = () => {
    const { setIsCartOpen, cartCount } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-[140] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
            {/* Home */}
            <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                <Home size={22} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
            </NavLink>

            {/* Shop/Meals */}
            <NavLink to="/meals" className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                <Utensils size={22} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Meals</span>
            </NavLink>

            {/* Cart Toggle */}
            <button 
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center gap-1 text-gray-400 relative active:scale-90 transition-transform"
            >
                <div className="relative">
                    <ShoppingBag size={22} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Bag</span>
            </button>

            {/* Account */}
            <NavLink to={user ? "/dashboard/myProfile" : "/login"} className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                <User size={22} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
            </NavLink>
        </div>
    );
};

export default MobileBottomNav;