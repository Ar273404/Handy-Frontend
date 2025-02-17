import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../Api.jsx";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    userType: "worker",
    expertise: [],
    experience: "",
    aadharCard: null,
    expectedCompensation: "",
    profileImage: null,
    coordinates: [],
  });
  const navigate = useNavigate();

  const [highlighted, setHighlighted] = useState(false);
  const [isLocationFetching, setIsLocationFetching] = useState(false); // Track location fetching state

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type == "file" ? files[0] : value,
    });
  };


  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      setIsLocationFetching(true); // Start fetching status
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Make an API call to LocationIQ or any reverse geolocation API
          const response = await axios.get(`${API_URL}/api/auth/signup`, {
            params: { latitude, longitude },
          });

          const { address } = response.data;

          setFormData({
            ...formData,
            city: address.city || "",
            state: address.state || "",
            country: address.country || "",
            coordinates : [latitude, longitude],
          });
        } catch (error) {
          console.error("Error fetching location:", error);
        } finally {
          setIsLocationFetching(false); // End fetching status
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   data.append(key, formData[key]);
    // });


    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-center",
        });
        navigate("/login");
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          city: "",
          state: "",
          country: "",
          userType: "worker",
          expertise: [],
          experience: "",
          aadharCard: null,
          expectedCompensation: "",
          profileImage: null,
          coordinates: [],
        });
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Signup as {formData.userType === "worker" ? "Worker" : "Provider"}
        </h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-white rounded-l-lg ${formData.userType === "worker" ? "bg-blue-500" : "bg-gray-400"
              }`}
            onClick={() => setFormData({ ...formData, userType: "worker" })}
          >
            Worker
          </button>
          <button
            className={`px-4 py-2 text-white rounded-r-lg ${formData.userType === "provider" ? "bg-blue-500" : "bg-gray-400"
              }`}
            onClick={() => setFormData({ ...formData, userType: "provider" })}
          >
            Provider
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleLocationFetch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Fetch
                </button>
              </div>
              {isLocationFetching && <p className="text-sm text-gray-500 mt-2">Fetching your location...</p>} {/* Show fetching message */}
            </div>

            <div className="md:mt-4">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Profile Image */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="mt-2 block w-full text-gray-500"
              />
              {formData.profileImage && (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile Image Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Worker-Specific Fields */}
            {formData.userType === "worker" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expertise</label>
                  <input
                    type="text"
                    name="expertise"
                    placeholder="E.g., plumber, electrician"
                    value={formData.expertise}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expertise: e.target.value.split(","),
                      })
                    }
                    className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Compensation</label>
                  <input
                    type="number"
                    name="expectedCompensation"
                    value={formData.expectedCompensation}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 border-2 p-1 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Aadhar Image */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                  <input
                    type="file"
                    name="aadharCard"
                    onChange={handleChange}
                    className="mt-2 block w-full text-gray-500"
                  />
                  {formData.aadharCard && (
                    <img
                      src={URL.createObjectURL(formData.aadharCard)}
                      alt="Aadhar Card Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
              </>
            )}

          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Signup
          </button>

          <div className="mt-4">
            <p className="w-full text-center">
              Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700" >Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
