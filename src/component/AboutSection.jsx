import React from "react";
import {
  FaUsers,
  FaBriefcase,
  FaChartLine,
  FaStar,
  FaGlobe,
  FaRocket,
} from "react-icons/fa";

const AboutSection = () => {
  const data = [
    { title: "Registered Workers", value: "15,000+", icon: <FaUsers /> },
    { title: "Jobs Completed", value: "25,000+", icon: <FaBriefcase /> },
    { title: "Success Rate", value: "98%", icon: <FaChartLine /> },
    { title: "User Satisfaction", value: "4.9/5", icon: <FaStar /> },
    { title: "Regions Covered", value: "100+", icon: <FaGlobe /> },
    { title: "Platform Growth", value: "120%", icon: <FaRocket /> },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Transforming the Blue-Collar Workforce
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            At Handy, we’re reshaping how skilled workers connect with
            employers—providing a trusted, secure, and efficient platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center">
              <div className="text-blue-600 dark:text-yellow-400 text-6xl mb-4 animate-pulse">
                {item.icon}
              </div>
              <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">
                {item.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
