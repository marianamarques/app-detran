import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { PrimaryButton, DynamicIcon } from "../components/ui";

const types = [
  { id: "furto", label: "Furto ou roubo de veículo", icon: "ShieldAlert" },
  { id: "acidente", label: "Acidente de trânsito", icon: "TriangleAlert" },
  { id: "perda", label: "Perda ou extravio de documento", icon: "FileX2" },
];

export default function Boletim() {
  const [type, setType] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [done, setDone] = useState<string | null>(null);

  if (done) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title="Boletim de Ocorrência" />
        <Screen className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white"
          >
            <Check size={34} />
          </motion.span>
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Boletim registrado!</h2>
          <p className="text-sm text-[var(--text-secondary)]">Protocolo <span className="font-mono font-bold">{done}</span></p>
          <p className="max-w-[260px] text-xs text-[var(--text-secondary)]">
            Você receberá o comprovante por e-mail e poderá acompanhar o andamento pelo app.
          </p>
        </Screen>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title="Boletim de Ocorrência" subtitle="Registro online — Detran-GO" />
      <Screen>
        <p className="mb-3 text-sm font-bold text-[var(--text-primary)]">O que aconteceu?</p>
        <div className="mb-5 space-y-2">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                type === t.id ? "border-brand-500 bg-brand-500/5" : "border-[var(--border-soft)]"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                <DynamicIcon name={t.icon} size={18} />
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{t.label}</span>
            </button>
          ))}
        </div>

        {type && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-2 text-sm font-bold text-[var(--text-primary)]">Descreva a ocorrência</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              placeholder="Conte com detalhes o que aconteceu, local, data e hora aproximada…"
              className="w-full rounded-2xl border border-[var(--border-soft)] bg-transparent p-3.5 text-sm text-[var(--text-primary)] outline-none"
            />
          </motion.div>
        )}
      </Screen>
      <div className="shrink-0 border-t border-[var(--border-soft)] p-4 safe-bottom">
        <PrimaryButton
          className="w-full"
          disabled={!type || desc.trim().length < 5}
          onClick={() => setDone(`BO-${Math.floor(100000 + Math.random() * 899999)}`)}
        >
          Registrar boletim
        </PrimaryButton>
      </div>
    </div>
  );
}
