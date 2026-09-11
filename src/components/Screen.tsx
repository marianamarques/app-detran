import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Screen({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`flex-1 overflow-y-auto no-scrollbar ${padded ? "px-4 py-4" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
