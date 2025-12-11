// import React from 'react';
// import { useForm } from 'react-hook-form';

// const AddMealForm = () => {

//   const {register, handleSubmit , 
//     formState: {errors}} = useForm

//   const onSubmit = async data => {
//     console.log(data)
//   }
//     return (
//     //     <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
//     //   <form>
//     //     <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
//     //       <div className='space-y-6'>
//     //         {/* Name */}
//     //         <div className='space-y-1 text-sm'>
//     //           <label htmlFor='name' className='block text-gray-600'>
//     //             Name
//     //           </label>
//     //           <input
//     //             className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//     //             name='name'
//     //             id='name'
//     //             type='text'
//     //             placeholder='Plant Name'
//     //             required
//     //           />
//     //         </div>
//     //         {/* Category */}
//     //         <div className='space-y-1 text-sm'>
//     //           <label htmlFor='category' className='block text-gray-600 '>
//     //             Category
//     //           </label>
//     //           <select
//     //             required
//     //             className='w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//     //             name='category'
//     //           >
//     //             <option value='Indoor'>Indoor</option>
//     //             <option value='Outdoor'>Outdoor</option>
//     //             <option value='Succulent'>Succulent</option>
//     //             <option value='Flowering'>Flowering</option>
//     //           </select>
//     //         </div>
//     //         {/* Description */}
//     //         <div className='space-y-1 text-sm'>
//     //           <label htmlFor='description' className='block text-gray-600'>
//     //             Description
//     //           </label>

//     //           <textarea
//     //             id='description'
//     //             placeholder='Write plant description here...'
//     //             className='block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 '
//     //             name='description'
//     //           ></textarea>
//     //         </div>
//     //       </div>
//     //       <div className='space-y-6 flex flex-col'>
//     //         {/* Price & Quantity */}
//     //         <div className='flex justify-between gap-2'>
//     //           {/* Price */}
//     //           <div className='space-y-1 text-sm'>
//     //             <label htmlFor='price' className='block text-gray-600 '>
//     //               Price
//     //             </label>
//     //             <input
//     //               className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//     //               name='price'
//     //               id='price'
//     //               type='number'
//     //               placeholder='Price per unit'
//     //               required
//     //             />
//     //           </div>

//     //           {/* Quantity */}
//     //           <div className='space-y-1 text-sm'>
//     //             <label htmlFor='quantity' className='block text-gray-600'>
//     //               Quantity
//     //             </label>
//     //             <input
//     //               className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//     //               name='quantity'
//     //               id='quantity'
//     //               type='number'
//     //               placeholder='Available quantity'
//     //               required
//     //             />
//     //           </div>
//     //         </div>
//     //         {/* Image */}
//     //         <div className=' p-4  w-full  m-auto rounded-lg grow'>
//     //           <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
//     //             <div className='flex flex-col w-max mx-auto text-center'>
//     //               <label>
//     //                 <input
//     //                   className='text-sm cursor-pointer w-36 hidden'
//     //                   type='file'
//     //                   name='image'
//     //                   id='image'
//     //                   accept='image/*'
//     //                   hidden
//     //                 />
//     //                 <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
//     //                   Upload
//     //                 </div>
//     //               </label>
//     //             </div>
//     //           </div>
//     //         </div>

//     //         {/* Submit Button */}
//     //         <button
//     //           type='submit'
//     //           className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 '
//     //         >
//     //           Save & Continue
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </form>
//     // </div>


//      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-4">
//       <form className="w-full max-w-4xl" 
//       onSubmit={handleSubmit(onSubmit)}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Left Column */}
//           <div className="space-y-6">
//             {/* Food Name */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="foodName" className="block text-gray-600">
//                 Food Name
//               </label>
//               <input
//                 type="text"
//                 id="foodName"
//                 name="foodName"
//                 value={formData.foodName}
//                 onChange={handleChange}
//                 placeholder="Grilled Chicken Salad"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                  {...register('Food name', {
//                   required: 'Name is required',
//                   maxLength:{
//                     value: 20,
//                     message: 'Name cannot be too long',
//                   },
//                 })}

//               />

//             </div>

