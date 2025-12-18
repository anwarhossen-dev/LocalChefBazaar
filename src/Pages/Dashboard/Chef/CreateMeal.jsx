
import Swal from "sweetalert2";

import useAuth from "../../../Hooks/useAuth";
//import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateMeal = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // logged in chefs info
    const { data: userInfo = {}, isLoading: userLoading } = useQuery({
        queryKey: ["user-info", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    // upload image to imgbb
    const uploadToImgBB = async () => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`;

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!data.success) {
            throw new Error("Image upload failed");
        }
        return data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            if (!imageFile) {
                Swal.fire({
                    icon: "error",
                    title: "Image is required",
                });
                return;
            }

            
            const imageUrl = await uploadToImgBB();

            
            const mealData = {
                foodName: data.foodName,
                chefName: userInfo?.displayName,
                foodImage: imageUrl,
                price: parseFloat(data.price),
                rating: parseFloat(data.rating),
                ingredients: data.ingredients.split(",").map((i) => i.trim()),
                estimatedDeliveryTime: data.estimatedDeliveryTime,
                chefExperience: data.chefExperience,
                chefId: userInfo?.chefId,
                userEmail: user?.email,
                deliveryArea: data.deliveryArea
                
            };

            
            const res = await axiosSecure.post("/meals", mealData);

            if (res.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Meal created successfully",
                    timer: 1500,
                    showConfirmButton: false,
                });

                reset();
                setImageFile(null);
                setPreview(null);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to create meal",
                text: error?.response?.data?.error || error.message || "Something went wrong",
            });
        }
    };

    if (userLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto bg-base-100 rounded-xl my-5">
            <h2 className="text-2xl font-bold mb-4">Create a New Meal</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Food Name */}
                <div>
                    <label className="text-lg font-bold">Food Name: </label>
                    <input type="text" placeholder="Food Name" {...register("foodName", { required: true })} className="input input-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" />
                    {errors.foodName && <p className="text-red-500 text-sm mt-1">Food name is required</p>}
                </div>

                {/* Chef Name (auto-filled) */}
                <div>
                    <label className="text-lg font-bold">Chef Name: </label>
                    <input type="text" value={userInfo?.displayName} readOnly className="input input-bordered w-full bg-gray-100 hover:border-primary hover:shadow-md transition-all duration-200" />
                </div>

                {/* Food Image */}
                <div>
                    <label className="text-lg font-bold">Upload Food Image: </label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" required />

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded border" />
                        </div>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="text-lg font-bold">Food Price: </label>
                    <input type="number" step={"0.01"} placeholder="Price" {...register("price", { required: true })} className="input input-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" />
                    {errors.price && <p className="text-red-500 text-sm mt-1">Price is required</p>}
                </div>

                {/* Rating */}
                <div>
                    <label className="text-lg font-bold">Ratings: </label>
                    <input type="number" placeholder="Rating (0 - 0)" min="0" max="0" step="0.1" {...register("rating", { required: true })} className="input input-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" />
                    {errors.rating && <p className="text-red-500 text-sm mt-1">Rating is required</p>}
                </div>

                {/* Ingredients */}
                <div>
                    <label className="text-lg font-bold">Ingredients: </label>
                    <textarea placeholder="Ingredients (comma separated)" {...register("ingredients", { required: true })} className="textarea textarea-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200"></textarea>
                    {errors.ingredients && <p className="text-red-500 text-sm mt-1">Ingredients are required</p>}
                </div>

                {/* Estimated Delivery Time */}
                <div>
                    <label className="text-lg font-bold">Estimated Delivery Time: </label>
                    <input type="text" placeholder="Estimated Delivery Time" {...register("estimatedDeliveryTime", { required: true })} className="input input-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" />
                    {errors.estimatedDeliveryTime && <p className="text-red-500 text-sm mt-1">Estimated delivery time is required</p>}
                </div>
                {/* Estimated Delivery area */}
                <div>
                    <label className="text-lg font-bold">Delivery Area: </label>
                    <textarea type="text" placeholder="Delivery Area" {...register("deliveryArea", { required: true })} className="textarea textarea-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200" />
                    {errors.deliveryArea && <p className="text-red-500 text-sm mt-1">Delivery Area is required</p>}
                </div>

                {/* Chef Experience */}
                <div>
                    <label className="text-lg font-bold">Chef Experience: </label>
                    <textarea placeholder="Chef Experience" {...register("chefExperience", { required: true })} className="textarea textarea-bordered w-full hover:border-primary hover:shadow-md transition-all duration-200"></textarea>
                    {errors.chefExperience && <p className="text-red-500 text-sm mt-1">Chef experience is required</p>}
                </div>

                {/* Chef ID (auto-filled, read-only) */}
                <div>
                    <label className="text-lg font-bold">Chef Id: </label>
                    <input type="text" value={userInfo?.chefId} readOnly className="input input-bordered w-full bg-gray-100 hover:border-primary hover:shadow-md transition-all duration-200" />
                </div>

                {/* User Email (auto-filled, read-only) */}
                <div>
                    <label className="text-lg font-bold">Chef Email: </label>
                    <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100 hover:border-primary hover:shadow-md transition-all duration-200" />
                </div>

                <button className="btn btn-primary w-full hover:border-primary hover:shadow-md transition-all duration-200">Create Meal</button>
            </form>
        </div>
    );
};

export default CreateMeal;