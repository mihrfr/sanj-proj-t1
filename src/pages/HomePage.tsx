import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Heart, Users, Stethoscope, PawPrint, ChevronRight } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AlertCircle size={28} className="text-red-500" />,
      iconBg: 'bg-red-50',
      title: 'Emergency Rescue',
      description: 'Found an injured or abandoned animal? Report it instantly and connect with the nearest available rescue team.',
      link: '/emergency',
      linkText: 'Report Emergency',
      color: 'border-red-200 hover:border-red-300'
    },
    {
      icon: <Users size={28} className="text-green-600" />,
      iconBg: 'bg-green-50',
      title: 'Rescue Network',
      description: 'Bringing animal shelters, rescue organizations, and veterinary clinics together under one platform.',
      link: '/rescue-network',
      linkText: 'View Network',
      color: 'border-green-200 hover:border-green-300'
    },
    {
      icon: <Heart size={28} className="text-pink-500" />,
      iconBg: 'bg-pink-50',
      title: 'Animal Adoption',
      description: 'Give abandoned animals a loving home. Explore animals waiting to be adopted in Hyderabad.',
      link: '/adoption',
      linkText: 'Find a Pet',
      color: 'border-pink-200 hover:border-pink-300'
    },
    {
      icon: <Stethoscope size={28} className="text-blue-500" />,
      iconBg: 'bg-blue-50',
      title: 'Online Vet Consultation',
      description: 'Get professional veterinary advice through affordable online consultations from ₹99.',
      link: '/vet-consultation',
      linkText: 'Book Consultation',
      color: 'border-blue-200 hover:border-blue-300'
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Report',
      desc: 'A person reports an injured animal or requests help through the PawLink platform.',
      color: 'text-red-600 bg-red-50'
    },
    {
      num: '02',
      title: 'Connect',
      desc: 'PawLink connects the request to the nearest rescue organization or veterinarian.',
      color: 'text-green-700 bg-green-50'
    },
    {
      num: '03',
      title: 'Care',
      desc: 'The animal receives appropriate attention, medical care, and a safe place to recover.',
      color: 'text-blue-600 bg-blue-50'
    },
  ];

  const stats = [
    { label: 'Animals Helped', value: 1250, suffix: '+' },
    { label: 'Partner Shelters', value: 45, suffix: '+' },
    { label: 'Veterinary Professionals', value: 30, suffix: '+' },
    { label: 'Successful Adoptions', value: 800, suffix: '+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=900&fit=crop"
            alt="Animals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-800/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <PawPrint size={14} className="text-green-300" />
              <span className="text-white/90 text-sm font-medium">Animal Welfare & Rescue Platform</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Every Life Deserves a{' '}
              <span className="text-green-300">Helping Hand.</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Connecting animal rescuers, shelters, and veterinarians to build a safer world for animals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/emergency')}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                <AlertCircle size={20} />
                Report an Emergency
              </button>
              <button
                onClick={() => navigate('/adoption')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-7 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                <Heart size={20} />
                Explore Adoption
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What PawLink Offers</h2>
            <p className="text-gray-500 max-w-xl mx-auto">One platform connecting every part of the animal welfare ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 ${f.color} p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
              >
                <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{f.description}</p>
                <Link
                  to={f.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 group-hover:gap-2 transition-all"
                >
                  {f.linkText} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How PawLink Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A simple three-step process that connects animals in need with the right help.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector lines on desktop */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-green-200 to-green-200 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                  <span className="text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={24} className="hidden md:block absolute -right-4 top-8 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-green-300 text-sm font-semibold uppercase tracking-wider mb-2">Platform Impact</p>
            <h2 className="text-3xl font-bold text-white">Making a Difference Together</h2>
            <p className="text-green-300/80 text-sm mt-2">*Illustrative statistics for demonstration purposes</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-green-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rescue Network Preview */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Our Network</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                One Network.<br />Thousands of Helping Hands.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                PawLink brings together rescue teams, animal shelters, and veterinary clinics across Hyderabad into one seamless coordination platform. When an animal needs help, the right people are always a click away.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center bg-white rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-700 mb-1">4+</div>
                  <div className="text-xs text-gray-500">Rescue Teams</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-700 mb-1">4+</div>
                  <div className="text-xs text-gray-500">Shelters</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-700 mb-1">4+</div>
                  <div className="text-xs text-gray-500">Vet Clinics</div>
                </div>
              </div>
              <Link to="/rescue-network" className="btn-primary inline-flex items-center gap-2">
                Explore the Network <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop"
                alt="Rescue network"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-green-700" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">12 Teams Active</div>
                  <div className="text-xs text-gray-500">Across Hyderabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/30 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-600/20 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Be the reason an animal gets a second chance.
              </h2>
              <p className="text-green-200 mb-8 max-w-lg mx-auto">
                Whether you're a rescue volunteer, a shelter, or a veterinarian — join PawLink and make a real difference.
              </p>
              <button
                onClick={() => navigate('/rescue-network')}
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center gap-2"
              >
                Join the PawLink Network <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
