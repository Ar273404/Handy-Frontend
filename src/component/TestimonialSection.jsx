import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import carpenter from '../assets/Images/carpenter-test.jpeg';
import chef from '../assets/Images/chef-test.jpeg';
import painter from '../assets/Images/painter-test.jpeg';
import plumber from '../assets/Images/plumber-test.jpeg';
import welder from '../assets/Images/welder-test.jpeg';
import electrician from '../assets/Images/electrician-test.jpeg';
import housemaid from '../assets/Images/housemaid-test.jpeg';

const testimonials = [
  {
    name: "Ravi Kumar",
    profession: "Plumber",
    feedback: "Handy transformed my job search. I quickly found several job offers and connected with clients. It’s reliable, and I feel empowered.",
    image: plumber,
  },
  {
    name: "Priya Sharma",
    profession: "Housemaid",
    feedback: "Handy made it easy to find consistent work. Now, I have job stability and great communication with employers. I highly recommend it!",
    image: housemaid,
  },
  {
    name: "Amit Singh",
    profession: "Carpenter",
    feedback: "Finding carpentry jobs has never been easier. The app is intuitive and helps me track everything, from offers to payments.",
    image: carpenter,
  },
  {
    name: "Abhishek Yadav",
    profession: "Electrician",
    feedback: "Handy helped me connect with clients quickly. The job offers are clear, and the platform is easy to navigate. It’s a game-changer.",
    image: electrician,
  },
  {
    name: "Aastha Yadav",
    profession: "Painter",
    feedback: "I found jobs in my field fast. Handy is reliable, and I always feel in control of my job search. The app is a huge help!",
    image: painter,
  },
  {
    name: "Chedilaal Singh",
    profession: "Welder",
    feedback: "Handy simplifies everything. I’ve had many offers, and managing my work has never been easier. Highly recommended for workers!",
    image: welder,
  },
  {
    name: "Manoj Kumar",
    profession: "Chef",
    feedback: "Handy helped me connect with restaurants in no time. Finding chef work was smooth, and I am so happy with how quickly I found jobs.",
    image: chef,
  },
  {
    name: "Prince Rawat",
    profession: "Plumber",
    feedback: "The app connects me with clients effortlessly. The design is easy to use, and I have found steady work since joining Handy.",
    image: plumber,
  },
  {
    name: "Prasant Paswan",
    profession: "Painter",
    feedback: "Handy helped me find local jobs easily. The support is great, and I love how simple it is to find work and stay organized.",
    image: painter,
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonials = () => {
    if (currentIndex + 3 < testimonials.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      setCurrentIndex(0); // Loop back to the first set
    }
  };

  const prevTestimonials = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(testimonials.length - 3); // Loop to the last set
    }
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Powerful tagline */}
        <h2 className="text-4xl font-bold mb-4 text-blue-600 dark:text-yellow-400">Hear From Our Heroes</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
          Real stories from skilled workers whose lives have changed with Handy.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 dark:text-yellow-400">{testimonial.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{testimonial.profession}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-4 italic">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-6">
          <button
            className="p-3 bg-blue-600 dark:bg-yellow-400 text-white dark:text-black rounded-full focus:outline-none hover:bg-blue-700 dark:hover:bg-yellow-500 transition-colors"
            onClick={prevTestimonials}
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="p-3 bg-blue-600 dark:bg-yellow-400 text-white dark:text-black rounded-full focus:outline-none hover:bg-blue-700 dark:hover:bg-yellow-500 transition-colors"
            onClick={nextTestimonials}
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
