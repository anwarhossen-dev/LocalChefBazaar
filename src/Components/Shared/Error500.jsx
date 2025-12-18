import React from 'react';
import { Link } from 'react-router';
import Lottie from 'react-lottie';
import errorAnimation from "../../assets/json/Error500.json";

const Error500 = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="w-72 md:w-96">
        <Lottie 
          options={defaultOptions}
          height={300}
          width={300}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-red-600 mt-4">
        500 - Server Error
      </h1>

      <p className="mt-3 text-gray-600 text-lg max-w-md">
        Something went wrong on our end. Please try again later.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Go Home
      </Link>
    </div>
  );
};

export default Error500;
