import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaStarHalfAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [editingReview, setEditingReview] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const { data: myReview = [] } = useQuery({
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
            title: "Are Your Sure?",
            text: "This review will be permanently deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/reviews/${id}`);
                Swal.fire("Deleted", "Your review has been deleted", "success");
                queryClient.invalidateQueries(["myReview", user?.email]);
            }
        });
    };
    const onSubmit = async (data) => {
        const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, data);
        if (res.data.success) {
            Swal.fire("Updated!", "Your review has been updated.", "success");
            document.getElementById("updateModal").close();
            setEditingReview(null);
            reset();
            queryClient.invalidateQueries(["myReview", user?.email]);
        }
    };
    return (
        <div>
            <h1 className="text-xl font-bold ml-5 my-5">My Reviews: {myReview.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Meal Name</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {myReview.map((review, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{review.mealName}</td>
                                <td>
                                    <span className="flex items-center text-xs sm:text-sm">
                                        <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{review.rating}</span>
                                    </span>
                                </td>
                                <td>{review.comment}</td>
                                <td>{new Date(review.date).toLocaleDateString()}</td>
                                <td>
                                    <span onClick={() => handleDelete(review._id)} className="btn mr-2 bg-red-400 text-white">
                                        Delete
                                    </span>
                                    <span onClick={() => openModal(review)} className="btn bg-green-400 text-white">
                                        Update Review
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}

                    <tbody>
                        {myReview.map((review, index) => (
                            <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>{review.mealName}</td>
                                <td>
                                    <span className="flex items-center text-xs sm:text-sm">
                                        <FaStarHalfAlt className="text-orange-500" />
                                        <span className="text-xl font-bold ml-1">{review.rating}</span>
                                    </span>
                                </td>
                                <td>{review.comment}</td>
                                <td>{new Date(review.date).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        onClick={() => handleDelete(review._id)}
                                        className="btn mr-2 bg-red-400 text-white"
                                    >
                                        Delete
                                    </span>
                                    <span
                                        onClick={() => openModal(review)}
                                        className="btn bg-green-400 text-white"
                                    >
                                        Update Review
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            {/* modal */}
            <dialog id="updateModal" className="modal">
                <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg mb-4">Update Review</h3>

                    <label className="block mb-2">Rating</label>
                    <input type="number" {...register("rating", { required: true, min: 1, max: 5 })} className="input input-bordered w-full" />

                    <label className="block mt-4 mb-2">Comment</label>
                    <textarea {...register("comment", { required: true })} className="textarea textarea-bordered w-full"></textarea>
                    <div className="flex justify-between gap-5 items-center">
                        <button
                            type="button"
                            className="btn bg-red-300 mt-4"
                            onClick={() => {
                                document.getElementById("updateModal").close();
                                reset();
                                setEditingReview(null);
                            }}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn bg-green-400 mt-4">
                            Update
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default MyReview;