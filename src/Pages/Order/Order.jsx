// // import React, { useEffect, useState } from "react";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import { useNavigate, useParams } from "react-router";
// // import useAuth from "../../hooks/useAuth";
// // import { useForm } from "react-hook-form";
// // import { useQuery } from "@tanstack/react-query";
// // import Swal from "sweetalert2";
// // import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// // // import { useNavigate, useParams } from "react-router";
// // // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // // import { useQuery } from "@tanstack/react-query";
// // // import Loading from "../../components/Shared/Loading";
// // // import { useForm } from "react-hook-form";
// // // import useAuth from "../../hooks/useAuth";
// // // import Swal from "sweetalert2";

// // const Order = () => {
// //   const axiosSecure = useAxiosSecure();
// //   const { id } = useParams();
// //   const { user } = useAuth();
// //   const nevigate = useNavigate();

// //   const { register, handleSubmit, setValue, watch } = useForm();
// //   const { data: order = {}, isLoading } = useQuery({
// //     queryKey: ["order", id],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get(`/meals/${id}`);
// //       return res.data;
// //     },
// //   });

// //   useEffect(() => {
// //     if (user) {
// //       setValue("userEmail", user.email);
// //     }
// //   }, [user]);

// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const quantity = watch("quantity");

// //   // set default price when order loads
// //   useEffect(() => {
// //     if (order?.price) {
// //       setTotalPrice(order.price);
// //       setValue("price", order.price);
// //     }
// //   }, [order]);

// //   // update price when quantity changes
// //   useEffect(() => {
// //     if (order?.price && quantity) {
// //       const updated = quantity * order.price;
// //       setTotalPrice(updated);
// //       setValue("price", updated);
// //     }
// //   }, [quantity, order]);

// //   const handlePlaceOrder = (data) => {
// //     const finalPrice = data.quantity * order.price;
// //     setTotalPrice(finalPrice);

// //     Swal.fire({
// //       title: "Agree with the Cost?",
// //       text: `You will be charged ${finalPrice} taka!`,
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#CAEB66",
// //       cancelButtonColor: "#d33",
// //       confirmButtonText: "Confirm",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         axiosSecure
// //           .post("/orders", {mealId:order._id, ...data, price: finalPrice,  })
// //           .then((res) => {
// //             if (res.data.insertedId) {
// //               nevigate("/");
// //               Swal.fire({
// //                 position: "top-end",
// //                 icon: "success",
// //                 title: "Your order has been placed",
// //                 showConfirmButton: false,
// //                 timer: 1500,
// //               });
// //             }
// //           });
// //       }
// //     });
// //   };

// //   if (isLoading) {
// //     return <LoadingSpinner />;
// //   }
// //   return (
// //     <div className="w-8/12 mx-auto p-4">
// //       <h1>Order page{order._id} </h1>
// //       <form onSubmit={handleSubmit(handlePlaceOrder)}>
// //         <fieldset className="fieldset">
// //           {/* user Email */}
// //           <label className="label"> Email</label>
// //           <input
// //             type="email"
// //             {...register("userEmail")}
// //             defaultValue={user?.email}
// //             readOnly
// //             className="input w-full"
// //           />
// //           {/* Meals name */}
// //           <label className="label">Meals Name</label>
// //           <input
// //             type="text"
// //             {...register("MealName")}
// //             defaultValue={order.foodName}
// //             readOnly
// //             className="input w-full"
// //           />
// //           {/* chefId */}
// //           <label className="label">chefId</label>
// //           <input
// //             type="text"
// //             {...register("chefId")}
// //             defaultValue={order.chefId}
// //             readOnly
// //             className="input w-full"
// //           />

// //           {/* Meals price */}
// //           <label className="label">Price</label>
// //           <input
// //             type="number"
// //             {...register("price")}
// //             value={totalPrice}
// //             readOnly
// //             className="input w-full"
// //           />

// //           {/* quantity */}
// //           <label className="label">quantity</label>
// //           <input
// //             type="number"
// //             {...register("quantity")}
// //             className="input w-full"
// //             placeholder="Enter quantity "
// //           />

