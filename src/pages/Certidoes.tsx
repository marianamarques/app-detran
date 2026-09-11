import RequestFlow from "./RequestFlow";

export default function Certidoes() {
  return (
    <RequestFlow
      config={{
        title: "Certidões",
        subtitle: "Emissão digital com validade jurídica",
        prompt: "Qual certidão você precisa?",
        icon: "FileCheck2",
        prefix: "CERT",
        successTitle: "Certidão emitida!",
        successDesc: "O documento foi gerado em PDF e enviado para o seu e-mail cadastrado.",
        options: [
          { id: "debitos", label: "Negativa de débitos", desc: "Comprova ausência de pendências", icon: "FileCheck2" },
          { id: "pontuacao", label: "Pontuação da CNH", desc: "Extrato de pontos e infrações", icon: "Gauge" },
          { id: "prontuario", label: "Prontuário do condutor", desc: "Histórico completo na CNH", icon: "FileText" },
          { id: "veiculo", label: "Histórico do veículo", desc: "Multas, sinistros e leilões", icon: "History" },
        ],
      }}
    />
  );
}
