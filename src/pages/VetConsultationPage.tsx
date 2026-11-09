import React, { useState, useEffect } from 'react';
import { Star, Clock, Video, Phone, MessageSquare, X, Mic, MicOff, VideoIcon, VideoOff, PhoneOff, Send } from 'lucide-react';
import { VETERINARIANS } from '../data/demoData';
import { useApp } from '../context/AppContext';
import type { VetAppointment } from '../context/AppContext';
import { generateBookingId } from '../data/demoData';
import { showToast } from '../components/Toast';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Vet {
  id: string;
  name: string;
  qualification: string;
  experience: number;
  specialization: string;
  rating: number;
  ratingCount: number;
  fee: number;
  availability: string[];
  image: string;
  about: string;
  clinic: string;
  languages: string[];
  isOnline: boolean;
}

interface BookingForm {
  ownerName: string;
  phone: string;
  animalName: string;
  animalSpecies: string;
  animalAge: string;
  problem: string;
  preferredVetId: string;
  preferredDate: string;
  selectedSlot: string;
}

interface ChatMessage {
  sender: 'doctor' | 'user';
  text: string;
  timestamp: Date;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SPECIALIZATIONS = [
  'All',
  'Small Animal Medicine',
  'Surgery',
  'Nutrition & Preventive Care',
  'Dermatology & Allergy',
];

const DOCTOR_RESPONSES = [
  'I understand. Can you tell me more about when this started?',
  'That is helpful, thank you. Has your pet eaten normally today?',
  'I see. I would recommend keeping an eye on that and I will note it in my report.',
  'Great observation! Let me check my notes and advise accordingly.',
  'Thank you for sharing that. We will make sure your pet gets the best care.',
];

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
  );
}

// ─── Doctor Card ─────────────────────────────────────────────────────────────

