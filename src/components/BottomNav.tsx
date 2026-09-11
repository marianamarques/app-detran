import { Home, Car, Receipt, CalendarDays, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { to: "/home", label: "Início", icon: Home, match: (p: string) => p === "/home" },
  { to: "/veiculos", label: "Veículos", icon: Car, match: (p: string) => p.startsWith("/veiculos") },
  { to: "/debitos", label: "Débitos", icon: Receipt, match: (p: string) => p.startsWith("/debitos") },
  { to: "/agendamentos", label: "Agenda", icon: CalendarDays, match: (p: string) => p.startsWith("/agendamentos") },
  { to: "/perfil", label: "Perfil", icon: User, match: (p: string) => p.startsWith("/perfil") },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="safe-bottom shrink-0 glass border-t border-[var(--border-soft)] px-2 pt-1.5">
      <ul className="flex items-stretch justify-between">
        {tabs.map(({ to, label, icon: Icon, match }) => {
          const active = match(location.pathname);
          return (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className="relative flex flex-col items-center gap-1 py-2 text-[11px] font-medium"
              >
                <span className="relative flex h-8 w-11 items-center justify-center rounded-2xl">
                  {active && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-2xl bg-brand-500/15"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={active ? 2.4 : 1.9}
                    className={`relative ${active ? "text-brand-600" : "text-[var(--text-secondary)]"}`}
                  />
                </span>
                <span className={active ? "text-brand-600 font-semibold" : "text-[var(--text-secondary)]"}>
                  {label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
