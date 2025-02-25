// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../../Api.jsx";
// const JobListing = () => {
//   const [jobs, setJobs] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [ratings, setRatings] = useState({});
//   const [feedback, setFeedback] = useState({});
//   const [isRatingOpen, setIsRatingOpen] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJobs();
//   }, [statusFilter]);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/provider/jobs`,
//         {
//           params: { status: statusFilter },
//           withCredentials: true,
//         }
//       );
//       setJobs(response.data.jobs);
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.success === false
//       ) {
//         toast.warn(error.response.data.message, {
//           theme: "light",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       } else {
//         console.error("Error:", error);
//         toast.error("Something went wrong. Please try again.", {
//           theme: "dark",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       }
//     }
//   };

//   const handleRatingToggle = (jobId) => {
//     setIsRatingOpen((prev) => ({
//       ...prev,
//       [jobId]: !prev[jobId], // Toggle the rating form visibility
//     }));
//   };

//   const handleRatingChange = (jobId, value) => {
//     setRatings({ ...ratings, [jobId]: value });
//   };

//   const handleFeedbackChange = (jobId, value) => {
//     setFeedback({ ...feedback, [jobId]: value });
//   };

//   const submitRating = async (jobId) => {
//     try {
//       await axios.post(
//         `${API_URL}/api/provider/submit-rating`,
//         {
//           jobId,
//           rating: ratings[jobId],
//           feedback: feedback[jobId],
//         },
//         { withCredentials: true }
//       );
//       toast.success("Rating submitted successfully");
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.success === false
//       ) {
//         toast.warn(error.response.data.message, {
//           theme: "light",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       } else {
//         console.error("Error:", error);
//         toast.error("Something went wrong. Please try again.", {
//           theme: "dark",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       }
//     }
//   };

//   const changeJobStatus = async (jobId, newStatus) => {
//     try {
//       await axios.put(
//         `${API_URL}/api/provider/jobs/${jobId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       fetchJobs();
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.success === false
//       ) {
//         toast.warn(error.response.data.message, {
//           theme: "light",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       } else {
//         console.error("Error:", error);
//         toast.error("Something went wrong. Please try again.", {
//           theme: "dark",
//           autoClose: 1000,
//           position: "top-center",
//         });
//       }
//     }
//   };

//   const handleJobApplicants = (jobId) => {
//     navigate(`/provider/jobs/${jobId}`);
//   };

//   const renderJobSection = (title, status) => {
//     const filteredJobs = jobs.filter((job) => job.status === status);
//     return (
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4 mt-6">{title}</h2>
//         {filteredJobs.length === 0 ? (
//           <p className="text-gray-500">No jobs available in this category.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="p-4 bg-white rounded-md shadow-md space-y-4">
//                 <h3 className="text-xl font-bold">{job.title}</h3>
//                 <p className="text-gray-600">{job.description}</p>
//                 <div className="text-gray-500">
//                   <strong>Location:</strong> {job.location.city},{" "}
//                   {job.location.state}
//                 </div>
//                 <div className="text-gray-500">
//                   <strong>Compensation:</strong> {job.compensation}
//                 </div>
//                 <div className="text-gray-500">
//                   <strong>Status:</strong> {job.status}
//                 </div>

//                 <div className="flex gap-2 mt-4">
//                   {/* For Open Jobs */}
//                   {status === "open" && (
//                     <>
//                       <button
//                         className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
//                         onClick={() => handleJobApplicants(job._id)}>
//                         View Applicants
//                       </button>
//                       <button
//                         className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
//                         onClick={() => changeJobStatus(job._id, "cancelled")}>
//                         Cancel
//                       </button>
//                     </>
//                   )}

//                   {/* For In Progress Jobs */}
//                   {status === "in progress" && job.applicants.length > 0 && (
//                     <>
//                       <button
//                         className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md text-center"
//                         onClick={() => changeJobStatus(job._id, "completed")}>
//                         Completed
//                       </button>
//                       <button
//                         className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md text-center"
//                         onClick={() => changeJobStatus(job._id, "cancelled")}>
//                         Cancel
//                       </button>
//                     </>
//                   )}

