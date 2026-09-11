export type DebitStatus = "pendente" | "pago" | "vencido";
export type AppointmentStatus = "agendado" | "concluido" | "cancelado";

export interface Vehicle {
  id: string;
  plate: string;
  renavam: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  gradient: string;
  status: "regular" | "pendencia";
  crlvYear: number;
  ipvaStatus: DebitStatus;
  licensingDue: string;
  km: number;
}

export interface Debit {
  id: string;
  type: "Multa" | "IPVA" | "Licenciamento" | "DPVAT";
  description: string;
  infraction?: string;
  vehiclePlate?: string;
  value: number;
  dueDate: string;
  status: DebitStatus;
  orgao: string;
  code: string;
  points?: number;
  installments?: number;
}

export interface Appointment {
  id: string;
  service: string;
  unit: string;
  address: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  protocol: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "alerta" | "info" | "sucesso" | "cobranca";
}

export interface UserProfile {
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  avatarInitials: string;
  cnh: {
    number: string;
    category: string;
    validity: string;
    firstLicense: string;
    status: "regular" | "atencao" | "suspensa";
    points: number;
    maxPoints: number;
  };
}

export const mockUser: UserProfile = {
  name: "Mariana Marques",
  cpf: "012.345.678-90",
  rg: "5.432.109 SSP-GO",
  birthDate: "14/03/1994",
  email: "mariana.marques@email.com",
  phone: "(62) 99123-4567",
  address: "Rua T-30, 1200 — Setor Bueno, Goiânia - GO",
  avatarInitials: "MM",
  cnh: {
    number: "01234567890",
    category: "AB",
    validity: "22/08/2031",
    firstLicense: "22/08/2012",
    status: "regular",
    points: 5,
    maxPoints: 20,
  },
};

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "PQR-4E21",
    renavam: "01234567890",
    brand: "Chevrolet",
    model: "Onix Plus LTZ",
    year: 2022,
    color: "Prata",
    gradient: "from-slate-500 via-slate-600 to-slate-800",
    status: "pendencia",
    crlvYear: 2026,
    ipvaStatus: "pendente",
    licensingDue: "31/03/2026",
    km: 34210,
  },
  {
    id: "v2",
    plate: "OJU-1B87",
    renavam: "09876543210",
    brand: "Honda",
    model: "CG 160 Titan",
    year: 2021,
    color: "Vermelha",
    gradient: "from-brand-500 via-brand-600 to-brand-800",
    status: "regular",
    crlvYear: 2026,
    ipvaStatus: "pago",
    licensingDue: "15/05/2026",
    km: 18790,
  },
];

export const mockDebits: Debit[] = [
  {
    id: "d1",
    type: "Multa",
    description: "Avançar o sinal vermelho do semáforo",
    infraction: "Art. 208 CTB · Gravíssima",
    vehiclePlate: "PQR-4E21",
    value: 293.47,
    dueDate: "28/09/2026",
    status: "pendente",
    orgao: "DETRAN-GO",
    code: "60501-1",
    points: 7,
  },
  {
    id: "d2",
    type: "IPVA",
    description: "IPVA 2026 — Cota única",
    vehiclePlate: "PQR-4E21",
    value: 842.15,
    dueDate: "15/03/2026",
    status: "pendente",
    orgao: "SEFAZ-GO",
    code: "IPVA-2026-0234",
    installments: 3,
  },
  {
    id: "d3",
    type: "Licenciamento",
    description: "Taxa de licenciamento anual",
    vehiclePlate: "OJU-1B87",
    value: 156.9,
    dueDate: "15/05/2026",
    status: "pago",
    orgao: "DETRAN-GO",
    code: "LIC-2026-8871",
  },
  {
    id: "d4",
    type: "Multa",
    description: "Estacionar em local proibido",
    infraction: "Art. 181 CTB · Leve",
    vehiclePlate: "OJU-1B87",
    value: 88.38,
    dueDate: "02/06/2025",
    status: "vencido",
    orgao: "AMT Goiânia",
    code: "60219-4",
    points: 3,
  },
  {
    id: "d5",
    type: "DPVAT",
    description: "Seguro obrigatório DPVAT 2026",
    vehiclePlate: "PQR-4E21",
    value: 0,
    dueDate: "—",
    status: "pago",
    orgao: "Seguradora Líder",
    code: "DPVAT-2026",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    service: "Exame Médico e Psicológico",
    unit: "CFC Vida Nova",
    address: "Av. T-9, 855 — Setor Bueno, Goiânia",
    date: "18/09/2026",
    time: "09:30",
    status: "agendado",
    protocol: "GO-EX-88213",
  },
  {
    id: "a2",
    service: "Renovação da CNH",
    unit: "DETRAN Sede Goiânia",
    address: "Av. Anhanguera, 6440 — Setor Coimbra",
    date: "02/07/2026",
    time: "14:00",
    status: "concluido",
    protocol: "GO-REN-77120",
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Multa registrada",
    message: "Uma nova multa foi registrada para o veículo PQR-4E21.",
    date: "Hoje, 08:12",
    read: false,
    type: "alerta",
  },
  {
    id: "n2",
    title: "Agendamento confirmado",
    message: "Seu exame médico foi confirmado para 18/09 às 09:30.",
    date: "Ontem, 17:40",
    read: false,
    type: "sucesso",
  },
  {
    id: "n3",
    title: "IPVA 2026 disponível",
    message: "A guia do IPVA 2026 já está disponível para pagamento com desconto na cota única.",
    date: "há 2 dias",
    read: true,
    type: "cobranca",
  },
  {
    id: "n4",
    title: "Novidade no app",
    message: "Agora você pode compartilhar sua CNH Digital por link temporário.",
    date: "há 5 dias",
    read: true,
    type: "info",
  },
];

