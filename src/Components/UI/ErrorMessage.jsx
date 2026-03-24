import Button from "./Button";

const ErrorMessage = ({ 
    title = "Something went wrong", 
    message = "Please try again later", 
    onRetry = null,
    showRetry = true 
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg 
                    className="w-8 h-8 text-red-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                </svg>
            </div>
            
            <h3 className="heading-4 text-gray-900 mb-2">{title}</h3>
            <p className="body-normal text-gray-600 mb-4 max-w-md">{message}</p>
            
            {showRetry && onRetry && (
                <Button 
                    variant="primary" 
                    onClick={onRetry}
                    size="sm"
                >
                    Try Again
                </Button>
            )}
        </div>
    );
};

const NetworkErrorMessage = ({ onRetry }) => (
    <ErrorMessage
        title="Connection Problem"
        message="Unable to connect to the server. Please check your internet connection and try again."
        onRetry={onRetry}
    />
);

const ServerErrorMessage = ({ onRetry }) => (
    <ErrorMessage
        title="Server Error"
        message="The server is currently unavailable. Please try again in a few moments."
        onRetry={onRetry}
    />
);

const NotFoundMessage = ({ message = "The requested data could not be found." }) => (
    <ErrorMessage
        title="Not Found"
        message={message}
        showRetry={false}
    />
);

export { ErrorMessage, NetworkErrorMessage, ServerErrorMessage, NotFoundMessage };