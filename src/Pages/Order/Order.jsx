import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// import { useNavigate, useParams } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../components/Shared/Loading";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";

const Order = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const nevigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm();
  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (user) {
      setValue("userEmail", user.email);
    }
  }, [user]);

  const [totalPrice, setTotalPrice] = useState(0);
  const quantity = watch("quantity");

  // set default price when order loads
  useEffect(() => {
    if (order?.price) {
      setTotalPrice(order.price);
      setValue("price", order.price);
    }
  }, [order]);

  // update price when quantity changes
  useEffect(() => {
    if (order?.price && quantity) {
      const updated = quantity * order.price;
      setTotalPrice(updated);
      setValue("price", updated);
    }
  }, [quantity, order]);

  const handlePlaceOrder = (data) => {
    const finalPrice = data.quantity * order.price;
    setTotalPrice(finalPrice);

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${finalPrice} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/orders", {mealId:order._id, ...data, price: finalPrice,  })
          .then((res) => {
            if (res.data.insertedId) {
              nevigate("/");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your order has been placed",
                showConfirmButton: false,
                timer: 1500,
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
    <div className="w-8/12 mx-auto p-4">
      <h1>Order page{order._id} </h1>
      <form onSubmit={handleSubmit(handlePlaceOrder)}>
        <fieldset className="fieldset">
          {/* user Email */}
          <label className="label"> Email</label>
          <input
            type="email"
            {...register("userEmail")}
            defaultValue={user?.email}
            readOnly
            className="input w-full"
          />
          {/* Meals name */}
          <label className="label">Meals Name</label>
          <input
            type="text"
            {...register("MealName")}
            defaultValue={order.foodName}
            readOnly
            className="input w-full"
          />
          {/* chefId */}
          <label className="label">chefId</label>
          <input
            type="text"
            {...register("chefId")}
            defaultValue={order.chefId}
            readOnly
            className="input w-full"
          />

          {/* Meals price */}
          <label className="label">Price</label>
          <input
            type="number"
            {...register("price")}
            value={totalPrice}
            readOnly
            className="input w-full"
          />

          {/* quantity */}
          <label className="label">quantity</label>
          <input
            type="number"
            {...register("quantity")}
            className="input w-full"
            placeholder="Enter quantity "
          />

          {/*  Delivery Address */}
          <label className="label"> Delivery Address</label>
          <input
            type="text"
            {...register("deliveryAddress")}
            className="input w-full"
          />
        </fieldset>

        <button type="submit" className="rannafy-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Order;