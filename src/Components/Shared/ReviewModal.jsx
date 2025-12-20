import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ReviewModal = ({ mealId,mealName, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleReviewSubmit = async (data) => {
        const reviewData = {
            foodId: mealId,
            mealName: mealName,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerImage: user.photoURL,
            rating: Number(data.rating),
            comment: data.comment,
            date: new Date(),
        };

        const res = await axiosSecure.post("/reviews", reviewData);
        if (res.data.success === true) {
            document.getElementById("reviewModal").close();
            Swal.fire("Success", "Review Submitted successpully", "success");
            reset();
            refetch();
        }
        if (res.data.success === false) {
            toast.success("You have already reviewed");
        }
    };
    return (
        <dialog id="reviewModal" className="modal" method="dialog">
            <div className="modal-box">
                <h3 className="text-xl font-bold mb-4">Write a Review</h3>

                <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-4">
                    {/* Rating */}
                    <div>
                        <label className="font-semibold">Rating</label>
                        <select {...register("rating", { required: true })} className="select select-bordered w-full">
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Poor</option>
                            <option value="1">1 - Very Bad</option>
                        </select>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="font-semibold">Comment</label>
                        <textarea {...register("comment", { required: true })} className="textarea textarea-bordered w-full" placeholder="Write your review..."></textarea>
                    </div>

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                        <button type="button" className="btn" onClick={() => document.getElementById("reviewModal").close()}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default ReviewModal;