export const services = [
  { id: "cnh", title: "CNH Digital", desc: "Carteira, pontos e categorias", icon: "IdCard", to: "/cnh", color: "from-brand-500 to-brand-700" },
  { id: "veiculos", title: "Veículos", desc: "CRLV digital e documentos", icon: "Car", to: "/veiculos", color: "from-sky-500 to-sky-700" },
  { id: "debitos", title: "Débitos e Multas", desc: "Consulte e pague on-line", icon: "Receipt", to: "/debitos", color: "from-amber-500 to-orange-600" },
  { id: "agendamentos", title: "Agendamentos", desc: "Exames e serviços", icon: "CalendarDays", to: "/agendamentos", color: "from-violet-500 to-purple-700" },
  { id: "bo", title: "Boletim de Ocorrência", desc: "Registrar sinistro ou furto", icon: "ShieldAlert", to: "/boletim", color: "from-rose-500 to-red-700" },
  { id: "servicos", title: "Todos os serviços", desc: "Catálogo completo", icon: "LayoutGrid", to: "/servicos", color: "from-teal-500 to-emerald-700" },
];

export const allServices = [
  { title: "CNH Digital", desc: "Sua carteira sempre com você", icon: "IdCard", to: "/cnh" },
  { title: "Renovar CNH", desc: "Solicite a renovação online", icon: "RefreshCcw", to: "/agendamentos/novo" },
  { title: "CRLV Digital", desc: "Documento do veículo", icon: "FileBadge", to: "/veiculos" },
  { title: "Débitos e Multas", desc: "IPVA, licenciamento e multas", icon: "Receipt", to: "/debitos" },
  { title: "Agendar Exame", desc: "Médico e psicológico", icon: "Stethoscope", to: "/agendamentos/novo" },
  { title: "Boletim de Ocorrência", desc: "Registre online", icon: "ShieldAlert", to: "/boletim" },
  { title: "Certidões", desc: "Negativa de débitos e pontuação", icon: "FileCheck2", to: "/certidoes" },
  { title: "Transferência de Veículo", desc: "Comunicação de venda", icon: "ArrowLeftRight", to: "/transferencia" },
  { title: "Segunda via de placa", desc: "Solicite emplacamento", icon: "Hash", to: "/segunda-via-placa" },
  { title: "Escola / CFC", desc: "Encontre autoescolas", icon: "GraduationCap", to: "/cfc" },
  { title: "Central de Ajuda", desc: "Fale com o Detran", icon: "MessageCircleQuestion", to: "/ajuda" },
  { title: "Configurações", desc: "Perfil, tema e segurança", icon: "Settings", to: "/perfil" },
];
