import React from "react";
import bannerImage from "../../assets/banner/About121.jpg";

const HeroOverlay = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 my-6 sm:my-8 md:my-10">
            <div
                className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 z-10">
                    <h2 className="text-xs sm:text-sm font-bold text-secondary mb-2 sm:mb-3 md:mb-4">Our Restaurant</h2>

                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4 sm:mb-5 md:mb-6">
                        A culinary <br /> adventure for all <br /> the senses
                    </p>

                    <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto max-w-[200px] min-h-[44px]">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default HeroOverlay;