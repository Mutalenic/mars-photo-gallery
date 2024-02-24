'use client'
const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-800"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  