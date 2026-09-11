import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { markBooted } from "./Boot";

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      markBooted();
      navigate(isAuthenticated ? "/home" : "/login", { replace: true });
    }, 1900);
    return () => clearTimeout(t);
  }, [navigate, isAuthenticated]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900">
      <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-black/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-2xl shadow-black/30"
      >
        <span className="absolute inset-0 rounded-[28px] border-2 border-white/60 animate-pulse-ring" />
        <span className="font-display text-4xl font-extrabold text-brand-600">G</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-white">Detran Go On</h1>
        <p className="mt-1 text-sm text-white/70">Governo de Goiás</p>
      </motion.div>

      <div className="absolute bottom-14 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-white/80"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-[11px] uppercase tracking-widest text-white/50">protótipo · dados fictícios</p>
      </div>
    </div>
  );
}
