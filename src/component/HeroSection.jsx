import React from 'react';
import { FaBriefcase, FaCheckCircle, FaUsers } from 'react-icons/fa';
import heroImage from '../assets/Images/DALL·E 2025-02-25 19.48.17 - A professional and vibrant hero section image featuring 11 types of skilled workers in action_ a plumber fixing a sink, an electrician working on wiri.jpg'; // Replace with your hero image path

const HeroSection = ({ counts }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col-reverse md:flex-row items-center gap-8">
      {/* Left Side: Message and Counts */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Empowering the Future of Blue-Collar Workforce Connections
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Handy is revolutionizing the way skilled labor connects with employers—offering a trusted, efficient platform for hiring and job placement across the blue-collar industry.
        </p>
        {/* Counts */}
        <div className="flex space-x-8">
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{counts.jobPosted}</h3>
              <p className="text-gray-600 dark:text-gray-400">Jobs Posted</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{counts.jobFulfilled}</h3>
              <p className="text-gray-600 dark:text-gray-400">Jobs Fulfilled</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaUsers className="text-lightBlue dark:text-yellow text-3xl" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{counts.jobSeekers}</h3>
              <p className="text-gray-600 dark:text-gray-400">Job Seekers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 flex justify-center w-[200px]">
        <img src={heroImage} alt="Hero" className="w-full h-auto object-cover rounded-lg shadow-lg" />
      </div>
    </section>
  );
};

export default HeroSection;
