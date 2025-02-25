import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_URL } from "../../Api.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Payment = () => {
  const [expensesOverview, setExpensesOverview] = useState(null);
  const [detailedExpenses, setDetailedExpenses] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/provider/expenses`,
          { withCredentials: true }
        );
        setExpensesOverview(res.data.totalOverview);
        setDetailedExpenses(res.data.detailedReport);
        setPaymentHistory(res.data.paymentHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels:
      expensesOverview?.categoryExpenses?.map((category) => category._id) || [], // Extract category names
    datasets: [
      {
        label: "Total Expenses",
        data:
          expensesOverview?.categoryExpenses?.map(
            (category) => category.total
          ) || [], // Extract totals for each category
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <h1 className="text-2xl font-semibold mb-4">Expense Tracking</h1>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          {expensesOverview ? (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "Total Expenses",
                  value: expensesOverview.totalExpenses,
                  bg: "bg-blue-100",
                },
                {
                  title: "Paid Workers",
                  value: expensesOverview.totalPaidWorkers,
                  bg: "bg-yellow-100",
                },
                {
                  title: "Category Expenses",
                  value:
                    expensesOverview.categoryExpenses.length > 0
                      ? expensesOverview.categoryExpenses
                          .map((category) => category.total)
                          .reduce((a, b) => a + b, 0)
                      : 0, // Fallback to 0 if categoryExpenses is empty
                  bg: "bg-green-100",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.bg} p-4 rounded-lg text-center shadow-sm`}>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                  <p className="text-lg font-bold">₹{item.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No overview data available.
            </p>
          )}
        </div>

        {/* Smaller Chart */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">
            Expense Overview by Category
          </h2>
          {expensesOverview && expensesOverview.categoryExpenses?.length > 0 ? (
            <div className="h-48">
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No chart data available.
            </p>
          )}
        </div>
      </div>

      {/* Detailed Expenses and Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Detailed Expenses */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Detailed Expenses</h2>
          {detailedExpenses.length > 0 ? (
            <div className="space-y-3">
              {detailedExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{expense.jobTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {expense.workerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{expense.compensation}</p>
                    <p
                      className={`text-sm ${
                        expense.paymentStatus === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}>
                      {expense.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No detailed expenses available.
            </p>
          )}
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Payment History</h2>
          {paymentHistory.length > 0 ? (
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{payment.workerName}</p>
                      <p className="text-sm text-gray-500">
                        {payment.jobTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{payment.compensation}</p>
                      <p
                        className={`text-sm ${
                          payment.status === "paid"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}>
                        {payment.status === "paid" ? "Paid" : "Pending"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No payment history available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
