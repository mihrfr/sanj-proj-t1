import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function FloatingEmergency() {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  // Don't show on emergency page itself
  if (location.pathname === '/emergency') return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Link
        to="/emergency"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 rounded-2xl shadow-lg hover:shadow-xl font-bold text-sm transition-all duration-200 group active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-200" />
        </span>
        <AlertCircle size={18} />
        Emergency Help
      </Link>
    </div>
  );
}
