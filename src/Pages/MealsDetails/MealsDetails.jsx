


// // // // Full Meal Details Page with Auth Guard, Reviews, and Favorites
// // // import React, { useState, useContext } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // // import axios from "axios";
// // // import { FaStar } from "react-icons/fa";
// // // import Swal from "sweetalert2";

// // // import Container from "../../Components/Shared/Container";
// // // import Heading from "../../Components/Shared/Heading";
// // // import Button from "../../Components/Shared/Button/Button";
// // // import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// // // import { AuthContext } from "../../providers/AuthContext";
// // // //import { AuthContext } from "../../Providers/AuthProvider";

// // // const MealsDetails = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const queryClient = useQueryClient();
// // //   const { user, loading } = useContext(AuthContext);

// // //   const [rating, setRating] = useState(5);
// // //   const [comment, setComment] = useState("");

// // //   // 🔐 Auth Guard
// // //   if (!loading && !user) {
// // //     navigate("/login");
// // //   }

// // //   // 🍽 Fetch meal
// // //   const { data: meal = {}, isLoading } = useQuery({
// // //     queryKey: ["meal", id],
// // //     queryFn: async () => {
// // //       const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/${id}`);
// // //       return res.data;
// // //     },
// // //   });

// // //   // ⭐ Fetch reviews
// // //   const { data: reviews = [] } = useQuery({
// // //     queryKey: ["reviews", id],
// // //     queryFn: async () => {
// // //       const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews?foodId=${id}`);
// // //       return res.data;
// // //     },
// // //   });

// // //   // ➕ Add review
// // //   const addReview = useMutation({
// // //     mutationFn: async (reviewData) => {
// // //       return axios.post(`${import.meta.env.VITE_API_URL}/reviews`, reviewData);
// // //     },
// // //     onSuccess: () => {
// // //       queryClient.invalidateQueries(["reviews", id]);
// // //       Swal.fire("Success", "Review submitted successfully!", "success");
// // //       setComment("");
// // //       setRating(5);
// // //     },
// // //   });

// // //   // ❤️ Add to favorite
// // //   const addFavorite = async () => {
// // //     const favoriteData = {
// // //       userEmail: user.email,
// // //       mealId: meal._id,
// // //       mealName: meal.foodName,
// // //       chefId: meal.chefId,
// // //       chefName: meal.chefName,
// // //       price: meal.price,
// // //       addedTime: new Date().toISOString(),
// // //     };

// // //     try {
// // //       await axios.post(`${import.meta.env.VITE_API_URL}/favorites`, favoriteData);
// // //       Swal.fire("Added", "Meal added to favorites!", "success");
// // //     } catch (err) {
// // //       Swal.fire("Info", "This meal is already in your favorites", "info");
// // //     }
// // //   };

// // //   if (isLoading) return <LoadingSpinner />;

// // //   const {
// // //     foodName,
// // //     chefName,
// // //     chefId,
// // //     image,
// // //     price,
// // //     rating: avgRating,
// // //     description,
// // //     deliveryArea,
// // //     deliveryTime,
// // //     chefExperience,
// // //   } = meal;

// // //   return (
// // //     <Container>
// // //       <div className="grid lg:grid-cols-2 gap-12 my-12">
// // //         {/* Image */}
// // //         <img src={image} alt={foodName} className="rounded-xl w-full h-[450px] object-cover" />

// // //         {/* Details */}
// // //         <div className="space-y-4">
// // //           <Heading title={foodName} subtitle={`Chef: ${chefName} (ID: ${chefId})`} />

// // //           <div className="flex items-center gap-1">
// // //             {[1, 2, 3, 4, 5].map((s) => (
// // //               <FaStar key={s} className={avgRating >= s ? "text-yellow-400" : "text-gray-300"} />
// // //             ))}
// // //             <span className="ml-2">({avgRating}/5)</span>
// // //           </div>

// // //           <p><strong>Ingredients:</strong> {description}</p>
// // //           <p><strong>Delivery Area:</strong> {deliveryArea}</p>
// // //           <p><strong>Estimated Delivery:</strong> {deliveryTime} mins</p>
// // //           <p><strong>Chef Experience:</strong> {chefExperience} years</p>

