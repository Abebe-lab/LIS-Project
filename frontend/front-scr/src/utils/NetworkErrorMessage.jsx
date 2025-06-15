import React, { useState, useEffect } from 'react';


const NetworkErrorMessage  = () => {
    const [isNetworkError, setIsNetworkError] = useState(false);
    useEffect(() => {
        // Function to check network connectivity
        const checkNetworkConnectivity = () => {
          // Replace with your backend API call logic
          fetch('http://localhost:4000')
            .then((response) => {
              if (!response.ok) {
                setIsNetworkError(true);
              }
            })
            .catch(() => {
              setIsNetworkError(true);
            });
        };
      
        // Initial check
        checkNetworkConnectivity();
      
        // Set up interval for continuous checks (adjust interval as needed)
        const intervalId = setInterval(checkNetworkConnectivity, 5000);
      
        // Cleanup on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }, []);

      return (
        <div>
          {isNetworkError && (
            <p>There seems to be a network issue. Please try again later.</p>
          )}
        </div>
      );     

}