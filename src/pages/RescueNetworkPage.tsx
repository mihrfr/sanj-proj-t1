import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Phone,
  Star,
  Shield,
  Home,
  Stethoscope,
  Users,
  CheckCircle,
  X,
  ChevronRight,
  Wifi,
  Clock,
  Mail,
  ArrowRight,
  Network,
} from 'lucide-react';
import { RESCUE_TEAMS, SHELTERS, VET_CLINICS } from '../data/demoData';
import { useApp } from '../context/AppContext';
import { showToast } from '../components/Toast';

// ─── Types ────────────────────────────────────────────────────────────────────

type OrgType = 'rescue' | 'shelter' | 'vet';
type Availability = 'available' | 'busy' | 'limited';

interface Organization {
  id: string;
  name: string;
  type: OrgType;
  location: string;
  city: string;
  phone: string;
  email: string;
  services: string[];
  availability: Availability;
  rating: number;
  ratingCount: number;
  description: string;
  image: string;
}

type FilterType = 'all' | OrgType;
type FilterAvail = 'all' | Availability;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALL_ORGS: Organization[] = [
  ...(RESCUE_TEAMS as Organization[]),
  ...(SHELTERS as Organization[]),
  ...(VET_CLINICS as Organization[]),
];

const TYPE_LABEL: Record<OrgType, string> = {
  rescue: 'Rescue Team',
  shelter: 'Shelter',
  vet: 'Vet Clinic',
};

const TYPE_COLOR: Record<OrgType, string> = {
  rescue: 'bg-orange-100 text-orange-700 border border-orange-200',
  shelter: 'bg-purple-100 text-purple-700 border border-purple-200',
  vet: 'bg-blue-100 text-blue-700 border border-blue-200',
};

const TYPE_ICON: Record<OrgType, React.ReactNode> = {
  rescue: <Shield size={12} />,
  shelter: <Home size={12} />,
  vet: <Stethoscope size={12} />,
};

const AVAIL_CONFIG: Record<
  Availability,
  { label: string; dot: string; badge: string }
