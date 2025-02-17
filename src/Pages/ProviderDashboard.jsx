import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderDashboard = () => {
  const [user, setUser] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    // Fetch user profile and posted jobs
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/users/me`);  // Fetch logged-in provider data
        setUser(res.data);
        const jobsRes = await axios.get(`${API_URL}/api/jobs/posted`);  // Fetch posted jobs
        setPostedJobs(jobsRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const acceptWorker = async (jobId, workerId) => {
    try {
      await axios.post(`${API_URL}/api/job/accept-worker`, { jobId, workerId });
      alert('Worker accepted');
      // Refresh the posted jobs list
      const jobsRes = await axios.get('/api/jobs/posted');
      setPostedJobs(jobsRes.data);
    } catch (error) {
      console.error(error);
      alert('Error accepting worker');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <img src={user?.profileImage || '/default-profile.png'} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4" />
        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-gray-500">{user?.bio || 'No bio available'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Posted Jobs</h3>
        <div className="space-y-4">
          {postedJobs.map((job) => (
            <div key={job._id} className="border p-4 rounded-lg shadow-md">
              <h4 className="font-semibold">{job.title}</h4>
              <p className="text-gray-500">{job.description}</p>
              <span className={`text-sm ${job.status === 'open' ? 'text-blue-500' : 'text-gray-500'}`}>
                {job.status}
              </span>

              {job.status === 'open' && (
                <div>
                  <h5 className="font-semibold text-sm mt-4">Applicants</h5>
                  <div className="space-y-2">
                    {job.applicants.map((applicant) => (
                      <div key={applicant.workerId} className="flex justify-between items-center">
                        <span>{applicant.workerId.name}</span>
                        {applicant.status === 'applied' && (
                          <button
                            className="text-blue-500"
                            onClick={() => acceptWorker(job._id, applicant.workerId)}>
                            Accept
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
