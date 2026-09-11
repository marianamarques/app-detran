import RequestFlow from "./RequestFlow";

export default function SegundaViaPlaca() {
  return (
    <RequestFlow
      config={{
        title: "2ª via de placa",
        subtitle: "Solicitação de emplacamento",
        prompt: "Qual o motivo da solicitação?",
        icon: "Hash",
        prefix: "PLC",
        successTitle: "Solicitação enviada!",
        successDesc: "Compareça a uma unidade credenciada com o protocolo para retirar a nova placa.",
        options: [
          { id: "perda", label: "Perda", icon: "HelpCircle" },
          { id: "furto", label: "Furto ou roubo", icon: "ShieldAlert" },
          { id: "dano", label: "Placa danificada ou ilegível", icon: "TriangleAlert" },
          { id: "mercosul", label: "Padrão Mercosul", desc: "Adequação voluntária", icon: "Globe" },
        ],
      }}
    />
  );
}
