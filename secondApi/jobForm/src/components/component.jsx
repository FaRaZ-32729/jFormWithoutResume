// import axios from "axios";

// const toYmd = (d) => {
//   // accepts a Date, ISO string, or yyyy-MM-dd; returns yyyy-MM-dd
//   if (!d) return null;
//   const date = d instanceof Date ? d : new Date(d);
//   if (Number.isNaN(date.getTime())) return null;
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const dd = String(date.getDate()).padStart(2, "0");
//   return ${y}-${m}-${dd};
// };

// const safe = (v) => (typeof v === "string" ? v.trim() : v);

// const handleSubmit = async () => {
//   try {
//     // Build the DTO expected by the API
//     const dto = {
//       fullname: safe(formData.fullName),
//       fathname: safe(formData.fatherName),
//       emailaddres: safe(formData.email),
//       phno: safe(formData.phone),
//       maritalstatus: safe(formData.maritalStatus),
//       gender: safe(formData.gender),
//       area: safe(formData.area),
//       dob: toYmd(formData.dob),                // DateOnly-friendly
//       cnic: safe(formData.cnic),               // NOTE: lower-case key
//       hightquali: safe(formData.qualification),
//       positionappliedfor: safe(formData.position),
//       proflinked: safe(formData.portfolio) || "",
//       keyskills: safe(formData.skills),

//       // Include current job fields only if working
//       ...(formData.isWorking === "yes"
//         ? {
//             CurrJobTitle: safe(formData.currentJobTitle) || null,
//             CurrCompany: safe(formData.currentCompany) || null,
//             CurrSalary:
//               formData.currentSalary !== undefined &&
//               formData.currentSalary !== null &&
//               String(formData.currentSalary).trim() !== ""
//                 ? Number(formData.currentSalary)
//                 : null,
//             NoticePeriod: safe(formData.noticePeriod) || null,
//           }
//         : {
//             CurrJobTitle: null,
//             CurrCompany: null,
//             CurrSalary: null,
//             NoticePeriod: null,
//           }),
//     };

//     // Optional: quick client-side checks mirroring server rules
//     if (!dto.cnic || dto.cnic.length !== 13) {
//       return toast.error("Enter CNIC 13 digits.");
//     }
//     if (!dto.phno || dto.phno.length !== 11) {
//       return toast.error("Enter Phone Number 11 digits.");
//     }
//     if (!dto.dob) {
//       return toast.error("Enter a valid date of birth (yyyy-MM-dd).");
//     }

//     const response = await axios.post(
//       "http://192.168.10.2:84/Employee/EmployeeAddEditNew",
//       dto,
//       {
//         headers: { "Content-Type": "application/json" },
//         // optional but useful:
//         timeout: 15000,
//         // withCredentials: true, // only if your API uses cookies/auth that require it
//       }
//     );

//     console.log("Request DTO:", dto);
//     console.log("Response:", response.data);

//     if (response?.data?.success === "error") {
//       toast.error(response.data.message || "Submission failed.");
//     } else {
//       navigate("/submitted");
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);

//     // Helpful error messages
//     if (error.code === "ERR_NETWORK") {
//       // Likely CORS / mixed-content / server unreachable
//       return toast.error(
//         "Network error. Make