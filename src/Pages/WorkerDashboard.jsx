// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileEdit from '../component/Worker/ProfileEdit.jsx';
// import JobAnalytics from '../component/Provider/JobAnalytics.jsx';
// import { toast } from 'react-toastify';
// import { API_URL } from '../Api.jsx';

// const WorkerDashboard = () => {
//   const [worker, setWorker] = useState(null); // Worker data
//   const [completedJobs, setCompletedJobs] = useState([]); // Completed jobs data
//   const [filter, setFilter] = useState({ sort: 'date', duration: 'all' }); // Filter state
//   const [showEdit, setShowEdit] = useState(false); // Toggle Profile Edit

//   useEffect(() => {
//     // Fetch worker profile
//     const fetchWorkerData = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/worker/dashboard`, {
//           withCredentials: true,
//         });

//         if (res.data.success) {
//           toast.success(res.data.message, {
//             theme: "dark",
//             autoClose: 1000,
//             position: "top-center",
//           });

//           setWorker(res.data.worker);
//           setCompletedJobs(res.data.completedJobs);
//         }

//       } catch (error) {
//         console.error(error);
//         if (error.response && error.response.data && error.response.data.success === false) {
//           toast.warn(error.response.data.message, { theme: "dark", autoClose: 1000, position: "top-center", });
//         } else {
//           console.error("Error:", error);
//           toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
//         }
//       }
//     };
//     fetchWorkerData();
//   }, []);

//   const applyFilter = (jobs) => {
//     let filtered = [...jobs];
//     if (filter.duration !== 'all') {
//       filtered = filtered.filter((job) => job.duration === filter.duration);
//     }
//     if (filter.sort === 'rating') {
//       filtered.sort((a, b) => b.rating - a.rating);
//     }
//     return filtered;
//   };

//   const filteredJobs = applyFilter(completedJobs);

//   if (!worker) return <div>Loading...</div>;

//   return (
//     <div className="p-6 space-y-6 py-20">
//       <div className="bg-white rounded shadow p-4 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">{worker.name}'s Dashboard</h1>
//           <p className="text-gray-600">Rating: {worker.rating || 'No ratings yet'}</p>
//           <p className="text-gray-600">Experience: {worker.experience || 0} years</p>
//         </div>
//         <button
//           onClick={() => setShowEdit(!showEdit)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {showEdit ? 'Close Edit' : 'Edit Profile'}
//         </button>
//       </div>

//       {showEdit && (
//         <div className="bg-white rounded shadow p-4">
//           <ProfileEdit worker={worker} onUpdate={() => window.location.reload()} />
//         </div>
//       )}

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-bold">Job Analytics</h2>
//         <JobAnalytics jobs={completedJobs} />
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-bold">Completed Jobs</h2>
//         <div className="flex space-x-4 mb-4">
//           <select
//             value={filter.sort}
//             onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="date">Sort by Date</option>
//             <option value="rating">Sort by Rating</option>
//           </select>
//           <select
//             value={filter.duration}
//             onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="all">All Durations</option>
//             <option value="short">Short-term</option>
//             <option value="long">Long-term</option>
//           </select>
//         </div>
//         <div className="space-y-4">
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <div key={job._id} className="p-4 border border-gray-300 rounded">
//                 <h3 className="text-lg font-bold">{job.title}</h3>
//                 <p>{job.description}</p>
//                 <p className="text-gray-600">Compensation: {job.compensation}</p>
//                 <p className="text-gray-600">Rating: {job.rating || 'No rating yet'}</p>
//               </div>
//             ))
//           ) : (
//             <p>No jobs found.</p>
//           )}
//         </div>
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-bold">Testimonials</h2>
//         <div className="space-y-4">
//           {worker.reviews.length > 0 ? (
//             worker.reviews.map((review) => (
//               <div key={review._id} className="p-4 border border-gray-300 rounded">
//                 <p className="text-gray-600">Rating: {review.rating}</p>
//                 <p>{review.comment}</p>
//               </div>
//             ))
//           ) : (
//             <p>No testimonials yet.</p>
//           )}
//         </div>
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <h2 className="text-xl font-bold">Payment Details</h2>
//         {/* Replace with real payment data */}
//         <p className="text-gray-600">Total Earnings: $5000</p>
//         <p className="text-gray-600">Pending Payments: $200</p>
//       </div>
//     </div>
//   );
// };

// export default WorkerDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileEdit from "../component/Worker/ProfileEdit.jsx";
import JobAnalytics from "../component/Provider/JobAnalytics.jsx";
import { toast } from "react-toastify";
import { API_URL } from "../Api.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const WorkerDashboard = () => {
  const [worker, setWorker] = useState(null);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [filter, setFilter] = useState({ sort: "date", duration: "all" });
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/worker/dashboard`, {
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message, {
            theme: "dark",
            autoClose: 1000,
            position: "top-center",
          });
          setWorker(res.data.worker);
          setCompletedJobs(res.data.completedJobs);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    };
    fetchWorkerData();
  }, []);

  const applyFilter = (jobs) => {
    let filtered = [...jobs];
    if (filter.duration !== "all") {
      filtered = filtered.filter((job) => job.duration === filter.duration);
    }
    if (filter.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  };

  const filteredJobs = applyFilter(completedJobs);

  const jobChartData = completedJobs.map((job) => ({
    name: job.title,
    rating: job.rating || 0,
  }));

  const COLORS = ["#4CAF50", "#FF9800", "#E91E63", "#3F51B5"];

  if (!worker)
    return (
      <div className="text-center text-xl font-semibold py-20">Loading...</div>
    );

  return (
    <div className="p-6 space-y-6 py-20 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-blue-600 text-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{worker.name}'s Dashboard</h1>
          <p className="text-gray-200">
            Rating: {worker.rating || "No ratings yet"}
          </p>
          <p className="text-gray-200">
            Experience: {worker.experience || 0} years
          </p>
        </div>
        <button
          onClick={() => setShowEdit(!showEdit)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200">
          {showEdit ? "Close Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Edit Section */}
      {showEdit && (
        <div className="bg-white rounded-lg shadow p-6">
          <ProfileEdit
            worker={worker}
            onUpdate={() => window.location.reload()}
          />
        </div>
      )}

      {/* Job Analytics Graph */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Job Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rating" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Completed Jobs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold">Completed Jobs</h2>
        <div className="flex space-x-4 mb-4">
          <select
            value={filter.sort}
            onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2">
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <select
            value={filter.duration}
            onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2">
            <option value="all">All Durations</option>
            <option value="short">Short-term</option>
            <option value="long">Long-term</option>
          </select>
        </div>
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="p-4 border border-gray-300 rounded-lg shadow">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p>{job.description}</p>
                <p className="text-gray-600">
                  Compensation: {job.compensation}
                </p>
                <p className="text-gray-600">
                  Rating: {job.rating || "No rating yet"}
                </p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Payment Details</h2>
          <p className="text-gray-600">Total Earnings: $5000</p>
          <p className="text-gray-600">Pending Payments: $200</p>
        </div>
        <PieChart width={200} height={200}>
          <Pie
            data={[
              { name: "Earnings", value: 5000 },
              { name: "Pending", value: 200 },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {COLORS.map((color, index) => (
              <Cell key={`cell-${index}`} fill={color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default WorkerDashboard;
