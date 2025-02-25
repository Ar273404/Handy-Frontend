// src/components/CompletedJobs.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../Api.jsx";

const CompletedJobs = () => {
  const [completedJobs, setCompletedJobs] = useState([]);

  useEffect(() => {
    const fetchCompletedJobs = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/worker/completedJobs`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setCompletedJobs(res.data.completedJobs);
        } else {
          toast.error("No completed jobs found", {
            theme: "dark",
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("Error fetching completed jobs", {
          theme: "dark",
          position: "top-center",
        });
      }
    };

    fetchCompletedJobs();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Completed Jobs</h2>
      <div className="space-y-4">
        {completedJobs.length === 0 ? (
          <p>No completed jobs to display.</p>
        ) : (
          completedJobs.map((job) => (
            <div key={job._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600">Description: {job.description}</p>
              <p className="text-gray-600">
                Location: {job.location.city}, {job.location.state}
              </p>
              <p className="text-gray-600">Compensation: {job.compensation}</p>
              <p className="text-gray-600">Duration: {job.duration}</p>

              {/* Employer details */}
              <div className="mt-4">
                <h4 className="font-semibold">Employer: </h4>
                <p>{job.provider.name}</p>
                <p>Email: {job.provider.email}</p>
                <p>Phone: {job.provider.phone}</p>
              </div>

              {/* Job dates */}
              <div className="mt-4">
                <p className="text-gray-600">
                  Start Date: {new Date(job.startTime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  End Date: {new Date(job.endTime).toLocaleString()}
                </p>
              </div>

              {/* Payment details */}
              <div className="mt-4">
                <h4 className="font-semibold">Payment Status:</h4>
                <p
                  className={`text-${
                    job.paymentStatus === "paid" ? "green" : "red"
                  }-500`}>
                  {job.paymentStatus === "paid" ? "Paid" : "Pending"}
                </p>
                <p className="text-gray-600">
                  Payment:{" "}
                  {job.paymentStatus === "paid"
                    ? "Completed"
                    : "Not completed yet"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedJobs;
