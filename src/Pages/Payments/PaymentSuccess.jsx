

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppLoading from "../../Components/Shared/AppLoading";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { search } = useLocation();
  const session_id = new URLSearchParams(search).get("session_id");

  useEffect(() => {
    if (!session_id) {
      Swal.fire("Error", "Session ID not found", "error");
      navigate("/my-orders");
      return;
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(); // get Firebase ID token
        try {
          await axiosSecure.patch(
            `/order-payment-success?session_id=${session_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // send token to backend
              },
            }
          );
          Swal.fire("Success", "Payment Successful!", "success");
          navigate("/my-orders");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Payment verification failed", "error");
          navigate("/my-orders");
        }
      } else {
        Swal.fire("Error", "You must be logged in", "error");
        navigate("/login");
      }
    });
  }, [session_id]);

  return <AppLoading />;
};

export default PaymentSuccess;
