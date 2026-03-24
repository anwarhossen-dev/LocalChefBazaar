const Card = ({ 
    children, 
    className = "", 
    hover = true, 
    padding = "default",
    shadow = "default" 
}) => {
    const paddingClasses = {
        none: "",
        sm: "p-4",      /* 16px - var(--space-4) */
        default: "p-6", /* 24px - var(--space-6) */
        lg: "p-8"       /* 32px - var(--space-8) */
    };
    
    const shadowClasses = {
        none: "",
        sm: "shadow-sm",
        default: "shadow-md", 
        lg: "shadow-lg",
        xl: "shadow-xl"
    };
    
    const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-250" : "";
    
    return (
        <div className={`
            card-custom
            ${paddingClasses[padding]} 
            ${shadowClasses[shadow]} 
            ${hoverClasses} 
            ${className}
        `}>
            {children}
        </div>
    );
};

export default Card;