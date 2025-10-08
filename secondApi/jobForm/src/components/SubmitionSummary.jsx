import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import logo from "/logo.png";
import { useNavigate } from "react-router";

const SubmissionSummary = () => {


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] text-white px-4 relative">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-white/20 backdrop-blur-lg p-10 pt-16 rounded-3xl shadow-2xl text-center max-w-md w-full"
            >
                {/*Tick Mark  */}
                <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 120,
                        damping: 8,
                    }}
                >
                    <motion.div
                        className="w-24 h-24 flex items-center justify-center bg-green-500 rounded-full shadow-2xl border-4 border-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        >
                            <FaCheck className="text-white text-4xl" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Logo */}
                <img
                    src={logo}
                    alt="Company Logo"
                    className="w-34 h-auto mx-auto mb-4 rounded-full shadow-md bg-white/10"
                />

                {/* Text */}
                <h1 className="text-3xl font-bold mb-3">Application Submitted!</h1>
                <p className="text-gray-200 text-lg leading-relaxed">
                    Thank you for submitting your application. <br />
                    We’ve received your details successfully, and our team will contact you soon.
                </p>
            </motion.div>
        </div>
    );
};

export default SubmissionSummary;
