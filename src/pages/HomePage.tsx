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
      icon: <Users size={28} className="text-blue-600" />,
      iconBg: 'bg-blue-50',
      title: 'Rescue Network',
      description: 'Bringing animal shelters, rescue organizations, and veterinary clinics together under one accessible platform.',
      link: '/rescue-network',
      linkText: 'View Network',
      color: 'border-blue-200 hover:border-blue-300'
    },
    {
      icon: <Heart size={28} className="text-pink-500" />,
      iconBg: 'bg-pink-50',
      title: 'Animal Adoption',
      description: 'Give abandoned animals a loving home. Explore dogs, cats, and birds waiting to be adopted in Hyderabad.',
      link: '/adoption',
      linkText: 'Find a Pet',
      color: 'border-pink-200 hover:border-pink-300'
    },
    {
      icon: <Stethoscope size={28} className="text-sky-600" />,
      iconBg: 'bg-sky-50',
      title: 'Online Vet Consultation',
      description: 'Get professional veterinary advice through affordable online consultations starting from just ₹99.',
      link: '/vet-consultation',
      linkText: 'Book Consultation',
      color: 'border-sky-200 hover:border-sky-300'
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Report',
      desc: 'A person reports an injured animal or requests emergency help through the Petopia platform.',
      color: 'text-red-600 bg-red-50'
    },
    {
      num: '02',
      title: 'Connect',
      desc: 'Petopia coordinates the request with the nearest rescue organization or verified veterinarian.',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      num: '03',
      title: 'Care',
      desc: 'The animal receives timely attention, professional medical care, and a safe sanctuary to recover.',
      color: 'text-sky-600 bg-sky-50'
    },
  ];

  const stats = [
    { label: 'Animals Helped', value: 1250, suffix: '+' },
    { label: 'Partner Shelters', value: 45, suffix: '+' },
    { label: 'Veterinary Professionals', value: 30, suffix: '+' },
    { label: 'Successful Adoptions', value: 800, suffix: '+' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image: Genuine real dog and cat sitting together outdoors */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1600&h=900&fit=crop"
            alt="Real pets dog and cat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
              <PawPrint size={15} className="text-sky-300" />
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                Petopia — Animal Welfare & Rescue Platform
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
              Every Life Deserves a{' '}
              <span className="text-sky-400">Helping Hand.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-10 max-w-xl font-normal">
              Connecting animal rescuers, shelters, and veterinarians across Hyderabad to build a safer, compassionate world for animals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/emergency')}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base"
              >
                <AlertCircle size={20} />
                Report an Emergency
              </button>
              <button
                onClick={() => navigate('/adoption')}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white px-7 py-4 rounded-xl font-semibold transition-all duration-200 text-base"
              >
                <Heart size={20} className="text-pink-300" />
                Explore Adoption
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Comprehensive Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-3">
              What Petopia Offers
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              A single unified technology platform connecting every stakeholder in animal welfare.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border-2 ${f.color} p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{f.description}</p>
                </div>
                <Link
                  to={f.link}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-2.5 transition-all"
                >
                  {f.linkText} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
              Simple 3-Step Coordination
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-3">
              How Petopia Works
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
              Connecting street animal distress calls directly with the closest active responders in minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-sky-200 to-blue-200 z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center bg-white p-4">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100`}>
                  <span className="text-2xl font-black">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={24} className="hidden md:block absolute -right-4 top-8 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mb-2">Platform Impact</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Making a Real Difference Together</h2>
            <p className="text-sky-200/80 text-xs sm:text-sm mt-2 font-medium">*Illustrative prototype metrics for academic demonstration</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sky-100 font-semibold text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rescue Network Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                Hyderabad Rescue Grid
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                One Central Network.<br />Hundreds of Rescue Hands.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-sm sm:text-base">
                Petopia unifies emergency rescue teams, community shelters, and veterinary clinics across Hyderabad into a single coordination platform. When an animal needs immediate attention, verified help is just seconds away.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center bg-white rounded-2xl p-4 shadow-xs border border-slate-200">
                  <div className="text-2xl font-black text-blue-600 mb-0.5">4+</div>
                  <div className="text-xs font-medium text-slate-500">Rescue Units</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-xs border border-slate-200">
                  <div className="text-2xl font-black text-blue-600 mb-0.5">4+</div>
                  <div className="text-xs font-medium text-slate-500">Partner Shelters</div>
                </div>
                <div className="text-center bg-white rounded-2xl p-4 shadow-xs border border-slate-200">
                  <div className="text-2xl font-black text-blue-600 mb-0.5">4+</div>
                  <div className="text-xs font-medium text-slate-500">Vet Hospitals</div>
                </div>
              </div>
              <Link to="/rescue-network" className="btn-primary inline-flex items-center gap-2">
                Explore the Network <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative">
              {/* Genuine photography: real rescue team member with happy dog */}
              <img
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=450&fit=crop"
                alt="Animal rescue team volunteer"
                className="rounded-3xl shadow-xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users size={22} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">12 Teams Linked</div>
                  <div className="text-xs text-slate-500">Active Across Hyderabad</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-400/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-lg" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                Be the reason an animal gets a second chance.
              </h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto text-base sm:text-lg">
                Whether you're a volunteer rescuer, animal shelter manager, or veterinarian — join the Petopia Network today.
              </p>
              <button
                onClick={() => navigate('/rescue-network')}
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center gap-2"
              >
                Join the Petopia Network <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
