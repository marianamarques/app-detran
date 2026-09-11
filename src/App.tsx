import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import PhoneShell from "./components/PhoneShell";
import { MainLayout, PlainLayout } from "./components/Layouts";
import { RequireAuth, RedirectIfAuth } from "./components/Guards";

import Boot from "./pages/Boot";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CNH from "./pages/CNH";
import Veiculos from "./pages/Veiculos";
import VeiculoDetail from "./pages/VeiculoDetail";
import Debitos from "./pages/Debitos";
import DebitoDetail from "./pages/DebitoDetail";
import Agendamentos from "./pages/Agendamentos";
import AgendamentoNovo from "./pages/AgendamentoNovo";
import Notificacoes from "./pages/Notificacoes";
import Perfil from "./pages/Perfil";
import Ajuda from "./pages/Ajuda";
import Servicos from "./pages/Servicos";
import Boletim from "./pages/Boletim";
import Certidoes from "./pages/Certidoes";
import Transferencia from "./pages/Transferencia";
import SegundaViaPlaca from "./pages/SegundaViaPlaca";
import Cfc from "./pages/Cfc";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <PhoneShell>
          <Routes>
            <Route path="/" element={<Boot />} />
            <Route path="/splash" element={<Splash />} />
            <Route
              path="/login"
              element={
                <RedirectIfAuth>
                  <Login />
                </RedirectIfAuth>
              }
            />

            <Route
              element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/veiculos" element={<Veiculos />} />
              <Route path="/debitos" element={<Debitos />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>

            <Route
              element={
                <RequireAuth>
                  <PlainLayout />
                </RequireAuth>
              }
            >
              <Route path="/cnh" element={<CNH />} />
              <Route path="/veiculos/:id" element={<VeiculoDetail />} />
              <Route path="/debitos/:id" element={<DebitoDetail />} />
              <Route path="/agendamentos/novo" element={<AgendamentoNovo />} />
              <Route path="/notificacoes" element={<Notificacoes />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/boletim" element={<Boletim />} />
              <Route path="/certidoes" element={<Certidoes />} />
              <Route path="/transferencia" element={<Transferencia />} />
              <Route path="/segunda-via-placa" element={<SegundaViaPlaca />} />
              <Route path="/cfc" element={<Cfc />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneShell>
      </HashRouter>
    </AppProvider>
  );
}
