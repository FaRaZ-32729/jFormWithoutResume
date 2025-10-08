import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const SpecificCandidateDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await axios.get(
                    "http://192.168.103.2:84/api/EmployeeApi/GetEmployeeData1"
                );
                const data = response.data.data ;
                // console.log(data)
                const selected = data.find((emp) => emp.id === Number(id));
                if (selected) setCandidate(selected);
                else setError("Candidate not found.");
            } catch (err) {
                setError("Failed to fetch candidate details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCandidate();
    }, [id]);

    if (loading) return <div className="text-center mt-10 text-white text-lg">Loading details...</div>;
    if (error) return <div className="text-center mt-10 text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] p-6 text-white">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                    ← Back
                </button>

                <h2 className="text-3xl font-bold text-center mb-6">
                    Candidate Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(candidate).map(([key, value]) => (
                        <div key={key} className="bg-white/10 p-3 rounded-lg">
                            <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong>{" "}
                            <span className="text-gray-200">{String(value || "-")}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecificCandidateDetails;
