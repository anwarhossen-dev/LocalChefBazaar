// import React from "react";
// import tik from "../../assets/reviewQuote.png";
// import { FaStarHalfAlt } from "react-icons/fa";

// const ReviewsCard = ({ review }) => {
//     return (
//         <div className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-sm p-6 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            
//             <div className="mb-4 flex items-center">
//                 <img src={tik} alt="quote" className="w-6 h-6 opacity-40 mr-2" />
//                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer says:</span>
//             </div>

            
//             <p className="mb-4 text-base leading-relaxed border border-dashed border-gray-300 dark:border-gray-600 p-3 rounded">{review.comment}</p>

//             <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4"></div>

//             {/* Author Info */}
//             <div className="flex justify-between items-center gap-4">
//                 <div className="flex items-center gap-2">
//                     <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" />
//                     <div>
//                         <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//                 <div>
//                     <span className="flex items-center text-xs sm:text-sm">
//                         <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{review.rating}</span>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewsCard;


import React from "react";
import tik from "../../assets/reviewQuote.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // স্টার কম্পোনেন্টসমূহ

const ReviewsCard = ({ review = {} }) => {
  // ১. ফলব্যাক বা ডিফল্ট ডাটা প্রোটেকশন
  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150";
  const comment = review?.comment || "No comment provided.";
  const reviewerName = review?.reviewerName || "Anonymous User";
  const reviewerImage = review?.reviewerImage || defaultAvatar;
  const rating = review?.rating ? Number(review?.rating) : 5;

  // ২. 🌟 প্রোডাকশন-লেভেল ডেট ফরম্যাটিং (ক্র্যাশ প্রুফ)
  const formattedDate = review?.date 
    ? new Date(review.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent";

  // ৩. 🌟 ডাইনামিক ৫-স্টার জেনারেটর লজিক (যা ইউজারদের দেখতে ভালো লাগবে)
  const renderStars = (num) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= num) {
        stars.push(<FaStar key={i} className="text-amber-500 text-sm" />);
      } else if (i - 0.5 <= num) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-500 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 dark:text-gray-600 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-sm p-6 rounded-2xl border border-base-200/60 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900 flex flex-col justify-between min-h-[250px]">
      
      {/* 🔖 টপ সেকশন ও কোটেশন */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={tik} 
              alt="quote" 
              className="w-5 h-5 opacity-30 dark:opacity-50 mr-2 object-contain" 
              onError={(e) => (e.target.style.display = 'none')} // কোট ইমেজ মিসিং থাকলে হাইড হবে
            />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-gray-500">
              Customer Review
            </span>
          </div>
          
          {/* ৫-স্টার রেটিং ভিজ্যুয়াল */}
          <div className="flex items-center gap-0.5">
            {renderStars(rating)}
          </div>
        </div>

        {/* 💬 কমেন্ট বক্স (টেক্সট সাইজ ও লাইন গ্যাপ অপ্টিমাইজড) */}
        <p className="mb-6 text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-gray-300 italic font-medium line-clamp-4">
          "{comment}"
        </p>
      </div>

      {/* 👤 অথর বা রিভিউয়ার ইনফো সেকশন */}
      <div className="pt-4 border-t border-dashed border-neutral-200 dark:border-gray-800 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img 
            src={reviewerImage} 
            alt={reviewerName} 
            className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500/20 shrink-0" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-neutral-800 dark:text-white truncate">
              {reviewerName}
            </h4>
            <p className="text-xs text-neutral-400 dark:text-gray-500">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* রেটিং এর সংখ্যাত্মক রূপ */}
        <div className="bg-amber-500/10 dark:bg-amber-500/5 px-2.5 py-1 rounded-lg shrink-0">
          <span className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-500">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default ReviewsCard;