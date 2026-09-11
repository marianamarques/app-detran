import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Plus } from "lucide-react";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, EmptyState, StatusPill } from "../components/ui";

export default function Agendamentos() {
  const { appointments, cancelAppointment } = useApp();
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="mb-4 flex items-center justify-between safe-top">
        <div>
          <h1 className="font-display text-xl font-extrabold text-[var(--text-primary)]">Agendamentos</h1>
          <p className="text-xs text-[var(--text-secondary)]">Exames, renovações e serviços</p>
        </div>
        <Link
          to="/agendamentos/novo"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30 active:scale-90 transition-transform"
        >
          <Plus size={18} />
        </Link>
      </div>

      {appointments.length === 0 ? (
        <EmptyState icon="CalendarDays" title="Nenhum agendamento" desc="Marque um exame ou serviço quando precisar." />
      ) : (
        <div className="space-y-3">
          {appointments.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card>
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-violet-500/12 text-violet-600">
                      <span className="text-[10px] font-bold uppercase leading-none">{a.date.slice(3, 5)}</span>
                      <span className="text-base font-extrabold leading-none">{a.date.slice(0, 2)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-[var(--text-primary)]">{a.service}</p>
                      <p className="truncate text-xs text-[var(--text-secondary)]">{a.time} · Protocolo {a.protocol}</p>
                    </div>
                  </div>
                  <StatusPill status={a.status} />
                </div>
                <div className="mb-3 flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  <span>{a.unit} — {a.address}</span>
                </div>
                {a.status === "agendado" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/agendamentos/novo")}
                      className="flex-1 rounded-xl surface-card py-2 text-xs font-semibold text-[var(--text-primary)]"
                    >
                      Reagendar
                    </button>
                    <button
                      onClick={() => cancelAppointment(a.id)}
                      className="flex-1 rounded-xl bg-red-500/10 py-2 text-xs font-semibold text-red-600"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Screen>
  );
}
