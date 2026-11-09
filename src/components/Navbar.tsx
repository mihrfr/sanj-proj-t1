import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, AlertCircle, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const unreadCount = state.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rescue Network', path: '/rescue-network' },
    { label: 'Emergency', path: '/emergency', emergency: true },
    { label: 'Adoption', path: '/adoption' },
    { label: 'Vet Consultation', path: '/vet-consultation' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center group-hover:bg-green-800 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C10.5 2 9.5 3.5 9.5 5C9.5 6.5 10.5 8 12 8C13.5 8 14.5 6.5 14.5 5C14.5 3.5 13.5 2 12 2Z"/>
                <path d="M6 5C4.5 5 3.5 6 3.5 7.5C3.5 9 4.5 10 6 10C7.5 10 8.5 9 8.5 7.5C8.5 6 7.5 5 6 5Z"/>
                <path d="M18 5C16.5 5 15.5 6 15.5 7.5C15.5 9 16.5 10 18 10C19.5 10 20.5 9 20.5 7.5C20.5 6 19.5 5 18 5Z"/>
                <path d="M3.5 11C2 11 1 12 1 13.5C1 15 2 16 3.5 16C5 16 6 15 6 13.5C6 12 5 11 3.5 11Z"/>
                <path d="M20.5 11C19 11 18 12 18 13.5C18 15 19 16 20.5 16C22 16 23 15 23 13.5C23 12 22 11 20.5 11Z"/>
                <path d="M12 10C8.5 10 5.5 12 5.5 15.5C5.5 18.5 7.5 22 12 22C16.5 22 18.5 18.5 18.5 15.5C18.5 12 15.5 10 12 10Z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-green-800">PawLink</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              link.emergency ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-red-600 text-white'
                      : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  <AlertCircle size={14} />
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-green-50 text-green-700 font-semibold'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              onClick={() => navigate('/dashboard')}
              className="relative ml-2 p-2 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="relative p-2 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  link.emergency
                    ? isActive(link.path)
                      ? 'bg-red-600 text-white'
                      : 'bg-red-50 text-red-600 font-semibold'
                    : isActive(link.path)
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.emergency && '🚨 '}{link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
