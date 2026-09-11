import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const BOOTED_KEY = "detran-goon-booted";

export default function Boot() {
  const { isAuthenticated } = useApp();

  if (typeof window !== "undefined" && window.sessionStorage.getItem(BOOTED_KEY)) {
    return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
  }
  return <Navigate to="/splash" replace />;
}

export function markBooted() {
  window.sessionStorage.setItem(BOOTED_KEY, "1");
}
