import type { ReactNode } from "react";

export default function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-[var(--bg)] lg:flex lg:items-center lg:justify-center lg:gap-16 lg:p-10 relative overflow-hidden">
      {/* Decorative background — only meaningful on desktop where the frame floats on a canvas */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
      </div>

      <div className="hidden lg:flex flex-col gap-6 max-w-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/30">
            <span className="font-display font-extrabold text-white text-lg">G</span>
          </div>
          <span className="font-display text-xl font-bold text-[var(--text-primary)]">Detran Go On</span>
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-tight text-[var(--text-primary)]">
          O Detran-GO na palma da sua mão.
        </h1>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed">
          Protótipo navegável e 100% funcional do novo aplicativo Go On — CNH Digital,
          veículos, débitos, multas e agendamentos em um só lugar. Todos os dados são
          fictícios, feitos para simular a experiência real do app.
        </p>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          Protótipo interativo · dados mockados
        </div>
      </div>

      {/* Phone frame */}
      <div className="relative w-full h-[100dvh] lg:h-[900px] lg:w-[428px] lg:rounded-[3rem] lg:border-[10px] lg:border-ink-950 lg:shadow-2xl lg:shadow-black/40 bg-[var(--bg)] overflow-hidden shrink-0">
        <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-50 h-7 w-36 bg-ink-950 rounded-b-2xl" />
        <div className="relative h-full w-full overflow-hidden flex flex-col lg:pt-7">{children}</div>
      </div>
    </div>
  );
}
