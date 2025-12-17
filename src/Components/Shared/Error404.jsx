import React from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router';
import error from "../../assets/json/Error 404.json"

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
                    <Lottie
                        options={{
                            loop: false,
                            autoplay: true,
                            animationData: error,
                        }}
                        height={400}
                        width={400}
                    ></Lottie>
                    <h1 className="text-3xl font-bold text-red-500">Oops! You have come to wrong page</h1>
                    <p className="text-lg text-gray-600 mt-2">There is no page at this moment</p>
                    <div className="my-3 space-x-3">
                        <Link to="/" className="btn bg-orange-500 text-black">
                            Go Back
                        </Link>
                    </div>
                </div>
    );
};

export default Error404;