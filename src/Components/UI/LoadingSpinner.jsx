const LoadingSpinner = ({ size = "md", className = "" }) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };
    
    return (
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-white-500 ${sizes[size]} ${className}`}></div>
    );
};

const LoadingPage = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="xl" className="mx-auto mb-4" />
                <p className="text-gray-600 text-lg">{message}</p>
            </div>
        </div>
    );
};

const LoadingSkeleton = ({ className = "", lines = 3 }) => {
    return (
        <div className={`animate-pulse ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <div
                    key={index}
                    className={`bg-gray-300 rounded h-4 mb-2 ${
                        index === lines - 1 ? "w-3/4" : "w-full"
                    }`}
                ></div>
            ))}
        </div>
    );
};

export default LoadingSpinner;
export { LoadingSpinner, LoadingPage, LoadingSkeleton };