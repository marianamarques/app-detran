import { motion } from "framer-motion";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { useApp } from "../context/AppContext";
import { DynamicIcon, EmptyState } from "../components/ui";

const typeStyle: Record<string, { icon: string; classes: string }> = {
  alerta: { icon: "AlertTriangle", classes: "bg-amber-500/12 text-amber-600" },
  sucesso: { icon: "CheckCircle2", classes: "bg-brand-500/12 text-brand-600" },
  cobranca: { icon: "Receipt", classes: "bg-sky-500/12 text-sky-600" },
  info: { icon: "Info", classes: "bg-violet-500/12 text-violet-600" },
};

export default function Notificacoes() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Notificações"
        subtitle={`${notifications.filter((n) => !n.read).length} não lidas`}
        right={
          <button onClick={markAllNotificationsRead} className="text-xs font-semibold text-brand-600 shrink-0">
            Marcar todas
          </button>
        }
      />
      <Screen>
        {notifications.length === 0 ? (
          <EmptyState icon="BellOff" title="Sem notificações" desc="Você está em dia, nada por aqui." />
        ) : (
          <div className="space-y-2">
            {notifications.map((n, i) => {
              const s = typeStyle[n.type] ?? typeStyle.info;
              return (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => markNotificationRead(n.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3.5 text-left transition-colors ${
                    n.read ? "surface-card" : "bg-brand-500/[0.06] border border-brand-500/20"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${s.classes}`}>
                    <DynamicIcon name={s.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-bold text-[var(--text-primary)]">{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--text-secondary)]">{n.message}</span>
                    <span className="mt-1 block text-[10px] text-[var(--text-secondary)]/70">{n.date}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </Screen>
    </div>
  );
}
