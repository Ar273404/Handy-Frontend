
import React from 'react';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-lightBlue dark:text-yellow text-4xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-lightBlue dark:text-yellow">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;
