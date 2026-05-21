import React, { useEffect } from 'react';

const NewHero = () => {
    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.pageYOffset;
            const heroBg = document.querySelector('.hero-bg-transform');
            if (heroBg) {
                heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative h-[870px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div 
                    className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center hero-bg-transform" 
                    title="A warm, sun-drenched artisanal kitchen scene with rustic wooden countertops, copper cookware, and fresh organic herbs hanging to dry."
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-container-padding w-full">
                <div className="max-w-2xl">
                    <span className="inline-block px-4 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full font-label-lg mb-6">Local & Fresh</span>
                    <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">Taste of the <br/><span className="text-primary italic">Neighborhood</span></h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
                        Discover artisanal kitchens and farm-fresh treasures right next door. We bring the community's best culinary talents directly to your table.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-primary text-on-primary rounded-lg font-label-lg text-lg shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                            Explore Today
                        </button>
                        <button className="px-8 py-4 bg-surface border border-outline-variant text-on-surface-variant rounded-lg font-label-lg text-lg hover:bg-surface-container-low transition-all active:scale-95">
                            View Markets
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewHero;
