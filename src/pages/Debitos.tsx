import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, DynamicIcon, EmptyState, StatusPill, currency } from "../components/ui";

const filters = [
  { id: "todos", label: "Todos" },
  { id: "pendente", label: "Pendentes" },
  { id: "pago", label: "Pagos" },
] as const;

const typeIcon: Record<string, string> = {
  Multa: "AlertOctagon",
  IPVA: "Landmark",
  Licenciamento: "FileBadge",
  DPVAT: "ShieldCheck",
};

export default function Debitos() {
  const { debits } = useApp();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("todos");

  const filtered = debits.filter((d) => {
    if (filter === "todos") return true;
    if (filter === "pendente") return d.status !== "pago";
    return d.status === "pago";
  });

  const totalOpen = debits.filter((d) => d.status !== "pago").reduce((s, d) => s + d.value, 0);

  return (
    <Screen>
      <div className="mb-4 safe-top pt-1">
        <h1 className="font-display text-xl font-extrabold text-[var(--text-primary)]">Débitos e multas</h1>
        <p className="text-xs text-[var(--text-secondary)]">Consulte, acompanhe e pague on-line</p>
      </div>

      <Card className="mb-5 bg-gradient-to-br from-ink-900 to-ink-800 border-0 text-white">
        <p className="text-xs text-white/60">Total em aberto</p>
        <p className="font-display text-2xl font-extrabold">{currency(totalOpen)}</p>
        <p className="mt-1 text-[11px] text-white/50">{debits.filter((d) => d.status !== "pago").length} itens pendentes</p>
      </Card>

      <div className="mb-4 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              filter === f.id ? "bg-brand-600 text-white" : "surface-card text-[var(--text-secondary)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="PartyPopper" title="Tudo em dia!" desc="Não há débitos nessa categoria." />
      ) : (
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/debitos/${d.id}`}>
                <Card className="flex items-start gap-3 active:scale-[0.99] transition-transform">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-soft)]">
                    <DynamicIcon name={typeIcon[d.type] ?? "Receipt"} size={19} className="text-[var(--text-primary)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-[var(--text-primary)]">{d.description}</p>
                      <p className="shrink-0 font-display text-sm font-bold text-[var(--text-primary)]">
                        {d.value > 0 ? currency(d.value) : "Grátis"}
                      </p>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-[var(--text-secondary)]">
                        {d.vehiclePlate ? `${d.vehiclePlate} · ` : ""}
                        {d.dueDate === "—" ? "Sem vencimento" : d.dueDate}
                      </p>
                      <StatusPill status={d.status} />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </Screen>
  );
}
