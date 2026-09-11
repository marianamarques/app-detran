import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, CreditCard, FileText, QrCode, X } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { Card, PrimaryButton, StatusPill, currency } from "../components/ui";

type Method = "pix" | "boleto" | "cartao";
type Step = "closed" | "method" | "pay" | "processing" | "success";

export default function DebitoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { debits, payDebit } = useApp();
  const debit = debits.find((d) => d.id === id);
  const [step, setStep] = useState<Step>("closed");
  const [method, setMethod] = useState<Method | null>(null);
  const [copied, setCopied] = useState(false);

  if (!debit) return <Navigate to="/debitos" replace />;

  const canPay = debit.status !== "pago" && debit.value > 0;

  const confirmPayment = async () => {
    setStep("processing");
    await payDebit(debit.id, method ?? "pix");
    setStep("success");
  };

  const closeSheet = () => {
    setStep("closed");
    setMethod(null);
    setCopied(false);
  };

  return (
    <div className="flex h-full flex-col relative">
      <TopBar title="Detalhes do débito" subtitle={debit.code} />
      <Screen>
        <Card className="mb-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">{debit.orgao}</p>
              <p className="font-display text-base font-bold text-[var(--text-primary)]">{debit.description}</p>
            </div>
            <StatusPill status={debit.status} />
          </div>
          {debit.infraction && (
            <p className="mb-3 rounded-xl bg-[var(--surface-soft)] px-3 py-2 text-xs text-[var(--text-secondary)]">{debit.infraction}</p>
          )}
          <p className="font-display text-3xl font-extrabold text-[var(--text-primary)]">
            {debit.value > 0 ? currency(debit.value) : "Isento"}
          </p>
          {debit.installments && debit.status !== "pago" && (
            <p className="mt-1 text-xs text-[var(--text-secondary)]">ou em até {debit.installments}x no cartão</p>
          )}
        </Card>

        <Card className="mb-5">
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-[var(--border-soft)] pb-2">
              <dt className="text-[var(--text-secondary)]">Código</dt>
              <dd className="font-semibold text-[var(--text-primary)]">{debit.code}</dd>
            </div>
            {debit.vehiclePlate && (
              <div className="flex justify-between border-b border-[var(--border-soft)] pb-2 pt-2">
                <dt className="text-[var(--text-secondary)]">Veículo</dt>
                <dd className="font-semibold text-[var(--text-primary)]">{debit.vehiclePlate}</dd>
              </div>
            )}
            <div className="flex justify-between pt-2 border-b border-[var(--border-soft)] pb-2">
              <dt className="text-[var(--text-secondary)]">Vencimento</dt>
              <dd className="font-semibold text-[var(--text-primary)]">{debit.dueDate}</dd>
            </div>
            {debit.points && (
              <div className="flex justify-between pt-2">
                <dt className="text-[var(--text-secondary)]">Pontos na CNH</dt>
                <dd className="font-semibold text-red-500">+{debit.points} pts</dd>
              </div>
            )}
          </dl>
        </Card>

        {debit.infraction && debit.status !== "pago" && (
          <button className="mb-4 w-full rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]">
            Apresentar recurso / indicar condutor
          </button>
        )}

        {canPay && (
          <PrimaryButton className="w-full" onClick={() => setStep("method")}>
            Pagar agora
          </PrimaryButton>
        )}
        {!canPay && debit.status === "pago" && (
          <div className="rounded-2xl bg-brand-500/10 px-4 py-3 text-center text-sm font-semibold text-brand-700">
            Este débito já está quitado ✓
          </div>
        )}
      </Screen>

      <AnimatePresence>
        {step !== "closed" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={step === "processing" ? undefined : closeSheet}
              className="absolute inset-0 z-40 bg-black/40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto rounded-t-3xl surface-card p-5 safe-bottom"
            >
              {step !== "processing" && step !== "success" && (
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-base font-bold text-[var(--text-primary)]">
                    {step === "method" ? "Forma de pagamento" : "Finalizar pagamento"}
                  </p>
                  <button onClick={closeSheet} className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-soft)]">
                    <X size={15} />
                  </button>
                </div>
              )}

              {step === "method" && (
                <div className="space-y-3">
                  {(
                    [
                      { id: "pix", label: "Pix", desc: "Aprovação imediata", icon: QrCode },
                      { id: "boleto", label: "Boleto bancário", desc: "Compensação em até 2 dias úteis", icon: FileText },
                      { id: "cartao", label: "Cartão de crédito", desc: `em até ${debit.installments ?? 1}x`, icon: CreditCard },
                    ] as const
                  ).map(({ id: mid, label, desc, icon: Icon }) => (
                    <button
                      key={mid}
                      onClick={() => {
                        setMethod(mid);
                        setStep("pay");
                      }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-[var(--border-soft)] p-3.5 text-left active:scale-[0.98] transition-transform"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                        <Icon size={18} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-[var(--text-primary)]">{label}</span>
                        <span className="block text-xs text-[var(--text-secondary)]">{desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === "pay" && method === "pix" && (
                <div className="flex flex-col items-center gap-4 py-2">
                  <div className="grid grid-cols-8 gap-[2px] rounded-xl bg-white p-2 shadow-inner">
                    {Array.from({ length: 64 }, (_, i) => (
                      <span key={i} className={((i * 13 + i) % 5) < 2 ? "h-3 w-3 bg-ink-950 rounded-[1px]" : "h-3 w-3"} />
                    ))}
                  </div>
                  <p className="text-center text-xs text-[var(--text-secondary)]">Escaneie o QR Code ou copie o código Pix abaixo</p>
                  <button
                    onClick={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex w-full items-center justify-between rounded-xl bg-[var(--surface-soft)] px-3 py-2.5 text-xs font-mono text-[var(--text-secondary)]"
                  >
                    <span className="truncate">00020126580014BR.GOV.BCB.PIX0136detran-go...</span>
                    {copied ? <Check size={14} className="text-brand-600 shrink-0" /> : <Copy size={14} className="shrink-0" />}
                  </button>
                  <PrimaryButton className="w-full" onClick={confirmPayment}>
                    Já efetuei o pagamento
                  </PrimaryButton>
                </div>
              )}

              {step === "pay" && method === "boleto" && (
                <div className="flex flex-col gap-4 py-2">
                  <div className="rounded-xl bg-[var(--surface-soft)] p-3 text-center font-mono text-xs tracking-tight text-[var(--text-primary)]">
                    23793.38128 60007.937046 12000.063305 8 99230000{Math.round(debit.value)}
                  </div>
                  <button
                    onClick={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl surface-card py-3 text-sm font-semibold text-[var(--text-primary)]"
                  >
                    {copied ? <Check size={16} className="text-brand-600" /> : <Copy size={16} />}
                    {copied ? "Código copiado" : "Copiar linha digitável"}
                  </button>
                  <PrimaryButton className="w-full" onClick={confirmPayment}>
                    Simular compensação
                  </PrimaryButton>
                </div>
              )}

              {step === "pay" && method === "cartao" && (
                <div className="flex flex-col gap-3 py-2">
                  <input placeholder="Número do cartão" defaultValue="4532 •••• •••• 1189" className="rounded-xl border border-[var(--border-soft)] bg-transparent px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none" />
                  <div className="flex gap-3">
                    <input placeholder="Validade" defaultValue="09/31" className="flex-1 rounded-xl border border-[var(--border-soft)] bg-transparent px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none" />
                    <input placeholder="CVV" defaultValue="•••" className="w-24 rounded-xl border border-[var(--border-soft)] bg-transparent px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none" />
                  </div>
                  <PrimaryButton className="w-full mt-1" onClick={confirmPayment}>
                    Pagar {currency(debit.value)}
                  </PrimaryButton>
                </div>
              )}

              {step === "processing" && (
                <div className="flex flex-col items-center gap-4 py-10">
                  <span className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Processando pagamento…</p>
                  <p className="text-xs text-[var(--text-secondary)]">Isso é só uma simulação, aguarde um instante.</p>
                </div>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center gap-4 py-8">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white"
                  >
                    <Check size={30} />
                  </motion.span>
                  <p className="font-display text-lg font-bold text-[var(--text-primary)]">Pagamento confirmado!</p>
                  <p className="text-center text-xs text-[var(--text-secondary)]">
                    Comprovante enviado para seu e-mail cadastrado.
                  </p>
                  <PrimaryButton
                    className="w-full"
                    onClick={() => {
                      closeSheet();
                      navigate("/debitos");
                    }}
                  >
                    Concluir
                  </PrimaryButton>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
