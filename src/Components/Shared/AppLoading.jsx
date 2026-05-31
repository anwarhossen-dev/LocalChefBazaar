import React from 'react';
import Lottie from 'lottie-react';
import loading from '../../assets/json/Loading (2).json'

const AppLoading = () => {
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

export default AppLoading;