import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../Api.jsx";
const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    state: "",
    compensation: "",
    duration: "",
    requiredExpertise: [],
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      setFormData({
        ...formData,
        requiredExpertise: [
          ...formData.requiredExpertise,
          expertiseInput.trim(),
        ],
      });
      setExpertiseInput("");
    }
  };

  const handleRemoveExpertise = (index) => {
    const updatedExpertise = [...formData.requiredExpertise];
    updatedExpertise.splice(index, 1);
    setFormData({
      ...formData,
      requiredExpertise: updatedExpertise,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.post(
            `${API_URL}/api/jobs/create`,
            { ...formData, coordinates: [latitude, longitude] },
            {
              withCredentials: true,
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
            title: "",
            description: "",
            city: "",
            state: "",
            compensation: "",
            duration: "",
            requiredExpertise: [],
          });
        } catch (error) {
          console.error(error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.success === false
          ) {
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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-2 border border-gray-500 rounded-lg"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-2 border border-gray-500 rounded-lg"
            required
          />
          <div className="flex space-x-2">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-1/2 p-2 border border-gray-500 rounded-lg"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-1/2 p-2 border border-gray-500 rounded-lg"
              required
            />
          </div>
          <input
            type="text"
            name="compensation"
            value={formData.compensation}
            onChange={handleChange}
            placeholder="Compensation (e.g., ₹500)"
            className="w-full p-2 border border-gray-500 rounded-lg"
            required
          />
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (e.g., 3 hours, 2 days)"
            className="w-full p-2 border border-gray-500 rounded-lg"
            required
          />
          <div>
            <input
              type="text"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              placeholder="Required Expertise (e.g., plumber)"
              className="w-full p-2 border border-gray-500 rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddExpertise}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
              Add Expertise
            </button>
          </div>
          <div className="flex flex-wrap">
            {formData.requiredExpertise.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-lg m-1 flex items-center">
                <span className="mr-2">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveExpertise(index)}
                  className="text-red-500 font-bold">
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600">
            Post Job
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-lg font-semibold text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateJobForm;