// // //           <div className="flex items-center gap-4 mt-6">
// // //             <p className="text-3xl font-bold">${price}</p>
// // //             <Button label="Order Now" onClick={() => navigate(`/order/${id}`)} />
// // //             <Button label="❤️ Favorite" onClick={addFavorite} />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* 📝 Review Section */}
// // //       <div className="mt-16">
// // //         <h2 className="text-2xl font-bold mb-4">Reviews</h2>

// // //         {/* Existing Reviews */}
// // //         <div className="space-y-4">
// // //           {reviews.map((r) => (
// // //             <div key={r._id} className="border p-4 rounded">
// // //               <div className="flex items-center gap-3">
// // //                 <img src={r.reviewerImage} className="w-10 h-10 rounded-full" />
// // //                 <div>
// // //                   <p className="font-semibold">{r.reviewerName}</p>
// // //                   <div className="flex">
// // //                     {[1, 2, 3, 4, 5].map((s) => (
// // //                       <FaStar key={s} className={r.rating >= s ? "text-yellow-400" : "text-gray-300"} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <p className="mt-2">{r.comment}</p>
// // //               <p className="text-sm text-gray-500">{new Date(r.date).toLocaleString()}</p>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Add Review */}
// // //         <div className="mt-8">
// // //           <h3 className="text-xl font-semibold mb-2">Give Review</h3>
// // //           <div className="flex gap-1 mb-2">
// // //             {[1, 2, 3, 4, 5].map((s) => (
// // //               <FaStar
// // //                 key={s}
// // //                 onClick={() => setRating(s)}
// // //                 className={`cursor-pointer ${rating >= s ? "text-yellow-400" : "text-gray-300"}`}
// // //               />
// // //             ))}
// // //           </div>
// // //           <textarea
// // //             className="w-full border rounded p-2"
// // //             placeholder="Write your review..."
// // //             value={comment}
// // //             onChange={(e) => setComment(e.target.value)}
// // //           />
// // //           <Button
// // //             label="Submit Review"
// // //             onClick={() =>
// // //               addReview.mutate({
// // //                 foodId: id,
// // //                 reviewerName: user.displayName,
// // //                 reviewerImage: user.photoURL,
// // //                 rating,
// // //                 comment,
// // //                 date: new Date().toISOString(),
// // //               })
// // //             }
// // //           />
// // //         </div>
// // //       </div>
// // //     </Container>
// // //   );
// // // };

// // // export default MealsDetails;


// // // Full Meal Details Page (Private) with Reviews & Favorites

// // import React, { useState, useContext, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import axios from "axios";
// // import { FaStar } from "react-icons/fa";
// // import Swal from "sweetalert2";

// // import Container from "../../Components/Shared/Container";
// // import Heading from "../../Components/Shared/Heading";
// // import Button from "../../Components/Shared/Button/Button";
// // import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// // import { AuthContext } from "../../providers/AuthContext";

// // const MealsDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const queryClient = useQueryClient();
// //   const { user, loading } = useContext(AuthContext);

// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");

// //   /* =====================
// //         🔐 Auth Guard
// //   ====================== */
// //   useEffect(() => {
// //     if (!loading && !user) {
// //       navigate("/login");
// //     }
// //   }, [loading, user, navigate]);

// //   /* =====================
// //         🍽 Fetch Meal
// //   ====================== */
// //   const { data: meal = {}, isLoading } = useQuery({
// //     queryKey: ["meal", id],
// //     enabled: !!user,
// //     queryFn: async () => {
// //       const res = await axios.get(
// //         `${import.meta.env.VITE_API_URL}/meals/${id}`
// //       );
// //       return res.data;
// //     },
// //   });

// //   /* =====================
// //         ⭐ Fetch Reviews
// //   ====================== */
// //   const { data: reviews = [] } = useQuery({
// //     queryKey: ["reviews", id],
// //     enabled: !!user,
// //     queryFn: async () => {
// //       const res = await axios.get(
// //         `${import.meta.env.VITE_API_URL}/reviews?foodId=${id}`
// //       );
// //       return res.data;
// //     },
// //   });

// //   /* =====================
// //         ➕ Add Review
// //   ====================== */
// //   const addReview = useMutation({
// //     mutationFn: async (reviewData) => {
// //       return axios.post(
// //         `${import.meta.env.VITE_API_URL}/reviews`,
// //         reviewData
// //       );
// //     },
// //     onSuccess: () => {
// //       queryClient.invalidateQueries(["reviews", id]);
// //       Swal.fire("Success", "Review submitted successfully!", "success");
// //       setComment("");
// //       setRating(5);
// //     },
// //   });

