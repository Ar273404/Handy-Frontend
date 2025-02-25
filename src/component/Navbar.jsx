import React, { useState, useEffect } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios for API requests
import dummyProfileImage from "../assets/Images/Profile_pic.png";
import { API_URL } from "../Api.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
 
  // Fetch user details on component mount
  useEffect(() => {
    fetchUserProfile();
  });

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/user/me` ,{
        withCredentials: true, // Ensure cookies are sent
      });
      // console.log(response.data);

      if (response.data.success) {
        setUserType(response.data.user.userType); // "worker" or "provider"
        // console.log(response.data.user.userType);
       setProfileImage(
         response.data.user.profileImage
           ? response.data.user.profileImage
           : dummyProfileImage
       );
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        null,
        { withCredentials: true } 
      );
       toast.success("Logout successful!", {
         theme: "dark",
         autoClose: 1000,
         position: "top-center",
       });
      setIsLoggedIn(false);
      setUserType(null);
      setProfileImage(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-slate-600 text-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Handy
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex md:items-center md:w-1/5">
          <input
            type="text"
            placeholder="Search jobs or workers..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {userType === "worker" ? (
            <>
              <Link to="/find-job" className="hover:text-gray-300">
                Search Jobs
              </Link>
              <Link to="/worker-dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/applications" className="hover:text-gray-300">
                Applications
              </Link>
            </>
          ) : userType === "provider" ? (
            <>
              <Link to="/job-post" className="hover:text-gray-300">
                Post Job
              </Link>
              <Link to="/provider-dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/applicants" className="hover:text-gray-300">
                Applicants
              </Link>
            </>
          ) : null}

          {/* <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link> */}
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative">
            <FaBell className="text-xl hover:text-gray-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <FaSun className="text-xl hover:text-gray-300" />
            ) : (
              <FaMoon className="text-xl hover:text-gray-300" />
            )}
          </button>

          {/* User Menu or Authentication Buttons */}
          {isLoggedIn ? (
            <div className="relative">
              <img
                src={profileImage || dummyProfileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              />
              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10 dark:bg-gray-700 dark:text-white">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="hover:text-gray-300 bg-emerald-700 px-2 py-2 rounded-md">
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-300 bg-emerald-700 px-2 py-2 rounded-md">
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 space-y-4 p-4">
          {userType === "worker" ? (
            <>
              <Link to="/jobs" className="block hover:text-gray-300">
                Search Jobs
              </Link>
              <Link to="/dashboard" className="block hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/applications" className="block hover:text-gray-300">
                Applications
              </Link>
            </>
          ) : userType === "provider" ? (
            <>
              <Link to="/post-job" className="block hover:text-gray-300">
                Post Job
              </Link>
              <Link to="/dashboard" className="block hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/applicants" className="block hover:text-gray-300">
                Applicants
              </Link>
            </>
          ) : null}

          <Link to="/about" className="block hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contact" className="block hover:text-gray-300">
            Contact
          </Link>
          <Link to="/support" className="block hover:text-gray-300">
            Support
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block hover:text-gray-300">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="block hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

