import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Globe, Share2, MessageCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C10.5 2 9.5 3.5 9.5 5C9.5 6.5 10.5 8 12 8C13.5 8 14.5 6.5 14.5 5C14.5 3.5 13.5 2 12 2Z"/>
                  <path d="M6 5C4.5 5 3.5 6 3.5 7.5C3.5 9 4.5 10 6 10C7.5 10 8.5 9 8.5 7.5C8.5 6 7.5 5 6 5Z"/>
                  <path d="M18 5C16.5 5 15.5 6 15.5 7.5C15.5 9 16.5 10 18 10C19.5 10 20.5 9 20.5 7.5C20.5 6 19.5 5 18 5Z"/>
                  <path d="M3.5 11C2 11 1 12 1 13.5C1 15 2 16 3.5 16C5 16 6 15 6 13.5C6 12 5 11 3.5 11Z"/>
                  <path d="M20.5 11C19 11 18 12 18 13.5C18 15 19 16 20.5 16C22 16 23 15 23 13.5C23 12 22 11 20.5 11Z"/>
                  <path d="M12 10C8.5 10 5.5 12 5.5 15.5C5.5 18.5 7.5 22 12 22C16.5 22 18.5 18.5 18.5 15.5C18.5 12 15.5 10 12 10Z"/>
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">Pet<span className="text-blue-400">opia</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Connecting animal rescuers, shelters, and veterinarians to build a safer world for every animal that needs a helping hand.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Heart size={12} className="text-red-400" />
              <span>Made for animals, by people who care</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/emergency" className="hover:text-blue-400 transition-colors">Emergency Rescue</Link></li>
              <li><Link to="/rescue-network" className="hover:text-blue-400 transition-colors">Rescue Network</Link></li>
              <li><Link to="/adoption" className="hover:text-blue-400 transition-colors">Animal Adoption</Link></li>
              <li><Link to="/vet-consultation" className="hover:text-blue-400 transition-colors">Online Vet Consultation</Link></li>
              <li><Link to="/adoption#eol" className="hover:text-blue-400 transition-colors">End-of-Life Care</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/rescue-network" className="hover:text-blue-400 transition-colors">Our Network</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Platform Dashboard</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy (Demo)</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service (Demo)</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us (Demo)</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400 flex-shrink-0" />
                <span>+91-98765-00000 (Demo)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400 flex-shrink-0" />
                <span>hello@petopia-demo.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India (Demo)</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Website" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Globe size={14} />
              </a>
              <a href="#" aria-label="Community" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <MessageCircle size={14} />
              </a>
              <a href="#" aria-label="Share" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Share2 size={14} />
              </a>
              <a href="#" aria-label="Welfare Trust" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Shield size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © 2026 Petopia. This is a college project prototype. All data is fictional and for demonstration purposes only.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Prototype v1.0 — Not a real service
          </p>
        </div>
      </div>
    </footer>
  );
}
