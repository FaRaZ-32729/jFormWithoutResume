import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Preview = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // safely extract state
    const formData = state?.formData;
    const areas = state?.areas || [];
    const positions = state?.positions || [];

    const [pdfBase64, setPdfBase64] = useState(null);

    useEffect(() => {
        console.log("Form Data before submission:", formData);
    }, [formData]);

    // ✅ Show a friendly message when formData is missing
    if (!formData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2b5876] to-[#4e4376] text-white text-center p-6">
                <h2 className="text-3xl font-bold mb-4">No Data Available</h2>
                <p className="text-lg mb-6">
                    It seems you haven't filled out the form yet. Please go back and fill in your details.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition font-medium"
                >
                    Go Back to Form
                </button>
            </div>
        );
    }

    // ✅ Helper functions
    const selectedArea = areas.find((a) => a.id === Number(formData.area))?.name || "N/A";
    const selectedPosition =
        positions.find((p) => p.id === Number(formData.position))?.name || "N/A";

    const handleEdit = () => navigate("/", { state: { formData } });

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

    // ✅ Convert file to Base64
    const convertPdfToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
            setPdfBase64(base64String);
        };
        reader.readAsDataURL(file);
    };

    const resumeFile = formData?.resume?.[0];
    useEffect(() => {
        if (resumeFile) convertPdfToBase64(resumeFile);
    }, [resumeFile]);

    // ✅ Submit function
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
                            cleanFormData.currentSalary &&
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
                "https://careerapi.logicslabs.com/api/EmployeeApi/AddEmployeeWithPdfBytes",
                dto,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 15000,
                }
            );

            console.log("Response from API:", response);

            if (response.status === 200) {
                toast.success(response.data.message || "Form submitted successfully!");
                navigate("/submitted");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response?.data?.message || "Failed to submit form");
        }
    };

    // ✅ UI
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] flex items-center justify-center p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Preview Your Application</h2>

                <div className="space-y-3">
                    {Object.entries(formData).map(([key, value]) => {
                        if (["resume", "resumeFile", "resumeName"].includes(key)) return null;
                        let displayValue = value;
                        if (key === "area") displayValue = selectedArea;
                        if (key === "position") displayValue = selectedPosition;

                        return (
                            <div key={key} className="flex justify-between border-b border-white/30 py-2">
                                <span className="font-semibold capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}:
                                </span>
                                <span>
                                    {key === "portfolio" && value ? (
                                        <a
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 underline hover:text-blue-400"
                                        >
                                            View Portfolio
                                        </a>
                                    ) : (
                                        String(displayValue)
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Resume URL Display */}
                {resumeFile && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Resume</h3>
                        <div className="mt-2">
                            <a
                                href={resumeFile ? URL.createObjectURL(resumeFile) : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-300 underline hover:text-blue-400"
                            >
                                {resumeFile.name} (Click to view)
                            </a>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleEdit}
                        className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full font-semibold shadow-lg"
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preview;
