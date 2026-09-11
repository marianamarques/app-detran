import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { allServices } from "../data/mock";
import { DynamicIcon } from "../components/ui";

export default function Servicos() {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Todos os serviços" subtitle="Catálogo completo do Detran-GO" />
      <Screen>
        <div className="grid grid-cols-2 gap-3">
          {allServices.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={s.to} className="flex h-full flex-col gap-3 rounded-2xl surface-card p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">
                  <DynamicIcon name={s.icon} size={20} />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-[var(--text-primary)]">{s.title}</p>
                  <p className="mt-1 text-[11px] leading-snug text-[var(--text-secondary)]">{s.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Screen>
    </div>
  );
}
