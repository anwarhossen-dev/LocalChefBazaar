import React, { useState, useEffect } from "react";
//import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateModal = ({ isOpen, onClose, meal, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false)

    const [newImageFile, setNewImageFile] = useState(null);
    const [preview, setPreview] = useState("");

    
    useEffect(() => {
        if (meal) {
            reset({
                foodName: meal.foodName,
                price: meal.price,
                rating: meal.rating,
                ingredients: meal.ingredients.join(", "),
                estimatedDeliveryTime: meal.estimatedDeliveryTime,
                chefExperience: meal.chefExperience,
                deliveryArea: meal.deliveryArea,
            });

            setPreview(meal.foodImage || "");
            setNewImageFile(null);
        }
    }, [meal, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImageFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const uploadToImgBB = async () => {
        const formData = new FormData();
        formData.append("image", newImageFile);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`;
        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    const onSubmit = async (data) => {
        if (!meal?._id) return;

        let imageUrl = meal.foodImage;
        setLoading(true)

        if (newImageFile) {
            imageUrl = await uploadToImgBB();
        }

        const updatedMeal = {
            foodName: data.foodName,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            ingredients: data.ingredients.split(",").map((i) => i.trim()),
            estimatedDeliveryTime: data.estimatedDeliveryTime,
            chefExperience: data.chefExperience,
            foodImage: imageUrl,
            deliveryArea: data.deliveryArea,
        };

        const res = await axiosSecure.patch(`/meals/${meal._id}`, updatedMeal);
        setLoading(false)

        if (res.data.success) {
            Swal.fire({
                icon: "success",
                title: "Meal updated successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
            onClose();
        }
    };

    if (!isOpen || !meal) return null;

    return (
        <dialog open className="modal">
            <div className="modal-box max-w-xl">
                <h3 className="font-bold text-lg mb-4">Update Meal</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <label className="font-bold">Food Name:</label>
                    <input type="text" {...register("foodName")} className="input input-bordered w-full" />

                    <label className="font-bold">Price:</label>
                    <input type="number" step="0.01" {...register("price")} className="input input-bordered w-full" />

                    <label className="font-bold">Rating:</label>
                    <input type="number" step="0.1" min="0" max="5" {...register("rating")} className="input input-bordered w-full" />

                    <label className="font-bold">Ingredients:</label>
                    <textarea {...register("ingredients")} className="textarea textarea-bordered w-full" />

                    <label className="font-bold">Delivery Time:</label>
                    <input type="text" {...register("estimatedDeliveryTime")} className="input input-bordered w-full" />

                    <label className="font-bold">Chef Experience:</label>
                    <textarea {...register("chefExperience")} className="textarea textarea-bordered w-full" />

                    <label className="font-bold">Delivery Area:</label>
                    <textarea {...register("deliveryArea")} className="textarea textarea-bordered w-full" />

                    {/* Image Upload */}
                    <div>
                        <label className="font-semibold">Update Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
                        {preview && <img src={preview} className="w-40 h-40 object-cover rounded mt-3" />}
                    </div>

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn btn-ghost">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default UpdateModal;