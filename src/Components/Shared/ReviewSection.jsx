import React, { useEffect, useRef, useState } from "react";
import ReviewsCard from "./ReviewsCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";

const ReviewSection = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [] } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get("/reviews");
                return res.data;
            } catch (error) {
                if (error.response?.status === 404) {
                    const res = await axiosPublic.get("/review.json", { baseURL: "/" });
                    return res.data;
                }
                return [];
            }
        },
        retry: 2,
        retryDelay: attempt => Math.min(1000 * 2 ** attempt, 5000),
    });

    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!reviews || reviews.length === 0) return;
        const compute = () => {
            const track = trackRef.current;
            if (!track) return;
            const totalWidth = track.scrollWidth || 0;
            const originalWidth = Math.max(1, totalWidth / 2);
            const speedPxPerSec = 80;
            const newDuration = originalWidth / speedPxPerSec;
            setDuration(newDuration);
            track.style.setProperty("--marquee-translate", `-${originalWidth}px`);
            track.style.setProperty("--marquee-duration", `${newDuration}s`);
        };

        compute();
        const ro = new ResizeObserver(compute);
        if (trackRef.current) ro.observe(trackRef.current);
        window.addEventListener("load", compute);
        window.addEventListener("resize", compute);
        return () => {
            if (ro) ro.disconnect();
            window.removeEventListener("load", compute);
            window.removeEventListener("resize", compute);
        };
    }, [reviews]);

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <div className="max-w-6xl mx-auto px-4 mb-10">
            <h2 className="text-4xl text-center font-bold mb-4">What our customers are saying</h2>
            <p className="text-sm text-center mb-8">Real feedback from customers—smooth, continuous, and pauseable on hover or focus.</p>

            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
                aria-label="Customer reviews marquee"
            >
                <div
                    ref={trackRef}
                    className="flex items-center whitespace-nowrap will-change-transform"
                    style={
                        prefersReduced || duration === 0
                            ? { animation: 'none' }
                            : {
                                  animationName: 'marqueeAnim',
                                  animationTimingFunction: 'linear',
                                  animationIterationCount: 'infinite',
                                  animationDuration: `var(--marquee-duration, ${duration}s)`,
                                  animationPlayState: paused ? 'paused' : 'running',
                              }
                    }
                >
                    {/** Render two copies for seamless loop **/}
                    {reviews.concat(reviews).map((review, index) => (
                        <div key={(review._id || review.id || `fallback-${index}`) + '-' + index} className="inline-block mx-4 marquee-item">
                            <ReviewsCard review={review}></ReviewsCard>
                        </div>
                    ))}
                </div>

                <style>{`\n                    @keyframes marqueeAnim {\n                        0% { transform: translateX(0); }\n                        100% { transform: translateX(var(--marquee-translate, -50%)); }\n                    }\n                    .marquee-item { vertical-align: middle; }\n                `}</style>
            </div>
        </div>
    );
};

export default ReviewSection;
