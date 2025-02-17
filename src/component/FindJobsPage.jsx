// src/pages/FindJobsPage.js

import React from 'react';
import { useParams } from 'react-router-dom';

const FindJobsPage = () => {
  const { profession } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Find {profession.charAt(0).toUpperCase() + profession.slice(1)} Jobs</h1>
      <p className="text-lg">
        Browse and apply for the latest {profession} job openings. Showcase your skills and secure your next opportunity.
      </p>
      {/* Implement your job listings or search functionality here */}
    </div>
  );
};

export default FindJobsPage;
