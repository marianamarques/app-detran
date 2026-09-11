import { useState } from "react";
import { motion } from "framer-motion";
import { Fingerprint, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PrimaryButton } from "../components/ui";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("012.345.678-90");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setLoading(true);
    await login(cpf, password);
    setLoading(false);
    navigate("/home", { replace: true });
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto no-scrollbar bg-[var(--bg)] safe-top">
      <div className="relative h-44 shrink-0 overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-black/10 blur-2xl" />
        <div className="relative flex h-full flex-col justify-end p-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
            <span className="font-display text-xl font-extrabold text-brand-600">G</span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-white">Olá! Bem-vindo(a)</h1>
          <p className="text-sm text-white/75">Acesse com sua conta gov.br ou CPF e senha</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 px-6 pt-6 pb-8 flex flex-col gap-4"
      >
        <button
          onClick={doLogin}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#1351B4] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#1351B4]/30 active:scale-[0.98] transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FFCD07" />
            <path d="M7 12.5l3 3 7-7" stroke="#1351B4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Entrar com gov.br
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-[var(--border-soft)]" />
          <span className="text-xs text-[var(--text-secondary)]">ou entre com CPF</span>
          <span className="h-px flex-1 bg-[var(--border-soft)]" />
        </div>

        <label className="flex items-center gap-3 rounded-2xl surface-card px-4 py-3.5">
          <User size={18} className="text-[var(--text-secondary)]" />
          <input
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            className="flex-1 bg-transparent text-sm font-medium text-[var(--text-primary)] outline-none"
          />
        </label>
        <label className="flex items-center gap-3 rounded-2xl surface-card px-4 py-3.5">
          <Lock size={18} className="text-[var(--text-secondary)]" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
            className="flex-1 bg-transparent text-sm font-medium text-[var(--text-primary)] outline-none"
          />
        </label>

        <div className="flex justify-end">
          <button className="text-xs font-semibold text-brand-600">Esqueci minha senha</button>
        </div>

        <PrimaryButton onClick={doLogin} loading={loading} className="mt-1 w-full">
          {loading ? "Entrando…" : "Entrar"}
        </PrimaryButton>

        <button
          onClick={doLogin}
          className="mx-auto mt-2 flex flex-col items-center gap-1.5 text-[var(--text-secondary)]"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full surface-card">
            <Fingerprint size={26} className="text-brand-600" />
          </span>
          <span className="text-xs font-medium">Entrar com biometria</span>
        </button>

        <p className="mt-auto pt-6 text-center text-xs text-[var(--text-secondary)]">
          Ainda não tem conta? <span className="font-semibold text-brand-600">Cadastre-se</span>
        </p>
        <p className="text-center text-[10px] text-[var(--text-secondary)]/70">
          Protótipo — qualquer CPF/senha entra no app de demonstração.
        </p>
      </motion.div>
    </div>
  );
}
