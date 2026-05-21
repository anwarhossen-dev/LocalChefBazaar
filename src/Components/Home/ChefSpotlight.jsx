import React from 'react';
import { FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import PremiumCard from '../UI/Primitives/PremiumCard';
import TextReveal from '../UI/Primitives/TextReveal';
import FloatingElement from '../UI/Primitives/FloatingElement';
import Container from '../Shared/Container';

const ChefSpotlight = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left: Chef Visual */}
                    <div className="w-full lg:w-1/2 relative">
                        <FloatingElement y={15} duration={5}>
                            <PremiumCard className="aspect-[4/5] relative z-10">
                                <img 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=1000" 
                                    alt="Chef in action"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-white font-black uppercase tracking-widest text-xs">Master of the Hearth</span>
                                </div>
                            </PremiumCard>
                        </FloatingElement>

                        {/* Floating Decorative Label */}
                        <div className="absolute -bottom-10 -right-10 hidden md:block z-20">
                            <FloatingElement delay={1} y={20}>
                                <div className="bg-slate-900 text-white p-10 rounded-full shadow-2xl flex flex-col items-center justify-center w-40 h-40 border-8 border-white">
                                    <span className="text-3xl font-black">20+</span>
                                    <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-none mt-1">Years of <br/> Excellence</span>
                                </div>
                            </FloatingElement>
                        </div>
                    </div>

                    {/* Right: Chef Story */}
                    <div className="w-full lg:w-1/2">
                        <TextReveal>
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-sm mb-6 block">Chef of the Month</span>
                        </TextReveal>
                        
                        <TextReveal delay={0.1}>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-8 leading-tight">
                                Julian <br /> <span className="text-primary">Rossi</span>
                            </h2>
                        </TextReveal>

                        <div className="mb-10 relative">
                            <FaQuoteLeft className="text-primary/10 text-8xl absolute -top-10 -left-10 -z-10" />
                            <p className="text-2xl md:text-3xl italic text-slate-600 leading-relaxed font-medium">
                                "Great food starts with the soil. If we respect the ingredient's origin, the flavor takes care of itself."
                            </p>
                        </div>

                        <p className="text-lg text-slate-500 mb-12 leading-relaxed max-w-xl">
                            A pioneer of the 'Hyper-Local' movement, Julian has spent two decades refining the art of slow-fermented grains and heritage cooking. His kitchen has become a pilgrimage site for those seeking the true taste of the region.
                        </p>

                        <button className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-primary transition-all active:scale-95 shadow-xl shadow-slate-200">
                            Read Full Story 
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ChefSpotlight;
