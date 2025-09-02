import React from "react";
import { useNavigate } from "react-router-dom"; // สำหรับ React Router
import DefaultLayout from "../layouts/DefaultLayout";

export default function Error() {
  const navigate = useNavigate();

  return (
   
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-md">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Oops! Page not found.</h2>
          <p className="text-gray-600 mb-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <button
            onClick={() => navigate("/")} // กลับหน้า Home
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    
  );
}
