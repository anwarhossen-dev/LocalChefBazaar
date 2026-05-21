import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import Skeleton from '../../Components/Shared/Skeleton'; // assume a skeleton component exists

const MealCarousel = () => {
  const axiosSecure = useAxiosSecure();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['carousel-meals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals');
      return res.data.meals || [];
    },
  });

  if (isLoading) {
    // Show 4 skeleton slides
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      className="py-4"
    >
      {meals.slice(0, 12).map((meal) => (
        <SwiperSlide key={meal._id}>
          <div className="glass p-4 rounded-xl fade-in h-full flex flex-col justify-between">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-32 object-cover rounded-md mb-2"
              loading="lazy"
            />
            <h3 className="text-sm font-semibold truncate text-primary">
              {meal.foodName}
            </h3>
            <p className="text-xs text-secondary">${meal.price}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MealCarousel;
