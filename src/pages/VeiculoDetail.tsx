import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, StatusPill, currency, DynamicIcon } from "../components/ui";

export default function VeiculoDetail() {
  const { id } = useParams();
  const { vehicles, debits } = useApp();
  const vehicle = vehicles.find((v) => v.id === id);
  const [toast, setToast] = useState<string | null>(null);

  if (!vehicle) return <Navigate to="/veiculos" replace />;

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const relatedDebits = debits.filter((d) => d.vehiclePlate === vehicle.plate && d.status !== "pago");

  return (
    <div className="flex h-full flex-col">
      <TopBar title={vehicle.model} subtitle={vehicle.plate} />
      <Screen>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative mb-5 overflow-hidden rounded-3xl bg-gradient-to-br ${vehicle.gradient} p-4 text-white shadow-lg`}
        >
          <DynamicIcon name="Car" size={90} className="absolute -bottom-4 -right-4 text-white/10" />
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">CRLV Digital {vehicle.crlvYear}</p>
            <StatusPill status={vehicle.status} />
          </div>
          <p className="mt-3 font-display text-xl font-bold">{vehicle.brand} {vehicle.model}</p>
          <p className="font-mono text-lg tracking-[0.2em] mt-1">{vehicle.plate}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/80">
            <span>Ano {vehicle.year}</span>
            <span>Cor {vehicle.color}</span>
            <span>Renavam {vehicle.renavam}</span>
            <span>{vehicle.km.toLocaleString("pt-BR")} km</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => notify("CRLV digital salvo em PDF.")}
            className="flex items-center justify-center gap-2 rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Download size={16} /> Baixar CRLV
          </button>
          <button
            onClick={() => notify("Link de compartilhamento copiado.")}
            className="flex items-center justify-center gap-2 rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Share2 size={16} /> Compartilhar
          </button>
        </div>

        {relatedDebits.length > 0 && (
          <div className="mb-5">
            <p className="mb-3 px-1 text-sm font-bold text-[var(--text-primary)]">Pendências deste veículo</p>
            <div className="space-y-2">
              {relatedDebits.map((d) => (
                <Link key={d.id} to={`/debitos/${d.id}`}>
                  <Card className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{d.type}</p>
                      <p className="text-xs text-[var(--text-secondary)]">Vence em {d.dueDate}</p>
                    </div>
                    <p className="font-display font-bold text-amber-600">{currency(d.value)}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Card className="mb-4">
          <p className="mb-3 text-sm font-bold text-[var(--text-primary)]">Situação do licenciamento</p>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-[var(--border-soft)] pb-2">
              <dt className="text-[var(--text-secondary)]">IPVA 2026</dt>
              <dd><StatusPill status={vehicle.ipvaStatus} /></dd>
            </div>
            <div className="flex justify-between border-b border-[var(--border-soft)] pb-2 pt-2">
              <dt className="text-[var(--text-secondary)]">Vencimento do licenciamento</dt>
              <dd className="font-semibold text-[var(--text-primary)]">{vehicle.licensingDue}</dd>
            </div>
            <div className="flex justify-between pt-2">
              <dt className="text-[var(--text-secondary)]">Renavam</dt>
              <dd className="font-semibold text-[var(--text-primary)]">{vehicle.renavam}</dd>
            </div>
          </dl>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/transferencia" className="rounded-2xl surface-card p-3 text-center text-xs font-semibold text-[var(--text-primary)]">
            Comunicar venda
          </Link>
          <Link to="/segunda-via-placa" className="rounded-2xl surface-card p-3 text-center text-xs font-semibold text-[var(--text-primary)]">
            2ª via de placa
          </Link>
        </div>
      </Screen>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-ink-900 px-4 py-2.5 text-xs font-medium text-white shadow-xl"
        >
          {toast}
        </motion.div>
      )}
    </div>
  );
}
