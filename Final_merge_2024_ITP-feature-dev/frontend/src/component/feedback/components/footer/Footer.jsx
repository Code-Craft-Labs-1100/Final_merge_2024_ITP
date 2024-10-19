// eslint-disable-next-line no-unused-vars
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section - Logo and Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/kru/student01.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full border border-white mr-3"
            />
            <span className="font-bold text-lg md:text-xl">FEEDBACK Management System</span>
          </div>

          {/* Right Section - Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 text-sm md:text-base transition-colors duration-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-400 text-sm md:text-base transition-colors duration-200">
              About Us
            </a>
            <a href="#" className="hover:text-gray-400 text-sm md:text-base transition-colors duration-200">
              Contact
            </a>
            <a href="#" className="hover:text-gray-400 text-sm md:text-base transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-4 text-gray-400 text-xs md:text-sm">
          &copy; 2024 FEEDBACK Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
