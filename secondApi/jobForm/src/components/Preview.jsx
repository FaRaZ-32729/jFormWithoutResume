import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Preview = () => {
    const { state } = useLocation();
    const formData = state?.formData;
    const navigate = useNavigate();
    const areas = state?.areas || [];
    const positions = state?.positions || [];
    const [pdfBase64, setPdfBase64] = useState(null);
    console.log("data before submittion", formData)

    if (!formData) return <p className="text-center text-white">No data to preview.</p>;

    const selectedArea = areas.find(a => a.id === Number(formData.area))?.name || "N/A";
    const selectedPosition = positions.find(p => p.id === Number(formData.position))?.name || "N/A";

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

    // Convert PDF file to Base64 string
    const convertPdfToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1]; // Extract the Base64 string
            setPdfBase64(base64String);
        };
        reader.readAsDataURL(file); // Reads the PDF file as a data URL (Base64)
    };

    // Handle the resume file
    const resumeFile = formData?.resume?.[0]; // Assuming only one file is selected
    useEffect(() => {
        if (resumeFile) {
            convertPdfToBase64(resumeFile); // Convert PDF file to Base64 when file is selected
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
                                formData.currentSalary !== null &&
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

            console.log("data at the time of submittion", response)

            if (response.status === 200 ) {
                // toast.success("Form submitted successfully!");
                toast.success(response.data.message);
                navigate("/submitted")
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] flex items-center justify-center p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Preview Your Application</h2>
                <div className="space-y-3">
                    {Object.entries(formData).map(([key, value]) => {
                        if (key === "resume" || key === "resumeFile" || key === "resumeName") return null;

                        let displayValue = value;

                        if (key === "area") displayValue = selectedArea;
                        if (key === "position") displayValue = selectedPosition;

                        return (
                            <div key={key} className="flex justify-between border-b border-white/30 py-2">
                                <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
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
