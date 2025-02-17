import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Logo from '../assets/Images/chef-test.jpeg'; // Assuming you have a logo image in your assets folder

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Logo and Company Info */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <p className='mb-4'><Link to="/" className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
              Handy
            </Link></p>
            <p className="text-gray-300 mb-4">
              Handy connects skilled blue-collar workers with those who need their services, creating a reliable platform for both job seekers and job posters.
            </p>
            <p className="text-gray-400">
              123 Blue Collar Street,<br />
              Workforce City, WA 54321<br />
              Email: <a href="mailto:support@handy.com" className="hover:text-blue-400">support@handy.com</a><br />
              Phone: <a href="tel:+12345678901" className="hover:text-blue-400">+1 (234) 567-8901</a>
            </p>
          </div>

          {/* Industries We Serve */}
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h4 className="text-xl font-semibold mb-4 text-gray-100">Industries We Serve</h4>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/construction" className="hover:text-blue-400">Construction & Carpentry</Link>
              </li>
              <li className="mb-2">
                <Link to="/cleaning" className="hover:text-blue-400">Household & Cleaning</Link>
              </li>
              <li className="mb-2">
                <Link to="/plumbing" className="hover:text-blue-400">Plumbing Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/electrical" className="hover:text-blue-400">Electrical & Wiring</Link>
              </li>
              <li className="mb-2">
                <Link to="/painting" className="hover:text-blue-400">Painting & Decorating</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h4 className="text-xl font-semibold mb-4 text-gray-100">Resources</h4>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/blog" className="hover:text-blue-400">Blog & Articles</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="hover:text-blue-400">FAQs</Link>
              </li>
              <li className="mb-2">
                <Link to="/support" className="hover:text-blue-400">Support Center</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="md:w-1/4">
            <h4 className="text-xl font-semibold mb-4 text-gray-100">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">
                <FaLinkedinIn size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">
                <FaInstagram size={24} />
              </a>
            </div>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter:</p>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-lg focus:outline-none dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="mt-3 w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 dark:border-gray-700 py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Handy. All rights reserved. | <Link to="/terms" className="hover:text-blue-400">Terms</Link> | <Link to="/privacy" className="hover:text-blue-400">Privacy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
