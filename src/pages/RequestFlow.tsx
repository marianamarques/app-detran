import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { PrimaryButton, DynamicIcon } from "../components/ui";

export interface RequestOption {
  id: string;
  label: string;
  desc?: string;
  icon: string;
}

export interface RequestFlowConfig {
  title: string;
  subtitle: string;
  prompt: string;
  icon: string;
  options: RequestOption[];
  prefix: string;
  successTitle: string;
  successDesc: string;
}

export default function RequestFlow({ config }: { config: RequestFlowConfig }) {
  const { vehicles } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<string | null>(vehicles[0]?.id ?? null);
  const [protocol, setProtocol] = useState<string | null>(null);

  if (protocol) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title={config.title} />
        <Screen className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white"
          >
            <Check size={34} />
          </motion.span>
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">{config.successTitle}</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Protocolo <span className="font-mono font-bold">{protocol}</span>
          </p>
          <p className="max-w-[260px] text-xs text-[var(--text-secondary)]">{config.successDesc}</p>
        </Screen>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title={config.title} subtitle={config.subtitle} />
      <Screen>
        {vehicles.length > 0 && (
          <div className="mb-5">
            <p className="mb-2 px-1 text-sm font-bold text-[var(--text-primary)]">Veículo</p>
            <div className="flex gap-2">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVehicle(v.id)}
                  className={`flex-1 rounded-2xl border p-3 text-left transition-colors ${
                    vehicle === v.id ? "border-brand-500 bg-brand-500/5" : "border-[var(--border-soft)]"
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--text-primary)]">{v.plate}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">{v.model}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mb-2 px-1 text-sm font-bold text-[var(--text-primary)]">{config.prompt}</p>
        <div className="space-y-2">
          {config.options.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                selected === o.id ? "border-brand-500 bg-brand-500/5" : "border-[var(--border-soft)]"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <DynamicIcon name={o.icon} size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-[var(--text-primary)]">{o.label}</span>
                {o.desc && <span className="block text-xs text-[var(--text-secondary)]">{o.desc}</span>}
              </span>
            </button>
          ))}
        </div>
      </Screen>
      <div className="shrink-0 border-t border-[var(--border-soft)] p-4 safe-bottom">
        <PrimaryButton
          className="w-full"
          disabled={!selected}
          onClick={() => setProtocol(`${config.prefix}-${Math.floor(10000 + Math.random() * 89999)}`)}
        >
          Confirmar solicitação
        </PrimaryButton>
      </div>
    </div>
  );
}
