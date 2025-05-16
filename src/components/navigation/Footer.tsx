import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div>
            <div className="flex items-center mb-6">
              <Calendar className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold tracking-tight">EventHub</span>
            </div>
            <p className="text-gray-400 mb-6">
              Discover amazing events happening around you. From tech conferences to music festivals,
              we've got you covered.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/events/hackathon" className="text-gray-400 hover:text-white transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/events/conference" className="text-gray-400 hover:text-white transition-colors">
                  Conferences
                </Link>
              </li>
              <li>
                <Link to="/events/concert" className="text-gray-400 hover:text-white transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/events/workshop" className="text-gray-400 hover:text-white transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/events/party" className="text-gray-400 hover:text-white transition-colors">
                  Parties
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                <span className="text-gray-400">
                  123 Event Street, San Francisco, CA 94103, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-500 mr-3" />
                <a href="tel:+14155550123" className="text-gray-400 hover:text-white transition-colors">
                  +1 (415) 555-0123
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-500 mr-3" />
                <a href="mailto:info@eventhub.com" className="text-gray-400 hover:text-white transition-colors">
                  info@eventhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-500 text-center text-sm">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};