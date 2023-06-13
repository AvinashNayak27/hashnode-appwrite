import React from "react";
import Link from "next/link";
function meditate() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <div className="bg-blue-500 rounded-lg shadow-lg p-4 w-3/5 h-2/5 flex flex-col justify-center items-center">
        <h2 className="text-white text-xl font-bold mb-4">Coming Soon</h2>
        <p className="text-white text-lg">
          We're currently working on this feature. Stay tuned!
        </p>
        <div className="flex justify-center mt-4">
          <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16v3a5 5 0 015 5h3zm-4 4a5 5 0 01-5 5v3a8 8 0 008-8h-3zm-10 2a5 5 0 015-5V4a8 8 0 00-8 8h3z"
            ></path>
          </svg>
          <Link href="/">
            <div className="ml-4 bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg shadow-md">
              Go Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default meditate;
