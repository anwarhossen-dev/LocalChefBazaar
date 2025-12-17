import { Star } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../components/Shared/Loading";
import ReviewUpdatePopup from "./ReviewUpdatePopup";
import LoadingSpinner from "../../../Components/Shared/LoadingSpinner";

const AddReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals-reviews?email=${user?.email}`);
      return res.data;
    },
  });

  const handleReviewDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/meals-reviews/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your meal has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="mb-6 mt-7 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">My Reviews</h1>
      </div>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {review.mealName}
                  </h3>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Reviewed on{" "}
                    {format(new Date(review.createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowUpdateModal(true), setSelectedReview(review);
                  }}
                  className="rannafy-success"
                >
                  {" "}
                  <FaRegEdit /> Update
                </button>
                <button
                  onClick={() => handleReviewDelete(review._id)}
                  className="rannafy-delete"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showUpdateModal && (
        <ReviewUpdatePopup
          review={selectedReview}
          setShowUpdateModal={setShowUpdateModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AddReview;