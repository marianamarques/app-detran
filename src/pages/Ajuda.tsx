import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { Card } from "../components/ui";

const faqs = [
  {
    q: "Como funciona a CNH Digital?",
    a: "A CNH Digital tem a mesma validade jurídica da carteira física. Ela é gerada com assinatura eletrônica e pode ser apresentada por QR Code para agentes de trânsito.",
  },
  {
    q: "Como pagar uma multa pelo aplicativo?",
    a: "Acesse Débitos e Multas, selecione o débito desejado e toque em 'Pagar agora'. Você pode pagar via Pix, boleto ou cartão de crédito.",
  },
  {
    q: "Posso indicar outro condutor em uma multa?",
    a: "Sim, na tela de detalhes do débito há a opção 'Apresentar recurso / indicar condutor' dentro do prazo estabelecido na notificação.",
  },
  {
    q: "Como renovar minha CNH?",
    a: "Vá em Agendamentos > Novo agendamento e escolha o serviço 'Renovação da CNH'. Você poderá escolher a unidade, data e horário.",
  },
];

export default function Ajuda() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex h-full flex-col">
      <TopBar title="Central de Ajuda" subtitle="Estamos aqui para te ajudar" />
      <Screen>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 rounded-2xl surface-card py-4">
            <MessageCircle size={20} className="text-brand-600" />
            <span className="text-xs font-semibold text-[var(--text-primary)]">Chat com atendente</span>
          </button>
          <a href="tel:08007070209" className="flex flex-col items-center gap-2 rounded-2xl surface-card py-4">
            <Phone size={20} className="text-brand-600" />
            <span className="text-xs font-semibold text-[var(--text-primary)]">0800 707 0209</span>
          </a>
        </div>

        <p className="mb-3 px-1 text-sm font-bold text-[var(--text-primary)]">Perguntas frequentes</p>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <Card key={f.q} className="p-0 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                  <ChevronDown size={16} className="text-[var(--text-secondary)] shrink-0" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-xs leading-relaxed text-[var(--text-secondary)]">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      </Screen>
    </div>
  );
}
