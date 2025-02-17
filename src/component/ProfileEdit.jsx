import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../Api';

const ProfileEdit = ({ worker, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: worker.name,
    expertise: worker.expertise.join(', '),
    experience: worker.experience,
    expectedCompensation: worker.expectedCompensation,
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('expertise', formData.expertise);
    data.append('experience', formData.experience);
    data.append('expectedCompensation', formData.expectedCompensation);
    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      const res = await axios.put(`${API_URL}/api/worker/edit-profile`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message, {theme: "dark",autoClose: 1000,position: "top-center",});
        onUpdate();
      } else {
        toast.error("Error updating profile." , {theme: "dark",autoClose: 1000,position: "top-center",});
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, { theme: "dark", autoClose: 1000, position: "top-center", });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Expertise</label>
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <p className="text-sm text-gray-500">Comma-separated (e.g., plumber, electrician)</p>
      </div>
      <div>
        <label className="block text-sm font-medium">Experience (in years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Expected Compensation</label>
        <input
          type="text"
          name="expectedCompensation"
          value={formData.expectedCompensation}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Profile Image</label>
        <input type="file" onChange={handleImageChange} className="block" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
