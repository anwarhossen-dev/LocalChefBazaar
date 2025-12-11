import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const OrderPage = () => {
  const navigate = useNavigate();
  const { mealId } = useParams(); // from URL
  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem("token"); // adjust your auth logic
    const email = localStorage.getItem("userEmail"); // assume stored on login
    if (!token) {
      navigate("/login");
      return;
    }
    setUserEmail(email);

    // fetch meal details
    axios
      .get(`/api/meals/${mealId}`)
      .then((res) => setMeal(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [mealId, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!meal) return <p className="text-center mt-10">Meal not found.</p>;

  const handleOrder = async (e) => {
    e.preventDefault();
    const totalPrice = meal.price * quantity;

    const result = await Swal.fire({
      title: `Your total price is $${totalPrice}.`,
      text: "Do you want to confirm the order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // save order
      const orderData = {
        foodId: meal._id,
        mealName: meal.name,
        price: meal.price,
        quantity,
        chefId: meal.chefId,
        userEmail,
        userAddress,
        orderStatus: "pending",
        orderTime: new Date().toISOString(),
        paymentStatus: "Pending",
      };

      try {
        await axios.post("/api/orders", orderData);
        Swal.fire("Success!", "Order placed successfully!", "success");
        navigate("/orders"); // redirect to user's orders page
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to place order!", "error");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <form onSubmit={handleOrder} className="space-y-4">
        {/* Meal Name */}
        <div>
          <label className="block font-semibold">Meal Name</label>
          <input
            type="text"
            value={meal.name}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price ($)</label>
          <input
            type="number"
            value={meal.price}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Chef ID */}
        <div>
          <label className="block font-semibold">Chef ID</label>
          <input
            type="text"
            value={meal.chefId}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block font-semibold">Your Email</label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold">Delivery Address</label>
          <textarea
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter your delivery address"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-lime-600 text-white py-3 rounded hover:bg-lime-700"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
