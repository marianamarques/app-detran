import { Bell, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { services } from "../data/mock";
import { Avatar, Card, DynamicIcon, StatusPill, currency } from "../components/ui";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia,";
  if (h < 18) return "Boa tarde,";
  return "Boa noite,";
}

export default function Home() {
  const { user, vehicles, debits, appointments, unreadCount } = useApp();
  const pendingDebits = debits.filter((d) => d.status !== "pago");
  const totalPending = pendingDebits.reduce((sum, d) => sum + d.value, 0);
  const nextAppointment = appointments.find((a) => a.status === "agendado");
  const firstName = user.name.split(" ")[0];

  return (
    <Screen padded={false} className="bg-[var(--bg)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-8 pt-5 safe-top">
        <div className="absolute -top-10 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-black/10 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <Link to="/perfil" className="flex items-center gap-3">
            <Avatar src={user.avatarUrl} initials={user.avatarInitials} verified size={44} />
            <div>
              <p className="text-xs text-white/70">{greeting()}</p>
              <p className="font-display font-bold text-white leading-tight">{firstName}</p>
            </div>
          </Link>
          <Link
            to="/notificacoes"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 active:scale-90 transition-transform"
          >
            <Bell size={18} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-brand-700">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        <Link to="/cnh">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative mt-5 overflow-hidden rounded-3xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-semibold uppercase tracking-wide">
                <ShieldCheck size={14} /> CNH Digital
              </div>
              <StatusPill status={user.cnh.status} onDark />
            </div>
            <p className="mt-3 font-display text-lg font-bold text-white">{user.name}</p>
            <div className="mt-2 flex items-center justify-between text-white/80 text-xs">
              <span>Categoria {user.cnh.category}</span>
              <span>Válida até {user.cnh.validity}</span>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-black/15 px-3 py-2">
              <span className="text-[11px] text-white/80">Pontos na carteira</span>
              <span className="text-xs font-bold text-white">{user.cnh.points}/{user.cnh.maxPoints}</span>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="px-4 -mt-4 space-y-6 pb-6">
        {pendingDebits.length > 0 && (
          <Link to="/debitos">
            <Card className="flex items-center gap-3 border-amber-500/30 bg-amber-500/[0.06]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15">
                <DynamicIcon name="AlertTriangle" size={20} className="text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {pendingDebits.length} pendência{pendingDebits.length > 1 ? "s" : ""} encontrada{pendingDebits.length > 1 ? "s" : ""}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">Total de {currency(totalPending)} em aberto</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-[var(--text-secondary)]" />
            </Card>
          </Link>
        )}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display font-bold text-[15px] text-[var(--text-primary)]">Serviços</h2>
            <Link to="/servicos" className="text-xs font-semibold text-brand-600">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {services.map((s) => (
              <Link key={s.id} to={s.to}>
                <motion.div whileTap={{ scale: 0.94 }} className="flex flex-col items-center gap-2 rounded-2xl surface-card p-3 text-center">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color}`}>
                    <DynamicIcon name={s.icon} size={20} className="text-white" />
                  </div>
                  <span className="whitespace-nowrap text-[11px] font-semibold leading-tight text-[var(--text-primary)]">
                    {s.title}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {nextAppointment && (
          <div>
            <h2 className="mb-3 font-display font-bold text-[15px] text-[var(--text-primary)]">Próximo agendamento</h2>
            <Link to="/agendamentos">
              <Card className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-violet-500/12 text-violet-600">
                  <span className="text-[10px] font-bold uppercase leading-none">{nextAppointment.date.slice(3, 5)}</span>
                  <span className="text-base font-extrabold leading-none">{nextAppointment.date.slice(0, 2)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[var(--text-primary)]">{nextAppointment.service}</p>
                  <p className="truncate text-xs text-[var(--text-secondary)]">{nextAppointment.unit} · {nextAppointment.time}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-[var(--text-secondary)]" />
              </Card>
            </Link>
          </div>
        )}

        <div>
          <h2 className="mb-3 font-display font-bold text-[15px] text-[var(--text-primary)]">Meus veículos</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {vehicles.map((v) => (
              <Link key={v.id} to={`/veiculos/${v.id}`} className="shrink-0 w-[210px]">
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${v.gradient} p-4 text-white shadow-lg`}
                >
                  <DynamicIcon name="Car" size={54} className="absolute -bottom-3 -right-3 text-white/10" />
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] uppercase tracking-wide text-white/70">{v.brand}</p>
                    <ChevronRight size={14} className="text-white/50" />
                  </div>
                  <p className="font-display font-bold">{v.model}</p>
                  <p className="mt-4 font-mono text-sm tracking-widest">{v.plate}</p>
                </motion.div>
              </Link>
            ))}
            <Link to="/transferencia" className="shrink-0 w-[110px]">
              <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--border-soft)] p-4 text-center">
                <DynamicIcon name="Plus" size={18} className="text-[var(--text-secondary)]" />
                <span className="text-[11px] font-medium text-[var(--text-secondary)]">Adicionar</span>
              </div>
            </Link>
          </div>
        </div>

        <Card className="flex items-center gap-3 bg-gradient-to-br from-ink-900 to-ink-800 border-0 text-white">
          <Sparkles size={22} className="text-gold-400" />
          <div className="flex-1">
            <p className="text-sm font-bold">Curso de reciclagem online</p>
            <p className="text-xs text-white/60">Recupere pontos com cursos parceiros</p>
          </div>
          <ChevronRight size={16} className="shrink-0 text-white/60" />
        </Card>
      </div>
    </Screen>
  );
}
