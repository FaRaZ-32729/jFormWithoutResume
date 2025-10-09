import React from "react";
import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2b5876] to-[#4e4376] text-white text-center px-6">
            <h1 className="text-7xl md:text-9xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-white/70 max-w-md mb-8">
                Oops! The page you’re looking for doesn’t exist or may have been moved.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-white/20 hover:bg-white/30 transition-all px-6 py-3 rounded-full font-medium shadow-md"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default PageNotFound;
