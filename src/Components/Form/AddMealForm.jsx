


import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { imageUpload } from '../../utils';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import Swal from "sweetalert2";
import { TbFidgetSpinner } from 'react-icons/tb';

const AddMealForm = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);

  // ---------------- MUTATION ----------------
  const {
    mutateAsync,
    isPending,
    isError,
    reset: mutationReset
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/meals`, payload),

    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Meal added successfully!",
        icon: "success",
        confirmButtonColor: "#84cc16",
      });

      mutationReset(); // refresh state
    },

    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    },
  });

  // ---------------- FORM ----------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const file = data.foodImage[0];
      const imageUrl = await imageUpload(file);

      const mealData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        rating,
        image: imageUrl,
        Chef: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(mealData);
      reset();
      setRating(0);
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-4">
      <form className="w-full max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT SECTION */}
          <div className="space-y-6">

            {/* Food Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Food Name</label>
              <input
                type="text"
                placeholder="Grilled Chicken Salad"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("foodName", { required: "Food name is required" })}
              />
            </div>

            {/* Chef Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Chef Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("chefName", { required: true })}
              />
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Description</label>
              <textarea
                placeholder="Chicken, Tomato, Onion..."
                className="w-full h-32 px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("description", { required: true })}
              ></textarea>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">

            {/* Price */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Price</label>
              <input
                type="number"
                placeholder="12.99"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("price", { required: true })}
              />
            </div>

            {/* Quantity */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Quantity</label>
              <input
                type="number"
                placeholder="10"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("quantity", { required: true })}
              />
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Category</label>
              <select
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("category", { required: true })}
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>

            {/* Rating */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <input type="hidden" value={rating} {...register("rating")} />
            </div>
          </div>

          {/* Chef Experience */}
          <div>
            <label className="block text-gray-600">Chef Experience</label>
            <input
              type="text"
              placeholder="5 years"
              className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
              {...register("chefExperience", { required: true })}
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="block text-gray-600">Chef ID</label>
            <input
              type="text"
              placeholder="chef_123"
              className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
              {...register("chefId")}
            />
          </div>

          {/* Image Upload */}
          <div className="p-4 w-full rounded-lg">
            <label className="cursor-pointer">
              <input type="file" className="hidden" {...register("foodImage", { required: true })} />
              <div className="bg-lime-500 text-white px-3 py-2 rounded-md">Upload Food Image</div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-3 rounded-md shadow-md hover:bg-lime-600 transition"
          >
            {isPending ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Save & Add Meal"}
          </button>

        </div>
      </form>
    </div>

    
  );
};

export default AddMealForm;


// import React, { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import { useForm } from "react-hook-form";
// import { FaStar } from "react-icons/fa";
// import { imageUpload } from "../../utils";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { TbFidgetSpinner } from "react-icons/tb";

// const AddMealForm = () => {
//   const { user } = useAuth();
//   const [rating, setRating] = useState(0);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // ---------------- MUTATION ----------------
//   const { mutateAsync, isPending } = useMutation({
//     mutationFn: async (mealData) =>
//       await axios.post(`${import.meta.env.VITE_API_URL}/meals`, mealData),

//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Meal Added!",
//         text: "Your meal has been added successfully.",
//         confirmButtonColor: "#84cc16",
//       });
//       reset();
//       setRating(0);
//     },

//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to add meal!",
//       });
//     },
//   });

//   // ---------------- SUBMIT ----------------
//   const onSubmit = async (data) => {
//     try {
//       const imageFile = data.foodImage[0];
//       const imageUrl = await imageUpload(imageFile);

//       const mealData = {
//         foodName: data.foodName,
//         chefName: data.chefName,
//         price: Number(data.price),
//         rating,
//         Description: data.Description,
//         estimatedDeliveryTime: data.estimatedDeliveryTime,
//         chefExperience: data.chefExperience,
//         chefId: data.chefId, // assigned after admin approval
//         userEmail: user?.email,
//         image: imageUrl,
//         createdAt: new Date(),
//       };

//       await mutateAsync(mealData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-4xl bg-white p-8 rounded-xl shadow"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Add New Meal
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Food Name */}
//           <div>
//             <label className="text-sm text-gray-600">Food Name</label>
//             <input
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("foodName", { required: true })}
//             />
//           </div>

//           {/* Chef Name */}
//           <div>
//             <label className="text-sm text-gray-600">Chef Name</label>
//             <input
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("chefName", { required: true })}
//             />
//           </div>

//           {/* User Email (Read-only) */}
//           <div>
//             <label className="text-sm text-gray-600">User Email</label>
//             <input
//               value={user?.email || ""}
//               readOnly
//               className="w-full px-4 py-3 border rounded-md bg-gray-100"
//             />
//           </div>

//           {/* Chef ID */}
//           <div>
//             <label className="text-sm text-gray-600">Chef ID</label>
//             <input
//               placeholder="Assigned by Admin"
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("chefId", { required: true })}
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="text-sm text-gray-600">Price</label>
//             <input
//               type="number"
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("price", { required: true })}
//             />
//           </div>

//           {/* Estimated Delivery Time */}
//           <div>
//             <label className="text-sm text-gray-600">
//               Estimated Delivery Time
//             </label>
//             <input
//               placeholder="30 minutes"
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("estimatedDeliveryTime", { required: true })}
//             />
//           </div>

//           {/* Ingredients */}
//           <div className="md:col-span-2">
//             <label className="text-sm text-gray-600">Description</label>
//             <textarea
//               rows="3"
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("ingredients", { required: true })}
//             ></textarea>
//           </div>

//           {/* Chef Experience */}
//           <div>
//             <label className="text-sm text-gray-600">Chef Experience</label>
//             <input
//               placeholder="5 years"
//               className="w-full px-4 py-3 border rounded-md"
//               {...register("chefExperience", { required: true })}
//             />
//           </div>

//           {/* Rating */}
//           <div>
//             <label className="text-sm text-gray-600">Rating</label>
//             <div className="flex gap-1 mt-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <FaStar
//                   key={star}
//                   onClick={() => setRating(star)}
//                   className={`cursor-pointer text-xl ${
//                     rating >= star ? "text-yellow-400" : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="md:col-span-2">
//             <label className="block text-sm text-gray-600 mb-1">
//               Food Image
//             </label>
//             <input
//               type="file"
//               className="w-full"
//               {...register("foodImage", { required: true })}
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isPending}
//           className="w-full mt-6 bg-lime-500 text-white py-3 rounded-md hover:bg-lime-600 transition"
//         >
//           {isPending ? (
//             <TbFidgetSpinner className="animate-spin mx-auto" />
//           ) : (
//             "Add Meal"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMealForm;