// //   /* =====================
// //         ❤️ Add to Favorite
// //   ====================== */
// //   const handleAddFavorite = async () => {
// //     const favoriteData = {
// //       userEmail: user.email,
// //       mealId: meal._id,
// //       mealName: meal.foodName,
// //       chefId: meal.chefId,
// //       chefName: meal.chefName,
// //       price: meal.price,
// //       addedTime: new Date().toISOString(),
// //     };

// //     try {
// //       await axios.post(
// //         `${import.meta.env.VITE_API_URL}/favorites`,
// //         favoriteData
// //       );
// //       Swal.fire("Success", "Meal added to favorites!", "success");
// //     } catch {
// //       Swal.fire("Info", "Meal already exists in favorites", "info");
// //     }
// //   };

// //   if (loading || isLoading) return <LoadingSpinner />;

// //   const {
// //     foodName,
// //     chefName,
// //     chefId,
// //     image,
// //     price,
// //     rating: avgRating,
// //     description,
// //     deliveryArea,
// //     deliveryTime,
// //     chefExperience,
// //   } = meal;

// //   return (
// //     <Container>
// //       {/* =====================
// //             Meal Details
// //       ====================== */}
// //       <div className="grid lg:grid-cols-2 gap-12 my-12">
// //         <img
// //           src={image}
// //           alt={foodName}
// //           className="rounded-xl w-full h-[450px] object-cover"
// //         />

// //         <div className="space-y-4">
// //           <Heading
// //             title={foodName}
// //             subtitle={`Chef: ${chefName} (ID: ${chefId})`}
// //           />

// //           {/* Rating */}
// //           <div className="flex items-center gap-1">
// //             {[1, 2, 3, 4, 5].map((s) => (
// //               <FaStar
// //                 key={s}
// //                 className={
// //                   avgRating >= s ? "text-yellow-400" : "text-gray-300"
// //                 }
// //               />
// //             ))}
// //             <span className="ml-2">({avgRating}/5)</span>
// //           </div>

// //           <p><strong>Ingredients:</strong> {description}</p>
// //           <p><strong>Delivery Area:</strong> {deliveryArea}</p>
// //           <p><strong>Estimated Delivery Time:</strong> {deliveryTime} mins</p>
// //           <p><strong>Chef Experience:</strong> {chefExperience} years</p>

// //           <div className="flex items-center gap-4 mt-6">
// //             <p className="text-3xl font-bold">৳{price}</p>
// //             <Button
// //               label="Order Now"
// //               onClick={() => navigate(`/order/${id}`)}
// //             />
// //             <Button label="❤️ Favorite" onClick={handleAddFavorite} />
// //           </div>
// //         </div>
// //       </div>

// //       {/* =====================
// //             Reviews Section
// //       ====================== */}
// //       <div className="mt-16">
// //         <h2 className="text-2xl font-bold mb-4">Reviews</h2>

// //         {/* Existing Reviews */}
// //         <div className="space-y-4">
// //           {reviews.map((r) => (
// //             <div key={r._id} className="border p-4 rounded">
// //               <div className="flex items-center gap-3">
// //                 <img
// //                   src={r.reviewerImage}
// //                   alt=""
// //                   className="w-10 h-10 rounded-full"
// //                 />
// //                 <div>
// //                   <p className="font-semibold">{r.reviewerName}</p>
// //                   <div className="flex">
// //                     {[1, 2, 3, 4, 5].map((s) => (
// //                       <FaStar
// //                         key={s}
// //                         className={
// //                           r.rating >= s
// //                             ? "text-yellow-400"
// //                             : "text-gray-300"
// //                         }
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <p className="mt-2">{r.comment}</p>
// //               <p className="text-sm text-gray-500">
// //                 {new Date(r.date).toLocaleString()}
// //               </p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Add Review */}
// //         <div className="mt-8">
// //           <h3 className="text-xl font-semibold mb-2">Give Review</h3>

