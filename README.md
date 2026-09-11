# Detran Go On — Protótipo

Protótipo navegável e funcional (dados 100% mockados) do novo aplicativo **Go On** do
Detran Goiás. Construído para servir de referência de produto/UX para o novo app real —
com fluxos completos de login, CNH Digital, veículos, débitos/multas, pagamentos,
agendamentos, notificações, boletim de ocorrência e mais.

> ⚠️ Este é um protótipo de demonstração. Nenhum dado é real, nenhuma integração com
> sistemas do Detran-GO é feita e nenhum pagamento é processado de verdade — tudo roda
> no navegador com estado salvo em `localStorage`.

## ✨ Stack

- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4** — design system próprio (cores, tipografia, tokens de tema claro/escuro)
- **React Router (HashRouter)** — navegação 100% client-side, compatível com GitHub Pages
- **Framer Motion** — transições de tela, flip card da CNH, bottom sheets, microinterações
- **lucide-react** — ícones

## 📱 Funcionalidades

- **Splash + Login** — gov.br (mock), CPF/senha ou biometria
- **Home** — saudação, CNH resumida, alertas de pendências, atalhos de serviços, próximo agendamento, veículos
- **CNH Digital** — cartão com flip 3D (frente/verso com QR), pontuação, categorias, compartilhar/baixar (mock)
- **Veículos** — lista e detalhe com CRLV digital, pendências vinculadas, comunicar venda, 2ª via de placa
- **Débitos e Multas** — filtros, detalhe, e fluxo completo de pagamento (Pix / boleto / cartão) com bottom sheet e tela de sucesso
- **Agendamentos** — lista + wizard de novo agendamento (serviço → unidade → data/hora → confirmação)
- **Notificações** — central com marcação de lidas
- **Perfil** — dados pessoais, tema claro/escuro, logout
- **Central de Ajuda** — FAQ em acordeão, canais de contato
- **Boletim de Ocorrência, Certidões, Transferência de veículo, 2ª via de placa, CFCs** — fluxos mockados adicionais

Todo o estado (login, pagamentos, agendamentos, notificações, tema) é persistido em
`localStorage`, então as ações realizadas continuam refletidas ao navegar pelo app.

## 🖥️ Rodando localmente

```bash
npm install
npm run dev
```

## 🏗️ Build de produção

```bash
npm run build
npm run preview
```

## 🚀 Deploy

O deploy para o GitHub Pages é automático via GitHub Actions
(`.github/workflows/deploy.yml`) a cada push. O app é publicado em modo `HashRouter`
para funcionar corretamente com o roteamento estático do Pages.

---

Protótipo de produto — Governo de Goiás (não oficial).
