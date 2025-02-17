import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobFilters from './JobFilters.jsx';
import { toast } from 'react-toastify';
import { API_URL } from '../Api.jsx';


const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (page = 1) => {
    try {
      const queryParams = new URLSearchParams({ ...filters,sortBy, page, limit: 10 });

      const res = await axios.get(`${API_URL}/api/jobs/for-workers?${queryParams.toString()}`, {
        withCredentials : true,
      });

      if(res.data.success){
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, {theme: "dark",autoClose: 1000,position: "top-center",});
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {theme: "dark",autoClose: 1000,position: "top-center",});
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy]);

  const handleApply = async (jobId) => {
    try {
      const res = await axios.post(`${API_URL}/api/jobs/${jobId}/apply`, {}, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });

        fetchJobs(); // Refresh job list
        
      }
      

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, {theme: "dark",autoClose: 1000,position: "top-center",});
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", {theme: "dark",autoClose: 1000,position: "top-center",});
      }
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  return (
    <div className="max-w-4xl mx-auto py-20">
    <JobFilters onApplyFilters={applyFilters} />
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Available Jobs</h2>
        <div>
          <label htmlFor="sortBy" className="mr-2 text-sm font-medium">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Default</option>
            <option value="compensation">Compensation</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {jobs.map((job) => (
        <div key={job._id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.description}</p>
          <p>
            <strong>Location:</strong> {job.location.city}, {job.location.state}
          </p>
          <p>
            <strong>Compensation:</strong> {job.compensation}
          </p>
          <p>
            <strong>Posted by:</strong> {job.providerId.name}
          </p>
          <button
            onClick={() => handleApply(job._id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Now
          </button>
        </div>
      ))}

      <div className="mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => fetchJobs(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => fetchJobs(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
};

export default JobSearch;
