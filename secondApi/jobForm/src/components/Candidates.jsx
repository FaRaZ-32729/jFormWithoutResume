import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(
                    "http://192.168.103.2:84/api/EmployeeApi/GetEmployeeData1"
                );

                const data =
                    response.data?.$values || response.data?.data || response.data;

                if (Array.isArray(data)) {
                    setCandidates(data);
                    setFilteredCandidates(data);
                } else {
                    setError("Invalid data format from server.");
                }
            } catch (err) {
                console.error(err);
                setError("Error fetching candidate data.");
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    
    useEffect(() => {
        const filtered = candidates.filter((candidate) =>
            candidate.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCandidates(filtered);
    }, [searchTerm, candidates]);

    if (loading)
        return (
            <div className="text-center mt-10 text-white text-lg">
                Loading candidate data...
            </div>
        );

    if (error)
        return (
            <div className="text-center mt-10 text-red-400 text-lg">{error}</div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl text-white">
                {/* 🧠 Header with title and search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 md:mb-0">Candidate List</h2>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 rounded-full text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

                {filteredCandidates.length === 0 ? (
                    <p className="text-center text-white/70">No candidates found.</p>
                ) : (
                    <table className="w-full text-left border-collapse text-sm md:text-base">
                        <thead>
                            <tr className="border-b border-white/30 text-xs md:text-sm uppercase text-white/70">
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Full Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Position</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.map((emp, index) => (
                                <tr
                                    key={emp.id || index}
                                    className="hover:bg-white/10 transition border-b border-white/10"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-semibold">{emp.fullName}</td>
                                    <td className="py-3 px-4">{emp.emailAddress}</td>
                                    <td className="py-3 px-4">{emp.phoneNumber}</td>
                                    <td className="py-3 px-4">{emp.positionAppliedFor}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => navigate(`/candidate/${emp.id}`)}
                                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Candidates;
