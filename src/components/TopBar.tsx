import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function TopBar({
  title,
  subtitle,
  right,
  transparent = false,
  onBack,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  transparent?: boolean;
  onBack?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`safe-top shrink-0 px-4 pb-3 pt-4 flex items-center gap-3 ${
        transparent ? "" : "border-b border-[var(--border-soft)]"
      }`}
    >
      <button
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="h-9 w-9 shrink-0 rounded-full surface-card flex items-center justify-center active:scale-90 transition-transform"
        aria-label="Voltar"
      >
        <ChevronLeft size={20} className="text-[var(--text-primary)]" />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="font-display font-bold text-[17px] leading-tight text-[var(--text-primary)] truncate">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-[var(--text-secondary)] truncate">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
