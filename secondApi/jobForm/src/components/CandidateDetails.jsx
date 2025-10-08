import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const CandidateDetails = () => {
    const { id } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.103.2:84/api/EmployeeApi/GetCandidateWithCv?candidateId=${id}`
                );
                if (response.data.success === "ok") {
                    setCandidate(response.data.candidate);
                } else {
                    setError("Failed to fetch candidate details.");
                }
            } catch (err) {
                console.error(err);
                setError("Error fetching data from the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidate();
    }, [id]);

    if (loading)
        return <div className="text-center mt-10 text-gray-300">Loading...</div>;
    if (error)
        return <div className="text-center mt-10 text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] flex items-center justify-center p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-4xl w-full shadow-2xl text-white">
                <h1 className="text-3xl font-bold text-center mb-6">Candidate Details</h1>

                <div className="space-y-3 mb-8">
                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Name:</span>
                        <span>{candidate.fullName}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Father Name:</span>
                        <span>{candidate.fatherName}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Email:</span>
                        <span>{candidate.emailAddress}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Phone:</span>
                        <span>{candidate.phoneNumber}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Gender:</span>
                        <span>{candidate.gender}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Marital Status:</span>
                        <span>{candidate.maritalStatus}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Area:</span>
                        <span>{candidate.areaName}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Date of Birth:</span>
                        <span>{candidate.dateOfBirth}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Qualification:</span>
                        <span>{candidate.highestQualification}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Position Applied:</span>
                        <span>{candidate.positionName}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Linked Profile:</span>
                        <a
                            href={candidate.linkedProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 underline hover:text-blue-400"
                        >
                            {candidate.linkedProfile}
                        </a>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Key Skills:</span>
                        <span>{candidate.keySkills}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Current Job Title:</span>
                        <span>{candidate.currentJobTitle}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Current Company:</span>
                        <span>{candidate.currentCompany}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Salary:</span>
                        <span>{candidate.currentSalary}</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Notice Period:</span>
                        <span>{candidate.noticePeriod} days</span>
                    </div>

                    <div className="flex justify-between border-b border-white/30 py-2">
                        <span className="font-semibold">Address:</span>
                        <span>{candidate.address}</span>
                    </div>
                </div>

                {candidate.cvBase64 ? (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Candidate CV</h2>
                        <div className="border border-white/20 rounded-2xl overflow-hidden shadow-lg">
                            <iframe src={`data:application/pdf;base64,${candidate.cvBase64}`} className="w-full h-[800px] " frameborder="0"></iframe>
                            {/* <embed
                                src={`data:application/pdf;base64,${candidate.cvBase64}`}
                                type="application/pdf"
                                width="100%"
                                height="800px"
                                className="rounded-xl"
                            /> */}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-300 mt-6">No CV uploaded.</p>
                )}
            </div>
        </div>
    );
};

export default CandidateDetails;
