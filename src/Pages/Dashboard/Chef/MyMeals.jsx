// import React, { useState } from 'react';
// import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import useAuth from '../../../Hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../../../Components/Shared/Loading';

// import Swal from 'sweetalert2';
// import UpdateModal from '../../../Components/Shared/UpdateModal';

// const MyMeals = () => {
//     const axiosSecure = useAxiosSecure()
//     const {user} = useAuth()

//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [selectedMeal, setSelectedMeal] = useState(null)

//     const {data: meals = [],refetch, isLoading} = useQuery({
//         queryKey: ["my-meals", user?.email],
//         queryFn: async() =>{
//             const res = await axiosSecure.get(`/meals/by-email/${user.email}`);
//             return res.data
//         }
//     })

    

//     const handleDelete = (id) => {
//         Swal.fire({
//             position: "center",
//             title: "Are you wanted to delete this meal",
//             icon:"warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes",
//         }).then(async (result) => {
//             if(result.isConfirmed){
//                 await axiosSecure.delete(`/meals/${id}`)
//                   .then(() => {
//                     Swal.fire("Deleted", "Meal deleted successfully", "success")
//                     refetch()
//                   })    
//             }
//         })
//     }

//     const handleUpdate = (meal) => {
//         setSelectedMeal(meal);
//         setIsModalOpen(true)
//     }

//     if(isLoading) return <Loading/>
//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">My Meals</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {meals.map((meal) => (
//                     <div key={meal._id} className="card bg-base-100 shadow-md">
//                         <figure>
//                             <img src={meal.foodImage} className="h-48 w-full object-cover" />
//                         </figure>

//                         <div className="card-body">
//                             <h3 className="card-title">{meal.foodName}</h3>
//                             <p>
//                                 <strong>Price:</strong> <span className='bg-green-300 px-1 rounded-xl font-bold'>${meal.price}</span>
//                             </p>
//                             <p>
//                                 <strong>Rating:</strong> {meal.rating}
//                             </p>
//                             <p>
//                                 <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
//                             </p>
//                             <p>
//                                 <strong>Delivery Time:</strong> {meal.estimatedDeliveryTime}
//                             </p>
//                             <p>
//                                 <strong>Delivery Area:</strong> {meal.deliveryArea}
//                             </p>
//                             <p>
//                                 <strong>Chef Name:</strong> {meal.chefName}
//                             </p>
//                             <p>
//                                 <strong>Chef ID:</strong> {meal.chefId}
//                             </p>

//                             <div className="flex justify-between mt-4">
//                                 <button onClick={() => handleDelete(meal._id)} className="btn btn-error btn-sm">
//                                     Delete
//                                 </button>

//                                 <button onClick={() => handleUpdate(meal)} className="btn btn-primary btn-sm">
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* modal */}
//             <UpdateModal
//              isOpen={isModalOpen}
//              onClose={() => setIsModalOpen(false)}
//              meal={selectedMeal}
//              refetch={refetch}
//             />
//         </div>
//     );
// };

// export default MyMeals;



import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Shared/Loading';

import Swal from 'sweetalert2';
import UpdateModal from '../../../Components/Shared/UpdateModal';

const MyMeals = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)

    const {data: meals = [],refetch, isLoading} = useQuery({
        queryKey: ["my-meals", user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/meals/by-email/${user.email}`);
            return res.data
        }
    })

    

    const handleDelete = (id) => {
        Swal.fire({
            position: "center",
            title: "Are you wanted to delete this meal",
            icon:"warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if(result.isConfirmed){
                await axiosSecure.delete(`/meals/${id}`)
                  .then(() => {
                    Swal.fire("Deleted", "Meal deleted successfully", "success")
                    refetch()
                  })    
            }
        })
    }

    const handleUpdate = (meal) => {
        setSelectedMeal(meal);
        setIsModalOpen(true)
    }

    if(isLoading) return <Loading/>
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Meals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                    <div key={meal._id} className="card bg-base-100 shadow-md">
                        <figure>
                            <img src={meal.foodImage} className="h-48 w-full object-cover" />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title">{meal.foodName}</h3>
                            <p>
                                <strong>Price:</strong> <span className='bg-green-300 px-1 rounded-xl font-bold'>${meal.price}</span>
                            </p>
                            <p>
                                <strong>Rating:</strong> {meal.rating}
                            </p>
                            <p>
                                <strong>Ingredients:</strong> {meal.ingredients.join(", ")}
                            </p>
                            <p>
                                <strong>Delivery Time:</strong> {meal.estimatedDeliveryTime}
                            </p>
                            <p>
                                <strong>Delivery Area:</strong> {meal.deliveryArea}
                            </p>
                            <p>
                                <strong>Chef Name:</strong> {meal.chefName}
                            </p>
                            <p>
                                <strong>Chef ID:</strong> {meal.chefId}
                            </p>

                            <div className="flex justify-between mt-4">
                                <button onClick={() => handleDelete(meal._id)} className="btn btn-error btn-sm">
                                    Delete
                                </button>

                                <button onClick={() => handleUpdate(meal)} className="btn btn-primary btn-sm">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* modal */}
            <UpdateModal
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             meal={selectedMeal}
             refetch={refetch}
            />
        </div>
    );
};

export default MyMeals;