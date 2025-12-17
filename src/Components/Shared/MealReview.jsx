import React from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import tik from "../../assets/reviewQuote.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { FaStarHalfAlt } from "react-icons/fa";

const MealReview = ({ reviews }) => {
    
    return (
        <div className="max-w-6xl mx-auto px-4 my-10">
            <h2 className="text-4xl text-center font-bold mb-4">What our customers are saying</h2>
            <p className="text-sm text-center mb-8">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            <Swiper
                effect="coverflow  overflow-hidden"
                grabCursor={true}
                spaceBetween={20}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                centeredSlides={true}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                coverflowEffect={{
                    rotate: 30,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                loop={true}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow, Autoplay]}
                className="mySwiper  overflow-hidden"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review._id} className="flex justify-center items-center">
                        <div className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-sm p-6 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                            {/* Quote Icon */}
                            <div className="mb-4 flex items-center">
                                <img src={tik} alt="quote" className="w-6 h-6 opacity-40 mr-2" />
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Customer says:</span>
                            </div>

                            {/* Quote Text */}
                            <p className="mb-4 text-base leading-relaxed border border-dashed border-gray-300 dark:border-gray-600 p-3 rounded">{review.comment}</p>

                            {/* Divider */}
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
                                    <div>
                                        <span className="flex items-center text-xs sm:text-sm">
                                            <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{review.rating}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MealReview;