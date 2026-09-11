import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  mockAppointments,
  mockDebits,
  mockNotifications,
  mockUser,
  mockVehicles,
  type Appointment,
  type Debit,
  type NotificationItem,
  type UserProfile,
  type Vehicle,
} from "../data/mock";

interface PersistedState {
  isAuthenticated: boolean;
  theme: "light" | "dark";
  user: UserProfile;
  vehicles: Vehicle[];
  debits: Debit[];
  appointments: Appointment[];
  notifications: NotificationItem[];
  onboarded: boolean;
}

const STORAGE_KEY = "detran-goon-state-v1";

function defaultState(): PersistedState {
  return {
    isAuthenticated: false,
    theme: "light",
    user: mockUser,
    vehicles: mockVehicles,
    debits: mockDebits,
    appointments: mockAppointments,
    notifications: mockNotifications,
    onboarded: false,
  };
}

function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

interface AppContextValue extends PersistedState {
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
  finishOnboarding: () => void;
  toggleTheme: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  payDebit: (id: string, method: "pix" | "boleto" | "cartao") => Promise<void>;
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  unreadCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const login = async (_cpf: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1100));
    setState((s) => ({ ...s, isAuthenticated: true }));
  };

  const logout = () => setState((s) => ({ ...s, isAuthenticated: false }));

  const finishOnboarding = () => setState((s) => ({ ...s, onboarded: true }));

  const toggleTheme = () =>
    setState((s) => ({ ...s, theme: s.theme === "light" ? "dark" : "light" }));

  const markNotificationRead = (id: string) =>
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));

  const markAllNotificationsRead = () =>
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));

  const payDebit = async (id: string) => {
    await new Promise((r) => setTimeout(r, 1600));
    setState((s) => ({
      ...s,
      debits: s.debits.map((d) => (d.id === id ? { ...d, status: "pago" } : d)),
      notifications: [
        {
          id: `n-pay-${Date.now()}`,
          title: "Pagamento confirmado",
          message: "Seu pagamento foi processado com sucesso.",
          date: "agora",
          read: false,
          type: "sucesso",
        },
        ...s.notifications,
      ],
    }));
  };

  const addAppointment = (appointment: Appointment) =>
    setState((s) => ({
      ...s,
      appointments: [appointment, ...s.appointments],
      notifications: [
        {
          id: `n-app-${Date.now()}`,
          title: "Agendamento confirmado",
          message: `${appointment.service} marcado para ${appointment.date} às ${appointment.time}.`,
          date: "agora",
          read: false,
          type: "sucesso",
        },
        ...s.notifications,
      ],
    }));

  const cancelAppointment = (id: string) =>
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) => (a.id === id ? { ...a, status: "cancelado" } : a)),
    }));

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      login,
      logout,
      finishOnboarding,
      toggleTheme,
      markNotificationRead,
      markAllNotificationsRead,
      payDebit,
      addAppointment,
      cancelAppointment,
      unreadCount,
    }),
    [state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
