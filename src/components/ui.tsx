import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as Icons from "lucide-react";
import clsx from "clsx";

export function DynamicIcon({ name, ...props }: { name: string; size?: number; className?: string; strokeWidth?: number }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.CircleHelp;
  return <Icon {...props} />;
}

export function IconTile({
  icon,
  gradient = "from-brand-500 to-brand-700",
  size = 44,
}: {
  icon: string;
  gradient?: string;
  size?: number;
}) {
  return (
    <div
      className={clsx(
        "shrink-0 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-md",
        gradient
      )}
      style={{ width: size, height: size, boxShadow: "0 8px 18px -8px rgba(5,150,105,0.45)" }}
    >
      <DynamicIcon name={icon} size={size * 0.5} className="text-white" strokeWidth={2} />
    </div>
  );
}

const statusMap: Record<string, { label: string; classes: string; dot: string }> = {
  regular: { label: "Regular", classes: "bg-brand-500/12 text-brand-700 dark:text-brand-300", dot: "bg-brand-500" },
  pendencia: { label: "Pendência", classes: "bg-amber-500/12 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  pendente: { label: "Pendente", classes: "bg-amber-500/12 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  pago: { label: "Pago", classes: "bg-brand-500/12 text-brand-700 dark:text-brand-300", dot: "bg-brand-500" },
  vencido: { label: "Vencido", classes: "bg-red-500/12 text-red-600 dark:text-red-400", dot: "bg-red-500" },
  agendado: { label: "Agendado", classes: "bg-sky-500/12 text-sky-700 dark:text-sky-300", dot: "bg-sky-500" },
  concluido: { label: "Concluído", classes: "bg-brand-500/12 text-brand-700 dark:text-brand-300", dot: "bg-brand-500" },
  cancelado: { label: "Cancelado", classes: "bg-ink-400/15 text-ink-500 dark:text-ink-300", dot: "bg-ink-400" },
  atencao: { label: "Atenção", classes: "bg-amber-500/12 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  suspensa: { label: "Suspensa", classes: "bg-red-500/12 text-red-600 dark:text-red-400", dot: "bg-red-500" },
};

export function StatusPill({ status }: { status: string }) {
  const s = statusMap[status] ?? { label: status, classes: "bg-ink-400/15 text-ink-500", dot: "bg-ink-400" };
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", s.classes)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function PrimaryButton({
  children,
  className,
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={clsx(
        "relative flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 px-5 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all active:scale-[0.98] disabled:opacity-60",
        className
      )}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}

export function GhostButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-2xl surface-card px-5 py-3.5 font-semibold text-[var(--text-primary)] transition-all active:scale-[0.98]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-1 mb-3">
      <h2 className="font-display font-bold text-[15px] text-[var(--text-primary)]">{children}</h2>
      {action}
    </div>
  );
}

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={clsx("surface-card rounded-3xl p-4", className)}>
      {children}
    </div>
  );
}

export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <div className="h-16 w-16 rounded-full bg-brand-500/10 flex items-center justify-center">
        <DynamicIcon name={icon} size={28} className="text-brand-600" />
      </div>
      <p className="font-display font-bold text-[var(--text-primary)]">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] max-w-[240px]">{desc}</p>
    </div>
  );
}

export function currency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
