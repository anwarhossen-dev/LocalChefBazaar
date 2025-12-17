import React from "react";
import tik from "../../assets/reviewQuote.png";
import { FaStarHalfAlt } from "react-icons/fa";

const ReviewsCard = ({ review }) => {
    return (
        <div className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-sm p-6 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            
            <div className="mb-4 flex items-center">
                <img src={tik} alt="quote" className="w-6 h-6 opacity-40 mr-2" />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer says:</span>
            </div>

            
            <p className="mb-4 text-base leading-relaxed border border-dashed border-gray-300 dark:border-gray-600 p-3 rounded">{review.comment}</p>

            <div className="border-t border-dashed border-gray-300 dark:border-gray-600 my-4"></div>

            {/* Author Info */}
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600" />
                    <div>
                        <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    <span className="flex items-center text-xs sm:text-sm">
                        <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{review.rating}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;