// //           {/*  Delivery Address */}
// //           <label className="label"> Delivery Address</label>
// //           <input
// //             type="text"
// //             {...register("deliveryAddress")}
// //             className="input w-full"
// //           />
// //         </fieldset>

// //         <button type="submit" className="rannafy-btn">
// //           Submit
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Order;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// import PurchaseModal from "../../Components/Modal/PurchaseModal";

// const Order = () => {
//   const axiosSecure = useAxiosSecure();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const { register, handleSubmit, setValue, watch } = useForm();
//   const [totalPrice, setTotalPrice] = useState(0);

//   /* =======================
//      Fetch Meal Info
//   ======================== */
//   const { data: meal = {}, isLoading } = useQuery({
//     queryKey: ["meal", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/meals/${id}`);
//       return res.data;
//     },
//   });

//   /* =======================
//      Auto fill user email
//   ======================== */
//   useEffect(() => {
//     if (user?.email) {
//       setValue("userEmail", user.email);
//     }
//   }, [user, setValue]);

//   /* =======================
//      Price calculation
//   ======================== */
//   const quantity = watch("quantity");

//   useEffect(() => {
//     if (meal?.price) {
//       setTotalPrice(meal.price);
//       setValue("price", meal.price);
//     }
//   }, [meal, setValue]);

//   useEffect(() => {
//     if (meal?.price && quantity) {
//       const updatedPrice = meal.price * quantity;
//       setTotalPrice(updatedPrice);
//       setValue("price", updatedPrice);
//     }
//   }, [quantity, meal, setValue]);

//   /* =======================
//      Place Order
//   ======================== */
//   const handlePlaceOrder = (data) => {
//     const finalPrice = data.quantity * meal.price;

//     Swal.fire({
//       title: "Confirm Order?",
//       text: `Your total price is ${finalPrice} taka. Do you want to confirm the order?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#16a34a",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Confirm",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const orderData = {
//           foodId: meal._id,
//           mealName: meal.foodName,
//           price: finalPrice,
//           quantity: Number(data.quantity),
//           chefId: meal.chefId,
//           paymentStatus: "pending",
//           userEmail: user.email,
//           userAddress: data.deliveryAddress,
//           orderStatus: "pending",
//           orderTime: new Date().toISOString(),
//         };

//         axiosSecure.post("/orders", orderData).then((res) => {
//           if (res.data.insertedId) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "Order placed successfully!",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             navigate("/");
//           }
//         });
//       }
//     });
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="w-8/12 mx-auto p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>

//       <form onSubmit={handleSubmit(handlePlaceOrder)}>
//         {/* User Email */}
//         <label className="label">Email</label>
//         <input
//           type="email"
//           {...register("userEmail")}
//           readOnly
//           className="input w-full"
//         />

//         {/* Meal Name */}
//         <label className="label mt-3">Meal Name</label>
//         <input
//           type="text"
//           {...register("mealName")}
//           defaultValue={meal.foodName}
//           readOnly
//           className="input w-full"
//         />

//         {/* Chef ID */}
//         <label className="label mt-3">Chef ID</label>
//         <input
//           type="text"
//           {...register("chefId")}
//           defaultValue={meal.chefId}
//           readOnly
//           className="input w-full"
//         />

//         {/* Price */}
//         <label className="label mt-3">Total Price</label>
//         <input
//           type="number"
//           {...register("price")}
//           value={totalPrice}
//           readOnly
//           className="input w-full"
//         />

//         {/* Quantity */}
//         <label className="label mt-3">Quantity</label>
//         <input
//           type="number"
//           {...register("quantity", { required: true, min: 1 })}
//           placeholder="Enter quantity"
//           className="input w-full"
//         />

//         {/* Delivery Address */}
//         <label className="label mt-3">Delivery Address</label>
//         <input
//           type="text"
//           {...register("deliveryAddress", { required: true })}
//           placeholder="Enter delivery address"
//           className="input w-full"
//         />

//         {/* Submit */}
//         <button type="submit" className="rannafy-btn mt-6 w-full primary-700">
//           <PurchaseModal/>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Order;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// import PurchaseModal from "../../Components/Modal/PurchaseModal";

