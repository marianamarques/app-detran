import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  FileLock2,
  HelpCircle,
  LogOut,
  Moon,
  Shield,
  Sun,
  UserCog,
} from "lucide-react";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, StatusPill } from "../components/ui";

export default function Perfil() {
  const { user, theme, toggleTheme, logout } = useApp();
  const navigate = useNavigate();

  const menu = [
    { icon: UserCog, label: "Editar dados pessoais", to: "/perfil" },
    { icon: Shield, label: "Segurança e senha", to: "/perfil" },
    { icon: FileLock2, label: "Privacidade dos dados", to: "/perfil" },
    { icon: HelpCircle, label: "Central de ajuda", to: "/ajuda" },
  ];

  return (
    <Screen>
      <div className="mb-5 flex flex-col items-center pt-2 safe-top">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-2xl font-bold text-white shadow-lg shadow-brand-600/30">
          {user.avatarInitials}
        </div>
        <h1 className="mt-3 font-display text-lg font-bold text-[var(--text-primary)]">{user.name}</h1>
        <p className="text-xs text-[var(--text-secondary)]">CPF {user.cpf}</p>
        <div className="mt-2">
          <StatusPill status={user.cnh.status} />
        </div>
      </div>

      <Card className="mb-4">
        <dl className="space-y-2 text-xs">
          {[
            ["E-mail", user.email],
            ["Telefone", user.phone],
            ["Endereço", user.address],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-[var(--border-soft)] pb-2 last:border-0 last:pb-0">
              <dt className="shrink-0 text-[var(--text-secondary)]">{k}</dt>
              <dd className="text-right font-semibold text-[var(--text-primary)]">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-soft)]">
            {theme === "dark" ? <Moon size={17} className="text-brand-500" /> : <Sun size={17} className="text-amber-500" />}
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Tema {theme === "dark" ? "escuro" : "claro"}</p>
            <p className="text-xs text-[var(--text-secondary)]">Ajuste a aparência do app</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative h-7 w-12 rounded-full transition-colors ${theme === "dark" ? "bg-brand-600" : "bg-ink-200"}`}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
            style={{ left: theme === "dark" ? 22 : 4 }}
          />
        </button>
      </Card>

      <div className="mb-4 overflow-hidden rounded-3xl surface-card">
        {menu.map((m, i) => (
          <Link
            key={m.label}
            to={m.to}
            className={`flex items-center gap-3 px-4 py-3.5 ${i !== menu.length - 1 ? "border-b border-[var(--border-soft)]" : ""}`}
          >
            <m.icon size={17} className="text-[var(--text-secondary)]" />
            <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">{m.label}</span>
            <ChevronRight size={16} className="text-[var(--text-secondary)]" />
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/login", { replace: true });
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/10 py-3.5 text-sm font-semibold text-red-600"
      >
        <LogOut size={16} /> Sair da conta
      </button>

      <p className="mt-4 text-center text-[10px] text-[var(--text-secondary)]/70">
        Detran Go On · Protótipo v0.1 · Governo de Goiás
      </p>
    </Screen>
  );
}
