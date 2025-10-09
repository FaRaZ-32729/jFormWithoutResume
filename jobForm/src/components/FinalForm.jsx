import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import logo from "/logo.png";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import {
    FaUser,
    FaUserTie,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaGlobe,
    FaCalendarAlt,
    FaVenusMars,
    FaRing,
    FaBriefcase,
    FaGraduationCap,
    FaCode,
    FaLink,
    FaFilePdf,
    FaBuilding,
    FaMoneyBillWave,
    FaClock,
    FaRocket,
    FaShieldAlt,
    FaLightbulb,
} from "react-icons/fa";

const FinalForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const preloadedData = state?.formData || {};
    const pdfBase64 = state?.pdfBase64 || null;

    console.log(state, "preloaded");

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: preloadedData,
    });

    const [formData, setFormData] = useState(preloadedData);
    const [areas, setAreas] = useState([]);
    const [positions, setPositions] = useState([]);
    const [loadingAreas, setLoadingAreas] = useState(true);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const isPreloaded = useRef(false);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await axios.get("http://192.168.103.2:84/api/AreaApi/GetArea");
                setAreas(response.data.data || []);
            } catch (error) {
                console.error("Error fetching areas:", error);
                setAreas([]);
            } finally {
                setLoadingAreas(false);
            }
        };

        const fetchPositions = async () => {
            try {
                const positionResponse = await axios.get("http://192.168.103.2:84/api/EmployeeApi/Getpositions");
                setPositions(positionResponse.data.data || []);
            } catch (error) {
                console.error("Error fetching positions:", error);
                setPositions([]);
            } finally {
                setLoadingPositions(false);
            }
        };

        fetchAreas();
        fetchPositions();
    }, []);

    useEffect(() => {
        if (Object.keys(preloadedData).length > 0 && areas.length > 0 && positions.length > 0) {
            reset(preloadedData);
        }
    }, [preloadedData, areas, positions, reset]);

    const onSubmit = (data) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);

        console.log("Navigating to preview with data:", updatedData);

        navigate("/preview", { state: { formData: updatedData, areas, positions, pdfBase64 } });
    };

    const isWorking = watch("isWorking");

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

    const fieldVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
        hover: {
            scale: 1.02,
            y: -1,
            transition: { duration: 0.2 },
        },
    };

    const floatingAnimation = {
        animate: {
            y: [0, -5, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            },
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
                className="w-full max-w-5xl relative z-10"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Main Form Container */}
                <motion.div
                    className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700/50 backdrop-blur-sm"
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                >
                    {/* Header Section */}
                    <motion.div className="text-center mb-12">
                        <motion.div
                            className="flex justify-center mb-6"
                            variants={floatingAnimation}
                            animate="animate"
                        >
                            <div className="relative">
                                <motion.img
                                    src={logo}
                                    alt="Company Logo"
                                    className="w-24 h-24 object-contain rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 p-4 border border-cyan-500/30 shadow-lg"
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: 3,
                                        transition: { duration: 0.3 },
                                    }}
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm"></div>
                            </div>
                        </motion.div>

                        <motion.h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Career Application
                        </motion.h2>

                        <motion.div className="max-w-2xl mx-auto">
                            <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                Welcome to the future of career opportunities. We're building something extraordinary, and we want you to be part of it.
                            </p>
                            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
                                <motion.div
                                    className="flex items-center gap-2 hover:text-cyan-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaShieldAlt />
                                    <span>Secure & Encrypted</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaRocket />
                                    <span>Fast Processing</span>
                                </motion.div>
                                <motion.div
                                    className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <FaLightbulb />
                                    <span>Innovation Focused</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        {/* Personal Information Section */}
                        <motion.section className="relative">
                            <motion.div
                                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/25"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            />

                            <motion.h3
                                className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3"
                            >
                                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                                    <FaUser className="text-cyan-400" />
                                </div>
                                Personal Information
                                <motion.span
                                    className="text-cyan-400 text-sm font-normal ml-2"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    • Your Identity
                                </motion.span>
                            </motion.h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <InputFieldClean
                                    label="Full Name"
                                    name="fullName"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Full name is required",
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces allowed" },
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    }}
                                    icon={<FaUser className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Father's Name"
                                    name="fatherName"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Father's name is required",
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces" },
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    }}
                                    icon={<FaUserTie className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="CNIC"
                                    name="cnic"
                                    placeholder="1234512345671"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "CNIC is required",
                                        pattern: { value: /^[0-9]{13}$/, message: "Enter a valid 13-digit CNIC" },
                                    }}
                                    icon={<FaIdCard className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    }}
                                    icon={<FaEnvelope className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Phone Number"
                                    name="phone"
                                    placeholder="+92 300 1234567"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^(\+92|0)?3[0-9]{9}$/,
                                            message: "Enter a valid phone number",
                                        },
                                    }}
                                    icon={<FaPhone className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Address"
                                    name="address"
                                    placeholder="Enter your address"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Address is required",
                                        minLength: {
                                            value: 5,
                                            message: "Address must be at least 5 characters long",
                                        },
                                        pattern: {
                                            value: /^[A-Za-z0-9\s,.'-/#]+$/,
                                            message: "Enter a valid address (letters, numbers, and ,.'-/# only)",
                                        },
                                    }}
                                    icon={<FaMapMarkerAlt className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <SelectFieldClean
                                    label="Area"
                                    name="area"
                                    options={areas}
                                    loading={loadingAreas}
                                    register={register}
                                    errors={errors}
                                    icon={<FaGlobe className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Date of birth is required" }}
                                    icon={<FaCalendarAlt className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <SelectFieldClean
                                    label="Gender"
                                    name="gender"
                                    options={["Male", "Female", "Other"]}
                                    register={register}
                                    errors={errors}
                                    icon={<FaVenusMars className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                                <SelectFieldClean
                                    label="Marital Status"
                                    name="maritalStatus"
                                    options={["Single", "Married"]}
                                    register={register}
                                    errors={errors}
                                    icon={<FaRing className="text-cyan-400" />}
                                    variants={fieldVariants}
                                />
                            </div>
                        </motion.section>

                        {/* Professional Details Section */}
                        <motion.section className="relative">
                            <motion.div
                                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/25"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            />

                            <motion.h3
                                className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3"
                            >
                                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                                    <FaBriefcase className="text-blue-400" />
                                </div>
                                Professional Details
                                <motion.span
                                    className="text-blue-400 text-sm font-normal ml-2"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                    • Your Expertise
                                </motion.span>
                            </motion.h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <SelectFieldClean
                                    label="Position"
                                    name="position"
                                    options={positions}
                                    loading={loadingPositions}
                                    register={register}
                                    errors={errors}
                                    icon={<FaBriefcase className="text-blue-400" />}
                                    variants={fieldVariants}
                                />
                                <SelectFieldClean
                                    label="Qualification"
                                    name="qualification"
                                    options={["Intermediate", "Bachelor's", "Master's"]}
                                    register={register}
                                    errors={errors}
                                    icon={<FaGraduationCap className="text-blue-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Skills"
                                    name="skills"
                                    placeholder="React, Node.js, Firebase, etc."
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Skills are required" }}
                                    icon={<FaCode className="text-blue-400" />}
                                    variants={fieldVariants}
                                />
                                <InputFieldClean
                                    label="Portfolio / LinkedIn / GitHub URL"
                                    name="portfolio"
                                    placeholder="https://yourportfolio.com"
                                    register={register}
                                    errors={errors}
                                    type="url"
                                    icon={<FaLink className="text-blue-400" />}
                                    variants={fieldVariants}
                                />
                                <FileFieldClean
                                    label="Resume (PDF Only)"
                                    name="resume"
                                    pdfBase64={pdfBase64}
                                    register={register}
                                    errors={errors}
                                    icon={<FaFilePdf className="text-blue-400" />}
                                    variants={fieldVariants}
                                />
                            </div>
                        </motion.section>

                        {/* Employment Status Section */}
                        <motion.section className="relative">
                            <motion.div
                                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-500/25"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            />

                            <motion.h3
                                className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3"
                            >
                                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                                    <FaBuilding className="text-purple-400" />
                                </div>
                                Employment Status
                                <motion.span
                                    className="text-purple-400 text-sm font-normal ml-2"
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                >
                                    • Current Situation
                                </motion.span>
                            </motion.h3>

                            <SelectFieldClean
                                label="Are you currently working?"
                                name="isWorking"
                                options={["yes", "no"]}
                                register={register}
                                errors={errors}
                                icon={<FaBriefcase className="text-purple-400" />}
                                variants={fieldVariants}
                            />

                            {isWorking === "yes" && (
                                <motion.div
                                    className="grid md:grid-cols-2 gap-6 mt-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-purple-500/20 shadow-lg backdrop-blur-sm"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <InputFieldClean
                                        label="Current Job Title"
                                        name="currentJobTitle"
                                        placeholder="Software Engineer"
                                        register={register}
                                        errors={errors}
                                        icon={<FaBriefcase className="text-purple-400" />}
                                        variants={fieldVariants}
                                    />
                                    <InputFieldClean
                                        label="Current Company"
                                        name="currentCompany"
                                        placeholder="ABC Tech Pvt Ltd"
                                        register={register}
                                        errors={errors}
                                        icon={<FaBuilding className="text-purple-400" />}
                                        variants={fieldVariants}
                                    />
                                    <InputFieldClean
                                        label="Current Salary"
                                        name="currentSalary"
                                        placeholder="00000"
                                        register={register}
                                        errors={errors}
                                        icon={<FaMoneyBillWave className="text-purple-400" />}
                                        variants={fieldVariants}
                                    />
                                    <InputFieldClean
                                        label="Notice Period (only in days)"
                                        name="noticePeriod"
                                        type="number"
                                        placeholder="e.g. 30"
                                        register={register}
                                        errors={errors}
                                        rules={{
                                            required: "Notice period is required",
                                            min: {
                                                value: 1,
                                                message: "Notice period must be at least 1 day",
                                            },
                                        }}
                                        icon={<FaClock className="text-purple-400" />}
                                        variants={fieldVariants}
                                    />
                                </motion.div>
                            )}
                        </motion.section>

                        {/* Submit Button */}
                        <motion.div className="flex justify-center pt-8">
                            <motion.button
                                type="submit"
                                className="group relative px-12 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/25 overflow-hidden"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 8px 25px rgba(34, 211, 238, 0.3)",
                                    background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                                    transition: { type: "spring", stiffness: 400 },
                                }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setIsHovered(true)}
                                onHoverEnd={() => setIsHovered(false)}
                            >
                                <div className="relative z-10 flex items-center gap-3">
                                    <motion.span
                                        animate={{ x: isHovered ? 3 : 0 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        Preview Application
                                    </motion.span>
                                    <motion.div
                                        animate={{ x: isHovered ? 5 : 0, rotate: isHovered ? 20 : 0 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <FaRocket />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                                    animate={{ x: isHovered ? "100%" : "-100%" }}
                                    transition={{ duration: 0.4 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm group-hover:blur-md transition-all duration-300"></div>
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

// Clean Input Field Component
const InputFieldClean = ({ label, name, register, errors, rules = {}, type = "text", placeholder, icon, variants }) => (
    <motion.div variants={variants} whileHover="hover" className="relative">
        <label className="text-gray-200 font-medium flex items-center gap-2 mb-2">
            {icon}
            <span>{label}</span>
        </label>
        <motion.input
            type={type}
            {...register(name, rules)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-cyan-500/30 rounded-lg text-white placeholder-gray-400 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            whileFocus={{
                borderColor: "#22d3ee",
                boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.1)",
                scale: 1.01,
            }}
        />
        {errors?.[name] && (
            <motion.span
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {errors[name].message}
            </motion.span>
        )}
    </motion.div>
);

// Clean Select Field Component
const SelectFieldClean = ({ label, name, options, register, errors, icon, loading = false, variants }) => (
    <motion.div variants={variants} whileHover="hover" className="relative">
        <label className="text-gray-200 font-medium flex items-center gap-2 mb-2">
            {icon}
            <span>{label}</span>
        </label>
        <motion.select
            {...register(name, { required: `${label} is required` })}
            className="w-full px-4 py-3 bg-gray-800 border-2 border-cyan-500/30 rounded-lg text-white outline-none transition-all duration-200 appearance-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            disabled={loading}
            whileFocus={{
                borderColor: "#22d3ee",
                boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.1)",
                scale: 1.01,
            }}
        >
            <option value="" className="text-gray-400 bg-gray-800">
                {loading ? "Loading..." : `Select ${label}`}
            </option>
            {options.map((opt) => (
                <option
                    key={typeof opt === "object" ? opt.id : opt}
                    value={typeof opt === "object" ? opt.id : opt}
                    className="text-white bg-gray-800"
                >
                    {typeof opt === "object" ? opt.name : opt}
                </option>
            ))}
        </motion.select>
        {errors?.[name] && (
            <motion.span
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {errors[name].message}
            </motion.span>
        )}
    </motion.div>
);

// Clean File Field Component
const FileFieldClean = ({ label, name, pdfBase64, register, errors, icon, variants }) => (
    <motion.div variants={variants} whileHover="hover" className="relative">
        <label className="text-gray-200 font-medium flex items-center gap-2 mb-2">
            {icon}
            <span>{label}</span>
        </label>
        {pdfBase64 ? (
            <motion.p
                className="text-cyan-400 text-sm mb-2 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <FaFilePdf />
                Resume already uploaded
            </motion.p>
        ) : null}
        <motion.input
            type="file"
            {...register(name, {
                required: !pdfBase64 ? "Resume is required" : false,
                validate: {
                    fileType: (value) => {
                        if (!value || !value[0]) return true;
                        const allowedTypes = "application/pdf";
                        if (value[0].type !== allowedTypes) {
                            return "Only PDF file is allowed";
                        }
                        return true;
                    },
                },
            })}
            accept=".pdf"
            className="w-full px-4 py-3 bg-gray-800 border-2 border-cyan-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:text-white hover:file:from-cyan-600 hover:file:to-blue-600 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            whileFocus={{
                borderColor: "#22d3ee",
                boxShadow: "0 0 0 3px rgba(34, 211, 238, 0.1)",
                scale: 1.01,
            }}
        />
        {errors?.resume && (
            <motion.span
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {errors.resume.message}
            </motion.span>
        )}
    </motion.div>
);

export default FinalForm;