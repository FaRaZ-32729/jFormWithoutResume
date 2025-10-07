import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Preview = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const formData = state?.formData;
    const areas = state?.areas || [];
    const positions = state?.positions || [];

    // console.log("areas in preview" , areas)

    if (!formData)
        return <p className="text-center text-white">No data to preview.</p>;

    const handleEdit = () => navigate("/", { state: { formData } });

    const selectedArea = areas.find(a => a.id === Number(formData.area))?.name || "N/A";
    const selectedPosition = positions.find(p => p.id === Number(formData.position))?.name || "N/A";

    console.log(" data before submitting", formData)


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

    const handleSubmit = async () => {
        try {
            const { isWorking, ...cleanFormData } = formData;
            // Build the DTO expected by the API
            const dto = {
                fullname: safe(cleanFormData.fullName),
                fathname: safe(cleanFormData.fatherName),
                emailaddres: safe(cleanFormData.email),
                phno: safe(cleanFormData.phone),
                maritalstatus: safe(cleanFormData.maritalStatus),
                gender: safe(cleanFormData.gender),
                area: safe(cleanFormData.area),
                dob: toYmd(cleanFormData.dob), // DateOnly-friendly
                cnic: safe(cleanFormData.cnic), // NOTE: lower-case key
                address: safe(cleanFormData.address), // NOTE: lower-case key
                hightquali: safe(cleanFormData.qualification),
                positionappliedfor: safe(cleanFormData.position),
                proflinked: safe(cleanFormData.portfolio) || "",
                keyskills: safe(cleanFormData.skills),

                // Include current job fields only if working
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
            console.log("dto", dto)
            // "http://192.168.103.2:84/Employee/EmployeeAddEditnew",
            const response = await axios.post(
                "http://192.168.103.2:84/api/EmployeeApi/AddEmployeeWithCv",
                dto,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 15000,
                }
            );

            console.log("Request DTO:", dto);
            console.log("Response:", response.data);

            if (response.data.success === "error") {
                toast.error(response.data.message);
            } else {
                toast.success("Form submitted successfully!");
                navigate("/submitted");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Submission failed! Please check your network or server.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] flex items-center justify-center p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Preview Your Application
                </h2>
                <div className="space-y-3">
                    {Object.entries(formData).map(([key, value]) => {
                        if (
                            key === "resume" ||
                            key === "resumeFile" ||
                            key === "resumeName"
                        )
                            return null;

                        let displayValue = value;

                        if (key === "area") displayValue = selectedArea;
                        if (key === "position") displayValue = selectedPosition;

                        return (
                            <div
                                key={key}
                                className="flex justify-between border-b border-white/30 py-2"
                            >
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
