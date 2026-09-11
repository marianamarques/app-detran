import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BottomNav from "./BottomNav";

export function MainLayout() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <BottomNav />
    </>
  );
}

export function PlainLayout() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
}
