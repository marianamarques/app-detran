-- ============================================================================
-- Views analíticas para consumo no Power BI
-- Cada view é desnormalizada e pronta para virar uma tabela/página de painel.
-- Requer schema.sql (e opcionalmente seed_mock_data.sql) aplicados antes.
-- ============================================================================

-- 1) Débitos detalhados (multas, IPVA, licenciamento, DPVAT) com dimensões de
--    tempo e de veículo/usuário já resolvidas — base para o painel financeiro.
CREATE OR REPLACE VIEW vw_bi_debitos AS
SELECT
  d.id                                            AS debito_id,
  u.id                                            AS usuario_id,
  u.nome                                          AS usuario_nome,
  v.placa,
  v.marca,
  v.modelo,
  d.tipo,
  d.descricao,
  d.infracao,
  d.valor,
  d.vencimento,
  EXTRACT(YEAR  FROM d.vencimento)::INT           AS ano_vencimento,
  EXTRACT(MONTH FROM d.vencimento)::INT           AS mes_vencimento,
  d.status,
  d.orgao,
  d.codigo,
  d.pontos,
  d.parcelas,
  CASE WHEN d.status = 'vencido'  THEN d.valor ELSE 0 END AS valor_vencido,
  CASE WHEN d.status = 'pendente' THEN d.valor ELSE 0 END AS valor_pendente,
  CASE WHEN d.status = 'pago'     THEN d.valor ELSE 0 END AS valor_pago
FROM debitos d
LEFT JOIN veiculos v ON v.id = d.veiculo_id
LEFT JOIN usuarios u ON u.id = v.usuario_id;

-- 2) Arrecadação mensal por órgão/tipo — série temporal para gráficos de linha/coluna.
CREATE OR REPLACE VIEW vw_bi_arrecadacao_mensal AS
SELECT
  orgao,
  tipo,
  DATE_TRUNC('month', vencimento)::DATE                          AS mes_referencia,
  SUM(CASE WHEN status = 'pago'     THEN valor ELSE 0 END)       AS valor_pago,
  SUM(CASE WHEN status = 'pendente' THEN valor ELSE 0 END)       AS valor_pendente,
  SUM(CASE WHEN status = 'vencido'  THEN valor ELSE 0 END)       AS valor_vencido,
  COUNT(*)                                                       AS qtd_debitos
FROM debitos
WHERE vencimento IS NOT NULL
GROUP BY orgao, tipo, DATE_TRUNC('month', vencimento);

-- 3) Situação dos veículos, com total de débitos em aberto por placa.
CREATE OR REPLACE VIEW vw_bi_veiculos_situacao AS
SELECT
  v.id                                  AS veiculo_id,
  u.nome                                AS usuario_nome,
  v.placa,
  v.marca,
  v.modelo,
  v.ano_fabricacao,
  v.status,
  v.ipva_status,
  v.vencimento_licenciamento,
  v.quilometragem,
  COALESCE(deb.qtd_debitos_abertos, 0)  AS qtd_debitos_abertos,
  COALESCE(deb.valor_debitos_abertos,0) AS valor_debitos_abertos
FROM veiculos v
JOIN usuarios u ON u.id = v.usuario_id
LEFT JOIN (
  SELECT veiculo_id,
         COUNT(*)   AS qtd_debitos_abertos,
         SUM(valor) AS valor_debitos_abertos
  FROM debitos
  WHERE status IN ('pendente', 'vencido')
  GROUP BY veiculo_id
) deb ON deb.veiculo_id = v.id;

-- 4) Agendamentos com dimensões de tempo, para painel de ocupação de unidades/serviços.
CREATE OR REPLACE VIEW vw_bi_agendamentos AS
SELECT
  a.id                                    AS agendamento_id,
  u.nome                                  AS usuario_nome,
  a.servico,
  a.unidade,
  a.data_agendamento,
  EXTRACT(YEAR  FROM a.data_agendamento)::INT AS ano,
  EXTRACT(MONTH FROM a.data_agendamento)::INT AS mes,
  a.hora_agendamento,
  a.status,
  a.protocolo
FROM agendamentos a
JOIN usuarios u ON u.id = a.usuario_id;

-- 5) Pontuação da CNH por condutor, com faixa de risco calculada.
CREATE OR REPLACE VIEW vw_bi_cnh_pontuacao AS
SELECT
  u.id       AS usuario_id,
  u.nome,
  c.numero,
  c.categoria,
  c.validade,
  c.status,
  c.pontos,
  c.pontos_max,
  ROUND(c.pontos::NUMERIC / NULLIF(c.pontos_max, 0) * 100, 1) AS percentual_utilizado,
  CASE
    WHEN c.pontos >= c.pontos_max         THEN 'Suspensão iminente'
    WHEN c.pontos >= (c.pontos_max * 0.7) THEN 'Atenção'
    ELSE 'Regular'
  END AS faixa_risco
FROM cnh c
JOIN usuarios u ON u.id = c.usuario_id;

-- 6) Notificações, com data pura separada da hora para facilitar agrupamento no BI.
CREATE OR REPLACE VIEW vw_bi_notificacoes AS
SELECT
  n.id,
  u.nome        AS usuario_nome,
  n.titulo,
  n.tipo,
  n.lida,
  n.data_evento,
  DATE(n.data_evento) AS data
FROM notificacoes n
JOIN usuarios u ON u.id = n.usuario_id;

-- 7) KPIs gerais (uma única linha) — ideal para cartões de indicador no topo do painel.
CREATE OR REPLACE VIEW vw_bi_kpis_gerais AS
SELECT
  (SELECT COUNT(*) FROM usuarios)                                         AS total_usuarios,
  (SELECT COUNT(*) FROM veiculos)                                         AS total_veiculos,
  (SELECT COUNT(*) FROM veiculos WHERE status = 'pendencia')              AS veiculos_com_pendencia,
  (SELECT COALESCE(SUM(valor), 0) FROM debitos WHERE status = 'pendente') AS total_pendente,
  (SELECT COALESCE(SUM(valor), 0) FROM debitos WHERE status = 'vencido')  AS total_vencido,
  (SELECT COALESCE(SUM(valor), 0) FROM debitos WHERE status = 'pago')     AS total_arrecadado,
  (SELECT COUNT(*) FROM agendamentos WHERE status = 'agendado')           AS agendamentos_futuros,
  (SELECT COUNT(*) FROM notificacoes WHERE lida = false)                  AS notificacoes_nao_lidas;
