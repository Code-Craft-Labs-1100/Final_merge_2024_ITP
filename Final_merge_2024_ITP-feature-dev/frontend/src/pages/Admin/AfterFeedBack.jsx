import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AfterFeedBack = () => {
  const navigate = useNavigate();

  // Automatically navigate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/RegisterDetails');
    }, 1500); // 2000 milliseconds = 2 seconds

    // Cleanup the timer in case the component unmounts before the timer ends
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-gray-200">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Thank You for Suggestions!</h1>
        <p className="text-lg text-gray-300">
          We appreciate your interest and are excited to have you on board.
        </p>
        <p className="text-lg text-gray-300 mt-4">
          We are happy to give you services.
        </p>
      </div>
    </div>
  );
};

export default AfterFeedBack;
