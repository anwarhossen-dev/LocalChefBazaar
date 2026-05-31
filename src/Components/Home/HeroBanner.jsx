// import React, { useEffect, useState } from "react";
// import img1 from "../../assets/Banner/home1.jpg";
// import img2 from "../../assets/Banner/home1 (2).jpg";
// import img3 from "../../assets/Banner/home1 (1).jpg";
// const images = [img1, img2, img3];

// const HeroBanner = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // ✅ Auto-slide every 2 seconds
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//         }, 2000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section className="max-w-7xl mx-auto px-4 mt-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8 bg-accent rounded-xl">
//                 {/* ✅ Left Side — Text */}
//                 <div className="space-y-3 sm:space-y-4 md:space-y-6 px-4 sm:px-6">
//                     <div className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full inline-block font-semibold text-xs sm:text-sm">GRAND VEGGIE eat clean & Fresh</div>

//                     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
//                         Highlights <br />
//                         <span className="text-primary">Where every ingredient tells a story</span>
//                     </h1>

//                     <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto min-h-[44px]">View Our Menus</button>
//                 </div>

//                 {/* ✅ Right Side — Sliding Image */}
//                 <div className="px-4 sm:px-0">
//                     <img src={images[currentIndex]} alt="Hero Dish" className="w-full h-64 sm:h-72 md:h-80 lg:h-[450px] object-cover rounded-xl shadow-lg transition-all duration-700" />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroBanner;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import img1 from "../../assets/Banner/home1.jpg";
import img2 from "../../assets/Banner/home1 (1).jpg";
import img3 from "../../assets/Banner/home1 (2).jpg";

const images = [img1, img2, img3];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* CRITICAL FIX: 
      ন্যাভবারের মতোই এই সেকশনটিকে স্ক্রিনের দুই মাথার সাথে লাগানোর জন্য 'w-screen' এবং 
      ডানে-বামে যেন কোনো মার্জিন বা প্যাডিং প্যারেন্ট থেকে না পায়, সেজন্য 'left-1/2 -translate-x-1/2 relative' ট্রিক ব্যবহার করা হয়েছে।
    */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[819px] overflow-hidden bg-zinc-950">
      
      {/* Background Image Slideshow - ডানে বামে ১০০% ফুল স্ক্রিন */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="hero"
          onLoad={() => setLoadedCount(c => c + 1)}
          onError={() => setErrorLoading(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            currentIndex === index ? "opacity-100 scale-105" : "opacity-0"
          }`}
        />
      ))}

      {errorLoading && loadedCount === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white z-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Banner unavailable</h2>
            <p className="mt-2 text-sm">Showing featured content below.</p>
          </div>
        </div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content Container - এটি ভেতরের লেখালিখিকে ন্যাভবারের মতো ১০০০+ পিক্সেলের গ্রিডে ধরে রাখবে */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        
        {/* Left Side: Content Text */}
        <div className="text-left text-white max-w-xl md:max-w-2xl flex flex-col items-start">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-sm mb-8">
            🍽️ Fresh • Local • Delicious
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight">
            Taste Of <br />
            <span className="text-emerald-400">Neighborhood</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Discover fresh meals and artisan kitchens near you. <br />
            Order from the best local chefs in your area.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/meals"
              className="px-8 md:px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-lg font-semibold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 text-white"
            >
              Explore Meals
            </Link>
            <Link
              to="/kitchens"
              className="px-8 md:px-10 py-4 border-2 border-white/80 hover:bg-white/10 text-lg font-semibold rounded-2xl transition-all active:scale-95 text-white"
            >
              View Kitchens
            </Link>
          </div>
        </div>

        {/* Right Side: Showcase Image (যা তোমার ১ম স্ক্রিনশটে দেখা যাচ্ছে) */}
        <div className="hidden lg:block w-[450px] h-[450px] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm">
          <img 
            src={images[currentIndex]} 
            alt="Featured Food" 
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center text-xs tracking-widest font-medium">
        SCROLL TO EXPLORE
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent mt-3" />
      </div>
    </section>
  );
};

export default HeroBanner;