> = {
  available: {
    label: 'Available',
    dot: 'bg-green-500',
    badge: 'bg-green-50 text-green-700 border border-green-200',
  },
  busy: {
    label: 'Busy',
    dot: 'bg-yellow-500',
    badge: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  limited: {
    label: 'Limited',
    dot: 'bg-orange-500',
    badge: 'bg-orange-50 text-orange-700 border border-orange-200',
  },
};

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < full
              ? 'fill-amber-400 text-amber-400'
              : half && i === full
              ? 'fill-amber-200 text-amber-400'
              : 'fill-gray-100 text-gray-300'
          }
        />
      ))}
      <span className="text-xs text-gray-500 ml-0.5">
        {rating} ({count})
      </span>
    </span>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function OrgModal({
  org,
  connected,
  onConnect,
  onClose,
}: {
  org: Organization;
  connected: boolean;
  onConnect: () => void;
  onClose: () => void;
}) {
  const avail = AVAIL_CONFIG[org.availability];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={org.image}
            alt={org.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
          >
            <X size={16} className="text-gray-700" />
          </button>
          {/* Badges on image */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${TYPE_COLOR[org.type]}`}
            >
              {TYPE_ICON[org.type]}
              {TYPE_LABEL[org.type]}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${avail.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
              {avail.label}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{org.name}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
              <MapPin size={14} />
              {org.location}, {org.city}
            </div>
            <div className="mt-2">
              <StarRating rating={org.rating} count={org.ratingCount} />
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{org.description}</p>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Services
            </p>
            <div className="flex flex-wrap gap-2">
              {org.services.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-full px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href={`tel:${org.phone}`}
              className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 transition-colors"
            >
              <Phone size={14} className="text-teal-600 flex-shrink-0" />
              <span className="truncate">{org.phone}</span>
            </a>
            <a
              href={`mailto:${org.email}`}
              className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2.5 transition-colors"
            >
              <Mail size={14} className="text-teal-600 flex-shrink-0" />
              <span className="truncate">{org.email}</span>
            </a>
          </div>

          <div className="pt-2">
            {connected ? (
              <div className="flex items-center justify-center gap-2 py-3 bg-green-50 border border-green-200 rounded-2xl text-green-700 font-semibold text-sm">
                <CheckCircle size={16} />
                Connected
              </div>
            ) : (
              <button
                onClick={() => {
                  onConnect();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all shadow-sm hover:shadow-md"
              >
                <Network size={16} />
                Connect with {TYPE_LABEL[org.type]}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Org Card ─────────────────────────────────────────────────────────────────

function OrgCard({
  org,
  connected,
  onConnect,
  onViewDetails,
}: {
  org: Organization;
  connected: boolean;
  onConnect: () => void;
  onViewDetails: () => void;
}) {
  const avail = AVAIL_CONFIG[org.availability];

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-200 flex flex-col group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={org.image}
          alt={org.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Availability badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${avail.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${avail.dot} animate-pulse`} />
            {avail.label}
          </span>
        </div>

        {/* Type badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${TYPE_COLOR[org.type]}`}
          >
            {TYPE_ICON[org.type]}
            {TYPE_LABEL[org.type]}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2">
            {org.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-gray-500 text-sm">
            <MapPin size={13} className="flex-shrink-0" />
            <span className="truncate">{org.location}, {org.city}</span>
          </div>
          <div className="mt-2">
            <StarRating rating={org.rating} count={org.ratingCount} />
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {org.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs bg-gray-50 border border-gray-100 text-gray-600 rounded-full px-2.5 py-0.5"
            >
              {s}
            </span>
          ))}
          {org.services.length > 3 && (
            <span className="text-xs text-gray-400 self-center">
              +{org.services.length - 3} more
            </span>
          )}
        </div>

        {/* Phone */}
        <a
          href={`tel:${org.phone}`}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600 transition-colors"
        >
          <Phone size={13} className="text-teal-500 flex-shrink-0" />
          {org.phone}
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <button
            onClick={onViewDetails}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-2 transition-colors"
          >
            View Details
            <ChevronRight size={14} />
          </button>

          {connected ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <CheckCircle size={14} />
              Connected
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 rounded-xl py-2 transition-all shadow-sm"
            >
              <Network size={14} />
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Network Flow Diagram ─────────────────────────────────────────────────────

const FLOW_STEPS = [
  {
    icon: <Users size={22} className="text-teal-600" />,
    label: 'Person Reports',
    sub: 'You submit an incident',
    color: 'bg-teal-50 border-teal-200',
    text: 'text-teal-700',
  },
  {
    icon: <Network size={22} className="text-indigo-600" />,
    label: 'PawLink Central',
    sub: 'AI triages & routes',
    color: 'bg-indigo-50 border-indigo-200',
    text: 'text-indigo-700',
  },
  {
    icon: <Shield size={22} className="text-orange-600" />,
    label: 'Nearest Rescue Team',
    sub: 'Dispatched immediately',
    color: 'bg-orange-50 border-orange-200',
    text: 'text-orange-700',
  },
  {
    icon: <Stethoscope size={22} className="text-blue-600" />,
    label: 'Partner Vet Clinic',
    sub: 'Medical care ready',
    color: 'bg-blue-50 border-blue-200',
    text: 'text-blue-700',
  },
  {
    icon: <Home size={22} className="text-purple-600" />,
    label: 'Animal Shelter',
    sub: 'Recovery & adoption',
    color: 'bg-purple-50 border-purple-200',
    text: 'text-purple-700',
  },
];

function NetworkFlow() {
  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-200 mb-3">
          <Wifi size={12} />
          Live Network
        </span>
        <h2 className="text-2xl font-bold text-gray-900">How Our Network Connects</h2>
        <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
          Every rescue follows a seamless, coordinated pathway — from your report to the
          animal's recovery.
        </p>
      </div>

      {/* Flow — horizontal on md+, vertical on mobile */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {FLOW_STEPS.map((step, i) => (
          <React.Fragment key={step.label}>
            {/* Step box */}
            <div
              className={`flex flex-col items-center text-center border-2 rounded-2xl px-5 py-4 w-full md:w-36 shadow-sm ${step.color}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white shadow-sm mb-2`}>
                {step.icon}
              </div>
              <p className={`text-sm font-bold leading-snug ${step.text}`}>{step.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{step.sub}</p>
            </div>

            {/* Arrow between steps */}
            {i < FLOW_STEPS.length - 1 && (
              <div className="flex items-center justify-center text-gray-400">
                <ArrowRight
                  size={20}
                  className="hidden md:block"
                />
                {/* Vertical arrow on mobile */}
                <svg
                  className="block md:hidden"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
        {[
          { value: '< 15 min', label: 'Avg. Response Time', icon: <Clock size={16} className="text-teal-500" /> },
          { value: '12+', label: 'Partner Organizations', icon: <Network size={16} className="text-indigo-500" /> },
          { value: '98%', label: 'Success Rate', icon: <CheckCircle size={16} className="text-green-500" /> },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TYPE_FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Shelters', value: 'shelter' },
  { label: 'Rescue Teams', value: 'rescue' },
  { label: 'Vet Clinics', value: 'vet' },
];

const AVAIL_FILTERS: { label: string; value: FilterAvail }[] = [
  { label: 'Any Status', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Busy', value: 'busy' },
  { label: 'Limited', value: 'limited' },
];

export default function RescueNetworkPage() {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [availFilter, setAvailFilter] = useState<FilterAvail>('all');
  const [modalOrg, setModalOrg] = useState<Organization | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_ORGS.filter((org) => {
      const matchSearch =
        !q ||
        org.name.toLowerCase().includes(q) ||
        org.location.toLowerCase().includes(q) ||
        org.city.toLowerCase().includes(q);
      const matchType = typeFilter === 'all' || org.type === typeFilter;
      const matchAvail = availFilter === 'all' || org.availability === availFilter;
      return matchSearch && matchType && matchAvail;
    });
  }, [search, typeFilter, availFilter]);

  function handleConnect(org: Organization) {
    if (state.connections.includes(org.id)) return;
    dispatch({ type: 'ADD_CONNECTION', payload: org.id });
    showToast(`Connected with ${org.name}!`, 'success');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Header ── */}
      <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <Network size={14} />
            Rescue Network
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            One Network.{' '}
            <span className="text-yellow-300">Thousands of Helping Hands.</span>
          </h1>
          <p className="mt-4 text-teal-100 text-lg max-w-2xl mx-auto">
            Discover shelters, rescue teams, and veterinary clinics across Hyderabad — all
            working together so no animal is left behind.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { n: RESCUE_TEAMS.length, label: 'Rescue Teams' },
              { n: SHELTERS.length, label: 'Shelters' },
              { n: VET_CLINICS.length, label: 'Vet Clinics' },
              { n: state.connections.length, label: 'Your Connections' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black">{s.n}</p>
                <p className="text-teal-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />
          </div>

          {/* Availability filter */}
          <select
            value={availFilter}
            onChange={(e) => setAvailFilter(e.target.value as FilterAvail)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
          >
            {AVAIL_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Type Filter Tabs ── */}
      <div className="max-w-6xl mx-auto px-4 mt-5">
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                typeFilter === f.value
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto self-center text-sm text-gray-400">
            {filtered.length} organization{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="max-w-6xl mx-auto px-4 mt-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No organizations found</h3>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search term.</p>
            <button
              onClick={() => { setSearch(''); setTypeFilter('all'); setAvailFilter('all'); }}
              className="mt-4 text-sm text-teal-600 font-semibold underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((org) => (
              <OrgCard
                key={org.id}
                org={org}
                connected={state.connections.includes(org.id)}
                onConnect={() => handleConnect(org)}
                onViewDetails={() => setModalOrg(org)}
              />
            ))}
          </div>
        )}

        {/* ── Network Flow ── */}
        <div className="mt-14">
          <NetworkFlow />
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {modalOrg && (
        <OrgModal
          org={modalOrg}
          connected={state.connections.includes(modalOrg.id)}
          onConnect={() => handleConnect(modalOrg)}
          onClose={() => setModalOrg(null)}
        />
      )}
    </div>
  );
}