function DoctorCard({
  vet,
  onViewProfile,
  onBookNow,
}: {
  vet: Vet;
  onViewProfile: (vet: Vet) => void;
  onBookNow: (vet: Vet) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={vet.image}
            alt={vet.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-green-100"
          />
          <span
            className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
              vet.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
            title={vet.isOnline ? 'Online' : 'Offline'}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">{vet.name}</h3>
          <p className="text-sm text-gray-500">{vet.qualification}</p>
          <span className="mt-1 inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {vet.specialization}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Clock size={13} className="text-gray-400" />
          {vet.experience} yrs experience
        </span>
        <div className="flex items-center gap-1">
          <StarRating rating={vet.rating} />
          <span className="text-xs text-gray-500">({vet.ratingCount} reviews)</span>
        </div>
      </div>

      {/* Fee */}
      <p className="text-lg font-bold text-green-600">
        ₹{vet.fee}{' '}
        <span className="text-xs font-normal text-gray-500">per session</span>
      </p>

      {/* Languages */}
      <div className="flex flex-wrap gap-1">
        {vet.languages.map((lang) => (
          <span key={lang} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {lang}
          </span>
        ))}
      </div>

      {/* Availability */}
      <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
        <Clock size={12} />
        {vet.availability.length} slot{vet.availability.length !== 1 ? 's' : ''} today
      </p>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        <button
          onClick={() => onViewProfile(vet)}
          className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl py-2 text-sm font-medium transition-colors"
        >
          View Profile
        </button>
        <button
          onClick={() => onBookNow(vet)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 text-sm font-medium transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({
  vet,
  allVets,
  onClose,
  onConfirmed,
}: {
  vet: Vet;
  allVets: Vet[];
  onClose: () => void;
  onConfirmed: (appointment: VetAppointment) => void;
}) {
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<BookingForm>({
    ownerName: '',
    phone: '',
    animalName: '',
    animalSpecies: 'Dog',
    animalAge: '',
    problem: '',
    preferredVetId: vet.id,
    preferredDate: today,
    selectedSlot: vet.availability[0] ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const { dispatch } = useApp();

  const selectedVet = allVets.find((v) => v.id === form.preferredVetId) ?? vet;

  // Update slot when vet changes
  useEffect(() => {
    setForm((f) => ({ ...f, selectedSlot: selectedVet.availability[0] ?? '' }));
  }, [form.preferredVetId]);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {};
    if (!form.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.animalName.trim()) newErrors.animalName = 'Animal name is required';
    if (!form.animalAge.trim()) newErrors.animalAge = 'Animal age is required';
    if (!form.problem.trim()) newErrors.problem = 'Please describe the problem';
    if (!form.preferredDate) newErrors.preferredDate = 'Please select a date';
    if (!form.selectedSlot) newErrors.selectedSlot = 'Please select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const appointment: VetAppointment = {
      id: Date.now().toString(),
      bookingId: generateBookingId(),
      vetId: selectedVet.id,
      vetName: selectedVet.name,
      ownerName: form.ownerName,
      phone: form.phone,
      animalName: form.animalName,
      animalSpecies: form.animalSpecies,
      animalAge: form.animalAge,
      problem: form.problem,
      date: form.preferredDate,
      time: form.selectedSlot,
      fee: selectedVet.fee,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_VET_APPOINTMENT', payload: appointment });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        message: `Consultation booked with ${selectedVet.name} on ${form.preferredDate} at ${form.selectedSlot}`,
        type: 'success',
        createdAt: new Date().toISOString(),
        read: false,
      },
    });
    showToast('Consultation booked successfully!', 'success');
    onConfirmed(appointment);
  }

  function field(id: keyof BookingForm, label: string, element: React.ReactNode) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {element}
        {errors[id] && <p className="text-red-500 text-xs mt-0.5">{errors[id]}</p>}
      </div>
    );
  }

  const inputCls =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Book Consultation</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Vet summary */}
        <div className="flex items-center gap-3 px-6 py-4 bg-green-50 border-b">
          <img src={vet.image} alt={vet.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">{vet.name}</p>
            <p className="text-xs text-gray-500">{vet.specialization}</p>
            <p className="text-green-600 font-bold text-sm">₹{vet.fee} per session</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {field(
            'ownerName',
            "Owner's Name",
            <input
              id="ownerName"
              type="text"
              className={inputCls}
              placeholder="Your full name"
              value={form.ownerName}
              onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
            />,
          )}

          {field(
            'phone',
            'Phone Number',
            <input
              id="phone"
              type="tel"
              className={inputCls}
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />,
          )}

          <div className="grid grid-cols-2 gap-3">
            {field(
              'animalName',
              'Animal Name',
              <input
                id="animalName"
                type="text"
                className={inputCls}
                placeholder="e.g. Bruno"
                value={form.animalName}
                onChange={(e) => setForm({ ...form, animalName: e.target.value })}
              />,
            )}
            {field(
              'animalAge',
              'Animal Age',
              <input
                id="animalAge"
                type="text"
                className={inputCls}
                placeholder="e.g. 3 years"
                value={form.animalAge}
                onChange={(e) => setForm({ ...form, animalAge: e.target.value })}
              />,
            )}
          </div>

          {field(
            'animalSpecies',
            'Animal Species',
            <select
              id="animalSpecies"
              className={inputCls}
              value={form.animalSpecies}
              onChange={(e) => setForm({ ...form, animalSpecies: e.target.value })}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>,
          )}

          {field(
            'problem',
            'Brief Problem Description',
            <textarea
              id="problem"
              rows={3}
              className={inputCls}
              placeholder="Describe your pet's symptoms or concern..."
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
            />,
          )}

          {field(
            'preferredVetId',
            'Preferred Veterinarian',
            <select
              id="preferredVetId"
              className={inputCls}
              value={form.preferredVetId}
              onChange={(e) => setForm({ ...form, preferredVetId: e.target.value })}
            >
              {allVets.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — ₹{v.fee}
                </option>
              ))}
            </select>,
          )}

          {field(
            'preferredDate',
            'Preferred Date',
            <input
              id="preferredDate"
              type="date"
              className={inputCls}
              min={today}
              value={form.preferredDate}
              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            />,
          )}

          {field(
            'selectedSlot',
            'Available Time Slot',
            <select
              id="selectedSlot"
              className={inputCls}
              value={form.selectedSlot}
              onChange={(e) => setForm({ ...form, selectedSlot: e.target.value })}
            >
              {selectedVet.availability.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>,
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors mt-1"
          >
            Confirm Booking — ₹{selectedVet.fee}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Confirmation Screen (inside a modal) ─────────────────────────────────────

function ConfirmationModal({
  appointment,
  onClose,
  onJoinCall,
}: {
  appointment: VetAppointment;
  onClose: () => void;
  onJoinCall: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Green header */}
        <div className="bg-green-600 px-6 py-8 flex flex-col items-center text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Consultation Confirmed!</h2>
          <p className="text-green-100 text-sm mt-1">Your appointment is all set.</p>
        </div>

        {/* Details */}
        <div className="px-6 py-5 flex flex-col gap-3">
          <Detail label="Booking ID" value={appointment.bookingId} mono />
          <Detail label="Doctor" value={appointment.vetName} />
          <Detail label="Date" value={appointment.date} />
          <Detail label="Time" value={appointment.time} />
          <Detail label="Fee" value={`₹${appointment.fee}`} green />
          <Detail label="Status" value="Confirmed" green />
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-col gap-2">
          <button
            onClick={onJoinCall}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Video size={18} />
            Join Consultation
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
  green,
}: {
  label: string;
  value: string;
  mono?: boolean;
  green?: boolean;
}) {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm font-semibold ${mono ? 'font-mono text-gray-700' : ''} ${
          green ? 'text-green-600' : 'text-gray-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Video Consultation Modal ─────────────────────────────────────────────────

function VideoCallModal({
  vet,
  onClose,
}: {
  vet: Vet;
  onClose: () => void;
}) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [duration, setDuration] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'doctor', text: 'Hello! How can I help you today?', timestamp: new Date() },
    { sender: 'doctor', text: 'Please describe your pet\'s symptoms in detail.', timestamp: new Date() },
  ]);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const responseIndex = React.useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    const text = chatInput.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: 'user', text, timestamp: new Date() }]);
    setChatInput('');

    setTimeout(() => {
      const reply = DOCTOR_RESPONSES[responseIndex.current % DOCTOR_RESPONSES.length];
      responseIndex.current += 1;
      setMessages((prev) => [...prev, { sender: 'doctor', text: reply, timestamp: new Date() }]);
    }, 1500);
  }

  function handleEndCall() {
    onClose();
    showToast('Consultation ended. Thank you!', 'info');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-3xl h-[90vh] flex flex-col sm:flex-row bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">

        {/* Video area */}
        <div className="relative flex-1 flex flex-col items-center justify-center bg-gray-900 min-h-0">
          {/* Duration badge */}
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {formatDuration(duration)}
          </div>

          {/* Doctor "video" */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={vet.image}
              alt={vet.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-green-500/40 shadow-xl"
            />
            <div className="bg-black/50 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              {vet.name}
            </div>
            {!camOn && (
              <p className="text-gray-400 text-xs mt-1">Camera is off</p>
            )}
          </div>

          {/* Self-view */}
          <div className="absolute bottom-20 right-3 w-20 h-16 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600 overflow-hidden shadow-lg">
            <span className="text-gray-400 text-xs">You</span>
          </div>

          {/* Control bar */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
            <button
              onClick={() => setMicOn((v) => !v)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow ${
                micOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              title={micOn ? 'Mute' : 'Unmute'}
            >
              {micOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
            <button
              onClick={() => setCamOn((v) => !v)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow ${
                camOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              title={camOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {camOn ? <VideoIcon size={20} /> : <VideoOff size={20} />}
            </button>
            <button
              onClick={handleEndCall}
              className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-colors shadow"
              title="End call"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        </div>

        {/* Chat sidebar */}
        <div className="w-full sm:w-60 flex flex-col bg-gray-800 border-t sm:border-t-0 sm:border-l border-gray-700 max-h-48 sm:max-h-none">
          <div className="px-3 py-2 border-b border-gray-700 flex items-center gap-2">
            <MessageSquare size={14} className="text-green-400" />
            <span className="text-white text-xs font-semibold">Chat</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-0.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-gray-500">
                  {msg.sender === 'doctor' ? vet.name.split(' ')[0] : 'You'}
                </span>
                <div
                  className={`max-w-[90%] rounded-xl px-3 py-1.5 text-xs leading-snug ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              className="flex-1 bg-gray-700 text-white text-xs rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Type a message…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
              title="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VetConsultationPage() {
  const [activeSpec, setActiveSpec] = useState('All');
  const [bookingVet, setBookingVet] = useState<Vet | null>(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState<VetAppointment | null>(null);
  const [videoCallVet, setVideoCallVet] = useState<Vet | null>(null);

  const vets = VETERINARIANS as Vet[];

  const filtered = activeSpec === 'All'
    ? vets
    : vets.filter((v) => v.specialization === activeSpec);

  function handleBookNow(vet: Vet) {
    setBookingVet(vet);
    setConfirmedAppointment(null);
  }

  function handleConfirmed(appt: VetAppointment) {
    setConfirmedAppointment(appt);
    setBookingVet(null);
  }

  function handleJoinCall() {
    if (!confirmedAppointment) return;
    const vet = vets.find((v) => v.id === confirmedAppointment.vetId) ?? vets[0];
    setConfirmedAppointment(null);
    setVideoCallVet(vet);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-teal-700 text-white py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Video size={15} />
            Online Vet Consultation
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            Expert Veterinary Care,<br />Within Reach.
          </h1>
          <p className="text-green-100 text-base sm:text-lg max-w-lg mx-auto">
            Consult experienced veterinarians online without expensive clinic visits.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveSpec(spec)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeSpec === spec
                  ? 'bg-green-600 text-white border-green-600 shadow'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-600'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> veterinarian{filtered.length !== 1 ? 's' : ''}
          {activeSpec !== 'All' && ` for "${activeSpec}"`}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">No veterinarians found</p>
            <p className="text-sm mt-1">Try a different specialization filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((vet) => (
              <DoctorCard
                key={vet.id}
                vet={vet}
                onViewProfile={handleBookNow}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingVet && (
        <BookingModal
          vet={bookingVet}
          allVets={vets}
          onClose={() => setBookingVet(null)}
          onConfirmed={handleConfirmed}
        />
      )}

      {/* Confirmation Modal */}
      {confirmedAppointment && (
        <ConfirmationModal
          appointment={confirmedAppointment}
          onClose={() => setConfirmedAppointment(null)}
          onJoinCall={handleJoinCall}
        />
      )}

      {/* Video Call Modal */}
      {videoCallVet && (
        <VideoCallModal
          vet={videoCallVet}
          onClose={() => setVideoCallVet(null)}
        />
      )}
    </div>
  );
}
