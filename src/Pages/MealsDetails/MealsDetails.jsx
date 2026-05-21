import React from "react";
import { useParams } from "react-router";
import { FaStar, FaUtensils, FaClock, FaUserTie, FaMapMarkerAlt, FaHeart, FaPlus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import MealReview from "../../Components/Shared/MealReview";
import ReviewModal from "../../Components/Shared/ReviewModal";
import Loading from "../../Components/Shared/Loading";
import Container from "../../Components/Shared/Container";
import PremiumCard from "../../Components/UI/Primitives/PremiumCard";
import TextReveal from "../../Components/UI/Primitives/TextReveal";
import ProductInfoItem from "../../Components/UI/Primitives/ProductInfoItem";
import MealDetailsOrchestrator from "../../Components/Dashboard/MealsDetails/MealDetailsOrchestrator";
import { motion as Motion, AnimatePresence } from "framer-motion";

const MealDetails = () => {
  const { id } = useParams();

  return (
    <MealDetailsOrchestrator id={id}>
      {({ meal, reviews, isLoading, addToFavorites, reviewRefetch, navigate }) => {
        if (isLoading) return <Loading />;

        return (
          <div className="min-h-screen bg-slate-50/50 py-12 md:py-20 font-sans">
            <Container>
              {/* Back Button */}
              <Motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 font-bold hover:text-primary mb-8 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Kitchens</span>
              </Motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                
                {/* Left: Visual Content (5 Columns) */}
                <div className="lg:col-span-5 sticky top-32">
                  <PremiumCard className="aspect-square overflow-hidden group">
                    <img
                      src={meal.foodImage}
                      alt={meal.foodName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-slate-800 shadow-xl flex items-center gap-2">
                            <FaStar className="text-amber-400" />
                            {meal.rating || "4.8"}
                        </span>
                        <span className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-white shadow-xl flex items-center gap-2 capitalize">
                            {meal.category || "Main"}
                        </span>
                    </div>
                  </PremiumCard>
                  
                  {/* Decorative element */}
                  <div className="mt-8 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <FaUtensils />
                        </div>
                        <p className="text-slate-500 font-medium italic">
                            "Prepared fresh upon order using locally sourced, organic ingredients from sustainable farms."
                        </p>
                    </div>
                  </div>
                </div>

                {/* Right: Product Intelligence (7 Columns) */}
                <div className="lg:col-span-7 space-y-12">
                  <div>
                    <TextReveal>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-tight mb-6">
                            {meal.foodName}
                        </h1>
                    </TextReveal>
                    
                    <div className="flex flex-wrap items-center gap-8 py-6 border-y border-slate-100">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Pricing</span>
                            <span className="text-4xl font-black text-primary">${meal.price}</span>
                        </div>
                        <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Est. Wait Time</span>
                            <span className="text-4xl font-black text-slate-800">{meal.estimatedDeliveryTime} <span className="text-sm">mins</span></span>
                        </div>
                    </div>
                  </div>

                  {/* Artisan Intelligence */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <ProductInfoItem icon={FaUserTie} label="Artisan Chef" value={meal.chefName} colorClass="text-blue-500" />
                    <ProductInfoItem icon={FaMapMarkerAlt} label="Origin Kitchen" value={meal.deliveryArea} colorClass="text-rose-500" />
                    <ProductInfoItem icon={FaClock} label="Chef Experience" value={`${meal.chefExperience} Seasons`} colorClass="text-emerald-500" />
                    <ProductInfoItem icon={FaUtensils} label="Key Ingredients" value={meal.ingredients?.join(", ")} colorClass="text-amber-500" />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/order/${meal._id}`)} 
                        className="flex-1 bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:bg-primary transition-all"
                    >
                      <FaShoppingCart /> Order Masterpiece
                    </Motion.button>
                    
                    <div className="flex gap-4">
                        <Motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#fef2f2" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addToFavorites} 
                            className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-rose-500 shadow-xl shadow-slate-100 transition-all"
                            title="Add to Favorites"
                        >
                        <FaHeart size={20} />
                        </Motion.button>

                        <Motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: "#f0fdf4" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById("reviewModal").showModal()} 
                            className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-primary shadow-xl shadow-slate-100 transition-all"
                            title="Share Your Review"
                        >
                        <FaPlus size={20} />
                        </Motion.button>
                    </div>
                  </div>

                  {/* Interactive Tab/Section for Reviews */}
                  <div className="pt-12 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-slate-800">Artisan Reviews</h3>
                        <span className="bg-slate-100 px-4 py-1 rounded-full text-xs font-bold text-slate-500">{reviews.length} total</span>
                    </div>
                    <AnimatePresence>
                        <MealReview reviews={reviews} />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Container>

            <ReviewModal mealId={meal?._id} mealName={meal?.foodName} refetch={reviewRefetch} />
          </div>
        );
      }}
    </MealDetailsOrchestrator>
  );
};

export default MealDetails;