// const Order = () => {
//   const axiosSecure = useAxiosSecure();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const { register, handleSubmit, setValue, watch } = useForm();
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Fetch Meal Info
//   const { data: meal = {}, isLoading } = useQuery({
//     queryKey: ["meal", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/meals/${id}`);
//       return res.data;
//     },
//   });

//   // Auto fill user email
//   useEffect(() => {
//     if (user?.email) {
//       setValue("userEmail", user.email);
//     }
//   }, [user, setValue]);

//   // Price calculation
//   const quantity = watch("quantity");

//   useEffect(() => {
//     if (meal?.price) {
//       setTotalPrice(meal.price);
//       setValue("price", meal.price);
//     }
//   }, [meal, setValue]);

//   useEffect(() => {
//     if (meal?.price && quantity) {
//       const updatedPrice = meal.price * quantity;
//       setTotalPrice(updatedPrice);
//       setValue("price", updatedPrice);
//     }
//   }, [quantity, meal, setValue]);

//   // Handle order submission (opens modal)
//   const handlePlaceOrder = (data) => {
//     // Set final price in form
//     setTotalPrice(data.quantity * meal.price);
//     openModal(); // open PurchaseModal
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="w-8/12 mx-auto p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>

//       <form onSubmit={handleSubmit(handlePlaceOrder)}>
//         {/* User Email */}
//         <label className="label">Email</label>
//         <input
//           type="email"
//           {...register("userEmail")}
//           readOnly
//           className="input w-full"
//         />

//         {/* Meal Name */}
//         <label className="label mt-3">Meal Name</label>
//         <input
//           type="text"
//           {...register("mealName")}
//           defaultValue={meal.foodName}
//           readOnly
//           className="input w-full"
//         />

//         {/* Chef ID */}
//         <label className="label mt-3">Chef ID</label>
//         <input
//           type="text"
//           {...register("chefId")}
//           defaultValue={meal.chefId}
//           readOnly
//           className="input w-full"
//         />

//         {/* Price */}
//         <label className="label mt-3">Total Price</label>
//         <input
//           type="number"
//           {...register("price")}
//           value={totalPrice}
//           readOnly
//           className="input w-full"
//         />

//         {/* Quantity */}
//         <label className="label mt-3">Quantity</label>
//         <input
//           type="number"
//           {...register("quantity", { required: true, min: 1 })}
//           placeholder="Enter quantity"
//           className="input w-full"
//         />

//         {/* Delivery Address */}
//         <label className="label mt-3">Delivery Address</label>
//         <input
//           type="text"
//           {...register("deliveryAddress", { required: true })}
//           placeholder="Enter delivery address"
//           className="input w-full"
//         />

//         {/* Submit button */}
//         <button
//           type="submit"
//           className="rannafy-btn mt-6 w-full primary-700"
//         >
//           Place Order
//         </button>
//       </form>

//       {/* Purchase Modal */}
//       <PurchaseModal
//         isOpen={isModalOpen}
//         closeModal={closeModal}
//         plant={{
//           _id: meal._id,
//           name: meal.foodName,
//           category: "Meal",
//           price: totalPrice,
//           description: `Order from chef ${meal.chefId}`,
//           image: meal.image,
//           seller: meal.chefId,
//         }}
//       />
//     </div>
//   );
// };

// export default Order;



import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PurchaseModal from "../../Components/Modal/PurchaseModal";

const Order = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const { data: meal = {} } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    setOrderData({
      ...meal,
      price: meal.price * data.quantity,
      quantity: data.quantity,
      description: meal.description,
    });
    setIsOpen(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("quantity", { required: true, min: 1 })}
          type="number"
          placeholder="Quantity"
          className="input w-full"
        />

        <input
          {...register("address", { required: true })}
          type="text"
          placeholder="Delivery Address"
          className="input w-full mt-3"
        />

        <button className="btn btn-primary w-full mt-4">
          Place Order
        </button>
      </form>

      {orderData && (
        <PurchaseModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          meal={orderData}
          address={watch("address")}
        />
      )}
    </div>
  );
};

export default Order;
