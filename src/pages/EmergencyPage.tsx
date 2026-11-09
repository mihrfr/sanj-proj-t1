import React, { useState, useRef } from 'react';
import { AlertCircle, MapPin, Phone, User, Upload, CheckCircle, ChevronRight, Clock, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { EmergencyReport } from '../context/AppContext';
import { findNearestRescueTeam, generateReportId, LOCATIONS } from '../data/demoData';
import { showToast } from '../components/Toast';

type Step = 'intro' | 'form' | 'success';

const ANIMAL_TYPES = ['Dog', 'Cat', 'Bird', 'Cow', 'Other'];
const EMERGENCY_TYPES = [
  'Injured animal',
  'Hit by vehicle',
  'Abandoned animal',
  'Sick animal',
  'Trapped animal',
  'Other',
];

interface FormData {
  animalType: string;
  emergencyType: string;
  severity: string;
  description: string;
  location: string;
  area: string;
  address: string;
  contactName: string;
  contactPhone: string;
  imagePreview: string;
  imageFile: File | null;
}

interface SubmittedReport {
  reportId: string;
  assignedTeam: string;
  distance: number;
  area: string;
}

const STATUS_STEPS = [
  'Report Submitted',
  'Team Assigned',
  'Team Notified',
  'Rescue In Progress',
  'Case Resolved',
];

export default function EmergencyPage() {
  const { dispatch } = useApp();
  const [step, setStep] = useState<Step>('intro');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submittedReport, setSubmittedReport] = useState<SubmittedReport | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    animalType: '',
    emergencyType: '',
    severity: '',
    description: '',
    location: 'Hyderabad',
    area: '',
    address: '',
    contactName: '',
    contactPhone: '',
    imagePreview: '',
    imageFile: null,
  });

  function updateForm(field: keyof FormData, value: string | File | null) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    updateForm('imageFile', file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateForm('imagePreview', ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.animalType) newErrors.animalType = 'Please select an animal type.';
    if (!form.emergencyType) newErrors.emergencyType = 'Please select an emergency type.';
    if (!form.severity) newErrors.severity = 'Please select a severity level.';
    if (!form.area) newErrors.area = 'Please select an area/locality.';
    if (!form.contactName.trim()) newErrors.contactName = 'Contact name is required.';
    if (!form.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const reportId = generateReportId();
    const { team: nearestTeam, distance } = findNearestRescueTeam(form.area);

    const report: EmergencyReport = {
      id: Date.now().toString(),
      reportId,
      animalType: form.animalType,
      emergencyType: form.emergencyType,
      severity: form.severity,
      description: form.description,
      location: 'Hyderabad',
      area: form.area,
      address: form.address,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      imagePreview: form.imagePreview || undefined,
      assignedTeam: nearestTeam.name,
      assignedTeamId: nearestTeam.id,
      distance,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_EMERGENCY_REPORT', payload: report });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        type: 'emergency',
        title: 'New Emergency Report',
        message: `New Emergency: ${form.animalType} reported in ${form.area}. Assigned to ${nearestTeam.name}.`,
        read: false,
        createdAt: new Date().toISOString(),
      },
    });

    setSubmittedReport({
      reportId,
      assignedTeam: nearestTeam.name,
      distance,
      area: form.area,
    });

    setStep('success');
    showToast('Emergency report submitted successfully!', 'success');
  }

  function resetForm() {
    setForm({
      animalType: '',
      emergencyType: '',
      severity: '',
      description: '',
      location: 'Hyderabad',
      area: '',
      address: '',
      contactName: '',
      contactPhone: '',
      imagePreview: '',
      imageFile: null,
    });
    setErrors({});
    setSubmittedReport(null);
    setStep('intro');
  }

  // ─── INTRO STEP ───────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-800">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
            {/* Pulsing icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                <div className="relative bg-white bg-opacity-20 rounded-full p-6 border-2 border-white border-opacity-40">
                  <AlertCircle className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              An Animal Needs Help.{' '}
              <span className="text-red-200">Let's Get There.</span>
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-10 max-w-2xl mx-auto">
              Report an emergency and connect with a nearby animal rescue team. Every second counts — we're here 24/7.
            </p>

            <button
              onClick={() => setStep('form')}
              className="inline-flex items-center gap-3 bg-white text-red-700 font-extrabold text-lg md:text-xl px-10 py-5 rounded-2xl shadow-2xl hover:bg-red-50 hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-widest"
            >
              <AlertCircle className="w-6 h-6" />
              Report an Emergency
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Quick info cards */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<Clock className="w-8 h-8 text-red-600" />}
              title="24/7 Available"
              description="Our rescue network operates around the clock, every day of the year."
            />
            <InfoCard
              icon={<Zap className="w-8 h-8 text-red-600" />}
              title="Avg Response 15 min"
              description="Teams are dispatched immediately upon receiving your report."
            />
            <InfoCard
              icon={<MapPin className="w-8 h-8 text-red-600" />}
              title="50+ Rescue Teams"
              description="Wide network of professional rescue teams covering all of Hyderabad."
            />
          </div>
        </div>
      </div>
    );
  }

  // ─── SUCCESS STEP ─────────────────────────────────────────────────────────
  if (step === 'success' && submittedReport) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Success header */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-14 px-6 text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-white bg-opacity-20 rounded-full p-5 border-2 border-white border-opacity-40">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Your Report Has Been Received!
          </h1>
          <p className="text-green-100 text-lg">
            A rescue team has been assigned and is on the way.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-6 mt-8 space-y-6">
          {/* Report details card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Report Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Report ID" value={submittedReport.reportId} highlight />
              <Detail label="Assigned Team" value={submittedReport.assignedTeam} />
              <Detail
                label="Estimated Distance"
                value={`${submittedReport.distance} km`}
              />
              <Detail label="Status">
                <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Submitted
                </span>
              </Detail>
            </div>
          </div>

          {/* Status tracker */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Rescue Progress</h2>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />
              <div
                className="absolute top-4 left-4 h-0.5 bg-green-500 transition-all duration-700"
                style={{ width: 'calc(50% - 1rem)' }}
              />
              <div className="relative flex justify-between">
                {STATUS_STEPS.map((label, idx) => {
                  const filled = idx <= 2; // first 3 filled
                  return (
                    <div key={label} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors ${
                          filled
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        }`}
                      >
                        {filled ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium text-center leading-tight ${
                          filled ? 'text-green-700' : 'text-gray-400'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 overflow-hidden">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              Location Map
            </h2>
            <div
              className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200"
              style={{
                background: '#e8f0e8',
                backgroundImage:
                  'radial-gradient(circle, #c8dcc8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Roads */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-white opacity-70" />
              </div>
              <div className="absolute inset-0 flex justify-center">
                <div className="h-full w-0.5 bg-white opacity-70" />
              </div>
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
                <div className="bg-red-600 text-white rounded-full p-2 shadow-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-600" />
              </div>
              {/* Label */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow border border-gray-200 whitespace-nowrap">
                  📍 Nearest rescue team located — {submittedReport.area}, Hyderabad
                </span>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={resetForm}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors text-lg"
          >
            <AlertCircle className="w-5 h-5" />
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  // ─── FORM STEP ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top bar */}
      <div className="bg-red-600 text-white py-5 px-6">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <AlertCircle className="w-7 h-7 flex-shrink-0" />
          <div>
            <h1 className="text-xl font-extrabold tracking-wide">Emergency Report</h1>
            <p className="text-red-100 text-sm">Fill in the details below — be as specific as possible.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* 1. Animal Type */}
        <Section title="1. Animal Type" required>
          <div className="grid grid-cols-5 gap-3">
            {ANIMAL_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => updateForm('animalType', type)}
                className={`py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                  form.animalType === type
                    ? 'bg-red-600 border-red-600 text-white shadow-md scale-105'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.animalType && <ErrorMsg msg={errors.animalType} />}
        </Section>

        {/* 2. Emergency Type */}
        <Section title="2. Emergency Type" required>
          <select
            value={form.emergencyType}
            onChange={e => updateForm('emergencyType', e.target.value)}
            className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition ${
              errors.emergencyType ? 'border-red-400' : 'border-gray-200'
            }`}
          >
            <option value="">— Select emergency type —</option>
            {EMERGENCY_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.emergencyType && <ErrorMsg msg={errors.emergencyType} />}
        </Section>

        {/* 3. Severity */}
        <Section title="3. Severity Level" required>
          <div className="grid grid-cols-3 gap-4">
            <SeverityCard
              label="Critical"
              description="Life-threatening, immediate danger"
              color="red"
              selected={form.severity === 'Critical'}
              onClick={() => updateForm('severity', 'Critical')}
            />
            <SeverityCard
              label="Urgent"
              description="Serious condition, needs prompt help"
              color="yellow"
              selected={form.severity === 'Urgent'}
              onClick={() => updateForm('severity', 'Urgent')}
            />
            <SeverityCard
              label="Non-critical"
              description="Stable but needs attention"
              color="green"
              selected={form.severity === 'Non-critical'}
              onClick={() => updateForm('severity', 'Non-critical')}
            />
          </div>
          {errors.severity && <ErrorMsg msg={errors.severity} />}
        </Section>

        {/* 4. Description */}
        <Section title="4. Description">
          <textarea
            value={form.description}
            onChange={e => updateForm('description', e.target.value)}
            placeholder="Describe what you see — injuries, behavior, surroundings..."
            rows={4}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 resize-none transition"
          />
        </Section>

        {/* 5 & 6. Location */}
        <Section title="5. Location" required>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">City</label>
              <input
                type="text"
                value={form.location}
                onChange={e => updateForm('location', e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                placeholder="City"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Area / Locality <span className="text-red-500">*</span>
              </label>
              <select
                value={form.area}
                onChange={e => updateForm('area', e.target.value)}
                className={`w-full border-2 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition ${
                  errors.area ? 'border-red-400' : 'border-gray-200'
                }`}
              >
                <option value="">— Select locality —</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.area && <ErrorMsg msg={errors.area} />}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Detailed Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => updateForm('address', e.target.value)}
                placeholder="Building, street, landmark..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              />
            </div>
          </div>
        </Section>

        {/* 7. Contact Info */}
        <Section title="6. Your Contact Details" required>
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.contactName}
                onChange={e => updateForm('contactName', e.target.value)}
                placeholder="Your full name"
                className={`w-full border-2 rounded-xl pl-10 pr-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition ${
                  errors.contactName ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.contactName && <ErrorMsg msg={errors.contactName} />}
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={form.contactPhone}
                onChange={e => updateForm('contactPhone', e.target.value)}
                placeholder="Your phone number"
                className={`w-full border-2 rounded-xl pl-10 pr-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition ${
                  errors.contactPhone ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.contactPhone && <ErrorMsg msg={errors.contactPhone} />}
            </div>
          </div>
        </Section>

        {/* 8. Image Upload */}
        <Section title="7. Upload Photo (Optional)">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {form.imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border-2 border-green-300">
              <img
                src={form.imagePreview}
                alt="Preview"
                className="w-full max-h-56 object-cover"
              />
              <button
                type="button"
                onClick={() => { updateForm('imagePreview', ''); updateForm('imageFile', null); }}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center gap-3 text-gray-500 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <Upload className="w-10 h-10" />
              <span className="font-semibold text-sm">Click to upload a photo</span>
              <span className="text-xs text-gray-400">JPG, PNG, GIF — max 10MB</span>
            </button>
          )}
        </Section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xl py-5 rounded-2xl shadow-lg transition-all uppercase tracking-wide"
        >
          <AlertCircle className="w-6 h-6" />
          Submit Emergency Report
        </button>
      </form>
    </div>
  );
}

// ─── Helper Sub-Components ────────────────────────────────────────────────────

function Section({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="text-base font-bold text-gray-800">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      {children}
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1.5 text-sm text-red-600 mt-1.5 font-medium">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      {msg}
    </p>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

function SeverityCard({
  label,
  description,
  color,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  color: 'red' | 'yellow' | 'green';
  selected: boolean;
  onClick: () => void;
}) {
  const colorMap = {
    red: {
      ring: 'ring-red-500 border-red-500 bg-red-50',
      idle: 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50',
      badge: 'bg-red-100 text-red-700',
      badgeSel: 'bg-red-600 text-white',
      dot: 'bg-red-500',
    },
    yellow: {
      ring: 'ring-yellow-400 border-yellow-400 bg-yellow-50',
      idle: 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-50',
      badge: 'bg-yellow-100 text-yellow-700',
      badgeSel: 'bg-yellow-500 text-white',
      dot: 'bg-yellow-500',
    },
    green: {
      ring: 'ring-green-500 border-green-500 bg-green-50',
      idle: 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50',
      badge: 'bg-green-100 text-green-700',
      badgeSel: 'bg-green-600 text-white',
      dot: 'bg-green-500',
    },
  };
  const c = colorMap[color];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition-all ${
        selected ? `${c.ring} ring-2 shadow-md` : c.idle
      }`}
    >
      <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${selected ? c.badgeSel : c.badge}`}>
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        {label}
      </div>
      <p className="text-xs text-gray-500 leading-snug">{description}</p>
    </button>
  );
}

function Detail({
  label,
  value,
  highlight,
  children,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">{label}</p>
      {children ?? (
        <p className={`font-bold text-sm ${highlight ? 'text-red-600 text-base' : 'text-gray-800'}`}>
          {value}
        </p>
      )}
    </div>
  );
}
