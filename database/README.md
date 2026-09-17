# Views para Power BI

Este diretório contém um schema PostgreSQL de referência, modelado a partir dos
dados mockados do app (`src/data/mock.ts`), e um conjunto de views analíticas
prontas para servir de fonte de dados para painéis de BI (Power BI).

> O app em si é 100% frontend (dados mockados em memória/localStorage) e não
> possui banco de dados real. Estes scripts assumem que existe (ou existirá)
> um banco PostgreSQL alimentado pelo backend/ETL do Detran com a mesma
> modelagem de entidades do app — ajuste nomes de tabelas/colunas se o schema
> real for diferente.

## Arquivos

1. `schema.sql` — tabelas base: `usuarios`, `cnh`, `veiculos`, `debitos`,
   `agendamentos`, `notificacoes`.
2. `seed_mock_data.sql` — carga de exemplo (os mesmos dados de
   `src/data/mock.ts`) para validar as views antes de plugar dados reais.
3. `views_powerbi.sql` — as views de consumo do Power BI:
   - `vw_bi_debitos` — débitos detalhados (multas, IPVA, licenciamento, DPVAT).
   - `vw_bi_arrecadacao_mensal` — série mensal de valores pago/pendente/vencido por órgão e tipo.
   - `vw_bi_veiculos_situacao` — situação de cada veículo e débitos em aberto.
   - `vw_bi_agendamentos` — agendamentos com dimensões de ano/mês.
   - `vw_bi_cnh_pontuacao` — pontuação de CNH por condutor e faixa de risco.
   - `vw_bi_notificacoes` — notificações com data separada da hora.
   - `vw_bi_kpis_gerais` — KPIs gerais em uma única linha (cartões de indicador).

## Como aplicar

```bash
psql "postgresql://usuario:senha@host:5432/detran" -f database/schema.sql
psql "postgresql://usuario:senha@host:5432/detran" -f database/seed_mock_data.sql   # opcional, só para teste
psql "postgresql://usuario:senha@host:5432/detran" -f database/views_powerbi.sql
```

## Como conectar no Power BI

1. **Obter dados** → **Banco de dados PostgreSQL**.
2. Informe servidor e banco de dados.
3. Em **Navegador**, selecione as views com prefixo `vw_bi_` (schema `public`).
4. Prefira **Import** em vez de DirectQuery para prototipagem; migre para
   DirectQuery/Import incremental quando o volume de dados real justificar.
5. Crie uma tabela de datas (Power Query ou DAX `CALENDAR`) e relacione com as
   colunas de data (`vencimento`, `mes_referencia`, `data_agendamento`,
   `data`) para habilitar inteligência de tempo.

## Extensão

Para adicionar uma nova view, siga o padrão: nome prefixado com `vw_bi_`,
sempre desnormalizada (sem exigir que o Power BI faça joins), com colunas de
data já quebradas em ano/mês quando fizer sentido para gráficos de série
temporal.
