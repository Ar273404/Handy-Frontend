import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { API_URL } from "../../Api.jsx";

const SummarySection = () => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    // Fetch summary data for worker dashboard
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/worker/summary`,
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log(response.data.summary);
          setSummaryData(response.data.summary);
        }
      } catch (error) {
        console.error("Error fetching summary data", error);
      }
    };
    fetchSummaryData();
  }, []);

  if (!summaryData) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">Worker Summary</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Total Jobs Applied */}
        <div
          className="bg-blue-100 p-4 rounded shadow"
          data-tip="Total number of jobs you have applied for">
          <h3 className="text-lg font-medium">Total Jobs Applied</h3>
          <p className="text-2xl font-bold">{summaryData.totalJobsApplied}</p>
        </div>

        {/* Total Completed Jobs */}
        <div
          className="bg-green-100 p-4 rounded shadow"
          data-tip="Total number of jobs that you have successfully completed">
          <h3 className="text-lg font-medium">Total Completed Jobs</h3>
          <p className="text-2xl font-bold">{summaryData.totalCompletedJobs}</p>
        </div>

        {/* Average Rating */}
        <div
          className="bg-yellow-100 p-4 rounded shadow"
          data-tip="Average rating received from clients based on reviews">
          <h3 className="text-lg font-medium">Average Rating</h3>
          <p className="text-2xl font-bold">{summaryData.avgRating}</p>
        </div>

        {/* Total Earnings */}
        <div
          className="bg-purple-100 p-4 rounded shadow"
          data-tip="Total earnings from the completed jobs so far">
          <h3 className="text-lg font-medium">Total Earnings</h3>
          <p className="text-2xl font-bold">
            ₹{summaryData.totalEarnings[0]?.totalCompensation || "0.0"}
          </p>
        </div>

        {/* Pending Payments */}
        <div
          className="bg-red-100 p-4 rounded shadow"
          data-tip="Total amount pending for payment from ongoing jobs">
          <h3 className="text-lg font-medium">Pending Payments</h3>
          <p className="text-2xl font-bold">
            ₹{summaryData.pendingPayments[0]?.totalCompensation || "0.0"}
          </p>
        </div>
      </div>

      {/* Tooltip container */}
      <ReactTooltip effect="solid" place="top" />
    </div>
  );
};

export default SummarySection;
