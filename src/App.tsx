import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import FloatingEmergency from './components/FloatingEmergency';
import HomePage from './pages/HomePage';
import RescueNetworkPage from './pages/RescueNetworkPage';
import EmergencyPage from './pages/EmergencyPage';
import AdoptionPage from './pages/AdoptionPage';
import VetConsultationPage from './pages/VetConsultationPage';
import DashboardPage from './pages/DashboardPage';

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className={`flex-1 ${isDashboard ? '' : 'pt-16'}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rescue-network" element={<RescueNetworkPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/vet-consultation" element={<VetConsultationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      <FloatingEmergency />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
