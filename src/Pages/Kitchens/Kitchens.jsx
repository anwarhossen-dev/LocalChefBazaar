import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../../Components/Shared/Container';
import SectionHeader from '../../Components/UI/Primitives/SectionHeader';
import KitchenOrchestrator from '../../Components/Dashboard/Kitchens/KitchenOrchestrator';
import PremiumCard from '../../Components/UI/Primitives/PremiumCard';
import { FaMapMarkerAlt, FaStar, FaArrowRight, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Shared/Loading';

const Kitchens = () => {
    return (
        <KitchenOrchestrator>
            {({ kitchens, isLoading, isError, searchTerm, setSearchTerm, selectedArea, setSelectedArea, areas }) => {
                if (isLoading) return <Loading />;

                return (
                    <div className="min-h-screen bg-slate-50/50 py-16 md:py-24">
                        <Helmet>
                            <title>Artisan Kitchens | Local Chef Bazaar</title>
                        </Helmet>

                        <Container>
                            {/* Header */}
                            <div className="mb-20">
                                <SectionHeader 
                                    title="Our Local" 
                                    highlight="Artisan Kitchens" 
                                    subtitle="Meet the talented creators behind your favorite meals. Every kitchen has a story, every chef has a secret ingredient."
                                />
                            </div>

                            {/* Controls */}
                            <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <input 
                                        type="text"
                                        placeholder="Search by kitchen name or location..."
                                        className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-slate-700"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select 
                                    className="w-full md:w-64 bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-500 appearance-none cursor-pointer"
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                >
                                    {areas.map(area => (
                                        <option key={area} value={area}>
                                            {area === 'all' ? 'Every Location' : area}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Grid */}
                            {isError || kitchens.length === 0 ? (
                                <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                                    <div className="text-6xl mb-6">🍳</div>
                                    <h3 className="text-2xl font-black text-slate-800">No Kitchens Found</h3>
                                    <p className="text-slate-400 mt-2 font-medium">Try adjusting your filters or check back later.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                    {kitchens.map((kitchen, idx) => (
                                        <PremiumCard key={kitchen.id} delay={idx * 0.1}>
                                            <div className="relative h-64 overflow-hidden">
                                                <img 
                                                    src={kitchen.image || "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800"} 
                                                    alt={kitchen.name} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                                                    <FaStar className="text-amber-400" />
                                                    <span className="font-black text-slate-800">{kitchen.rating}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="p-8">
                                                <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-primary transition-colors">
                                                    {kitchen.name}
                                                </h3>
                                                
                                                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                                                    {kitchen.description}
                                                </p>

                                                <div className="flex items-center justify-between py-6 border-t border-slate-50">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</span>
                                                        <div className="flex items-center gap-1.5 text-slate-700 font-bold mt-1">
                                                            <FaMapMarkerAlt className="text-rose-500" />
                                                            {kitchen.deliveryArea}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col text-right">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</span>
                                                        <span className="text-slate-700 font-bold mt-1">{kitchen.experience} Years</span>
                                                    </div>
                                                </div>

                                                <Link 
                                                    to="/meals" 
                                                    className="w-full bg-slate-950 hover:bg-primary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-slate-100"
                                                >
                                                    View Menu <FaArrowRight />
                                                </Link>
                                            </div>
                                        </PremiumCard>
                                    ))}
                                </div>
                            )}
                        </Container>
                    </div>
                );
            }}
        </KitchenOrchestrator>
    );
};

export default Kitchens;
