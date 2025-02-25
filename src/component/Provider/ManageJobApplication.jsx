import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../Api.jsx";
const ManageJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();

  // Fetch applications when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/api/provider/job-applications/${jobId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setApplications(response.data.applicants);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, [jobId]);

  // Accept or reject an application
  const handleApplicationStatus = (workerId, status) => {
    console.log("Status being sent:", status);
    axios
      .put(
        `${API_URL}/api/provider/job-application/${jobId}/${workerId}`,
        { status },
        { withCredentials: true }
      )
      .then((response) => {
        setApplications((prevApplications) =>
          prevApplications.map((applicant) =>
            applicant.workerId._id === workerId
              ? { ...applicant, status }
              : applicant
          )
        );
        // alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
      });
  };

  // Filter applicants by rating or expertise
  const filteredApplications = applications.filter(
    (application) =>
      application.workerId.expertise.some((exp) => exp.includes(filter)) ||
      application.workerId.rating >= parseInt(filter)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Job Applications</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div>
          {/* Search filter */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by expertise or rating"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          {/* Applicants List */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {filteredApplications.length === 0 ? (
              <p>No applicants found.</p>
            ) : (
              <table className="min-w-full text-left table-auto">
                <thead>
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Expertise</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.workerId._id}>
                      <td className="p-4">{application.workerId.name}</td>
                      <td className="p-4">
                        {application.workerId.expertise.join(", ")}
                      </td>
                      <td className="p-4">{application.workerId.rating}</td>
                      <td className="p-4">
                        {application.status === "applied" ? (
                          <div>
                            <button
                              onClick={() =>
                                handleApplicationStatus(
                                  application.workerId._id,
                                  "accepted"
                                )
                              }
                              className="bg-green-500 text-white p-2 rounded mr-2">
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleApplicationStatus(
                                  application.workerId._id,
                                  "rejected"
                                )
                              }
                              className="bg-red-500 text-white p-2 rounded">
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span>{application.status}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobApplications;
