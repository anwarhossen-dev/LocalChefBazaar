import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const useMealLogic = (id) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch Meal
    const { data: meal = {}, isLoading: isMealLoading } = useQuery({
        queryKey: ["meal", id],
        enabled: !!user && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        },
    });

    // Fetch Reviews
    const { data: reviews = [], isLoading: isReviewsLoading, refetch: reviewRefetch } = useQuery({
        queryKey: ["reviews", id],
        enabled: !!user && !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        },
    });

    const addToFavorites = async () => {
        if (!user || !meal._id) return;

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
                Swal.fire({
                    title: "Added!",
                    text: "This masterpiece is now in your favorites.",
                    icon: "success",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdrop: `rgba(0,0,123,0.4)`,
                    confirmButtonColor: "#14b8a6"
                });
            } else {
                toast.info(res.data.message);
            }
        } catch (_err) {
            toast.error("Failed to add to favorites.");
        }
    };

    return {
        meal,
        reviews,
        isLoading: isMealLoading || isReviewsLoading,
        addToFavorites,
        reviewRefetch,
        navigate
    };
};

const MealDetailsOrchestrator = ({ id, children }) => {
    const logic = useMealLogic(id);
    return children(logic);
};

export default MealDetailsOrchestrator;
