import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import logo from "/logo.png";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const FinalForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    // console.log("finalform", state)
    const preloadedData = state?.formData || {};

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: preloadedData,
    });

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(preloadedData);
    const [areas, setAreas] = useState([]);
    // console.log(areas)
    const [positions, setPositions] = useState([]);
    // console.log(positions)
    const [loadingAreas, setLoadingAreas] = useState(true);
    const [loadingPositions, setLoadingPositions] = useState(true);
    const isPreloaded = useRef(false);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                // http://192.168.103.2:84/Employee/GetArea
                const response = await axios.get("http://192.168.103.2:84/api/AreaApi/GetArea");
                // if (!response.ok) throw new Error("Failed to fetch areas");
                // const result = await response.json();
                // console.log(result)

                // const areaList = result.data.map((item) => item.name);
                // const result = response.data.data;
                // console.log(response.data.data)
                setAreas(response.data.data);
            } catch (error) {
                console.error("Error fetching areas:", error);
                setAreas([]);
            } finally {
                setLoadingAreas(false);
            }
        };

        const fetchPositions = async () => {
            try {
                // http://192.168.103.2:84/Employee/Getpositions
                const positionResponse = await axios.get("http://192.168.103.2:84/api/EmployeeApi/Getpositions");
                // console.log(positionResponse.data.data, "position result");
                setPositions(positionResponse.data.data);
            } catch (error) {
                console.error("Error fetching positions:", error);
                setAreas([]);
            } finally {
                setLoadingPositions(false);
            }
        };

        fetchAreas();
        fetchPositions();
    }, []);

    useEffect(() => {
        if (!isPreloaded.current && Object.keys(preloadedData).length > 0) {
            reset(preloadedData);
            isPreloaded.current = true;
        }
    }, [preloadedData, reset]);

    const onNext = (data) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);

        if (step === 3) {
            navigate("/preview", { state: { formData: updatedData, areas, positions } });
        } else {
            setStep(step + 1);
        }
    };

    const onBack = () => setStep(step - 1);
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

                <form onSubmit={handleSubmit(onNext)} className="space-y-8">
                    {/* Step 1 */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <InputField
                                    label="Full Name"
                                    name="fullName"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Full name is required",
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces allowed" },
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    }}
                                />
                                <InputField
                                    label="Father's Name"
                                    name="fatherName"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "Father's name is required",
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters and spaces" },
                                        minLength: { value: 3, message: "At least 3 characters" },
                                    }}
                                />
                                <InputField
                                    label="CNIC"
                                    name="cnic"
                                    placeholder="1234512345671"
                                    register={register}
                                    errors={errors}
                                    rules={{
                                        required: "CNIC is required",
                                        pattern: { value: /^[0-9]{13}$/, message: "Enter a valid 13-digit CNIC" },
                                    }}
                                />
                                <InputField
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
                                />
                                <InputField
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
                                />
                                <InputField
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
                                />


                                {/* Dynamic Area Dropdown */}
                                <div>
                                    <label className="text-white">Area</label>
                                    <select
                                        {...register("area", { required: "Area is required" })}
                                        className="input-box"
                                        disabled={loadingAreas}
                                    >
                                        <option value="">
                                            {loadingAreas ? "Loading areas..." : "Select Area"}
                                        </option>
                                        {areas.map((area) => (
                                            <option key={area.id} value={area.id}>
                                                {area.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.area && (
                                        <span className="text-red-400 text-sm">{errors.area.message}</span>
                                    )}
                                </div>

                                <InputField
                                    label="Date of Birth"
                                    name="dob"
                                    type="date"
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Date of birth is required" }}
                                />
                                <SelectField
                                    label="Gender"
                                    name="gender"
                                    options={["Male", "Female", "Other"]}
                                    register={register}
                                    errors={errors}
                                />
                                <SelectField
                                    label="Marital Status"
                                    name="maritalStatus"
                                    options={["Single", "Married"]}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">
                                Professional Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-white">Position</label>
                                    <select
                                        {...register("position", { required: "Position is required" })}
                                        className="input-box"
                                        disabled={loadingPositions}
                                    >
                                        <option value="">
                                            {loadingPositions ? "Loading positions..." : "Select Position"}
                                        </option>
                                        {positions.map((position) => (
                                            <option key={position.id} value={position.id}>
                                                {position.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.position && (
                                        <span className="text-red-400 text-sm">{errors.position.message}</span>
                                    )}
                                </div>
                                <SelectField
                                    label="Qualification"
                                    name="qualification"
                                    options={["Intermediate", "Bachelor’s", "Master’s"]}
                                    register={register}
                                    errors={errors}
                                />
                                <InputField
                                    label="Skills"
                                    name="skills"
                                    placeholder="React, Node.js, Firebase, etc."
                                    register={register}
                                    errors={errors}
                                    rules={{ required: "Skills are required" }}
                                // fullWidth
                                />
                                <InputField
                                    label="Portfolio / LinkedIn / GitHub URL"
                                    name="portfolio"
                                    placeholder="https://yourportfolio.com"
                                    register={register}
                                    errors={errors}
                                    type="url"
                                />

                                <div>
                                    <label className="text-white">Resume (PDF Only)</label>
                                    <input
                                        type="file"
                                        {...register("resume", {
                                            required: "Resume is required",
                                            validate: {
                                                fileType: (value) => {
                                                    const allowedTypes = "application/pdf";
                                                    if (value && value[0].type != allowedTypes) {
                                                        return "Only PDF file is allowed";
                                                    }
                                                    return true;
                                                },
                                            },
                                        })}
                                        accept=".pdf"
                                        className="input-box"
                                    />
                                    {errors?.resume && (
                                        <span className="text-red-400 text-sm">{errors.resume.message}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="text-2xl text-blue-100 font-semibold mb-4">
                                Employment Status
                            </h3>
                            <SelectField
                                label="Are you currently working?"
                                name="isWorking"
                                options={["yes", "no"]}
                                register={register}
                                errors={errors}
                            />

                            {isWorking === "yes" && (
                                <motion.div
                                    className="grid md:grid-cols-2 gap-6 mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <InputField
                                        label="Current Job Title"
                                        name="currentJobTitle"
                                        placeholder="Software Engineer"
                                        register={register}
                                    />
                                    <InputField
                                        label="Current Company"
                                        name="currentCompany"
                                        placeholder="ABC Tech Pvt Ltd"
                                        register={register}
                                    />
                                    <InputField
                                        label="Current Salary"
                                        name="currentSalary"
                                        placeholder="00000"
                                        register={register}
                                    />
                                    <InputField
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
                                            // max: {
                                            //     value: 365,
                                            //     message: "Notice period cannot exceed 365 days",
                                            // },
                                        }}
                                    />

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
                            {step === 3 ? "Preview" : "Next"}
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
                .input-box::placeholder { color: #e0e0e0; }
                select.input-box option { color: #000; background-color: #fff; }
            `}</style>
        </div>
    );
};

// Reusable input field
const InputField = ({ label, name, register, errors, rules = {}, type = "text", placeholder, fullWidth }) => (
    <div className={fullWidth ? "md:col-span-2" : ""}>
        <label className="text-white">{label}</label>
        <input type={type} {...register(name, rules)} placeholder={placeholder} className="input-box" />
        {errors?.[name] && <span className="text-red-400 text-sm">{errors[name].message}</span>}
    </div>
);

// Reusable select field
const SelectField = ({ label, name, options, register, errors }) => (
    <div>
        <label className="text-white">{label}</label>
        <select {...register(name, { required: `${label} is required` })} className="input-box">
            <option value="">Select</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        {errors?.[name] && <span className="text-red-400 text-sm">{errors[name].message}</span>}
    </div>
);

export default FinalForm;
