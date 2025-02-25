import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../Api.jsx";

const CompletedJobsHistory = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});

  // Fetch completed jobs history from backend
  useEffect(() => {
    axios
      .get(`${API_URL}/api/provider/completed-jobs`, {
        withCredentials: true,
      })
      .then((response) => {
        setCompletedJobs(response.data.jobs);
      })
      .catch((error) => {
        console.error("Error fetching completed jobs:", error);
      });
  }, []);

  // Handle rating submission
  const handleRatingChange = (jobId, value) => {
    setRatings({ ...ratings, [jobId]: value });
  };

  const handleFeedbackChange = (jobId, value) => {
    setFeedback({ ...feedback, [jobId]: value });
  };

  const submitRating = async (jobId) => {
    try {
      await axios.post(
        `${API_URL}/api/provider/submit-rating`,
        {
          jobId,
          rating: ratings[jobId],
          feedback: feedback[jobId],
        },
        { withCredentials: true }
      );
      toast.success("Rating submitted successfully");
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Completed Jobs History</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {completedJobs.length === 0 ? (
          <p>No completed jobs available.</p>
        ) : (
          completedJobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded-lg shadow-sm flex flex-col space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <p>
                    Location: {job.location.city}, {job.location.state}
                  </p>
                  <p>Compensation: {job.compensation}</p>
                  <p>Duration: {job.duration}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Worker Assigned</h4>
                {job.applicants.map(
                  (applicant, index) =>
                    applicant.workerId &&
                    applicant.status === "accepted" && (
                      <div key={index} className="text-sm text-gray-600">
                        <p>{applicant.workerId.name}</p>
                        <p>Rating: {applicant.workerId.rating}</p>
                        <p>Reviews: {applicant.workerId.reviews.length}</p>
                      </div>
                    )
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Rate Worker</h4>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratings[job._id] || ""}
                  onChange={(e) => handleRatingChange(job._id, e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <textarea
                  placeholder="Leave feedback"
                  value={feedback[job._id] || ""}
                  onChange={(e) =>
                    handleFeedbackChange(job._id, e.target.value)
                  }
                  className="border p-2 rounded mt-2 w-full"
                />
                <button
                  onClick={() => submitRating(job._id)}
                  className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
                  Submit Rating
                </button>
              </div>

              <div className="mt-4 text-sm">
                <p className="font-semibold">
                  Payment Status: {job.paymentStatus}
                </p>
                <a
                  href={`/completed-booking/${job._id}`}
                  className="text-blue-600">
                  View Completed Booking Details
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedJobsHistory;
