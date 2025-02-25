import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { API_URL } from "../../Api.jsx";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const JobAnalytics = () => {
  const [jobAnalytics, setJobAnalytics] = useState(null);
  const [jobBreakdown, setJobBreakdown] = useState([]);

  useEffect(() => {
    // Fetch analytics data
    axios
      .get(`${API_URL}/api/provider/analytics`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.analytics);
        setJobAnalytics(response.data.analytics);
        setJobBreakdown(response.data.jobBreakdown);
      })
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  if (!jobAnalytics || !jobBreakdown) {
    return (
      <div className="text-center text-xl font-semibold py-6">Loading...</div>
    );
  }

  const analyticsChartData = {
    labels: ["Avg Completion Time", "Workers Applied", "Job Success Rate"],
    datasets: [
      {
        label: "Job Metrics",
        data: [
          jobAnalytics.averageCompletionTime,
          jobAnalytics.workersApplied,
          jobAnalytics.successRate,
        ],
        fill: true,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const jobBreakdownChartData = {
    labels: jobBreakdown.map((item) => item.jobType),
    datasets: [
      {
        label: "Job Distribution",
        data: jobBreakdown.map((item) => item.count),
        backgroundColor: "rgba(255, 159, 64, 0.3)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container px-6 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Job Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Analytics Section */}
        <div className="job-analytics bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Job Analytics
          </h3>
          <Line data={analyticsChartData} options={{ responsive: true }} />
        </div>

        {/* Job Breakdown Section */}
        <div className="job-breakdown bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Job Breakdown
          </h3>
          <Bar data={jobBreakdownChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default JobAnalytics;