// //           <div className="flex gap-1 mb-2">
// //             {[1, 2, 3, 4, 5].map((s) => (
// //               <FaStar
// //                 key={s}
// //                 onClick={() => setRating(s)}
// //                 className={`cursor-pointer ${
// //                   rating >= s ? "text-yellow-400" : "text-gray-300"
// //                 }`}
// //               />
// //             ))}
// //           </div>

// //           <textarea
// //             className="w-full border rounded p-2"
// //             placeholder="Write your review..."
// //             value={comment}
// //             onChange={(e) => setComment(e.target.value)}
// //           />

// //           <Button
// //             label="Submit Review"
// //             onClick={() =>
// //               addReview.mutate({
// //                 foodId: id,
// //                 reviewerName: user.displayName,
// //                 reviewerImage: user.photoURL,
// //                 rating,
// //                 comment,
// //                 date: new Date().toISOString(),
// //               })
// //             }
// //           />
// //         </div>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default MealsDetails;



// // import React from "react";
// // import { useNavigate, useParams } from "react-router";
// // import useAxiosSecure from "../../Hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // //import Loading from "../../Components/Shared/Loading";
// // import { FaStar } from "react-icons/fa";
// // import ReviewModal from "../../Components/Shared/ReviewModal";
// // import useAuth from "../../Hooks/useAuth";
// // import Swal from "sweetalert2";
// // import MealReview from "../../Components/Shared/MealReview";

// // const MealDetails = () => {
// //     const { user } = useAuth();
// //     const { id } = useParams();
// //     const axiosSecure = useAxiosSecure();
// //     const navigate = useNavigate();

// //     const { data: meal = {} } = useQuery({
// //         queryKey: ["meal", id],
// //         queryFn: async () => {
// //             const res = await axiosSecure.get(`/meals/${id}`);
// //             return res.data;
// //         },
// //     });
    
// //     const { data: reviews = [], refetch: reviewRefetch } = useQuery({
// //         queryKey: ["reviews", meal._id],
// //         queryFn: async () => {
// //             const res = await axiosSecure.get(`/reviews/${meal._id}`);
// //             return res.data;
// //         },
// //     });

// //     const handleAddFav = async () => {
// //         const favouriteMeal = {
// //             userEmail: user.email,
// //             mealId: meal._id,
// //             mealName: meal.foodName,
// //             chefId: meal.chefId,
// //             chefName: meal.chefName,
// //             price: meal.price,
// //         };
// //         const res = await axiosSecure.post("/favorites", favouriteMeal);
// //         if (res.data.success) {
// //             Swal.fire("Added", "Meal added to your favourites", "success");
// //         } else {
// //             Swal.fire("Oops!", res.data.message, "info");
// //         }
// //     };

// //     return (
// //         <div className="max-w-7xl mx-auto my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-base-300 shadow-lg rounded-lg">
// //             {/* Main Layout */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
// //                 <div>
// //                     <img src={meal.foodImage} alt={meal.foodName} className="w-full h-64 sm:h-80 md:h-96 lg:h-100 object-cover rounded-lg" />
// //                 </div>
// //                 <div className="flex flex-col justify-between">
// //                     <div className="space-y-2 sm:space-y-3">
// //                         <h2 className="text-2xl sm:text-3xl font-bold">{meal.foodName}</h2>

// //                         <p className="text-sm sm:text-base">
// //                             Chef: <span className="font-semibold">{meal.chefName}</span>
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             Chef ID: <span className="font-semibold">{meal.chefId}</span>
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             Price: <span className="font-semibold">${meal.price}</span>
// //                         </p>

// //                         <p className="flex items-center text-sm sm:text-base">
// //                             Rating:
// //                             <span className="font-semibold ml-3 flex items-center">
// //                                 <FaStar className="text-orange-300" /> {meal.rating}
// //                             </span>
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             <span className="font-bold">Ingredients:</span> {meal.ingredients?.join(", ")}
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             <span className="font-bold">Chef Experience:</span> {meal.chefExperience}
// //                         </p>

// //                         <p className="text-sm sm:text-base">
// //                             <span className="font-bold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime}
// //                         </p>
// //                     </div>

