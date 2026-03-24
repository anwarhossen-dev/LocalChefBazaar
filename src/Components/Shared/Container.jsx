const Container = ({ children, className = "", size = "default" }) => {
    const sizeClasses = {
        sm: "max-w-4xl",
        default: "max-w-7xl", 
        lg: "max-w-8xl",
        full: "max-w-full"
    };

    return (
        <div className={`container-custom ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    );
};

export default Container;