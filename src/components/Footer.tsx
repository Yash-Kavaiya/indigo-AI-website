import React from 'react';
import { Plane, Bot, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-3 rounded-2xl shadow-elevation-1">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <span className="text-h4 font-bold">AeroAI</span>
            </div>
            <p className="text-body1 text-gray-300 leading-relaxed">
              The future of intelligent travel is here. Experience seamless journeys powered by advanced AI technology.
            </p>
            <div className="flex items-center space-x-3 text-primary-400">
              <Bot className="h-6 w-6" />
              <span className="text-body2 font-medium">Powered by Claude Sonnet 4</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-h5 font-bold mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  AI Flight Search
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Smart Recommendations
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Travel Assistant
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Price Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Itinerary Planner
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-h5 font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-body1 text-gray-300 hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-h5 font-bold mb-6">Contact</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-body1">hello@aeroai.com</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-body1">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-body1">San Francisco, CA</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-h6 font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-primary-500 transition-colors duration-200 group">
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-primary-500 transition-colors duration-200 group">
                  <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-primary-500 transition-colors duration-200 group">
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-primary-500 transition-colors duration-200 group">
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-body1 text-gray-400">
            © 2025 AeroAI. All rights reserved. Made by Yash Kavaiya
          </p>
          <div className="flex space-x-8 mt-6 lg:mt-0">
            <a href="#" className="text-body1 text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-body1 text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-body1 text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;