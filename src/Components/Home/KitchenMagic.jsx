
// import React from "react";
// import imgMain from "../../assets/KitchenView/Service3 (1).jpg";
// import imgTopRight from "../../assets/KitchenView/Service1 (4).jpg";
// import imgBottomRight from "../../assets/KitchenView/Service2 (1).jpg";

// const KitchenMagic = () => {
//     return (
//         <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
//             {/* ✅ Heading */}
//             <div className="text-center mb-8 sm:mb-10 space-y-2 sm:space-y-3">
//                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Highlight</h2>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">The magic of the kitchen</h3>
//                 <p className="text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-4">On cold winter nights, I like to brighten up our dinner table with a big, colorful mix of root veggies and hearty greens. On beautiful, warm days.</p>
//             </div>

//             {/* ✅ Collage Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
//                 {/* ✅ Left — Main Image */}
//                 <div>
//                     <img src={imgMain} alt="Main Salad" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-xl shadow-md" />
//                 </div>

//                 {/* ✅ Right — Two stacked images */}
//                 <div className="grid grid-rows-2 gap-4 sm:gap-5 md:gap-6">
//                     <img src={imgTopRight} alt="Top Right Salad" className="w-full h-[145px] sm:h-[170px] md:h-[195px] object-cover rounded-xl shadow-md" />
//                     <img src={imgBottomRight} alt="Bottom Right Salad" className="w-full h-[145px] sm:h-[170px] md:h-[195px] object-cover rounded-xl shadow-md" />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default KitchenMagic;


import React from "react";

// ফলব্যাক ইমেজ (যদি ডাটাবেজের ইমেজ ইউআরএল কোনো কারণে ব্রোকেন বা মিসিং থাকে)
const fallbackImages = [
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600"
];

// প্রপস হিসেবে ডাইনামিক 'galleryData' (অ্যারে অব অবজেক্ট) গ্রহণ করছে
const KitchenMagic = ({ galleryData = [] }) => {
  
  // যদি প্রপ্স ফাঁকা থাকে, তবে ফলব্যাক বা ডিফল্ট ডাটা সেট করবে
  const finalData = galleryData.length >= 3 ? galleryData.slice(0, 3) : [
    { image: fallbackImages[0], alt: "Main Kitchen View" },
    { image: fallbackImages[1], alt: "Chef Special Meal" },
    { image: fallbackImages[2], alt: "Fresh Ingredients" }
  ];

  // ইমেজ এরর হ্যান্ডলার (ব্রোকেন লিংকের জন্য)
  const handleImageError = (e, index) => {
    e.target.onerror = null;
    e.target.src = fallbackImages[index] || fallbackImages[0];
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
      {/* 🎯 ডাইনামিক বা প্রিমিয়াম হেডিং */}
      <div className="text-center mb-10 sm:mb-14 space-y-3">
        <span className="text-xs sm:text-sm font-black text-yellow-500 uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-full">
          Highlight
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-base-content tracking-tight mt-2">
          The Magic of the Kitchen
        </h2>
        <p className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          On cold winter nights, I like to brighten up our dinner table with a big, 
          colorful mix of root veggies and hearty greens. Freshly crafted for your soul.
        </p>
      </div>

      {/* 📸 আল্ট্রা-স্মুথ ডাইনামিক কোলাজ লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        
        {/* 1️⃣ বাম পাশের মেইন বড় ইমেজ (Index 0) */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl border border-base-200 group transition-all duration-500">
          <img
            src={finalData[0]?.image || finalData[0]?.foodImage}
            alt={finalData[0]?.alt || "Main Showcase"}
            className="w-full h-[320px] sm:h-[400px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => handleImageError(e, 0)}
          />
          {/* ওভারলে গ্রেডিয়েন্ট ইফেক্ট */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* 2️⃣ ডান পাশের ২টি স্ট্যাকড ইমেজ (Index 1 & 2) */}
        <div className="grid grid-rows-2 gap-5 sm:gap-6">
          {[1, 2].map((idx) => (
            <div 
              key={idx} 
              className="relative overflow-hidden rounded-[1.5rem] shadow-sm hover:shadow-xl border border-base-200 group transition-all duration-500"
            >
              <img
                src={finalData[idx]?.image || finalData[idx]?.foodImage}
                alt={finalData[idx]?.alt || `Gallery Image ${idx}`}
                className="w-full h-[150px] sm:h-[188px] md:h-[228px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => handleImageError(e, idx)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KitchenMagic;