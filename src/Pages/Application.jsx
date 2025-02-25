import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../Api.jsx";
const Applications = () => {
  const [applications, setApplications] = useState({
    applied: [],
    accepted: [],
    rejected: [],
  });
  const [selectedStatus, setSelectedStatus] = useState("applied");

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/worker/applications`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setApplications(res.data.applications);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applications. Please try again.", {
        theme: "dark",
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  const handleWithdraw = async (jobId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/worker/applications/${jobId}/withdraw`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });

        fetchApplications();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to withdraw application. Please try again.", {
        theme: "dark",
        autoClose: 1000,
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-12 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
        My Job Applications
      </h1>

      {/* Status Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["applied", "accepted", "rejected"].map((status) => (
          <button
            key={status}
            className={`text-lg font-medium capitalize px-6 py-3 rounded-lg transition-all duration-300 ease-in-out ${
              selectedStatus === status
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedStatus(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)} Jobs
          </button>
        ))}
      </div>

      {/* Applications Grid */}
      {applications[selectedStatus].length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center text-gray-600">
          No {selectedStatus} jobs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications[selectedStatus].map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-700 mt-2">{job.description}</p>
              <p className="mt-3 text-gray-800">
                <strong>Compensation:</strong> {job.compensation}
              </p>
              <p className="mt-3 text-gray-800">
                <strong>Duration:</strong> {job.duration}
              </p>
              <p className="mt-3 text-gray-800">
                <strong>Location:</strong> {job.location.city} ,{" "}
                {job.location.state}
              </p>
              <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-medium ${
                    job.status === "applied"
                      ? "text-blue-600"
                      : job.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                  {job.status}
                </span>
              </p>
              {selectedStatus === "applied" && (
                <button
                  onClick={() => handleWithdraw(job._id)}
                  className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out">
                  Withdraw Application
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
