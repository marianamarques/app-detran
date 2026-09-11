import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { PrimaryButton, DynamicIcon } from "../components/ui";

const serviceOptions = [
  { id: "exame", title: "Exame Médico e Psicológico", icon: "Stethoscope" },
  { id: "renovacao", title: "Renovação da CNH", icon: "RefreshCcw" },
  { id: "prova", title: "Prova Teórica", icon: "FileCheck2" },
  { id: "vistoria", title: "Vistoria Veicular", icon: "Car" },
];

const units = [
  { id: "u1", name: "CFC Vida Nova", address: "Av. T-9, 855 — Setor Bueno, Goiânia" },
  { id: "u2", name: "DETRAN Sede Goiânia", address: "Av. Anhanguera, 6440 — Setor Coimbra" },
  { id: "u3", name: "Unidade Aparecida de Goiânia", address: "Av. Independência, 3200" },
];

const times = ["08:00", "09:30", "10:15", "13:00", "14:30", "16:00"];

function nextDays(n: number) {
  const arr = [];
  const d = new Date();
  let count = 0;
  while (arr.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      arr.push(new Date(d));
    }
    count++;
    if (count > 30) break;
  }
  return arr;
}

export default function AgendamentoNovo() {
  const navigate = useNavigate();
  const { addAppointment } = useApp();
  const days = useMemo(() => nextDays(8), []);

  const [step, setStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selectedService = serviceOptions.find((s) => s.id === service);
  const selectedUnit = units.find((u) => u.id === unit);

  const confirm = () => {
    addAppointment({
      id: `a-${Date.now()}`,
      service: selectedService?.title ?? "Serviço",
      unit: selectedUnit?.name ?? "",
      address: selectedUnit?.address ?? "",
      date: date ? date.toLocaleDateString("pt-BR") : "",
      time: time ?? "",
      status: "agendado",
      protocol: `GO-${Math.floor(10000 + Math.random() * 89999)}`,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex h-full flex-col">
        <TopBar title="Agendamento" onBack={() => navigate("/agendamentos")} />
        <Screen className="flex flex-col items-center justify-center text-center gap-4">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white"
          >
            <Check size={36} />
          </motion.span>
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">Agendamento confirmado!</h2>
          <p className="max-w-[260px] text-sm text-[var(--text-secondary)]">
            {selectedService?.title} em {date?.toLocaleDateString("pt-BR")} às {time}, na unidade {selectedUnit?.name}.
          </p>
          <PrimaryButton className="w-full mt-2" onClick={() => navigate("/agendamentos")}>
            Ver meus agendamentos
          </PrimaryButton>
        </Screen>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar title="Novo agendamento" subtitle={`Etapa ${step} de 4`} />
      <div className="flex gap-1.5 px-4 pb-2">
        {[1, 2, 3, 4].map((s) => (
          <span key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand-500" : "bg-[var(--surface-soft)]"}`} />
        ))}
      </div>
      <Screen>
        {step === 1 && (
          <div className="space-y-3">
            <p className="mb-1 text-sm font-bold text-[var(--text-primary)]">Qual serviço você precisa?</p>
            {serviceOptions.map((s) => (
              <button
                key={s.id}
                onClick={() => setService(s.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                  service === s.id ? "border-brand-500 bg-brand-500/5" : "border-[var(--border-soft)]"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                  <DynamicIcon name={s.icon} size={18} />
                </span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{s.title}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <p className="mb-1 text-sm font-bold text-[var(--text-primary)]">Escolha a unidade</p>
            {units.map((u) => (
              <button
                key={u.id}
                onClick={() => setUnit(u.id)}
                className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                  unit === u.id ? "border-brand-500 bg-brand-500/5" : "border-[var(--border-soft)]"
                }`}
              >
                <MapPin size={17} className="mt-0.5 shrink-0 text-brand-600" />
                <span>
                  <span className="block text-sm font-semibold text-[var(--text-primary)]">{u.name}</span>
                  <span className="block text-xs text-[var(--text-secondary)]">{u.address}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="mb-3 text-sm font-bold text-[var(--text-primary)]">Escolha a data</p>
            <div className="mb-6 grid grid-cols-4 gap-2">
              {days.map((d) => {
                const active = date?.toDateString() === d.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setDate(d)}
                    className={`flex flex-col items-center gap-0.5 rounded-2xl py-3 text-xs font-semibold transition-colors ${
                      active ? "bg-brand-600 text-white" : "surface-card text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="text-[10px] uppercase opacity-70">
                      {d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}
                    </span>
                    <span className="text-base font-bold">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
            <p className="mb-3 text-sm font-bold text-[var(--text-primary)]">Escolha o horário</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                    time === t ? "bg-brand-600 text-white" : "surface-card text-[var(--text-primary)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <p className="mb-1 text-sm font-bold text-[var(--text-primary)]">Confirme os dados</p>
            <div className="rounded-2xl surface-card divide-y divide-[var(--border-soft)] px-4">
              {[
                ["Serviço", selectedService?.title],
                ["Unidade", selectedUnit?.name],
                ["Endereço", selectedUnit?.address],
                ["Data", date?.toLocaleDateString("pt-BR")],
                ["Horário", time],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 text-xs">
                  <span className="text-[var(--text-secondary)]">{k}</span>
                  <span className="max-w-[60%] text-right font-semibold text-[var(--text-primary)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Screen>

      <div className="shrink-0 border-t border-[var(--border-soft)] p-4 safe-bottom">
        <PrimaryButton
          className="w-full"
          disabled={
            (step === 1 && !service) ||
            (step === 2 && !unit) ||
            (step === 3 && (!date || !time))
          }
          onClick={() => (step < 4 ? setStep(step + 1) : confirm())}
        >
          {step < 4 ? "Continuar" : "Confirmar agendamento"}
        </PrimaryButton>
      </div>
    </div>
  );
}
