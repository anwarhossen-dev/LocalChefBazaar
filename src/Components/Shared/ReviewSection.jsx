import React from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviewSection = () => {
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [] } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reviews");
            return res.data;
        },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 mb-10">
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
                        <ReviewsCard review={review}></ReviewsCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewSection;