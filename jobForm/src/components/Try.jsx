import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Try = () => {
    // const [candidates, setCandidates] = useState([]);
    const [searchInput, setSearchInput] = useState();
    const [searchedCandidate, setSearchedCandidate] = useState([]);

    // console.log("result in state", searchInput);

    // fetching the data form api
    useEffect(() => {
        const getCandidates = async () => {
            const response = await axios.get(
                "http://192.168.103.2:84/api/EmployeeApi/GetEmployeeData1"
            );

            // console.log("response form api", response.data.data);
            
            const result = response.data.data;
            // setCandidates(result)
            setSearchedCandidate(result)
        };


        getCandidates();
    }, []);

    // filter
    useEffect(() => {
        const filteredCandidate = searchedCandidate.filter((candidate) => candidate.fullName.toLowerCase().includes(searchInput.toLowerCase()));
        
        // console.log("searched candidate" , filteredCandidate)

        setSearchedCandidate(filteredCandidate);
    }, [searchInput]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 max-w-5xl mx-auto shadow-2xl text-white">

                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold mb-4 md:mb-0">Candidate List</h2>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="px-4 py-2 rounded-full text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                {/* here i am displaying the searched data  */}
                {searchedCandidate.length === 0 ? (
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
                            {searchedCandidate.map((emp, index) => (
                                <tr
                                    key={emp.id}
                                    className="hover:bg-white/10 transition border-b border-white/10"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-semibold">{emp.fullName}</td>
                                    <td className="py-3 px-4">{emp.emailAddress}</td>
                                    <td className="py-3 px-4">{emp.phoneNumber}</td>
                                    <td className="py-3 px-4">{emp.positionAppliedFor}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            // onClick={() => navigate(`/preview/${emp.id}`)}
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
    )
}

export default Try