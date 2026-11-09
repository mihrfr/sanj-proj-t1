import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface EmergencyReport {
  id: string;
  reportId: string;
  animalType: string;
  emergencyType: string;
  severity: string;
  description: string;
  location: string;
  area: string;
  address: string;
  contactName: string;
  contactPhone: string;
  imagePreview?: string;
  assignedTeam: string;
  assignedTeamId: string;
  distance: number;
  status: 'submitted' | 'assigned' | 'in-progress' | 'resolved';
  createdAt: string;
}

export interface AdoptionApplication {
  id: string;
  animalId: string;
  animalName: string;
  animalSpecies: string;
  applicantName: string;
  phone: string;
  email: string;
  livingSituation: string;
  previousPets: string;
  reason: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  createdAt: string;
}

export interface VetAppointment {
  id: string;
  bookingId: string;
  vetId: string;
  vetName: string;
  ownerName: string;
  phone: string;
  animalName: string;
  animalSpecies: string;
  animalAge: string;
  problem: string;
  date: string;
  time: string;
  fee: number;
  status: 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'emergency' | 'adoption' | 'consultation' | 'status-update';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AppState {
  emergencyReports: EmergencyReport[];
  adoptionApplications: AdoptionApplication[];
  vetAppointments: VetAppointment[];
  notifications: Notification[];
  connections: string[]; // org IDs connected
  currentRole: 'user' | 'rescue' | 'shelter' | 'vet' | 'admin';
}

type Action =
  | { type: 'ADD_EMERGENCY_REPORT'; payload: EmergencyReport }
  | { type: 'UPDATE_REPORT_STATUS'; payload: { id: string; status: EmergencyReport['status'] } }
  | { type: 'ADD_ADOPTION_APPLICATION'; payload: AdoptionApplication }
  | { type: 'ADD_VET_APPOINTMENT'; payload: VetAppointment }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'ADD_CONNECTION'; payload: string }
  | { type: 'SET_ROLE'; payload: AppState['currentRole'] }
  | { type: 'LOAD_STATE'; payload: AppState };

const defaultState: AppState = {
  emergencyReports: [],
  adoptionApplications: [],
  vetAppointments: [],
  notifications: [],
  connections: [],
  currentRole: 'user',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'ADD_EMERGENCY_REPORT':
      return { ...state, emergencyReports: [action.payload, ...state.emergencyReports] };
    case 'UPDATE_REPORT_STATUS':
      return {
        ...state,
        emergencyReports: state.emergencyReports.map(r =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        ),
      };
    case 'ADD_ADOPTION_APPLICATION':
      return { ...state, adoptionApplications: [action.payload, ...state.adoptionApplications] };
    case 'ADD_VET_APPOINTMENT':
      return { ...state, vetAppointments: [action.payload, ...state.vetAppointments] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'MARK_ALL_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    case 'ADD_CONNECTION':
      return state.connections.includes(action.payload)
        ? state
        : { ...state, connections: [...state.connections, action.payload] };
    case 'SET_ROLE':
      return { ...state, currentRole: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pawlink-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: { ...defaultState, ...parsed } });
      }
    } catch {}
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('pawlink-state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
