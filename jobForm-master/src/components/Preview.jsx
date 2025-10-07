import React from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Preview = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const formData = state?.formData;

    if (!formData) return <p className="text-center text-white">No data to preview.</p>;

    const handleEdit = () => navigate("/", { state: { formData } });

    const handleSubmit = async () => {
        try {
            const formPayload = new FormData();

            formPayload.append("fullname", formData.fullName);
            formPayload.append("fathname", formData.fatherName);
            formPayload.append("CNIC", formData.cnic);
            formPayload.append("emailaddres", formData.email);
            formPayload.append("phno", formData.phone);
            formPayload.append("area", formData.area);
            formPayload.append("dob", formData.dob);
            formPayload.append("gender", formData.gender);
            formPayload.append("maritalstatus", formData.maritalStatus);
            formPayload.append("positionappliedfor", formData.position);
            formPayload.append("hightquali", formData.qualification);
            formPayload.append("keyskills", formData.skills);
            formPayload.append("proflinked", formData.portfolio || "");

            formPayload.append("IsWorking", formData.isWorking || "no");
            if (formData.isWorking === "yes") {
                formPayload.append("CurrJobTitle", formData.currentJobTitle);
                formPayload.append("CurrCompany", formData.currentCompany);
                formPayload.append("CurrSalary", formData.currentSalary);
                formPayload.append("NoticePeriod", formData.noticePeriod);
            }

            const response = await axios.post(
                "http://192.168.103.2:84/Employee/EmployeeAddEdit",
                formPayload,
                // {
                //     headers: {
                //         "Content-Type": "application/json"
                //     }
                // }
            );

            for (let pair of formPayload.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            console.log("Response:", response.data);

            if (response.data.success === "error") {
                toast.error(response.data.message)
            } else {
                navigate("/submitted");
            }



        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] flex items-center justify-center p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-3xl w-full shadow-2xl text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Preview Your Application</h2>
                <div className="space-y-3">
                    {Object.entries(formData).map(([key, value]) => {
                        if (key === "resume" || key === "resumeFile" || key === "resumeName") return null;

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
                                        String(value)
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
