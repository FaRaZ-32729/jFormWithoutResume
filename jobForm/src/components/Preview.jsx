import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEdit, FaPaperPlane, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

const Preview = () => {
    const { state } = useLocation();
    const formData = state?.formData;
    const navigate = useNavigate();
    const areas = state?.areas || [];
    const positions = state?.positions || [];
    const [pdfBase64, setPdfBase64] = useState(null);

    console.log("Preview state:", { formData, areas, positions });

    if (!formData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                </div>
                <p className="text-center text-white text-lg font-serif relative z-10">
                    No data to preview.
                </p>
            </div>
        );
    }

    const selectedArea = areas.find((a) => a.id === Number(formData.area))?.name || "Not Selected";
    const selectedPosition = positions.find((p) => p.id === Number(formData.position))?.name || "Not Selected";

    const handleEdit = () => {
        navigate("/", { state: { formData, areas, positions, pdfBase64 } });
    };

    const toYmd = (d) => {
        if (!d) return null;
        const date = d instanceof Date ? d : new Date(d);
        if (Number.isNaN(date.getTime())) return null;
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${dd}`;
    };

    const safe = (v) => (typeof v === "string" ? v.trim() : v);

    const convertPdfToBase64 = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setPdfBase64(base64String);
        };
        reader.readAsDataURL(file);
    };

    const resumeFile = formData?.resume?.[0];

    useEffect(() => {
        if (resumeFile instanceof File) {
            convertPdfToBase64(resumeFile);
        }
    }, [resumeFile]);

    const handleSubmit = async () => {
        try {
            const { isWorking, ...cleanFormData } = formData;
            const dto = {
                fullname: safe(cleanFormData.fullName),
                fathname: safe(cleanFormData.fatherName),
                emailaddres: safe(cleanFormData.email),
                phno: safe(cleanFormData.phone),
                maritalstatus: safe(cleanFormData.maritalStatus),
                gender: safe(cleanFormData.gender),
                area: safe(cleanFormData.area),
                dob: toYmd(cleanFormData.dob),
                cnic: safe(cleanFormData.cnic),
                address: safe(cleanFormData.address),
                hightquali: safe(cleanFormData.qualification),
                positionappliedfor: safe(cleanFormData.position),
                proflinked: safe(cleanFormData.portfolio) || "",
                keyskills: safe(cleanFormData.skills),
                PdfBytes: pdfBase64 || null,
                ...(isWorking === "yes"
                    ? {
                        CurrJobTitle: safe(cleanFormData.currentJobTitle) || null,
                        CurrCompany: safe(cleanFormData.currentCompany) || null,
                        CurrSalary:
                            cleanFormData.currentSalary !== undefined &&
                                cleanFormData.currentSalary !== null &&
                                String(cleanFormData.currentSalary).trim() !== ""
                                ? Number(cleanFormData.currentSalary)
                                : null,
                        NoticePeriod: safe(cleanFormData.noticePeriod) || null,
                    }
                    : {
                        CurrJobTitle: null,
                        CurrCompany: null,
                        CurrSalary: null,
                        NoticePeriod: null,
                    }),
            };

            const response = await axios.post(
                "http://192.168.103.2:84/api/EmployeeApi/AddEmployeeWithPdfBytes",
                dto,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 15000,
                }
            );

            console.log("Submission response:", response);

            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/submitted");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || "Submission failed");
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
        hover: {
            y: -4,
            boxShadow: "0 25px 50px -12px rgba(0, 255, 255, 0.15), 0 0 30px rgba(59, 130, 246, 0.1)",
            transition: { type: "spring", stiffness: 400 },
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                className="w-full max-w-4xl relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Main Preview Container */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-700/50 backdrop-blur-sm"
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                    {/* Header */}
                    <motion.div className="text-center mb-10">
                        <motion.h2 
                            className="text-3xl font-serif font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Preview Your Application
                        </motion.h2>
                        <motion.p 
                            className="text-gray-300 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Review your information before submitting
                        </motion.p>
                    </motion.div>

                    {/* Application Data */}
                    <div className="space-y-6 mb-8">
                        {Object.entries(formData).map(([key, value], index) => {
                            if (key === "resume" || key === "resumeFile" || key === "resumeName") return null;

                            let displayValue = value;

                            if (key === "area") displayValue = selectedArea;
                            if (key === "position") displayValue = selectedPosition;

                            return (
                                <motion.div
                                    key={key}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-gray-600/50"
                                    variants={itemVariants}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <span className="font-medium text-cyan-300 capitalize text-sm sm:text-base mb-1 sm:mb-0">
                                        {key.replace(/([A-Z])/g, " $1")}:
                                    </span>
                                    <span className="text-gray-200 text-sm sm:text-base break-words max-w-xs sm:max-w-md text-right">
                                        {key === "portfolio" && value ? (
                                            <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1 justify-end"
                                            >
                                                View Portfolio
                                                <FaExternalLinkAlt className="text-xs" />
                                            </a>
                                        ) : key === "skills" ? (
                                            <span className="bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded text-xs">
                                                {String(displayValue)}
                                            </span>
                                        ) : (
                                            String(displayValue || "Not provided")
                                        )}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Resume Display */}
                    <motion.div
                        className="mt-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-cyan-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <h3 className="text-xl font-serif font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                            <FaFilePdf className="text-cyan-400" />
                            Resume
                        </h3>
                        {resumeFile instanceof File ? (
                            <div className="flex items-center justify-between">
                                <span className="text-gray-200">{resumeFile.name}</span>
                                <a
                                    href={URL.createObjectURL(resumeFile)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
                                >
                                    <FaExternalLinkAlt className="text-sm" />
                                    View PDF
                                </a>
                            </div>
                        ) : (
                            <p className="text-red-400 text-sm flex items-center gap-2">
                                No resume file uploaded
                            </p>
                        )}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row justify-between gap-4 mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        <motion.button
                            onClick={handleEdit}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 8px 25px rgba(34, 211, 238, 0.3)",
                                borderColor: "#22d3ee"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-xl bg-transparent border-2 border-cyan-500 text-cyan-400 font-medium hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2 order-2 sm:order-1"
                        >
                            <FaEdit />
                            Edit Application
                        </motion.button>
                        
                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 8px 25px rgba(34, 211, 238, 0.4)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 order-1 sm:order-2"
                        >
                            <FaPaperPlane />
                            Submit Application
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Preview;