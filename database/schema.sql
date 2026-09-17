-- ============================================================================
-- Schema base (PostgreSQL) espelhando as entidades de src/data/mock.ts
-- Serve de fundação para as views analíticas em views_powerbi.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- para gen_random_uuid()

CREATE TABLE usuarios (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome              VARCHAR(150) NOT NULL,
  cpf               VARCHAR(14)  NOT NULL UNIQUE,
  rg                VARCHAR(20),
  data_nascimento   DATE,
  email             VARCHAR(150),
  telefone          VARCHAR(20),
  endereco          VARCHAR(255),
  criado_em         TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cnh (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id            UUID NOT NULL UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
  numero                VARCHAR(20) NOT NULL,
  categoria             VARCHAR(5)  NOT NULL,
  validade              DATE NOT NULL,
  primeira_habilitacao  DATE,
  status                VARCHAR(20) NOT NULL CHECK (status IN ('regular','atencao','suspensa')),
  pontos                INTEGER NOT NULL DEFAULT 0,
  pontos_max            INTEGER NOT NULL DEFAULT 20
);

CREATE TABLE veiculos (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id                UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  placa                     VARCHAR(8) NOT NULL UNIQUE,
  renavam                   VARCHAR(20) NOT NULL,
  marca                     VARCHAR(60) NOT NULL,
  modelo                    VARCHAR(80) NOT NULL,
  ano_fabricacao            INTEGER NOT NULL,
  cor                       VARCHAR(30),
  status                    VARCHAR(20) NOT NULL CHECK (status IN ('regular','pendencia')),
  crlv_ano                  INTEGER,
  ipva_status               VARCHAR(20) NOT NULL CHECK (ipva_status IN ('pendente','pago','vencido')),
  vencimento_licenciamento  DATE,
  quilometragem             INTEGER,
  criado_em                 TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_veiculos_usuario_id ON veiculos(usuario_id);

CREATE TABLE debitos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  veiculo_id  UUID REFERENCES veiculos(id) ON DELETE SET NULL,
  tipo        VARCHAR(20) NOT NULL CHECK (tipo IN ('Multa','IPVA','Licenciamento','DPVAT')),
  descricao   VARCHAR(255) NOT NULL,
  infracao    VARCHAR(255),
  valor       NUMERIC(12,2) NOT NULL DEFAULT 0,
  vencimento  DATE,
  status      VARCHAR(20) NOT NULL CHECK (status IN ('pendente','pago','vencido')),
  orgao       VARCHAR(80) NOT NULL,
  codigo      VARCHAR(40) NOT NULL,
  pontos      INTEGER,
  parcelas    INTEGER,
  criado_em   TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_debitos_veiculo_id ON debitos(veiculo_id);
CREATE INDEX idx_debitos_status ON debitos(status);

CREATE TABLE agendamentos (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id        UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  servico           VARCHAR(120) NOT NULL,
  unidade           VARCHAR(120) NOT NULL,
  endereco          VARCHAR(255),
  data_agendamento  DATE NOT NULL,
  hora_agendamento  TIME NOT NULL,
  status            VARCHAR(20) NOT NULL CHECK (status IN ('agendado','concluido','cancelado')),
  protocolo         VARCHAR(40) NOT NULL UNIQUE,
  criado_em         TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_agendamentos_usuario_id ON agendamentos(usuario_id);

CREATE TABLE notificacoes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo      VARCHAR(120) NOT NULL,
  mensagem    TEXT NOT NULL,
  data_evento TIMESTAMP NOT NULL DEFAULT now(),
  lida        BOOLEAN NOT NULL DEFAULT false,
  tipo        VARCHAR(20) NOT NULL CHECK (tipo IN ('alerta','info','sucesso','cobranca'))
);
CREATE INDEX idx_notificacoes_usuario_id ON notificacoes(usuario_id);
