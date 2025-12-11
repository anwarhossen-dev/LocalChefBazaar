// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';

// // const Review = () => {
// //    const [reviews, setReviews] = useState([]);
// //   const [editingReview, setEditingReview] = useState(null); // the review being edited
// //   const [editedComment, setEditedComment] = useState('');
// //   const [editedRating, setEditedRating] = useState(1);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch user reviews on mount
// //   useEffect(() => {
// //     axios.get('/reviews.json')  // adjust endpoint as needed
// //       .then(res => {
// //         if (Array.isArray(res.data)) {
// //           setReviews(res.data);
// //         } else if (Array.isArray(res.data.reviews)) {
// //           setReviews(res.data.reviews);
// //         } else {
// //           setReviews([]);
// //         }
// //       })
// //       .catch(err => {
// //         console.error('Failed to fetch reviews', err);
// //         setReviews([]);
// //       })
// //       .finally(() => setLoading(false));
// //   }, []);

// //   const handleDelete = async (reviewId) => {
// //     const confirmed = window.confirm('Are you sure you want to delete this review?');
// //     if (!confirmed) return;

// //     try {
// //       await axios.delete(`/api/reviews/${reviewId}`);
// //       // Remove from local state
// //       setReviews(prev => prev.filter(r => r.id !== reviewId && r._id !== reviewId));
// //       alert('Review deleted successfully.');
// //     } catch (err) {
// //       console.error('Delete failed', err);
// //       alert('Failed to delete review.');
// //     }
// //   };

// //   const openEditModal = (review) => {
// //     setEditingReview(review);
// //     setEditedComment(review.comment);
// //     setEditedRating(review.rating);
// //   };

// //   const handleUpdate = async () => {
// //     if (!editingReview) return;
// //     const updated = {
// //       comment: editedComment,
// //       rating: editedRating,
// //     };
// //     try {
// //       const res = await axios.put(`/api/reviews/${editingReview.id || editingReview._id}`, updated);
// //       // Update local state
// //       setReviews(prev => prev.map(r => {
// //         if (r.id === (editingReview.id || editingReview._id)) {
// //           return { ...r, comment: editedComment, rating: editedRating, date: res.data.date || r.date };
// //         }
// //         return r;
// //       }));
// //       alert('Review updated successfully.');
// //       closeEditModal();
// //     } catch (err) {
// //       console.error('Update failed', err);
// //       alert('Failed to update review.');
// //     }
// //   };

// //   const closeEditModal = () => {
// //     setEditingReview(null);
// //     setEditedComment('');
// //     setEditedRating(1);
// //   };

// //   if (loading) {
// //     return <p>Loading your reviews...</p>;
// //   }

// //     return (
// //     //     <div>
// //     //          {/* Customer Reviews Section */}
// //     //   <section className="py-16 px-4 bg-base-200 py-4 mt-20">
// //     //     <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
// //     //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //     //       {Array.isArray(reviews) && reviews.length > 0 ? (
// //     //         reviews.map((review) => (
// //     //           <div key={review.id} className="bg-white p-6 rounded shadow">
// //     //             <p className="text-gray-700 mb-4">"{review.comment}"</p>
// //     //             <p className="font-semibold">- {review.customerName}</p>
// //     //           </div>
// //     //         ))
// //     //       ) : (
// //     //         <p className="text-center col-span-3">No reviews available</p>
// //     //       )}
// //     //     </div>
// //     //   </section>
// //     //     </div>
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

// //       {reviews.length === 0 && <p>You have not submitted any reviews yet.</p>}

// //       <div className="space-y-6">
// //         {reviews.map(review => (
// //           <div key={review.id || review._id} className="border rounded p-4 shadow">
// //             <h3 className="text-xl font-semibold">{review.mealName}</h3>
// //             <p><strong>Rating:</strong> {review.rating} / 5</p>
// //             <p><strong>Comment:</strong> {review.comment}</p>
// //             <p className="text-sm text-gray-500">Date: {new Date(review.date).toLocaleString()}</p>
// //             <div className="mt-4 space-x-2">
// //               <button
// //                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
// //                 onClick={() => handleDelete(review.id || review._id)}
// //               >
// //                 Delete
// //               </button>
// //               <button
// //                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //                 onClick={() => openEditModal(review)}
// //               >
// //                 Update
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Edit Modal */}
// //       {editingReview && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
// //           <div className="bg-white rounded p-6 w-full max-w-md">
// //             <h3 className="text-xl font-semibold mb-4">Edit Review: {editingReview.mealName}</h3>
// //             <div className="mb-4">
// //               <label className="block mb-1">Rating (1–5):</label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 max="5"
// //                 value={editedRating}
// //                 onChange={(e) => setEditedRating(Number(e.target.value))}
// //                 className="w-full border rounded p-2"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label className="block mb-1">Comment:</label>
// //               <textarea
// //                 rows="4"
// //                 value={editedComment}
// //                 onChange={(e) => setEditedComment(e.target.value)}
// //                 className="w-full border rounded p-2"
// //               />
// //             </div>
// //             <div className="flex justify-end space-x-2">
// //               <button
// //                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
// //                 onClick={closeEditModal}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //                 onClick={handleUpdate}
// //               >
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// // export default Review;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Marquee from "react-fast-marquee";

