import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import logo from "/logo.png";
import { useNavigate } from "react-router";

const SubmissionSummary = () => {
    const navigate = useNavigate(); // Unused in current code, kept for potential future use

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative bg-[#fafaf0] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-10 pt-16 text-center max-w-md w-full"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
                {/* Tick Mark */}
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
                        className="w-24 h-24 flex items-center justify-center bg-[#2286E2] rounded-full shadow-[0_4px_15px_rgba(34,134,226,0.3)] border-4 border-white"
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
                <motion.img
                    src={logo}
                    alt="Company Logo"
                    className="w-24 h-auto mx-auto mb-4 rounded-full shadow-md bg-white/10"
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 200 }}
                />

                {/* Text */}
                <h1 className="text-3xl font-serif font-bold text-[#2f4f4f] mb-3">
                    Application Submitted!
                </h1>
                <p className="text-[#5c7a7a] text-lg leading-relaxed">
                    Thank you for submitting your application. <br />
                    We’ve received your details successfully, and our team will contact you soon.
                </p>
            </motion.div>
        </div>
    );
};

export default SubmissionSummary;