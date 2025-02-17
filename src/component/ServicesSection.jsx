// src/components/ServicesSection.js

import React from 'react';
import ServiceCard from './ServiceCard';
import {
  FaPaintBrush,
  FaTools,
  FaHardHat,
  FaHome,
  FaBolt,
  FaWrench,
} from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: FaPaintBrush,
    title: 'Painter',
    description: 'Connect with skilled painters to beautify your spaces or find painting jobs that match your expertise.',
  },
  {
    id: 2,
    icon: FaWrench,
    title: 'Plumber',
    description: 'Find reliable plumbers for your projects or access numerous plumbing job opportunities.',
  },
  {
    id: 3,
    icon: FaTools,
    title: 'Carpenter',
    description: 'Hire experienced carpenters for construction needs or discover carpentry jobs in your area.',
  },
  {
    id: 4,
    icon: FaHome,
    title: 'House Labour',
    description: 'Employ house labourers for household tasks or browse available house labour positions.',
  },
  {
    id: 5,
    icon: FaBolt,
    title: 'Electrician',
    description: 'Connect with certified electricians for electrical installations or find electrician jobs easily.',
  },
  {
    id: 6,
    icon: FaHardHat,
    title: 'Mason',
    description: 'Hire skilled masons for construction work or explore masonry job openings.',
  },
  // Add more services as needed
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
