import React from 'react';
import loading from "../../assets/json/loading (1).json"
import Lottie from 'lottie-react'; // Change to lottie-react

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Lottie
                animationData={loading}
                loop={false}
                style={{ height: 200, width: 200 }}
            />
        </div>
    );
};

export default Loading;