// const Review = () => {
//   const [reviews, setReviews] = useState([]);
//   const [editingReview, setEditingReview] = useState(null);
//   const [editedComment, setEditedComment] = useState("");
//   const [editedRating, setEditedRating] = useState(1);
//   const [loading, setLoading] = useState(true);

//   // Fetch user reviews
//   useEffect(() => {
//     axios
//       .get("/review.json")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setReviews(res.data);
//         } else if (Array.isArray(res.data.reviews)) {
//           setReviews(res.data.reviews);
//         } else {
//           setReviews([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch reviews", err);
//         setReviews([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // DELETE REVIEW
//   const handleDelete = async (reviewId) => {
//     const confirmed = window.confirm("Are you sure you want to delete this review?");
//     if (!confirmed) return;

//     try {
//       await axios.delete(`/api/reviews/${reviewId}`);

//       // Remove from UI
//       setReviews((prev) =>
//         prev.filter((r) => (r.id || r._id) !== reviewId)
//       );

//       alert("Review deleted successfully.");
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Failed to delete review.");
//     }
//   };

//   // OPEN MODAL
//   const openEditModal = (review) => {
//     setEditingReview(review);
//     setEditedComment(review.comment);
//     setEditedRating(review.rating);
//   };

//   // UPDATE REVIEW
//   const handleUpdate = async () => {
//     if (!editingReview) return;

//     const updatedReview = {
//       comment: editedComment,
//       rating: editedRating,
//     };

//     try {
//       const reviewId = editingReview.id || editingReview._id;
//       const res = await axios.put(`/api/reviews/${reviewId}`, updatedReview);

//       setReviews((prev) =>
//         prev.map((r) =>
//           (r.id || r._id) === reviewId
//             ? {
//                 ...r,
//                 ...updatedReview,
//                 date: res.data.date || r.date, // update date if backend sends new date
//               }
//             : r
//         )
//       );

//       alert("Review updated successfully.");
//       closeEditModal();
//     } catch (err) {
//       console.error("Update failed", err);
//       alert("Failed to update review.");
//     }
//   };

//   // CLOSE MODAL
//   const closeEditModal = () => {
//     setEditingReview(null);
//     setEditedComment("");
//     setEditedRating(1);
//   };

//   if (loading) return <p>Loading your reviews...</p>;

//   return (
//     <div className="container mx-auto p-4 mt-20">
//       <h2 className="text-2xl font-bold mb-4">Comster Reviews</h2>

//       {reviews.length === 0 && <p>You have not submitted any reviews yet.</p>}

//      <Marquee>
//          <div className="space-y-6 grid grid-cols-1 sm: grid-cols-2 md: grid-cols-3 lg: grid-cols-4 p-4 gap-4">
//         {reviews.map((review) => {
//           const reviewId = review.id || review._id;
//           return (
//             <div key={reviewId} className="border rounded p-4 shadow">
//                 <img src='image' alt="" />
//               <h3 className="text-xl font-semibold">{review.mealName}</h3>
//               <p><strong>Rating:</strong> {review.rating} / 5</p>
//               <p><strong>Comment:</strong> {review.comment}</p>

//               <p className="text-sm text-gray-500">
//                 Date: {review.date ? new Date(review.date).toLocaleString() : "N/A"}
//               </p>

//               {/* <div className="mt-4 space-x-2">
//                 <button
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   onClick={() => handleDelete(reviewId)}
//                 >
//                   Delete
//                 </button>

//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   onClick={() => openEditModal(review)}
//                 >
//                   Update
//                 </button>
//               </div> */}
//             </div>
//           );
//         })}
//       </div>
//      </Marquee>

//       {/* EDIT MODAL */}
//       {editingReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded p-6 w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">
//               Edit Review: {editingReview.mealName}
//             </h3>

//             <div className="mb-4">
//               <label className="block mb-1">Rating (1–5):</label>
//               <input
//                 type="number"
//                 min="1"
//                 max="5"
//                 value={editedRating}
//                 onChange={(e) => setEditedRating(Number(e.target.value))}
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block mb-1">Comment:</label>
//               <textarea
//                 rows="4"
//                 value={editedComment}
//                 onChange={(e) => setEditedComment(e.target.value)}
//                 className="w-full border rounded p-2"
//               />
//             </div>

//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                 onClick={closeEditModal}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 onClick={handleUpdate}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;

import axios from "axios";
import React, { useEffect, useState } from "react";

const Review = ({ mealId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews for the specific meal
  useEffect(() => {
    axios
      .get(`/review.json`) // Replace with your real API: `/api/meals/${mealId}/reviews`
      .then((res) => {
        const allReviews = Array.isArray(res.data) ? res.data : res.data.reviews || [];

        const mealReviews = allReviews.filter((r) => r.mealId === mealId);

        setReviews(mealReviews);
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) return <p>Loading Reviews...</p>;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-600">No reviews available for this meal.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id || review._id}
            className="bg-white p-5 shadow rounded-lg border"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.userImage}
                className="w-12 h-12 rounded-full border"
                alt="Reviewer"
              />
              <div>
                <p className="font-bold">{review.userName}</p>
                <p className="text-xs text-gray-500">
                  {review.date ? new Date(review.date).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </div>

            {/* Rating */}
            <p className="text-yellow-500 text-lg mb-2">
              {"⭐".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </p>

            {/* Comment */}
            <p className="text-gray-700 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;