// //                     {/* Buttons (Right bottom) */}
// //                     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
// //                         <button onClick={() => navigate(`/order/${meal._id}`)} className="btn bg-orange-300 w-full min-h-11">
// //                             Order Now
// //                         </button>
// //                         <button onClick={handleAddFav} className="btn bg-orange-300 w-full min-h-11">
// //                             Add to Favourite
// //                         </button>
// //                         <button onClick={() => document.getElementById("reviewModal").showModal()} className="btn bg-orange-300 w-full min-h-11">
// //                             Add Review
// //                         </button>
// //                         <button onClick={() => navigate(-1)} className="btn bg-orange-300 w-full min-h-11">
// //                             Back
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>
// //             <MealReview reviews={reviews} />
// //             <ReviewModal mealId={meal?._id} mealName={meal?.foodName} refetch={reviewRefetch} />
// //         </div>
// //     );
// // };

// // export default MealDetails;



// import React from "react";
// import { useNavigate, useParams } from "react-router";
// //import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../Components/Shared/Loading";
// import { FaStar } from "react-icons/fa";
// import ReviewModal from "../../Components/Shared/ReviewModal";
// //import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import MealReview from "../../Components/Shared/MealReview";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// //import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MealDetails = () => {
//     const { user } = useAuth();
//     const { id } = useParams();
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();

//     const { data: meal = {} } = useQuery({
//         queryKey: ["meal", id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/meals/${id}`);
//             return res.data;
//         },
//     });
    
//     const { data: reviews = [], refetch: reviewRefetch } = useQuery({
//         queryKey: ["reviews", meal._id],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/reviews/${meal._id}`);
//             return res.data;
//         },
//     });

//     const handleAddFav = async () => {
//         const favouriteMeal = {
//             userEmail: user.email,
//             mealId: meal._id,
//             mealName: meal.foodName,
//             chefId: meal.chefId,
//             chefName: meal.chefName,
//             price: meal.price,
//         };
//         const res = await axiosSecure.post("/favorites", favouriteMeal);
//         if (res.data.success) {
//             Swal.fire("Added", "Meal added to your favourites", "success");
//         } else {
//             Swal.fire("Oops!", res.data.message, "info");
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-base-300 shadow-lg rounded-lg">
//             {/* Main Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
//                 <div>
//                     <img src={meal.foodImage} alt={meal.foodName} className="w-full h-64 sm:h-80 md:h-96 lg:h-100 object-cover rounded-lg" />
//                 </div>
//                 <div className="flex flex-col justify-between">
//                     <div className="space-y-2 sm:space-y-3">
//                         <h2 className="text-2xl sm:text-3xl font-bold">{meal.foodName}</h2>

//                         <p className="text-sm sm:text-base">
//                             Chef: <span className="font-semibold">{meal.chefName}</span>
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             Chef ID: <span className="font-semibold">{meal.chefId}</span>
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             Price: <span className="font-semibold">${meal.price}</span>
//                         </p>

//                         <p className="flex items-center text-sm sm:text-base">
//                             Rating:
//                             <span className="font-semibold ml-3 flex items-center">
//                                 <FaStar className="text-orange-300" /> {meal.rating}
//                             </span>
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             <span className="font-bold">Ingredients:</span> {meal.ingredients?.join(", ")}
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             <span className="font-bold">Chef Experience:</span> {meal.chefExperience}
//                         </p>

//                         <p className="text-sm sm:text-base">
//                             <span className="font-bold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime}
//                         </p>
//                     </div>

//                     {/* Buttons (Right bottom) */}
//                     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                         <button onClick={() => navigate(`/order/${meal._id}`)} meal={meal._id} className="btn bg-orange-300 w-full min-h-11">
//                             Order Now
//                         </button>
//                         <button onClick={handleAddFav} className="btn bg-orange-300 w-full min-h-11">
//                             Add to Favourite
//                         </button>
//                         <button onClick={() => document.getElementById("reviewModal").showModal()} className="btn bg-orange-300 w-full min-h-11">
//                             Add Review
//                         </button>
//                         <button onClick={() => navigate(-1)} className="btn bg-orange-300 w-full min-h-11">
//                             Back
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <MealReview reviews={reviews} />
//             <ReviewModal mealId={meal?._id} mealName={meal?.foodName} refetch={reviewRefetch} />
//         </div>
//     );
// };

// export default MealDetails;

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import MealReview from "../../Components/Shared/MealReview";
import ReviewModal from "../../Components/Shared/ReviewModal";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Shared/Loading";

const MealDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Auth Guard
  useEffect(() => {
    if (!user) {
      navigate("/login");
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
