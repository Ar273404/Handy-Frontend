import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../Api.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-right",
        });
        const { userType, profileImage } = res.data;

        localStorage.setItem("userType", userType); // Store user type (worker or provider)
        localStorage.setItem("profileImage", profileImage); // Store profile image URL

        // Redirect based on userType
        if (userType === "worker") {
          navigate("/worker-dashboard"); // Worker-specific dashboard
        } else if (userType === "provider") {
          navigate("/provider-dashboard"); // Provider-specific dashboard
        }
      }
    } catch (err) {
      console.log("Error: ", err);
      if (err.response && err.response.data && !err.response.data.success) {
        toast.error(err.response.data.message, {
          theme: "dark",
          autoClose: 1000,
          position: "top-right",
        });
      } else {
        toast.error("An unexpected error occurred", {
          theme: "dark",
          autoClose: 1000,
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
