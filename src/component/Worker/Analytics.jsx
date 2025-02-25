import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";
import { API_URL } from "../../Api.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Fetch analytics data from the backend
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/worker/analytics`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setAnalyticsData(response.data.analytics);
        }
      } catch (error) {
        console.error("Error fetching analytics data", error);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  // Data for Bar chart (Jobs completed per month)
  const barChartData = {
    labels: analyticsData.months, // e.g., ['January', 'February', ...]
    datasets: [
      {
        label: "Jobs Completed",
        data: analyticsData.jobsPerMonth, // e.g., [10, 20, 30, ...]
        backgroundColor: "#4CAF50",
      },
    ],
  };

  // Data for Pie chart (Types of Jobs)
  const pieChartData = {
    labels: analyticsData.jobTypes.map((item) => item._id),
    datasets: [
      {
        data: analyticsData.jobTypes.map((item) => item.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF5733",
        ],
      },
    ],
  };

  // Data for Line chart (Earnings over time)
  const lineChartData = {
    labels: analyticsData.earningsOverTime.map((item) => item.month),
    datasets: [
      {
        label: "Earnings",
        data: analyticsData.earningsOverTime.map((item) => item.amount),
        borderColor: "#FF5733",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Analytics</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center">
            Jobs Completed per Month
          </h3>
          <Bar data={barChartData} />
        </div>

        <div className="card bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center">
            Job Types Distribution
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div className="card bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold text-center">
            Earnings Over Time
          </h3>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
