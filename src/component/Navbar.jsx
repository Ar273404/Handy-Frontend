import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
  const [user, setUser] = useState(null);  // Store logged in user data

  // Toggle theme between light and dark
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load theme and user status from localStorage or cookies
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedUser = JSON.parse(localStorage.getItem('user')); // assuming user info is stored in localStorage

    if (storedTheme) {
      setTheme(storedTheme);
    }

    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Apply theme class to html
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    // Optionally clear session or JWT tokens here
  };

  return (
    <nav className="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
              Handy
            </Link>
          </div>

          {/* Center Section: Search Field (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:w-1/3">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Right Section: Navigation Links and Icons */}
          <div className="flex items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400">
                Home
              </Link>
              <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400">
                About Us
              </Link>
              <Link to="/job-post" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400">
                Post Job
              </Link>
              <Link to="/find-job" className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400">
                Search Jobs
              </Link>
            </div>

            {/* Search Field (visible on mobile) */}
            <div className="flex md:hidden items-center mr-2">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            {/* Notification Icon */}
            <button className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
              <FaBell size={20} />
            </button>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              >
                {theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => { setTheme('light'); setDropdown(false); }}
                    className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FaSun className="mr-2" /> Light Mode
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setDropdown(false); }}
                    className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                  >
                    <FaMoon className="mr-2" /> Dark Mode
                  </button>
                </div>
              )}
            </div>

            {/* Profile Image (if logged in) */}
            {isLoggedIn ? (
              <Link to="/profile" className="ml-4">
                <img
                  src={user.profileImage || "https://via.placeholder.com/32"}  // Assuming profile image is stored in user object
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-yellow-400"
                />
              </Link>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2 ml-4">
                <Link to="/login" className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Login
                </Link>
                <Link to="/signup" className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileMenu(false)}
            >
              About Us
            </Link>
            <Link
              to="/job-post"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileMenu(false)}
            >
              Job Post
            </Link>
            <Link
              to="/find-job"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setMobileMenu(false)}
            >
              Find a Job
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <button
                onClick={handleLogout}
                className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
