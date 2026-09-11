import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function RedirectIfAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return <>{children}</>;
}
