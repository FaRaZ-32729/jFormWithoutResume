import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import logo from "/logo.png";
import { replace, useNavigate } from "react-router";
import axios from "axios";

const FormsInSteps = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const onNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep(step + 1);
    };

    const onBack = () => setStep(step - 1);

    const onSubmit = (data) => {
        const finalData = { ...formData, ...data };
        // console.log("Submitted Data:", finalData);
        // alert("Form Submitted Successfully!");
        // navigate("/submitted", { replace: true });


        try {
            const respose = axios.post("http://http://192.168.103.2:84/:84/Employee/getarea", finalData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("response from server ", respose);
            navigate("/submitted");

        } catch (error) {
            console.log(error);
            console.log("error while submitting the form");
        }

    };

    const isWorking = watch("isWorking");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b5876] to-[#4e4376] px-4">
            <motion.div
                className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Company Logo" className="w-34 h-auto object-contain mb-3" />
                    <h2 className="text-3xl font-bold text-center text-white mb-3">
                        Job Application Form
                    </h2>
                    <p className="text-gray-200 text-center max-w-2xl">
                        Join our growing family where innovation meets passion! Fill out the form
                        below to take the first step toward becoming part of a company that values
                        creativity, dedication, and growth.
                    </p>
                </div>

                <form
                    onSubmit={step === 3 ? handleSubmit(onSubmit) : handleSubmit(onNext)}
                    className="space-y-8"
                >
                    {/* Step 1: Personal Info */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="text-white">Full Name</label>
                                    <input
                                        type="text"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Only letters and spaces are allowed"
                                            },
                                            minLength: { value: 3, message: "Name must be at least 3 characters" },
                                        })}
                                        placeholder="Full Name"
                                        className="input-box"
                                    />
                                    {errors.fullName && <span className="text-red-400 text-sm">{errors.fullName.message}</span>}
                                </div>

                                {/* Father's Name */}
                                <div>
                                    <label className="text-white">Father's Name</label>
                                    <input
                                        type="text"
                                        {...register("fatherName", {
                                            required: "Father's name is required",
                                            pattern: {
                                                value: /^[A-Za-z\s]+$/,
                                                message: "Only letters and spaces are allowed"
                                            },
                                            minLength: { value: 3, message: "Name must be at least 3 characters" },
                                        })}
                                        placeholder="Father's Name"
                                        className="input-box"
                                    />
                                    {errors.fatherName && <span className="text-red-400 text-sm">{errors.fatherName.message}</span>}
                                </div>


                                {/* CNIC */}
                                <div>
                                    <label className="text-white">CNIC</label>
                                    <input
                                        type="text"
                                        {...register("cnic", {
                                            required: "CNIC is required",
                                            pattern: {
                                                value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                                                message: "Enter a valid CNIC (e.g., 12345-1234567-1)",
                                            },
                                        })}
                                        placeholder="12345-1234567-1"
                                        className="input-box"
                                    />
                                    {errors.cnic && <span className="text-red-400 text-sm">{errors.cnic.message}</span>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-white">Email</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email address",
                                            },
                                        })}
                                        placeholder="example@email.com"
                                        className="input-box"
                                    />
                                    {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-white">Phone Number</label>
                                    <input
                                        type="tel"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^(\+92|0)?3[0-9]{9}$/,
                                                message: "Enter a valid phone number",
                                            },
                                        })}
                                        placeholder="+92 300 1234567"
                                        className="input-box"
                                    />
                                    {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
                                </div>

                                {/* Area */}
                                <div>
                                    <label className="text-white">Area</label>
                                    <select {...register("area", { required: "Area is required" })} className="input-box">
                                        <option value="">Select Area</option>
                                        <option>Gulshan</option>
                                        <option>Malir</option>
                                        <option>Saddar</option>
                                    </select>
                                    {errors.area && <span className="text-red-400 text-sm">{errors.area.message}</span>}
                                </div>

                                {/* DOB */}
                                <div>
                                    <label className="text-white">Date of Birth</label>
                                    <input
                                        type="date"
                                        {...register("dob", { required: "Date of birth is required" })}
                                        className="input-box"
                                    />
                                    {errors.dob && <span className="text-red-400 text-sm">{errors.dob.message}</span>}
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="text-white">Gender</label>
                                    <select {...register("gender", { required: "Gender is required" })} className="input-box">
                                        <option value="">Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                    {errors.gender && <span className="text-red-400 text-sm">{errors.gender.message}</span>}
                                </div>

                                {/* Marital Status */}
                                <div>
                                    <label className="text-white">Marital Status</label>
                                    <select {...register("maritalStatus", { required: "Marital status is required" })} className="input-box">
                                        <option value="">Select</option>
                                        <option>Single</option>
                                        <option>Married</option>
                                    </select>
                                    {errors.maritalStatus && <span className="text-red-400 text-sm">{errors.maritalStatus.message}</span>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Professional Info */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">Professional Details</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Position */}
                                <div>
                                    <label className="text-white">Position Applied For</label>
                                    <input
                                        type="text"
                                        {...register("position", { required: "Position is required" })}
                                        placeholder="Frontend Developer"
                                        className="input-box"
                                    />
                                    {errors.position && <span className="text-red-400 text-sm">{errors.position.message}</span>}
                                </div>

                                {/* Qualification */}
                                <div>
                                    <label className="text-white">Qualification</label>
                                    <select {...register("qualification", { required: "Qualification is required" })} className="input-box">
                                        <option value="">Select</option>
                                        <option>Intermediate</option>
                                        <option>Bachelor’s</option>
                                        <option>Master’s</option>
                                    </select>
                                    {errors.qualification && <span className="text-red-400 text-sm">{errors.qualification.message}</span>}
                                </div>

                                {/* Resume */}
                                <div>
                                    <label className="text-white">Upload Resume</label>
                                    <input
                                        type="file"
                                        accept=".pdf, .doc, .docx"
                                        {...register("resume", {
                                            required: "Resume is required",
                                            validate: {
                                                acceptedFormats: (value) => {
                                                    const allowedTypes = [
                                                        "application/pdf",
                                                        "application/msword",
                                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                    ];
                                                    return (
                                                        value && allowedTypes.includes(value[0]?.type)
                                                    ) || "Only PDF or DOC/DOCX files are allowed";
                                                },
                                            },
                                        })}
                                        className="input-box bg-transparent"
                                    />
                                    {errors.resume && <span className="text-red-400 text-sm">{errors.resume.message}</span>}
                                </div>

                                {/* Portfolio */}
                                <div>
                                    <label className="text-white">Portfolio / LinkedIn / GitHub URL</label>
                                    <input
                                        type="url"
                                        {...register("portfolio", {
                                            pattern: {
                                                value: /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.+)?$/,
                                                message: "Enter a valid URL",
                                            },
                                        })}
                                        placeholder="https://yourportfolio.com"
                                        className="input-box"
                                    />
                                    {errors.portfolio && <span className="text-red-400 text-sm">{errors.portfolio.message}</span>}
                                </div>

                                {/* Skills */}
                                <div className="md:col-span-2">
                                    <label className="text-white">Skills</label>
                                    <input
                                        type="text"
                                        {...register("skills", { required: "Skills are required" })}
                                        placeholder="React, Node.js, Firebase, etc."
                                        className="input-box"
                                    />
                                    {errors.skills && <span className="text-red-400 text-sm">{errors.skills.message}</span>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Employment Info */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">Employment Status</h3>
                            <div>
                                <label className="text-white block mb-2">Are you currently working?</label>
                                <select {...register("isWorking", { required: "Please select an option" })} className="input-box">
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {errors.isWorking && <span className="text-red-400 text-sm">{errors.isWorking.message}</span>}
                            </div>

                            {isWorking === "yes" && (
                                <motion.div
                                    className="grid md:grid-cols-2 gap-6 mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div>
                                        <label className="text-white">Current Job Title</label>
                                        <input
                                            type="text"
                                            {...register("currentJobTitle", { required: "This field is required" })}
                                            placeholder="Software Engineer"
                                            className="input-box"
                                        />
                                        {errors.currentJobTitle && <span className="text-red-400 text-sm">{errors.currentJobTitle.message}</span>}
                                    </div>

                                    <div>
                                        <label className="text-white">Current Company</label>
                                        <input
                                            type="text"
                                            {...register("currentCompany", { required: "This field is required" })}
                                            placeholder="ABC Tech Pvt Ltd"
                                            className="input-box"
                                        />
                                        {errors.currentCompany && <span className="text-red-400 text-sm">{errors.currentCompany.message}</span>}
                                    </div>

                                    <div>
                                        <label className="text-white">Current Salary</label>
                                        <input
                                            type="text"
                                            {...register("currentSalary")}
                                            placeholder="e.g. 80,000 PKR/month"
                                            className="input-box"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-white">Notice Period</label>
                                        <input
                                            type="text"
                                            {...register("noticePeriod")}
                                            placeholder="e.g. 30 days"
                                            className="input-box"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={onBack}
                                className="px-6 py-3 rounded-full bg-white/20 text-white font-medium hover:bg-white/30 transition"
                            >
                                Back
                            </button>
                        )}

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="ml-auto flex items-center gap-2 px-8 py-3 rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold shadow-lg"
                        >
                            {step === 3 ? "Submit Application" : "Next"}
                            {step === 3 && <FaPaperPlane />}
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            <style>{`
                .input-box {
                    width: 100%;
                    padding: 12px 14px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    outline: none;
                    transition: 0.3s;
                }
                .input-box::placeholder {
                    color: #e0e0e0;
                }
                select.input-box option {
                    color: #000;
                    background-color: #fff;
                }
            `}</style>
        </div>
    );
};

export default FormsInSteps;
