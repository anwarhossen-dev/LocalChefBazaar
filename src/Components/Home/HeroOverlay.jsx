// import React from "react";
// import bannerImage from "../../assets/Banner/About121.jpg";

// const HeroOverlay = () => {
//     return (
//         <section className="max-w-7xl mx-auto px-4 my-6 sm:my-8 md:my-10">
//             <div
//                 className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg"
//                 style={{
//                     backgroundImage: `url(${bannerImage})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                 }}
//             >
//                 <div className="absolute inset-0 flex flex-col justify-start px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 md:pt-10 z-10">
//                     <h2 className="text-xs sm:text-sm font-bold text-secondary mb-2 sm:mb-3 md:mb-4">Our Restaurant</h2>

//                     <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4 sm:mb-5 md:mb-6">
//                         A culinary <br /> adventure for all <br /> the senses
//                     </p>

//                     <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto max-w-[200px] min-h-[44px]">Learn More</button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroOverlay;

import React from "react";
import { Link } from "react-router-dom";

// প্রপস হিসেবে ব্যাকএন্ডের ডায়নামিক 'meals' অ্যারে গ্রহণ করছে
const HeroOverlay = ({ items = [] }) => {
  
  // গ্লোবাল ডিফল্ট ইমেজ ব্যাকআপ (যদি ডাটাবেজে কোনো ছবির ইউআরএল ব্রোকেন থাকে)
  const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600";

  // মঙ্গোডিবি অবজেক্ট আইডি ভ্যালিডেশন চেক (২৪ অক্ষরের হেক্স স্ট্রিং হতে হবে)
  const isValidMongoId = (id) => {
    return id && typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
  };

  // যদি ব্যাকএন্ড থেকে কোনো ডাটা এখনো না আসে (ফাঁকা অ্যারে), তাহলে স্লাইডার ট্র্যাক হাইড বা লোডিং স্টেট দেখাবে
  if (!items || items.length === 0) {
    return (
      <div className="w-full flex justify-center py-12">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  // আল্ট্রা-স্মার্ট কার্ড আর্কিটেকচার
  const renderSmartCard = (meal, uniqueKey) => (
    <div 
      key={uniqueKey} 
      className="inline-block bg-base-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-base-200/70 min-w-[290px] sm:min-w-[340px] cursor-pointer group transition-all duration-500 mx-4 hover:-translate-y-1"
    >
      {/* 📸 Image Showcase & Dynamic Floating Tags */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200 shrink-0">
        <img
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-out"
          src={meal.foodImage || meal.image || defaultFoodImage}
          alt={meal.foodName || "Delicious Meal"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultFoodImage;
          }}
        />
        
        {/* Top Left Badge */}
        {meal.rating >= 4.7 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary shadow-sm uppercase tracking-wider">
            {meal.rating >= 4.9 ? "✨ Chef of the Month" : "✨ Local Favorite"}
          </div>
        )}

        {/* Top Right Rating Overlay (Glassmorphism Effect) */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-white flex items-center gap-1.5 shadow-md">
          <span className="text-amber-400 text-sm">★</span> 
          <span>{meal.rating ? Number(meal.rating).toFixed(1) : "4.5"}</span>
        </div>
      </div>

      {/* 📝 Info Details Section */}
      <div className="p-6 text-left whitespace-normal flex flex-col justify-between">
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-extrabold text-base-content leading-snug group-hover:text-primary transition-colors duration-300 truncate max-w-[220px] sm:max-w-[260px]">
            {meal.foodName}
          </h2>
          
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-semibold mt-1">
            <span>By {meal.chefName || "House Chef"}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span className="text-neutral-500">Kitchen</span>
          </div>
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 font-bold text-[11px] px-3 py-1 rounded-xl">
            📍 {meal.deliveryArea ? meal.deliveryArea.split(" ")[0] : "Local"}
          </span>
          <span className="bg-neutral-100 text-neutral-600 font-bold text-[11px] px-3 py-1 rounded-xl uppercase tracking-wider">
            Price: ${meal.price || "0.00"}
          </span>
        </div>

        {/* Clean Interactive Action Button */}
        <Link to={`/mealDetails/${meal._id}`} className="block w-full">
          <button className="btn btn-sm btn-outline border-base-300 hover:btn-primary w-full rounded-xl font-bold text-xs transition-all uppercase tracking-wider h-10">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    /* Infinite Marquee Track Container */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-12 overflow-hidden py-6 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 group/marquee">
      <div className="relative flex w-full overflow-x-hidden group-hover/marquee:[animation-play-state:paused]">
        
        {/* 🚀 First Infinite Row Loop (Filtered) */}
        <div className="animate-marquee whitespace-nowrap flex items-center [animation-play-state:inherit]">
          {items
            .filter((meal) => isValidMongoId(meal._id)) // 🟢 অরিজিনাল মঙ্গোডিবি আইডি ছাড়া বাকি সব ফেক ডাটা (যেমন আইডি ৩) ফিল্টার হয়ে যাবে
            .map((meal, index) => renderSmartCard(meal, `real-1-${meal._id || index}`))}
        </div>

        {/* 🚀 Second Infinite Row Loop (Seamless Sync & Filtered) */}
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center [animation-play-state:inherit]">
          {items
            .filter((meal) => isValidMongoId(meal._id)) // 🟢 এখানেও সেফটি ফিল্টার অ্যাপ্লাই করা হয়েছে
            .map((meal, index) => renderSmartCard(meal, `real-2-${meal._id || index}`))}
        </div>

      </div>
    </section>
  );
};

export default HeroOverlay;
