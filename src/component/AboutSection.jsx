import React from 'react';

const AboutSection = () => {
  // Mock data for statistics (replace with real data)
  const data = {
    totalWorkers: '15,000+',
    jobsCompleted: '25,000+',
    successRate: '98',
    userSatisfaction: '4.9/5',
    regionsCovered: '100+',
    platformGrowth: '120%',
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Transforming the Blue-Collar Workforce
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            At Handy, we’re reshaping how skilled workers connect with employers—providing a trusted, secure, and efficient platform that empowers workers and simplifies hiring for businesses.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Total Workers */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.totalWorkers}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Registered Workers</p>
          </div>

          {/* Jobs Completed */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.jobsCompleted}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Jobs Completed</p>
          </div>

          {/* Success Rate */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.successRate}%</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Success Rate</p>
          </div>

          {/* User Satisfaction */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.userSatisfaction}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">User Satisfaction</p>
          </div>

          {/* Regions Covered */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.regionsCovered}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Regions Covered</p>
          </div>

          {/* Platform Growth */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-yellow-400">{data.platformGrowth}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Platform Growth Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