//                   {/* For Completed Jobs */}
//                   {status === "completed" && (
//                     <button
//                       className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
//                       onClick={() => handleRatingToggle(job._id)}>
//                       Rate Worker
//                     </button>
//                   )}
//                 </div>

//                 {isRatingOpen[job._id] && (
//                   <div className="mt-4 space-y-4">
//                     <input
//                       type="number"
//                       min="1"
//                       max="5"
//                       value={ratings[job._id] || ""}
//                       onChange={(e) =>
//                         handleRatingChange(job._id, e.target.value)
//                       }
//                       className="border p-2 rounded w-full"
//                       placeholder="Rate (1-5)"
//                     />
//                     <textarea
//                       value={feedback[job._id] || ""}
//                       onChange={(e) =>
//                         handleFeedbackChange(job._id, e.target.value)
//                       }
//                       className="border p-2 rounded w-full"
//                       placeholder="Leave feedback"
//                     />
//                     <button
//                       onClick={() => submitRating(job._id)}
//                       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
//                       Submit Rating
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold mb-4">Explore Available Jobs</h1>

//       {renderJobSection("Open Jobs", "open")}
//       {renderJobSection("In Progress Jobs", "in progress")}
//       {renderJobSection("Completed Jobs", "completed")}
//       {renderJobSection("Cancelled Jobs", "cancelled")}
//     </div>
//   );
// };

// export default JobListing;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Api.jsx";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaBars,
} from "react-icons/fa";

const JobListingDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/provider/jobs`, {
        params: { status: statusFilter },
        withCredentials: true,
      });
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs. Try again later.");
    }
  };

  const changeJobStatus = async (jobId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/provider/jobs/${jobId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchJobs();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleJobApplicants = (jobId) => {
    navigate(`/provider/jobs/${jobId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
            Job Listings
          </li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
            Applications
          </li>
          <li className="p-2 hover:bg-gray-200 rounded cursor-pointer">
            Settings
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <FaBars className="text-xl md:hidden" />
          <h1 className="text-2xl font-bold">Job Management Dashboard</h1>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <FaBriefcase size={30} />
              <div className="text-right">
                <p className="text-lg">Total Jobs</p>
                <p className="text-2xl font-bold">{jobs.length}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <FaUsers size={30} />
              <div className="text-right">
                <p className="text-lg">In Progress</p>
                <p className="text-2xl font-bold">
                  {jobs.filter((job) => job.status === "in progress").length}
                </p>
              </div>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <FaCheckCircle size={30} />
              <div className="text-right">
                <p className="text-lg">Completed</p>
                <p className="text-2xl font-bold">
                  {jobs.filter((job) => job.status === "completed").length}
                </p>
              </div>
            </div>
            <div className="bg-red-500 text-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <FaTimesCircle size={30} />
              <div className="text-right">
                <p className="text-lg">Cancelled</p>
                <p className="text-2xl font-bold">
                  {jobs.filter((job) => job.status === "cancelled").length}
                </p>
              </div>
            </div>
          </div>

          {/* Job Listings Table */}
          <div className="overflow-x-auto bg-white p-4 shadow-md rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Compensation</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">
                      {job.location.city}, {job.location.state}
                    </td>
                    <td className="p-3">₹{job.compensation}</td>
                    <td className="p-3 capitalize">{job.status}</td>
                    <td className="p-3 space-x-2">
                      {job.status === "open" && (
                        <>
                          <button
                            onClick={() => handleJobApplicants(job._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded">
                            View Applicants
                          </button>
                          <button
                            onClick={() =>
                              changeJobStatus(job._id, "cancelled")
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded">
                            Cancel
                          </button>
                        </>
                      )}
                      {job.status === "in progress" && (
                        <button
                          onClick={() => changeJobStatus(job._id, "completed")}
                          className="bg-green-500 text-white px-3 py-1 rounded">
                          Mark as Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingDashboard;
