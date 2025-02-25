import React from 'react';
import { useParams } from 'react-router-dom';

const HirePage = () => {
  const { profession } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-4">Hire a {profession.charAt(0).toUpperCase() + profession.slice(1)}</h1>
      <p className="text-lg">
        Here you can post a job to hire a skilled {profession}. Provide detailed requirements and connect with the best professionals in the field.
      </p>
      {/* Implement your hire form or listing here */}
    </div>
  );
};

export default HirePage;
