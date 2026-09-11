import { ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { StatusPill } from "../components/ui";

export default function Veiculos() {
  const { vehicles } = useApp();

  return (
    <Screen>
      <div className="mb-4 flex items-center justify-between safe-top pt-1">
        <div>
          <h1 className="font-display text-xl font-extrabold text-[var(--text-primary)]">Meus veículos</h1>
          <p className="text-xs text-[var(--text-secondary)]">{vehicles.length} veículos vinculados ao seu CPF</p>
        </div>
        <Link to="/transferencia" className="flex h-9 w-9 items-center justify-center rounded-full surface-card">
          <Plus size={17} className="text-brand-600" />
        </Link>
      </div>

      <div className="space-y-4">
        {vehicles.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link to={`/veiculos/${v.id}`}>
              <div className="overflow-hidden rounded-3xl surface-card">
                <div className={`relative bg-gradient-to-br ${v.gradient} p-4 text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-white/70">{v.brand}</p>
                      <p className="font-display text-lg font-bold">{v.model}</p>
                    </div>
                    <StatusPill status={v.status} />
                  </div>
                  <p className="mt-4 font-mono text-lg tracking-[0.2em]">{v.plate}</p>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
                    <span>CRLV {v.crlvYear}</span>
                    <span>{v.km.toLocaleString("pt-BR")} km</span>
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-secondary)]" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Screen>
  );
}
