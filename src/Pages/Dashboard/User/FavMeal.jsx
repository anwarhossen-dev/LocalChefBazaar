import React from "react";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AppLoading from "../../../Components/Shared/AppLoading";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const FavMeal = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient()

    const { data: favMeal = [], isLoading } = useQuery({
        queryKey: ["favMeal", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorites/${user?.email}`);
            return res.data;
        },
    });
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are Your Sure?",
            text: "This FavMeal will be permanently deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
        }).then( async (result) => {
            if(result.isConfirmed){
                await axiosSecure.delete(`/favourites/${id}`);
                Swal.fire("Deleted", "Your FavMeal has deleted", "success")
                queryClient.invalidateQueries(["favMeal", user?.email]);
            }
        })
    };

    if (isLoading) return <AppLoading />;

    return (
        <div>
            <h1 className="text-xl ml-3 mt-4 font-bold">My Fvourite Meal: {favMeal.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Meal Name</th>
                            <th>Chef Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favMeal.map((meal, index) => (
                            <tr key={meal._id}>
                                <th>{index + 1}</th>
                                <td> {meal.mealName} </td>
                                <td>{meal.chefName}</td>
                                <td>{meal.price}</td>
                                <td>{new Date(meal.addedTime).toDateString()}</td>
                                <td>
                                    <span onClick={() => handleDelete(meal._id)} className="btn mr-2 bg-red-400 text-white">
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavMeal;