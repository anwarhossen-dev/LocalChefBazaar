import React from 'react';
import loading from "../../assets/json/loading (1).json"
import Lottie from 'react-lottie';
const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Lottie
                options={{
                    loop: false,
                    autoplay: true,
                    animationData: loading,
                }}
                height={200}
                width={200}
            ></Lottie>
            
        </div>
    );
};

export default Loading;