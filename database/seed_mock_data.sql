-- ============================================================================
-- Carga de exemplo, espelhando os mocks de src/data/mock.ts
-- Útil para validar as views antes de conectar dados reais.
-- ============================================================================

INSERT INTO usuarios (id, nome, cpf, rg, data_nascimento, email, telefone, endereco) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Mariana Marques', '012.345.678-90', '5.432.109 SSP-GO',
   '1994-03-14', 'mariana.marques@email.com', '(62) 99123-4567',
   'Rua T-30, 1200 — Setor Bueno, Goiânia - GO');

INSERT INTO cnh (usuario_id, numero, categoria, validade, primeira_habilitacao, status, pontos, pontos_max) VALUES
  ('11111111-1111-1111-1111-111111111111', '01234567890', 'AB', '2031-08-22', '2012-08-22', 'regular', 5, 20);

INSERT INTO veiculos (id, usuario_id, placa, renavam, marca, modelo, ano_fabricacao, cor, status, crlv_ano, ipva_status, vencimento_licenciamento, quilometragem) VALUES
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111',
   'PQR-4E21', '01234567890', 'Chevrolet', 'Onix Plus LTZ', 2022, 'Prata', 'pendencia', 2026, 'pendente', '2026-03-31', 34210),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
   'OJU-1B87', '09876543210', 'Honda', 'CG 160 Titan', 2021, 'Vermelha', 'regular', 2026, 'pago', '2026-05-15', 18790);

INSERT INTO debitos (veiculo_id, tipo, descricao, infracao, valor, vencimento, status, orgao, codigo, pontos, parcelas) VALUES
  ('22222222-2222-2222-2222-222222222221', 'Multa', 'Avançar o sinal vermelho do semáforo', 'Art. 208 CTB · Gravíssima',
   293.47, '2026-09-28', 'pendente', 'DETRAN-GO', '60501-1', 7, NULL),
  ('22222222-2222-2222-2222-222222222221', 'IPVA', 'IPVA 2026 — Cota única', NULL,
   842.15, '2026-03-15', 'pendente', 'SEFAZ-GO', 'IPVA-2026-0234', NULL, 3),
  ('22222222-2222-2222-2222-222222222222', 'Licenciamento', 'Taxa de licenciamento anual', NULL,
   156.90, '2026-05-15', 'pago', 'DETRAN-GO', 'LIC-2026-8871', NULL, NULL),
  ('22222222-2222-2222-2222-222222222222', 'Multa', 'Estacionar em local proibido', 'Art. 181 CTB · Leve',
   88.38, '2025-06-02', 'vencido', 'AMT Goiânia', '60219-4', 3, NULL),
  ('22222222-2222-2222-2222-222222222221', 'DPVAT', 'Seguro obrigatório DPVAT 2026', NULL,
   0, NULL, 'pago', 'Seguradora Líder', 'DPVAT-2026', NULL, NULL);

INSERT INTO agendamentos (usuario_id, servico, unidade, endereco, data_agendamento, hora_agendamento, status, protocolo) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Exame Médico e Psicológico', 'CFC Vida Nova',
   'Av. T-9, 855 — Setor Bueno, Goiânia', '2026-09-18', '09:30', 'agendado', 'GO-EX-88213'),
  ('11111111-1111-1111-1111-111111111111', 'Renovação da CNH', 'DETRAN Sede Goiânia',
   'Av. Anhanguera, 6440 — Setor Coimbra', '2026-07-02', '14:00', 'concluido', 'GO-REN-77120');

INSERT INTO notificacoes (usuario_id, titulo, mensagem, data_evento, lida, tipo) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Multa registrada',
   'Uma nova multa foi registrada para o veículo PQR-4E21.', '2026-09-17 08:12', false, 'alerta'),
  ('11111111-1111-1111-1111-111111111111', 'Agendamento confirmado',
   'Seu exame médico foi confirmado para 18/09 às 09:30.', '2026-09-16 17:40', false, 'sucesso'),
  ('11111111-1111-1111-1111-111111111111', 'IPVA 2026 disponível',
   'A guia do IPVA 2026 já está disponível para pagamento com desconto na cota única.', '2026-09-15 00:00', true, 'cobranca'),
  ('11111111-1111-1111-1111-111111111111', 'Novidade no app',
   'Agora você pode compartilhar sua CNH Digital por link temporário.', '2026-09-12 00:00', true, 'info');
