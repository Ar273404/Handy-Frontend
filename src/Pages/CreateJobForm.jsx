import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../Api';

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',   // h
    city: '',
    state: '',
    compensation: '',
    duration: '',
    requiredExpertise: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await axios.post(`${API_URL}/api/jobs/create`,{...formData, coordinates : [latitude,longitude]},
              {
                  withCredentials : true,
              }
            );
            if (res.data.success) {
              toast.success(res.data.message, {
                theme: "dark",
                autoClose: 1000,
                position: "top-center",
              });
            }
            setFormData({
              title: '',
              description: '',
              city: '',
              state: '',
              compensation: '',
              duration: '',
              requiredExpertise: '',
            });  
      
          } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.success === false) {
              toast.warn(error.response.data.message, {
                theme: "dark",
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

        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md py-20">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Compensation</label>
        <input
          type="text"
          name="compensation"
          value={formData.compensation}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Required Expertise</label>
        <input
          type="text"
          name="requiredExpertise"
          value={formData.requiredExpertise}
          onChange={handleChange}
          className="w-full border-gray-300 border-2 p-2 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Post Job
      </button>
    </form>
  );
};

export default CreateJobForm;
