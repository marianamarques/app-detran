import RequestFlow from "./RequestFlow";

export default function Transferencia() {
  return (
    <RequestFlow
      config={{
        title: "Transferência de veículo",
        subtitle: "Comunicação de venda",
        prompt: "Qual o motivo da comunicação?",
        icon: "ArrowLeftRight",
        prefix: "TRF",
        successTitle: "Comunicação registrada!",
        successDesc: "A venda foi comunicada ao Detran-GO e você fica isento de futuras multas do comprador.",
        options: [
          { id: "venda", label: "Comunicação de venda", desc: "Já vendi o veículo para terceiros", icon: "HandCoins" },
          { id: "novo", label: "Cadastrar novo veículo", desc: "Adicionar veículo adquirido ao meu CPF", icon: "Plus" },
          { id: "leilao", label: "Aquisição em leilão", desc: "Transferência via leilão público", icon: "Gavel" },
        ],
      }}
    />
  );
}
