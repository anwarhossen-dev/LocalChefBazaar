import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaStar, FaEdit, FaTrash, FaRegCalendarAlt, FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";
import Container from "../../../Components/Shared/Container";
import { toast } from "react-toastify";

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [editingReview, setEditingReview] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: myReview = [], isLoading, isError } = useQuery({
        queryKey: ["myReview", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/by-email/${user?.email}`);
            return res.data;
        },
    });

    const openModal = (review) => {
        setEditingReview(review);
        reset({ rating: review.rating, comment: review.comment });
        document.getElementById("updateModal").showModal();
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0 || res.status === 200) {
                        toast.success("Review deleted successfully");
                        queryClient.invalidateQueries(["myReview", user?.email]);
                    }
                } catch (error) {
                    Swal.error("Failed to delete review");
                    error;
                }
            }
        });
    };

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, data);
            if (res.data.success || res.status === 200) {
                toast.success("Review updated successfully!");
                document.getElementById("updateModal").close();
                setEditingReview(null);
                reset();
                queryClient.invalidateQueries(["myReview", user?.email]);
            }
        } catch (error) {
            toast.error("Failed to update review");
            error;
        }
    };

    if (isLoading) return <LoadingSpinner />;
    
    if (isError) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong!</h2>
            <p className="text-gray-600">Failed to load your reviews. Please try again later.</p>
        </div>
    );

    return (
        <Container>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-8 px-4 sm:px-6 lg:px-8"
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                            <FaUtensils className="text-primary" />
                            My Reviews
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            You have shared {myReview.length} reviews with our community.
                        </p>
                    </div>
                </div>

                {myReview.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center border border-gray-100 dark:border-gray-700">
                        <div className="bg-gray-50 dark:bg-gray-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaUtensils className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Reviews Found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                            You haven't posted any reviews yet. Share your experience after trying some delicious meals!
                        </p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
                            <table className="table table-zebra w-full border-collapse">
                                <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                                    <tr className="text-gray-700 dark:text-gray-300">
                                        <th className="px-6 py-4 font-bold text-left">Sl No.</th>
                                        <th className="px-6 py-4 font-bold text-left">Meal Details</th>
                                        <th className="px-6 py-4 font-bold text-center">Rating</th>
                                        <th className="px-6 py-4 font-bold text-left">My Experience</th>
                                        <th className="px-6 py-4 font-bold text-left">Posted On</th>
                                        <th className="px-6 py-4 font-bold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {myReview.map((review, index) => (
                                            <motion.tr 
                                                key={review._id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <th className="px-6 py-4">{index + 1}</th>
                                                <td className="px-6 py-4 font-semibold text-primary">{review.mealName}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full text-yellow-600 dark:text-yellow-500">
                                                        <FaStar className="text-sm" />
                                                        <span className="font-bold">{review.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs truncate" title={review.comment}>
                                                    {review.comment}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <FaRegCalendarAlt className="text-xs" />
                                                        {new Date(review.date).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            onClick={() => openModal(review)}
                                                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300 shadow-sm"
                                                            title="Edit Review"
                                                        >
                                                            <FaEdit className="text-lg" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(review._id)}
                                                            className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300 shadow-sm"
                                                            title="Delete Review"
                                                        >
                                                            <FaTrash className="text-lg" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Update Modal */}
                <dialog id="updateModal" className="modal">
                    <div className="modal-box max-w-lg p-0 overflow-hidden bg-white dark:bg-gray-800 rounded-2xl">
                        <div className="bg-primary/10 py-6 px-8 border-b border-primary/20">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <FaEdit className="text-primary" />
                                Update Your Review
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Refine your feedback for {editingReview?.mealName}</p>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">How would you rate it? (1-5)</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        step="0.1"
                                        {...register("rating", { required: "Rating is required", min: 1, max: 5 })} 
                                        className={`input input-bordered w-full pl-10 focus:ring-primary ${errors.rating ? 'border-red-500' : ''}`} 
                                        placeholder="Enter rating"
                                    />
                                    <FaStar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                                </div>
                                {errors.rating && <span className="text-red-500 text-xs mt-1">{errors.rating.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Your Experience</label>
                                <textarea 
                                    {...register("comment", { required: "Comment is required" })} 
                                    className={`textarea textarea-bordered w-full h-32 focus:ring-primary ${errors.comment ? 'border-red-500' : ''}`}
                                    placeholder="Tell others about your experience..."
                                ></textarea>
                                {errors.comment && <span className="text-red-500 text-xs mt-1">{errors.comment.message}</span>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    onClick={() => {
                                        document.getElementById("updateModal").close();
                                        reset();
                                        setEditingReview(null);
                                    }}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className="btn btn-primary flex-1 shadow-lg shadow-primary/20">
                                    Update Review
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                        <button onClick={() => { reset(); setEditingReview(null); }}>close</button>
                    </form>
                </dialog>
            </motion.div>
        </Container>
    );
};

export default MyReview;