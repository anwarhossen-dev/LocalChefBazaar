import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
//import useAuth from '../../Hooks/useAuth';
//import AppLoading from '../Shared/AppLoading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';
import AppLoading from '../../Components/Shared/AppLoading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const OrderMeal = () => {
    const {id} = useParams()
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const {data: meal = [], isLoading} = useQuery({
        queryKey: ["meal", id],
        queryFn : async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data
        }
    })
    const { register, handleSubmit,watch, reset } = useForm();

    useEffect(() => {
        if(meal && user){
            reset({
                mealName: meal.foodName,
                price: meal.price,
                chefId: meal.chefId,
                userEmail: user.email,
                chefEmail: meal.userEmail,
                quantity: 1,
                userAddress: "",
            });
            
        }
    },[meal, user, reset])

    const quantity = watch("quantity")
    const totalPrice = meal?.price * quantity;
    const orderSubmit = async (data) => {
        Swal.fire({
            title: `Your total price is $${totalPrice}`,
            text: "Do you want to confirm the order",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm",
        }).then(async (result) => {
            if(result.isConfirmed){
                const orderData = {
                    foodId: meal?._id,
                    chefName: meal?.chefName,
                    mealName: data.mealName,
                    price: data.price,
                    quantity: data.quantity,
                    chefId: data.chefId,
                    userEmail: data.userEmail,
                    userAddress: data.userAddress,
                    chefEmail: meal?.userEmail,
                };
                const res = await axiosSecure.post("/orders", orderData)
                if(res.data.insertedId){
                    Swal.fire("Success","Order placed successfully", "success")
                    navigate(-1)
                }
            }
        })
    }
    if(isLoading) return <AppLoading/>
    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded">
            <Helmet>
                <title>Order Now</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>

            <form onSubmit={handleSubmit(orderSubmit)} className="space-y-4">
                <div>
                    <label className="font-semibold">Meal Name</label>
                    <input {...register("mealName")} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Price</label>
                    <input {...register("price")} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Quantity</label>
                    <input type="number" min="1" {...register("quantity")} className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Chef ID</label>
                    <input {...register("chefId")} readOnly className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="font-semibold">Your Email</label>
                    <input {...register("userEmail")} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Delivery Address</label>
                    <textarea {...register("userAddress", { required: true })} className="textarea textarea-bordered w-full" placeholder="Enter your delivery address"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default OrderMeal;