//             {/* Chef Name */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="chefName" className="block text-gray-600">
//                 Chef Name
//               </label>
//               <input
//                 type="text"
//                 id="chefName"
//                 name="chefName"
//                 // value={formData.chefName}
//                 // onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                 {...register('chef Name', {
//                   required: 'chef Name is required',
//                   maxLength:{
//                     value: 20,
//                     message: 'chef Name cannot be too long',
//                   },
//                 })}
//               />
//             </div>

//             {/* Ingredients */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="ingredients" className="block text-gray-600">
//                 Ingredients (comma separated)
//               </label>
//               <textarea
//                 id="ingredients"
//                 name="ingredients"
//                 value={formData.ingredients}
//                 onChange={handleChange}
//                 placeholder="Chicken, Lettuce, Tomatoes..."
//                 className="w-full h-32 px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                 {...register('chef Name', {
//                   required: 'chef Name is required',
//                   min:{
//                     value: 25,
//                     message: 'Description cannot be too long',
//                   },
//                 })}
//               ></textarea>
//             </div>

//             {/* Estimated Delivery Time */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="estimatedDeliveryTime" className="block text-gray-600">
//                 Estimated Delivery Time
//               </label>
//               <input
//                 type="text"
//                 id="estimatedDeliveryTime"
//                 name="estimatedDeliveryTime"
//                 value={formData.estimatedDeliveryTime}
//                 onChange={handleChange}
//                 placeholder="30 minutes"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                 required
//               />
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6 flex flex-col">
//             {/* Price */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="price" className="block text-gray-600">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="12.99"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                 {...register('price', {
//                   required: 'price is required',
//                   min:{
//                     value: 0,
//                     message: 'Price must be positive',
//                   },
//                 })}
//               />
//               {
//                 errors.price && (
//                   <p className='text-xs text-red-500 mt-1'>
//                     {
//                       errors.price.message
//                     }
//                   </p>
//                 )
//               }
//             </div>

//             {/* Rating */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="rating" className="block text-gray-600">
//                 Rating
//               </label>
//               <input
//                 type="number"
//                 id="rating"
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleChange}
//                 placeholder="0"
//                 min="0"
//                 max="5"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//               />
//             </div>

//             {/* Chef Experience */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="chefExperience" className="block text-gray-600">
//                 Chef Experience
//               </label>
//               <input
//                 type="text"
//                 id="chefExperience"
//                 name="chefExperience"
//                value={formData.chefExperience}
//                 onChange={handleChange}
//                 placeholder="5 years of Mediterranean cuisine"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//                 required
//               />
//             </div>

//             {/* Chef ID */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="chefId" className="block text-gray-600">
//                 Chef ID
//               </label>
//               <input
//                 type="text"
//                 id="chefId"
//                 name="chefId"
//                 value={formData.chefId}
//                 onChange={handleChange}
//                 placeholder="chef_123456"
//                 className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
//               />
//             </div>

//             {/* User Email */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="userEmail" className="block text-gray-600">
//                 User Email
//               </label>
//               <input
//                 type="email"
//                 id="userEmail"
//                 value={user?.email || ''}
//                 readOnly
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-200"
//               />
//             </div>

//             {/* Food Image */}
//             <div className="p-4 w-full rounded-lg">
//               <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
//                 <div className="flex flex-col w-max mx-auto text-center">
//                   <label className="cursor-pointer">
//                     <input
//                       type="file"
//                       name="foodImage"
//                       accept="image/*"
//                       onChange={handleChange}
//                       className="hidden"
//                       {...register('image', {
//                   required: 'image is required',

//                 })}
//                     />
//                     <div className="bg-lime-500 text-white rounded px-3 py-1 hover:bg-lime-600 transition">
//                       Upload Food Image
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-lime-500 text-white py-3 rounded-md shadow-md hover:bg-lime-600 transition mt-4"
//             >
//               Add Meal
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//     );
// };

// export default AddMealForm;


import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { imageUpload } from '../../utils';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { toast } from 'react-toastify';
import { TbFidgetSpinner } from 'react-icons/tb';
//import { useForm } from 'react-hook-form';
//import useAuth from "../../../hooks/useAuth";

