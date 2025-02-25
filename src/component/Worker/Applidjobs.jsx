import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { API_URL } from "../../Api.jsx";

const Jobs = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rateFormVisible, setRateFormVisible] = useState(null); // Store the job ID for which rating form is visible
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("${API_URL}/api/worker/jobs", {
          withCredentials: true,
        });
        if (res.data.success) {
          setOngoingJobs(res.data.ongoingJobs);
          setCompletedJobs(res.data.completedJobs);
          console.log(res.data.completedJobs);
        }
      } catch (error) {
        toast.error("Error fetching jobs", {
          theme: "dark",
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const markAsCompleted = async (jobId) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/worker/mark-completed/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data);
        setOngoingJobs(ongoingJobs.filter((job) => job._id !== jobId));
        setCompletedJobs([...completedJobs, res.data.job]);
        toast.success("Job marked as completed", {
          theme: "dark",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.warn(error.response.data.message, {
          theme: "light",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    }
  };

  const rateProvider = async (jobId) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/worker/rate-provider/${jobId}`,
        { rating, feedback },
        { withCredentials: true }
      );
      if (res.data.success) {
        setCompletedJobs(
          completedJobs.map((job) =>
            job._id === jobId ? { ...job, rating, feedback } : job
          )
        );
        toast.success("Rating submitted", {
          theme: "dark",
          position: "top-center",
        });
        setRateFormVisible(null); // Hide form after submission
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.warn(error.response.data.message, {
          theme: "light",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    }
  };

  const changePaymentStatus = async (jobId) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/worker/change-payment-status/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setCompletedJobs(
          completedJobs.map((job) =>
            job._id === jobId ? { ...job, paymentStatus: "paid" } : job
          )
        );
        toast.success("Payment status updated", {
          theme: "dark",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.success === false
      ) {
        toast.warn(error.response.data.message, {
          theme: "light",
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Jobs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ongoing Jobs</h3>
            {ongoingJobs.length === 0 ? (
              <p>No ongoing jobs</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <p>Compensation: {job.compensation}</p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => markAsCompleted(job._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded">
                        Completed
                      </button>
                      <Link
                        to={`/chat/${job._id}/${job.providerId}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded">
                        Chat with Employer
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Completed Jobs</h3>
            {completedJobs.length === 0 ? (
              <p>No completed jobs</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white p-4 rounded shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <p>compensation: {job.compensation}</p>

                    <div className="mt-4">
                      <h4 className="font-semibold">Employer Details:</h4>
                      <p>Name: {job.provider.name}</p>
                      <p>Email: {job.provider.email}</p>
                      <p>Phone: {job.provider.phone}</p>
                      <p>
                        Start Date: {new Date(job.startTime).toLocaleString()}
                      </p>
                      <p>End Date: {new Date(job.endTime).toLocaleString()}</p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold">
                        Payment Status:{" "}
                        <span
                          className={`text-${
                            job.paymentStatus === "paid" ? "green" : "red"
                          }-500`}>
                          {job.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </h4>
                      {job.paymentStatus === "pending" && (
                        <button
                          onClick={() => changePaymentStatus(job._id)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded mt-2">
                          Mark Payment as Paid
                        </button>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() =>
                          setRateFormVisible(
                            rateFormVisible === job._id ? null : job._id
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded">
                        {rateFormVisible === job._id
                          ? "Cancel Rating"
                          : "Rate Employer"}
                      </button>

                      {rateFormVisible === job._id && (
                        <div className="mt-4 p-4 border-t-2 border-gray-200">
                          <h4 className="font-semibold text-lg mb-2">
                            Rate Employer
                          </h4>
                          <div className="space-y-2">
                            <input
                              type="number"
                              placeholder="Rating (1-5)"
                              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="1"
                              max="5"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            />
                            <textarea
                              placeholder="Feedback"
                              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                            />
                            <button
                              onClick={() => rateProvider(job._id)}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
                              Submit Rating
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
