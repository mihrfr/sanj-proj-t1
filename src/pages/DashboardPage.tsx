import React, { useState } from 'react';
import { 
  LayoutDashboard, AlertCircle, Heart, Calendar, Building2, Bell, 
  CheckCircle, Clock, Users, Stethoscope, 
  Shield, Check, ArrowRight, Video, Filter,
  Phone, MapPin, Eye, ExternalLink, RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { EmergencyReport, AdoptionApplication, VetAppointment, Notification } from '../context/AppContext';
import { RESCUE_TEAMS, SHELTERS, VET_CLINICS } from '../data/demoData';
import { showToast } from '../components/Toast';

type Section = 'overview' | 'emergency' | 'adoption' | 'vet' | 'partners' | 'notifications';

export default function DashboardPage() {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<EmergencyReport | null>(null);

  const activeRescues = state.emergencyReports.filter(r => r.status !== 'resolved').length;
  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  const allPartners = [
    ...RESCUE_TEAMS.map(t => ({ ...t, category: 'Rescue Team' })),
    ...SHELTERS.map(s => ({ ...s, category: 'Animal Shelter' })),
    ...VET_CLINICS.map(v => ({ ...v, category: 'Veterinary Clinic' }))
  ];

  const roleConfig = {
    user: { label: 'General User', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    rescue: { label: 'Rescue Team (HART)', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    shelter: { label: 'Shelter Staff', color: 'bg-green-100 text-green-800 border-green-200' },
    vet: { label: 'Veterinarian (Dr. Priya)', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    admin: { label: 'Platform Admin', color: 'bg-red-100 text-red-800 border-red-200' },
  };

  const handleStatusUpdate = (reportId: string, newStatus: EmergencyReport['status']) => {
    dispatch({
      type: 'UPDATE_REPORT_STATUS',
      payload: { id: reportId, status: newStatus }
    });

    const statusLabels: Record<string, string> = {
      'assigned': 'Assigned to Response Crew',
      'in-progress': 'Rescue In Progress (Dispatch En Route)',
      'resolved': 'Case Resolved & Animal Safe'
    };

    const notif: Notification = {
      id: Date.now().toString(),
      type: 'status-update',
      title: 'Status Updated',
      message: `Emergency Report ${reportId} is now: ${statusLabels[newStatus] || newStatus}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notif });
    showToast(`Status updated: ${statusLabels[newStatus] || newStatus}`, 'success');
  };

  const handleSeedDemoData = () => {
    // Add sample report if empty
    if (state.emergencyReports.length === 0) {
      const demoReport: EmergencyReport = {
        id: 'seed-1',
        reportId: 'PL-2026-104',
        animalType: 'Dog',
        emergencyType: 'Animal hit by vehicle',
        severity: 'Critical',
        description: 'Injured street dog near Miyapur Metro Pillar 42. Unable to move hind legs, needs immediate medical assistance.',
        location: 'Hyderabad',
        area: 'Miyapur',
        address: 'Opposite Metro Station Gate 2, Miyapur',
        contactName: 'Karthik Rao',
        contactPhone: '+91-98765-43210',
        assignedTeam: 'Hyderabad Animal Rescue Team',
        assignedTeamId: 'rt-001',
        distance: 1.8,
        status: 'in-progress',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      };
      dispatch({ type: 'ADD_EMERGENCY_REPORT', payload: demoReport });
    }

    if (state.adoptionApplications.length === 0) {
      const demoAdoption: AdoptionApplication = {
        id: 'seed-adopt-1',
        animalId: 'adopt-001',
        animalName: 'Bruno',
        animalSpecies: 'Dog',
        applicantName: 'Sneha Reddy',
        phone: '+91-98490-12345',
        email: 'sneha.reddy@example.com',
        livingSituation: 'Apartment with pet-friendly balcony',
        previousPets: 'Had a Labrador for 8 years',
        reason: 'Looking to give a loving forever home to a rescue pet.',
        status: 'reviewing',
        createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
      };
      dispatch({ type: 'ADD_ADOPTION_APPLICATION', payload: demoAdoption });
    }

    if (state.vetAppointments.length === 0) {
      const demoVet: VetAppointment = {
        id: 'seed-vet-1',
        bookingId: 'BK-58291',
        vetId: 'vet-001',
        vetName: 'Dr. Priya Sharma',
        ownerName: 'Vikram Joshi',
        phone: '+91-99887-76655',
        animalName: 'Milo',
        animalSpecies: 'Cat',
        animalAge: '2 years',
        problem: 'Lethargic, not eating dry food since yesterday morning.',
        date: new Date().toISOString().split('T')[0],
        time: '04:00 PM',
        fee: 149,
        status: 'confirmed',
        createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
      };
      dispatch({ type: 'ADD_VET_APPOINTMENT', payload: demoVet });
    }

    showToast('Demo presentation data loaded!', 'info');
  };

  const navItems = [
    { id: 'overview' as Section, label: 'Overview', icon: LayoutDashboard },
    { id: 'emergency' as Section, label: 'Emergency Reports', icon: AlertCircle, badge: state.emergencyReports.length },
    { id: 'adoption' as Section, label: 'Adoption Applications', icon: Heart, badge: state.adoptionApplications.length },
    { id: 'vet' as Section, label: 'Vet Consultations', icon: Calendar, badge: state.vetAppointments.length },
    { id: 'partners' as Section, label: 'Network Partners', icon: Building2, badge: allPartners.length },
    { id: 'notifications' as Section, label: 'Live Notifications', icon: Bell, badge: unreadNotifications, alert: unreadNotifications > 0 },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-gray-900 text-white flex-shrink-0 flex flex-col border-r border-gray-800">
        {/* Brand & Role Switcher */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md">
              🐾
            </div>
            <div>
              <div className="font-bold text-lg text-white leading-tight">PawLink Hub</div>
              <div className="text-xs text-gray-400">Coordination Dashboard</div>
            </div>
          </div>

          {/* Role selector */}
          <div className="bg-gray-800/80 rounded-xl p-3 border border-gray-700/60">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Simulated Persona</span>
              <Shield size={12} className="text-green-400" />
            </div>
            <select
              value={state.currentRole}
              onChange={(e) => {
                dispatch({ type: 'SET_ROLE', payload: e.target.value as any });
                showToast(`Switched perspective to ${roleConfig[e.target.value as keyof typeof roleConfig].label}`, 'info');
              }}
              aria-label="Simulated Persona Role"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm font-medium text-white focus:outline-none focus:border-green-500"
            >
              <option value="admin">Platform Admin (Full View)</option>
              <option value="rescue">Rescue Team (HART Miyapur)</option>
              <option value="shelter">Animal Shelter Staff</option>
              <option value="vet">Veterinarian (Dr. Priya Sharma)</option>
              <option value="user">General Public / Citizen</option>
            </select>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${roleConfig[state.currentRole].color}`}>
                Active: {roleConfig[state.currentRole].label}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? 'bg-green-700 text-white shadow-sm' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={active ? 'text-white' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    item.alert 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : active 
                        ? 'bg-green-800 text-green-100' 
                        : 'bg-gray-800 text-gray-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Presentation Seed Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleSeedDemoData}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors border border-gray-700"
          >
            <RefreshCw size={14} className="text-green-400" />
            Load Presentation Samples
          </button>
          <div className="text-[11px] text-gray-500 text-center mt-2">
            Prototype Demo • LocalStorage Synced
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-2.5">
              {activeSection === 'overview' && 'Central Coordination Hub'}
              {activeSection === 'emergency' && 'Emergency Dispatch & Rescue Tracking'}
              {activeSection === 'adoption' && 'Adoption Requests & Inquiries'}
              {activeSection === 'vet' && 'Tele-Veterinary Consultations'}
              {activeSection === 'partners' && 'Registered Network Partners'}
              {activeSection === 'notifications' && 'System Activity Log & Alerts'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {state.currentRole === 'admin' && 'Viewing multi-stakeholder system telemetry and all operational queues.'}
              {state.currentRole === 'rescue' && 'Filtered to Hyderabad Animal Rescue Team (Miyapur Dispatch Center).'}
              {state.currentRole === 'shelter' && 'Filtered to shelter capacity, foster requests, and intake.'}
              {state.currentRole === 'vet' && 'Filtered to upcoming appointments and clinical telemetry.'}
              {state.currentRole === 'user' && 'Citizen portal view for requests and follow-ups.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:inline">Hyderabad Sector 4</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Network Active
            </span>
          </div>
        </div>

        {/* ─── SECTION: OVERVIEW ─── */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div 
                onClick={() => setActiveSection('emergency')} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Emergencies</span>
                  <div className="w-9 h-9 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle size={20} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{state.emergencyReports.length}</div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span className="text-red-600 font-semibold">{activeRescues} active</span> cases
                </div>
              </div>

              <div 
                onClick={() => setActiveSection('emergency')} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">In Progress</span>
                  <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock size={20} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{activeRescues}</div>
                <div className="text-xs text-gray-500 mt-1">Dispatched rescue crews</div>
              </div>

              <div 
                onClick={() => setActiveSection('adoption')} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Adoptions</span>
                  <div className="w-9 h-9 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart size={20} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{state.adoptionApplications.length}</div>
                <div className="text-xs text-gray-500 mt-1">Submitted applications</div>
              </div>

              <div 
                onClick={() => setActiveSection('vet')} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Vet Telehealth</span>
                  <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar size={20} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{state.vetAppointments.length}</div>
                <div className="text-xs text-gray-500 mt-1">Booked consultations</div>
              </div>

              <div 
                onClick={() => setActiveSection('partners')} 
                className="bg-white p-5 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Connected Orgs</span>
                  <div className="w-9 h-9 bg-green-50 text-green-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={20} />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{state.connections.length} / 12</div>
                <div className="text-xs text-gray-500 mt-1">Network nodes linked</div>
              </div>
            </div>

            {/* Role specific callout */}
            <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-2xl p-6 text-white shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-block bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-semibold mb-2">
                    {roleConfig[state.currentRole].label} Workflow
                  </div>
                  <h3 className="text-lg font-bold">
                    {state.currentRole === 'rescue' && 'Rescue Team Dispatch Terminal'}
                    {state.currentRole === 'shelter' && 'Adoption Intake and Capacity Manager'}
                    {state.currentRole === 'vet' && 'Veterinary Video & Prescription Terminal'}
                    {state.currentRole === 'admin' && 'Unified Citywide Rescue Operations Desk'}
                    {state.currentRole === 'user' && 'My Active Inquiries & Reports'}
                  </h3>
                  <p className="text-green-100 text-xs sm:text-sm max-w-2xl mt-1">
                    {state.currentRole === 'rescue' && 'Incoming emergency reports near Miyapur are routed directly here. Accept new distress calls and advance rescue status in real-time.'}
                    {state.currentRole === 'shelter' && 'Review adoption applicant screening questionnaires, verify home environment, and coordinate meet-and-greets.'}
                    {state.currentRole === 'vet' && 'Start one-on-one video calls with pet owners, view problem statements, and conduct tele-triage.'}
                    {state.currentRole === 'admin' && 'Full visibility over rescue teams, vet network, shelter capacities, and live emergency response times.'}
                    {state.currentRole === 'user' && 'Track the emergency you reported or see status updates on your adoption / veterinary applications.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveSection(state.currentRole === 'vet' ? 'vet' : state.currentRole === 'shelter' ? 'adoption' : 'emergency')}
                  className="bg-white text-green-900 hover:bg-green-50 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm transition-all"
                >
                  Open Role Tasks &rarr;
                </button>
              </div>
            </div>

            {/* Two column: Recent Emergencies & Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Emergency Reports */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                    <AlertCircle size={18} className="text-red-500" />
                    Recent Emergency Reports
                  </h3>
                  <button 
                    onClick={() => setActiveSection('emergency')}
                    className="text-xs font-semibold text-green-700 hover:underline flex items-center gap-1"
                  >
                    View all ({state.emergencyReports.length})
                  </button>
                </div>

                {state.emergencyReports.length === 0 ? (
                  <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-gray-200">
                    <AlertCircle size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-semibold text-gray-600">No emergency reports submitted yet</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                      Submit a distress report from the Emergency page or click below to populate prototype demo data.
                    </p>
                    <button
                      onClick={handleSeedDemoData}
                      className="mt-3 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                    >
                      Insert Demo Distress Report
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {state.emergencyReports.slice(0, 4).map((report) => (
                      <div 
                        key={report.id} 
                        className="p-3.5 rounded-xl border border-gray-100 bg-stone-50/60 hover:bg-stone-50 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0 ${
                            report.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                            report.severity === 'Urgent' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {report.severity}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-gray-900 truncate">
                              {report.animalType} — {report.emergencyType}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1">
                                <MapPin size={11} /> {report.area}
                              </span>
                              <span>•</span>
                              <span className="truncate">{report.assignedTeam}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            report.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                            report.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity / Notification Feed */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                    <Bell size={18} className="text-green-600" />
                    Live Activity Stream
                  </h3>
                  <button 
                    onClick={() => setActiveSection('notifications')}
                    className="text-xs font-semibold text-green-700 hover:underline"
                  >
                    All Alerts
                  </button>
                </div>

                {state.notifications.length === 0 ? (
                  <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-gray-200">
                    <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-semibold text-gray-600">No activity yet</p>
                    <p className="text-xs text-gray-400 mt-1">Actions taken across PawLink trigger instant notifications here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {state.notifications.slice(0, 5).map((n) => (
                      <div 
                        key={n.id}
                        className={`p-3 rounded-xl border transition-colors flex items-start gap-3 ${
                          n.read ? 'bg-stone-50/50 border-gray-100 text-gray-600' : 'bg-green-50/40 border-green-200 text-gray-900 font-medium'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {n.type === 'emergency' && <AlertCircle size={14} className="text-red-500" />}
                          {n.type === 'adoption' && <Heart size={14} className="text-pink-500" />}
                          {n.type === 'consultation' && <Calendar size={14} className="text-blue-500" />}
                          {n.type === 'status-update' && <CheckCircle size={14} className="text-green-600" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-gray-900">{n.title}</div>
                          <div className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.message}</div>
                          <div className="text-[10px] text-gray-400 mt-1">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── SECTION: EMERGENCY REPORTS ─── */}
        {activeSection === 'emergency' && (
          <div className="space-y-6 animate-fade-in">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Filter status:</span>
                {['all', 'submitted', 'assigned', 'in-progress', 'resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                      filterStatus === st 
                        ? 'bg-green-700 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSeedDemoData}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
              >
                <AlertCircle size={14} />
                + Add Demo Emergency
              </button>
            </div>

            {state.emergencyReports.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <AlertCircle size={48} className="mx-auto text-red-300 mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Emergency Reports Found</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  When a citizen reports an injured animal via the Emergency Rescue page, the case and its dynamically assigned rescue team appear right here.
                </p>
                <button
                  onClick={handleSeedDemoData}
                  className="mt-5 btn-primary text-sm inline-flex items-center gap-2"
                >
                  Generate Sample Emergency Report
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {state.emergencyReports
                  .filter(r => filterStatus === 'all' || r.status === filterStatus)
                  .map((report) => (
                    <div 
                      key={report.id}
                      className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-11 h-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                            🚨
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-base font-bold text-gray-900">{report.reportId}</span>
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                                report.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                report.severity === 'Urgent' ? 'bg-amber-100 text-amber-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {report.severity} Priority
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(report.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 font-semibold mt-0.5">
                              {report.animalType} • {report.emergencyType}
                            </div>
                          </div>
                        </div>

                        {/* Status tracker badge */}
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800 border border-green-200' :
                            report.status === 'in-progress' ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse' :
                            report.status === 'assigned' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            {report.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-xs text-gray-600">
                        <div>
                          <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Location & Landmark</div>
                          <div className="font-semibold text-gray-800 mt-1 flex items-start gap-1">
                            <MapPin size={13} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{report.address || report.area}, {report.location}</span>
                          </div>
                          <div className="text-gray-400 mt-0.5">Estimated proximity: {report.distance} km</div>
                        </div>

                        <div>
                          <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Assigned Rescue Unit</div>
                          <div className="font-semibold text-gray-800 mt-1 flex items-center gap-1">
                            <Shield size={13} className="text-green-600 flex-shrink-0" />
                            <span>{report.assignedTeam}</span>
                          </div>
                          <div className="text-green-700 font-medium mt-0.5">Automated Distance Match</div>
                        </div>

                        <div>
                          <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">Reporting Citizen</div>
                          <div className="font-semibold text-gray-800 mt-1 flex items-center gap-1">
                            <Users size={13} className="text-blue-500 flex-shrink-0" />
                            <span>{report.contactName}</span>
                          </div>
                          <div className="text-gray-500 mt-0.5">{report.contactPhone}</div>
                        </div>
                      </div>

                      {/* Description statement */}
                      {report.description && (
                        <div className="bg-stone-50 p-3 rounded-xl text-xs text-gray-700 mb-4 border border-gray-100">
                          <span className="font-semibold text-gray-900">Incident Report: </span>
                          {report.description}
                        </div>
                      )}

                      {/* Action buttons to update status */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-400 font-medium">
                          Update case state for presentation workflow:
                        </div>
                        <div className="flex items-center gap-2">
                          {report.status === 'submitted' && (
                            <button
                              onClick={() => handleStatusUpdate(report.id, 'assigned')}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                            >
                              Accept Case &rarr; Assigned
                            </button>
                          )}
                          {(report.status === 'submitted' || report.status === 'assigned') && (
                            <button
                              onClick={() => handleStatusUpdate(report.id, 'in-progress')}
                              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shadow-xs"
                            >
                              Dispatch Team &rarr; In Progress
                            </button>
                          )}
                          {report.status !== 'resolved' && (
                            <button
                              onClick={() => handleStatusUpdate(report.id, 'resolved')}
                              className="px-3.5 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                            >
                              <Check size={13} />
                              Mark Resolved
                            </button>
                          )}
                          {report.status === 'resolved' && (
                            <button
                              onClick={() => handleStatusUpdate(report.id, 'in-progress')}
                              className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
                            >
                              Re-open Case
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SECTION: ADOPTION APPLICATIONS ─── */}
        {activeSection === 'adoption' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm font-semibold text-gray-800">
                Adoption Requests ({state.adoptionApplications.length})
              </div>
              <button
                onClick={handleSeedDemoData}
                className="text-xs bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              >
                <Heart size={14} /> + Demo Application
              </button>
            </div>

            {state.adoptionApplications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <Heart size={48} className="mx-auto text-pink-300 mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Adoption Inquiries Yet</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  When a prospective pet parent applies for an animal via the Adoption portal, their background and questionnaire appear here for review.
                </p>
                <button
                  onClick={handleSeedDemoData}
                  className="mt-5 btn-primary text-sm inline-flex items-center gap-2"
                >
                  Generate Sample Application
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.adoptionApplications.map((app) => (
                  <div key={app.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                          Adoption Inquiry
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 mt-0.5">
                          Applying for: <span className="text-green-800">{app.animalName}</span> ({app.animalSpecies})
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold capitalize bg-amber-100 text-amber-800">
                        {app.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-gray-600 bg-stone-50 p-3.5 rounded-xl border border-gray-100">
                      <div><span className="font-semibold text-gray-900">Applicant:</span> {app.applicantName}</div>
                      <div><span className="font-semibold text-gray-900">Phone:</span> {app.phone}</div>
                      <div><span className="font-semibold text-gray-900">Email:</span> {app.email}</div>
                      <div><span className="font-semibold text-gray-900">Living Setup:</span> {app.livingSituation}</div>
                      <div><span className="font-semibold text-gray-900">Experience:</span> {app.previousPets}</div>
                      <div className="mt-2 text-gray-700 italic border-t border-gray-200 pt-2">
                        "{app.reason}"
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2">
                      <span className="text-gray-400">
                        Submitted: {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => showToast(`Application for ${app.animalName} marked as Approved!`, 'success')}
                          className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => showToast(`Application for ${app.animalName} set to Interview call.`, 'info')}
                          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                        >
                          Schedule Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SECTION: VET CONSULTATIONS ─── */}
        {activeSection === 'vet' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm font-semibold text-gray-800">
                Online Tele-Vet Appointments ({state.vetAppointments.length})
              </div>
              <button
                onClick={handleSeedDemoData}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors"
              >
                <Calendar size={14} /> + Demo Appointment
              </button>
            </div>

            {state.vetAppointments.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <Stethoscope size={48} className="mx-auto text-blue-300 mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Veterinary Appointments Booked</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Book an affordable online tele-consultation (₹99 - ₹199) from the Vet Consultation page to test the real-time scheduling queue.
                </p>
                <button
                  onClick={handleSeedDemoData}
                  className="mt-5 btn-primary text-sm inline-flex items-center gap-2"
                >
                  Generate Sample Consultation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.vetAppointments.map((app) => (
                  <div key={app.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-blue-600">{app.bookingId}</div>
                        <h4 className="text-base font-bold text-gray-900 mt-0.5">
                          {app.vetName}
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 capitalize">
                        {app.status}
                      </span>
                    </div>

                    <div className="p-3.5 bg-stone-50 rounded-xl space-y-2 text-xs text-gray-600 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">Patient:</span>
                        <span>{app.animalName} ({app.animalSpecies}, {app.animalAge})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">Guardian:</span>
                        <span>{app.ownerName} ({app.phone})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">Schedule:</span>
                        <span className="font-medium text-gray-900">{app.date} at {app.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800">Fee Paid:</span>
                        <span className="font-bold text-green-700">₹{app.fee}</span>
                      </div>
                      {app.problem && (
                        <div className="border-t border-gray-200 pt-2 text-gray-700">
                          <span className="font-semibold">Reported Issue: </span>
                          {app.problem}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-400">Video consultation ready</span>
                      <button 
                        onClick={() => {
                          showToast('Launching video consultation suite...', 'info');
                          window.location.href = '/vet-consultation';
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Video size={13} />
                        Join Call Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SECTION: PARTNER ORGANIZATIONS ─── */}
        {activeSection === 'partners' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Registered Institutional Partners (12)</h3>
                <p className="text-xs text-gray-500 mt-0.5">Shelters, specialized vet hospitals, and rapid animal rescue forces in Hyderabad.</p>
              </div>
              <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-50 text-green-800 border border-green-200">
                Connected Nodes: {state.connections.length} / 12
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPartners.map((org) => {
                const isConnected = state.connections.includes(org.id);
                return (
                  <div key={org.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-gray-700">
                          {org.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          org.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {org.availability}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{org.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={11} className="text-red-500" />
                        {org.location}, {org.city}
                      </p>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                        {org.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">★ {org.rating}</span>
                      <button
                        onClick={() => {
                          if (!isConnected) {
                            dispatch({ type: 'ADD_CONNECTION', payload: org.id });
                            showToast(`Connected with ${org.name}!`, 'success');
                          }
                        }}
                        disabled={isConnected}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          isConnected 
                            ? 'bg-green-50 text-green-700 border border-green-200 cursor-default' 
                            : 'bg-green-700 hover:bg-green-800 text-white shadow-xs'
                        }`}
                      >
                        {isConnected ? '✓ Linked' : '+ Link Org'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── SECTION: NOTIFICATIONS ─── */}
        {activeSection === 'notifications' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-800">Live Alerts ({state.notifications.length})</span>
                <span className="text-xs text-gray-400 ml-2">({unreadNotifications} unread)</span>
              </div>
              {state.notifications.length > 0 && (
                <button
                  onClick={() => {
                    dispatch({ type: 'MARK_ALL_READ' });
                    showToast('All notifications marked as read', 'info');
                  }}
                  className="text-xs text-green-700 hover:underline font-semibold"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {state.notifications.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <Bell size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-base font-bold text-gray-800">No Notifications</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Platform alerts generated from emergency distress submissions, bookings, and adoption requests will appear here in chronological order.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {state.notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id })}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      n.read 
                        ? 'bg-white border-gray-200 text-gray-600' 
                        : 'bg-green-50/50 border-green-300 text-gray-900 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {n.type === 'emergency' && <AlertCircle size={18} className="text-red-500" />}
                        {n.type === 'adoption' && <Heart size={18} className="text-pink-500" />}
                        {n.type === 'consultation' && <Calendar size={18} className="text-blue-500" />}
                        {n.type === 'status-update' && <CheckCircle size={18} className="text-green-600" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</div>
                        <div className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(n.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {!n.read && (
                      <span className="w-2.5 h-2.5 rounded-full bg-green-600 flex-shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
