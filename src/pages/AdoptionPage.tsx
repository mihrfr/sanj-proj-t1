import React, { useState } from 'react';
import { Heart, Filter, Search, X, CheckCircle, ChevronDown } from 'lucide-react';
import { ANIMALS_FOR_ADOPTION } from '../data/demoData';
import { useApp } from '../context/AppContext';
import type { AdoptionApplication } from '../context/AppContext';
import { showToast } from '../components/Toast';

// ─── Types ───────────────────────────────────────────────────────────────────

type SpeciesFilter = 'All' | 'Dog' | 'Cat' | 'Bird' | 'Other';
type GenderFilter = 'All' | 'Male' | 'Female';
type TabType = 'adopt' | 'eol';

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  location: string;
  description: string;
  health: string;
  personality: string[];
  status: string;
  shelter: string;
  image: string;
}

// ─── Adoption Application Modal ───────────────────────────────────────────────

interface AdoptionModalProps {
  animal: Animal;
  onClose: () => void;
}

function AdoptionModal({ animal, onClose }: AdoptionModalProps) {
  const { dispatch } = useApp();

  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [livingSituation, setLivingSituation] = useState('House with garden');
  const [previousPets, setPreviousPets] = useState('First time');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!applicantName.trim()) errs.applicantName = 'Name is required.';
    if (!phone.trim()) errs.phone = 'Phone is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email.';
    if (!reason.trim()) errs.reason = 'Please describe your reason for adopting.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const application: AdoptionApplication = {
      id: Date.now().toString(),
      animalId: animal.id,
      animalName: animal.name,
      animalSpecies: animal.species,
      applicantName,
      phone,
      email,
      livingSituation,
      previousPets,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_ADOPTION_APPLICATION', payload: application });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString() + '-notif',
        type: 'adoption',
        title: 'New Adoption Application',
        message: `New adoption application for ${animal.name} from ${applicantName}`,
        read: false,
        createdAt: new Date().toISOString(),
      },
    });

    showToast("Application submitted! We'll contact you soon.", 'success');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Animal Profile Header */}
        <div className="relative">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-56 object-cover rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md transition-all"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {animal.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Animal Details */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{animal.name}</h2>
              <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
                {animal.species}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">{animal.breed} · {animal.age} · {animal.gender}</p>
            <p className="text-gray-500 text-sm mb-3">📍 {animal.location} — <span className="font-medium text-gray-700">{animal.shelter}</span></p>
            <p className="text-gray-700 leading-relaxed mb-4">{animal.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-2xl p-3">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Health</p>
                <p className="text-sm text-blue-900">{animal.health}</p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-3">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Personality</p>
                <div className="flex flex-wrap gap-1">
                  {animal.personality.map((tag) => (
                    <span key={tag} className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Adoption Application Form */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart size={20} className="text-orange-500" />
              Adoption Application
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Applicant Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Full name"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.applicantName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.applicantName && <p className="text-red-500 text-xs mt-1">{errors.applicantName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Living Situation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Living Situation</label>
                  <div className="relative">
                    <select
                      value={livingSituation}
                      onChange={(e) => setLivingSituation(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none bg-white transition"
                    >
                      <option>House with garden</option>
                      <option>Apartment</option>
                      <option>Farm</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Previous Pet Ownership */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Ownership Experience</label>
                  <div className="relative">
                    <select
                      value={previousPets}
                      onChange={(e) => setPreviousPets(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none bg-white transition"
                    >
                      <option>First time</option>
                      <option>Some experience</option>
                      <option>Experienced owner</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Adoption <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={`Tell us why you'd love to adopt ${animal.name}...`}
                  rows={3}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none transition ${errors.reason ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Heart size={18} />
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EOL Assessment Modal ─────────────────────────────────────────────────────

interface EOLModalProps {
  onClose: () => void;
}

function EOLModal({ onClose }: EOLModalProps) {
  const [animalType, setAnimalType] = useState('Dog');
  const [animalAge, setAnimalAge] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [currentSituation, setCurrentSituation] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your request has been received. A veterinarian will contact you within 24 hours.', 'success');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-t-3xl p-6 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-purple-900">Request Veterinary Assessment</h2>
              <p className="text-purple-600 text-sm mt-1">A compassionate veterinarian will reach out within 24 hours.</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Animal Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
            <div className="relative">
              <select
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none bg-white transition"
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Other</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Animal Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Animal Age</label>
            <input
              type="text"
              value={animalAge}
              onChange={(e) => setAnimalAge(e.target.value)}
              placeholder="e.g. 10 years"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          {/* General Health Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">General Health Condition</label>
            <textarea
              value={healthCondition}
              onChange={(e) => setHealthCondition(e.target.value)}
              placeholder="Describe your animal's current health status, any diagnoses..."
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none transition"
            />
          </div>

          {/* Current Situation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Situation Description</label>
            <textarea
              value={currentSituation}
              onChange={(e) => setCurrentSituation(e.target.value)}
              placeholder="Describe what you are observing and what concerns you most..."
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+91 98765 00000"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Submit Assessment Request
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Animal Card ──────────────────────────────────────────────────────────────

interface AnimalCardProps {
  animal: Animal;
  onAdopt: (animal: Animal) => void;
}

function AnimalCard({ animal, onAdopt }: AnimalCardProps) {
  const shownTags = animal.personality.slice(0, 3);

  const speciesColor: Record<string, string> = {
    Dog: 'bg-amber-100 text-amber-700',
    Cat: 'bg-purple-100 text-purple-700',
    Bird: 'bg-sky-100 text-sky-700',
  };
  const badgeClass = speciesColor[animal.species] ?? 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
            {animal.species}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900">{animal.name}</h3>
          <Heart size={18} className="text-gray-300 group-hover:text-pink-400 transition-colors" />
        </div>
        <p className="text-sm text-gray-500 mb-1">{animal.breed}</p>
        <p className="text-xs text-gray-400 mb-2">
          {animal.age} · {animal.gender} · <span className="text-gray-500">📍 {animal.location}</span>
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {shownTags.map((tag) => (
            <span key={tag} className="text-xs bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onAdopt(animal)}
          className="mt-auto w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow hover:shadow-md transition-all text-sm flex items-center justify-center gap-2"
        >
          <Heart size={15} />
          Adopt Me
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdoptionPage() {
  const [activeTab, setActiveTab] = useState<TabType>('adopt');

  // Filters
  const [speciesFilter, setSpeciesFilter] = useState<SpeciesFilter>('All');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showEOLModal, setShowEOLModal] = useState(false);

  // Filtered animals
  const filteredAnimals = ANIMALS_FOR_ADOPTION.filter((animal) => {
    const matchesSpecies =
      speciesFilter === 'All' ||
      (speciesFilter === 'Other'
        ? !['Dog', 'Cat', 'Bird'].includes(animal.species)
        : animal.species === speciesFilter);
    const matchesGender = genderFilter === 'All' || animal.gender === genderFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      animal.name.toLowerCase().includes(q) ||
      animal.breed.toLowerCase().includes(q) ||
      animal.location.toLowerCase().includes(q) ||
      animal.species.toLowerCase().includes(q);
    return matchesSpecies && matchesGender && matchesSearch;
  });

  const speciesOptions: SpeciesFilter[] = ['All', 'Dog', 'Cat', 'Bird', 'Other'];
  const genderOptions: GenderFilter[] = ['All', 'Male', 'Female'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Tab Navigation ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 py-3">
          <button
            onClick={() => setActiveTab('adopt')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'adopt'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🐾 Adopt an Animal
          </button>
          <button
            onClick={() => setActiveTab('eol')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'eol'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🕊️ End-of-Life Care
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          TAB A — ADOPT AN ANIMAL
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'adopt' && (
        <div>
          {/* Hero */}
          <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-white py-14 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                <Heart size={16} className="fill-blue-500 text-blue-500" />
                Animals Looking for Homes
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Find Your New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Best Friend.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Give an abandoned animal the chance to experience a loving home.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, breed, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Species Filter */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter size={15} className="text-gray-400 hidden sm:block" />
                {speciesOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSpeciesFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      speciesFilter === opt
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Gender Filter */}
              <div className="flex items-center gap-2">
                {genderOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setGenderFilter(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      genderFilter === opt
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
            {filteredAnimals.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Showing <span className="font-semibold text-gray-700">{filteredAnimals.length}</span> animal{filteredAnimals.length !== 1 ? 's' : ''} available for adoption
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnimals.map((animal) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal as Animal}
                      onAdopt={setSelectedAnimal}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No animals found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                <button
                  onClick={() => { setSpeciesFilter('All'); setGenderFilter('All'); setSearchQuery(''); }}
                  className="mt-4 text-orange-500 hover:text-orange-600 text-sm font-semibold underline underline-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          TAB B — END-OF-LIFE CARE
      ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'eol' && (
        <div id="eol">
          {/* Hero */}
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-white py-14 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                🕊️ Compassionate Care
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
                Compassionate{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                  End-of-Life Care
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Every animal deserves dignity, comfort, and compassionate care. When an animal is suffering from a serious or terminal condition, veterinary professionals can help owners understand the available options.
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🩺</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Professional Veterinary Assessment</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A qualified veterinarian evaluates the animal's condition, pain levels, and quality of life.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Understanding Your Options</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Vets explain all available treatments, palliative care, and compassionate care options.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Support for Owners</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Guidance and emotional support for owners navigating this difficult decision.
                </p>
              </div>
            </div>

            {/* Important Disclaimer */}
            <div className="border border-amber-300 bg-amber-50 rounded-2xl p-6 mb-10 flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <h4 className="font-bold text-amber-800 mb-1">Important</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  End-of-life decisions are made exclusively by qualified veterinary professionals following a thorough assessment. Petopia connects you with experienced veterinarians who will guide you through available options compassionately and ethically.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                If you are concerned about your animal's quality of life, our network of compassionate veterinarians is here to help you navigate this journey.
              </p>
              <button
                onClick={() => setShowEOLModal(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-base"
              >
                <CheckCircle size={20} />
                Request a Veterinary Assessment
              </button>
              <p className="text-xs text-gray-400 mt-3">A veterinarian will respond within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {selectedAnimal && (
        <AdoptionModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} />
      )}
      {showEOLModal && (
        <EOLModal onClose={() => setShowEOLModal(false)} />
      )}
    </div>
  );
}
