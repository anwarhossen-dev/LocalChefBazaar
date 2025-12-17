import React from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router';
import errorAnimation from "../../assets/json/Error500.json"

const Error500 = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">
            <div className="w-72 md:w-96">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mt-4">500 - Server Error</h1>

            <p className="mt-3 text-gray-600 text-lg max-w-md">Something went wrong on our end. Please try again later.</p>

            <Link to="/" className="btn btn-primary mt-6">
                Go Home
            </Link>
        </div>
    );
};

export default Error500;