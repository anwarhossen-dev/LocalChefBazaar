

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import MealReview from "../../Components/Shared/MealReview";
import ReviewModal from "../../Components/Shared/ReviewModal";
import useAuth from "../../hooks/useAuth";
//import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MealDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Auth Guard
  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.success('Login in the successful')
    }
  }, [user, navigate]);

  // Fetch Meal
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  // Fetch Reviews
  const { data: reviews = [], refetch: reviewRefetch } = useQuery({
    queryKey: ["reviews", meal?._id],
    enabled: !!meal?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${meal._id}`);
      return res.data;
    },
  });

  // Add to Favorites
  const handleAddFav = async () => {
    const favouriteMeal = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };
    try {
      const res = await axiosSecure.post("/favorites", favouriteMeal);
      if (res.data.success) {
        Swal.fire("Added", "Meal added to your favourites", "success");
      } else {
        Swal.fire("Oops!", res.data.message, "info");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-base-300 shadow-lg rounded-lg">
      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
        <div>
          <img
            src={meal.foodImage}
            alt={meal.foodName}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-100 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold">{meal.foodName}</h2>

            <p className="text-sm sm:text-base">
              Chef: <span className="font-semibold">{meal.chefName}</span>
            </p>

            <p className="text-sm sm:text-base">
              Chef ID: <span className="font-semibold">{meal.chefId}</span>
            </p>

            <p className="text-sm sm:text-base">
              Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
            </p>

            <p className="text-sm sm:text-base">
              Price: <span className="font-semibold">${meal.price}</span>
            </p>

            <p className="flex items-center text-sm sm:text-base">
              Rating:
              <span className="font-semibold ml-3 flex items-center">
                <FaStar className="text-orange-300" /> {meal.rating}
              </span>
            </p>

            <p className="text-sm sm:text-base">
              <span className="font-bold">Ingredients:</span> {meal.ingredients?.join(", ")}
            </p>

            <p className="text-sm sm:text-base">
              <span className="font-bold">Chef Experience:</span> {meal.chefExperience} years
            </p>

            <p className="text-sm sm:text-base">
              <span className="font-bold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime} mins
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button onClick={() => navigate(`/order/${meal._id}`)} className="btn bg-orange-300 w-full min-h-11">
              Order Now
            </button>
            <button onClick={handleAddFav} className="btn bg-orange-300 w-full min-h-11">
              Add to Favourite
            </button>
            <button onClick={() => document.getElementById("reviewModal").showModal()} className="btn bg-orange-300 w-full min-h-11">
              Add Review
            </button>
            <button onClick={() => navigate(-1)} className="btn bg-orange-300 w-full min-h-11">
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <MealReview reviews={reviews} />
      <ReviewModal mealId={meal?._id} mealName={meal?.foodName} refetch={reviewRefetch} />
    </div>
  );
};

export default MealDetails;
