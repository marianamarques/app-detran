import { Star, MapPin, Phone } from "lucide-react";
import TopBar from "../components/TopBar";
import Screen from "../components/Screen";
import { Card } from "../components/ui";

const cfcs = [
  { name: "CFC Vida Nova", rating: 4.8, distance: "1.2 km", address: "Av. T-9, 855 — Setor Bueno", phone: "(62) 3251-0044" },
  { name: "Autoescola Master Driver", rating: 4.6, distance: "2.4 km", address: "Av. 85, 1450 — Setor Marista", phone: "(62) 3241-8890" },
  { name: "CFC Rota Certa", rating: 4.4, distance: "3.1 km", address: "Rua 9, 320 — Setor Oeste", phone: "(62) 3223-1177" },
  { name: "Autoescola Trajeto", rating: 4.9, distance: "4.0 km", address: "Av. Independência, 980", phone: "(62) 3212-9900" },
];

export default function Cfc() {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Escolas / CFC" subtitle="Autoescolas credenciadas perto de você" />
      <Screen>
        <div className="space-y-3">
          {cfcs.map((c) => (
            <Card key={c.name}>
              <div className="mb-2 flex items-start justify-between">
                <p className="text-sm font-bold text-[var(--text-primary)]">{c.name}</p>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                  <Star size={13} className="fill-amber-500" /> {c.rating}
                </span>
              </div>
              <p className="mb-1 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <MapPin size={12} /> {c.address} · {c.distance}
              </p>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <Phone size={12} /> {c.phone}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-xl surface-card py-2 text-xs font-semibold text-[var(--text-primary)]">Ver no mapa</button>
                <button className="rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white">Entrar em contato</button>
              </div>
            </Card>
          ))}
        </div>
      </Screen>
    </div>
  );
}
