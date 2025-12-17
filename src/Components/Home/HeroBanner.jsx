import React, { useEffect, useState } from "react";
import img1 from "../../assets/banner/home1.jpg";
import img2 from "../../assets/banner/home1 (2).jpg";
import img3 from "../../assets/banner/home1 (1).jpg";
const images = [img1, img2, img3];

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ Auto-slide every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8 bg-secondary rounded-xl">
                {/* ✅ Left Side — Text */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6 px-4 sm:px-6">
                    <div className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full inline-block font-semibold text-xs sm:text-sm">GRAND VEGGIE eat clean & Fresh</div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
                        Highlights <br />
                        <span className="text-primary">Where every ingredient tells a story</span>
                    </h1>

                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto min-h-[44px]">View Our Menus</button>
                </div>

                {/* ✅ Right Side — Sliding Image */}
                <div className="px-4 sm:px-0">
                    <img src={images[currentIndex]} alt="Hero Dish" className="w-full h-64 sm:h-72 md:h-80 lg:h-[450px] object-cover rounded-xl shadow-lg transition-all duration-700" />
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;