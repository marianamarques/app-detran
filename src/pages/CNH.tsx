import { useState } from "react";
import { motion } from "framer-motion";
import { Download, RotateCw, Share2, User as UserIcon } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, StatusPill } from "../components/ui";

function QrFake() {
  const seed = 91;
  const cells = Array.from({ length: 81 }, (_, i) => ((i * seed + i * i) % 7) < 3);
  return (
    <div className="grid grid-cols-9 gap-[2px] h-28 w-28 rounded-lg bg-white p-1.5">
      {cells.map((on, i) => (
        <span key={i} className={on ? "bg-ink-950 rounded-[1px]" : "bg-transparent"} />
      ))}
    </div>
  );
}

export default function CNH() {
  const { user } = useApp();
  const [flipped, setFlipped] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const pct = Math.round((user.cnh.points / user.cnh.maxPoints) * 100);

  return (
    <div className="flex h-full flex-col">
      <TopBar title="CNH Digital" subtitle="Documento com validade nacional" />
      <Screen>
        <div style={{ perspective: 1200 }} className="mb-5">
          <motion.div
            onClick={() => setFlipped((f) => !f)}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-56 w-full cursor-pointer"
          >
            {/* front */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900 p-4 text-white shadow-xl"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Carteira Nacional de Habilitação</p>
                  <p className="text-[10px] text-white/50">República Federativa do Brasil</p>
                </div>
                <span className="font-display text-sm font-extrabold">GO</span>
              </div>
              <div className="mt-4 flex gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
                  <UserIcon size={30} className="text-white/80" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base font-bold">{user.name}</p>
                  <p className="text-xs text-white/70">CPF {user.cpf}</p>
                  <p className="text-xs text-white/70">Nº Registro {user.cnh.number}</p>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-white/60">Categoria</p>
                  <p className="font-display text-lg font-extrabold">{user.cnh.category}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/60">Validade</p>
                  <p className="text-sm font-semibold">{user.cnh.validity}</p>
                </div>
                <StatusPill status={user.cnh.status} />
              </div>
            </div>

            {/* back */}
            <div
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-ink-900 p-4 text-white shadow-xl"
            >
              <QrFake />
              <p className="text-center text-[11px] text-white/60 max-w-[220px]">
                Aponte a câmera do agente de trânsito para validar sua CNH digital com assinatura eletrônica.
              </p>
              <p className="font-mono text-[10px] tracking-wider text-white/40">SHA-256 · 8F2C-91AB-44D0-77E1</p>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="mx-auto mb-5 flex items-center gap-1.5 text-xs font-semibold text-brand-600"
        >
          <RotateCw size={13} /> Girar cartão
        </button>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => notify("Link de compartilhamento gerado (válido por 5 min).")}
            className="flex items-center justify-center gap-2 rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Share2 size={16} /> Compartilhar
          </button>
          <button
            onClick={() => notify("PDF da CNH salvo em Downloads.")}
            className="flex items-center justify-center gap-2 rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Download size={16} /> Baixar PDF
          </button>
        </div>

        <Card className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-[var(--text-primary)]">Pontuação na carteira</p>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">{user.cnh.points}/{user.cnh.maxPoints} pts</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-soft)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${pct > 60 ? "bg-red-500" : pct > 30 ? "bg-amber-500" : "bg-brand-500"}`}
            />
          </div>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Você está com {user.cnh.points} pontos. Ao atingir 20, sua CNH pode ser suspensa.
          </p>
        </Card>

        <Card className="mb-4">
          <p className="mb-3 text-sm font-bold text-[var(--text-primary)]">Categorias habilitadas</p>
          <div className="flex gap-2">
            {user.cnh.category.split("").map((c) => (
              <span key={c} className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 font-display font-bold text-brand-700">
                {c}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="mb-2 text-sm font-bold text-[var(--text-primary)]">Dados do condutor</p>
          <dl className="space-y-2 text-xs">
            {[
              ["Primeira habilitação", user.cnh.firstLicense],
              ["RG", user.rg],
              ["Data de nascimento", user.birthDate],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[var(--border-soft)] pb-2 last:border-0 last:pb-0">
                <dt className="text-[var(--text-secondary)]">{k}</dt>
                <dd className="font-semibold text-[var(--text-primary)]">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Screen>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ink-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}
