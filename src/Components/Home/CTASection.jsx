import React from 'react';

const CTASection = () => {
    return (
        <section className="py-stack-lg px-container-padding mb-10">
            <div className="max-w-7xl mx-auto bg-primary text-on-primary rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                <h2 className="font-display-lg text-display-lg mb-6 relative z-10 leading-tight">Start Your Culinary Journey</h2>
                <p className="font-body-lg text-lg mb-10 max-w-2xl mx-auto opacity-90 relative z-10">Sign up to get notified about secret pop-up dinners and new artisanal kitchens opening in your neighborhood.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
                    <label htmlFor="email-subscribe" className="sr-only">Enter your email</label>
                    <input 
                        id="email-subscribe"
                        className="px-8 py-4 rounded-lg bg-on-primary/10 border border-on-primary/20 text-on-primary placeholder:text-on-primary/60 focus:ring-2 focus:ring-white/50 w-full sm:w-80 outline-none" 
                        placeholder="Enter your email"
                        type="email"
                    />
                    <button className="px-10 py-4 bg-white text-primary rounded-lg font-bold hover:bg-surface transition-all active:scale-95 w-full sm:w-auto">Subscribe</button>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
