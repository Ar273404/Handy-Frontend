// src/pages/HomePage.js

import React, { useEffect, useState } from "react";
import HeroSection from "../component/HeroSection.jsx";
import TestimonialSection from "../component/TestimonialSection.jsx";
import ServicesSection from "../component/ServicesSection.jsx";
import AboutSection from "../component/AboutSection.jsx";
import Footer from "../component/Footer.jsx";

const HomePage = () => {
  // State to hold counts fetched from API
  const [counts, setCounts] = useState({
    jobPosted: 0,
    jobFulfilled: 0,
    jobSeekers: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("https://api.example.com/counts"); // Replace with your API endpoint
        const data = await response.json();
        setCounts({
          jobPosted: data.jobPosted,
          jobFulfilled: data.jobFulfilled,
          jobSeekers: data.jobSeekers,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
        // Handle error or set default values
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <HeroSection counts={counts} />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default HomePage;
