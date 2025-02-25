import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../Api.jsx";
const Summary = () => {
  const [providerStats, setProviderStats] = useState({
    rating: 0,
    ongoingJobs: 0,
    completedJobs: 0,
    canceledJobs: 0,
    totalJobs: 0,
    openJobs: 0,
  });

  useEffect(() => {
    const fetchProviderStats = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/provider/summary`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setProviderStats(res.data.providerStats);
        } else {
          toast.error("Failed to fetch provider stats");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching provider stats");
      }
    };

    fetchProviderStats();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard Summary
        </h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Provider's Rating */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">Avg. Rating</h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.rating}
            </p>
          </div>

          {/* Open Jobs Count */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">Open Jobs</h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.openJobs}
            </p>
          </div>

          {/* Ongoing Jobs Count */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">Ongoing Jobs</h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.ongoingJobs}
            </p>
          </div>

          {/* Completed Jobs Count */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">
              Completed Jobs
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.completedJobs}
            </p>
          </div>

          {/* Cancelled Jobs Count */}
          <div className="bg-red-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">
              Cancelled Jobs
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.canceledJobs}
            </p>
          </div>

          {/* Total Jobs Posted */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-lg font-medium text-gray-700">
              Total Jobs Posted
            </h3>
            <p className="text-3xl font-bold text-gray-800">
              {providerStats.totalJobs}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