const AddMealForm = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);

  // useMutation hook useCase

  const { isPending, isError, mutateAsync, reset: mutationReset } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        payload),
    onSuccess: data => {
      console.log(data)
      // show toast
      toast.success('The Meal Add Succe3ssfully')
      // navigate to my inventory page
      mutationReset()
      //Query key invalidate
    },
    onError: error => {
      console.log(error)
    },
    onMutate: payload => {
      console.log('I will post this data----->', payload)
    },
    onSettled: (data, error) => {
      if (data) console.log(data)
      if (error) console.log(error)
    },
    retry: 3,
  })


  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const {
        foodName,
        description,
        price,
        quantity,
        category,
        chefId,
        chefName,
        estimatedDeliveryTime,
        chefExperience,
        foodImage
      } = data;

      const imageFile = foodImage?.[0];
      const imageUrl = await imageUpload(imageFile);

      const mealData = {
        foodName,
        description,
        price: Number(price),
        quantity: Number(quantity),
        category,
        rating,
        chefId,
        chefName,
        estimatedDeliveryTime,
        chefExperience,
        image: imageUrl,
        Chef: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(mealData)
      reset()

      //console.log("Sending:", mealData);

      // const res = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/meals`,
      //   mealData
      // );

      // console.log("POST Success:", res.data);
    } catch (err) {
      console.error("POST Error:", err);
    }
  };
  if (isPending) return <LoadingSpinner></LoadingSpinner>
  if (isError) return <Error></Error>


  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-4">
      <form className="w-full max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Food Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Food Name</label>
              <input
                type="text"
                placeholder="Grilled Chicken Salad"
                className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
                {...register("foodName", {
                  required: "Food name is required",
                  maxLength: 40
                })}
              />
              {errors.foodName && (
                <p className="text-red-500 text-xs">{errors.foodName.message}</p>
              )}
            </div>

            {/* Chef Name */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Chef Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("chefName", { required: "Chef name is required" })}
              />
            </div>

            {/* Ingredients */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Description</label>
              <textarea
                placeholder="Chicken, Tomato, Onion..."
                className="w-full h-32 px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500 bg-white"
                {...register("description", { required: "Description required" })}
              ></textarea>
            </div>

            {/* Estimated Delivery */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Estimated Delivery Time</label>
              <input
                type="text"
                placeholder="30 minutes"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("estimatedDeliveryTime", { required: true })}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 flex flex-col">

            {/* Price */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Price</label>
              <input
                type="number"
                placeholder="12.99"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("price", { required: "Price is required" })}
              />
            </div>
            {/* quantity */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Quantity</label>
              <input
                type="number"
                placeholder="12.99"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("quantity", { required: "quantity is required" })}
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Category</label>
              <select
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs">{errors.category.message}</p>
              )}
            </div>


            {/* Rating */}
            {/* <div className="space-y-1 text-sm">
              <label className="block text-gray-600">Rating</label>
              <input
                type="number"
                placeholder="0-5"
                className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
                {...register("rating")}
              />
            </div> */}

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

            {/* Hidden input for form submission */}
            <input
              type="hidden"
              value={rating}
              {...register("rating")}
            />
          </div>



          {/* Chef Experience */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">Chef Experience</label>
            <input
              type="text"
              placeholder="5 years of cooking"
              className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
              {...register("chefExperience", { required: true })}
            />
          </div>

          {/* Chef ID */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">Chef ID</label>
            <input
              type="text"
              placeholder="chef_123"
              className="w-full px-4 py-3 border border-lime-300 rounded-md bg-white"
              {...register("chefId")}
            />
          </div>

          {/* User Email */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>

          {/* Image */}
          <div className="p-4 w-full rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("foodImage", { required: true })}
                />
                <div className="bg-lime-500 text-white rounded px-3 py-1 hover:bg-lime-600">
                  Upload Food Image
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-white py-3 rounded-md shadow-md hover:bg-lime-600 transition"
          >

            {
              isPending ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'save & Add Meal Meal'
              )
            }
          </button>
        </div>
      </form >
    </div >
  );
};

export default AddMealForm;
