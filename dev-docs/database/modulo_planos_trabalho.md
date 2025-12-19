# Módulo: Planos de Trabalho - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia todo o ciclo de vida dos planos de trabalho individuais no PGD, desde a criação até a avaliação final. Permite que servidores públicos criem planos para trabalho remoto/híbrido, definam entregas, registrem atividades e sejam avaliados pelos gestores.

## Tabelas Principais

### planos_trabalhos
**Propósito:** Armazena os planos de trabalho individuais dos servidores
**Uso:** Controla modalidades de trabalho remoto/híbrido, períodos de vigência e status do plano

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| numero | int(11) | Número sequencial | Gerado automaticamente para identificação |
| carga_horaria | double(8,2) | Horas diárias de trabalho | Define jornada do servidor no plano |
| tempo_total | double(8,2) | Total de horas úteis no período | Calculado considerando feriados e fins de semana |
| tempo_proporcional | double(8,2) | Tempo total menos afastamentos | Usado para cálculos de produtividade |
| data_inicio | datetime | Início da vigência | Quando o plano entra em vigor |
| data_fim | datetime | Fim da vigência | Quando o plano expira |
| status | enum | Status atual | INCLUIDO, ATIVO, CONCLUIDO, AVALIADO, SUSPENSO, CANCELADO |
| programa_id | char(36) | FK para programas | Vincula ao programa de gestão |
| usuario_id | char(36) | FK para usuarios | Servidor que executa o plano |
| unidade_id | char(36) | FK para unidades | Unidade executora |
| tipo_modalidade_id | char(36) | FK para tipos_modalidades | Remoto, híbrido, presencial |
| documento_id | char(36) | FK para documentos | TCR (Termo de Ciência e Responsabilidade) |
| criterios_avaliacao | longtext JSON | Critérios personalizados | Como o plano será avaliado |

**Relacionamentos:**
- Pertence a um Programa de Gestão
- Pertence a um Usuário (servidor)
- Pertence a uma Unidade executora
- Tem muitas Entregas (planos_trabalhos_entregas)
- Tem muitas Consolidações (planos_trabalhos_consolidacoes)
- Tem muitas Atividades

### planos_trabalhos_entregas
**Propósito:** Define as entregas/produtos que o servidor deve realizar no plano
**Uso:** Especifica o que será entregue, prazos e percentual de esforço

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| descricao | text | Descrição da entrega | O que será entregue pelo servidor |
| forca_trabalho | decimal(5,2) | Percentual do tempo dedicado | % da jornada para esta entrega |
| meta | longtext JSON | Meta quantitativa/qualitativa | Objetivo a ser alcançado |
| orgao | varchar(256) | Órgão externo destinatário | Para entregas interinstitucionais |
| plano_trabalho_id | char(36) | FK para planos_trabalhos | Plano ao qual pertence |
| plano_entrega_entrega_id | char(36) | FK para planos_entregas_entregas | Vinculação com plano institucional |

**Relacionamentos:**
- Pertence a um Plano de Trabalho
- Pode estar vinculada a uma Entrega do Plano Institucional
- Tem muitas Atividades relacionadas

### planos_trabalhos_consolidacoes
**Propósito:** Períodos de avaliação e consolidação do plano de trabalho
**Uso:** Divide o plano em períodos menores para acompanhamento e avaliação

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_inicio | date | Início do período | Quando inicia a consolidação |
| data_fim | date | Fim do período | Quando termina a consolidação |
| data_conclusao | datetime | Quando foi concluída | Timestamp da finalização |
| status | enum | Status da consolidação | INCLUIDO, CONCLUIDO, AVALIADO |
| plano_trabalho_id | char(36) | FK para planos_trabalhos | Plano consolidado |
| avaliacao_id | char(36) | FK para avaliacoes | Avaliação do período |

**Relacionamentos:**
- Pertence a um Plano de Trabalho
- Tem uma Avaliação
- Tem muitas Atividades do período
- Tem muitos Afastamentos do período
- Tem muitas Ocorrências do período

## Tabelas de Apoio

### planos_trabalhos_consolidacoes_atividades
**Propósito:** Snapshot das atividades executadas no período de consolidação
**Uso:** Registra as atividades realizadas para avaliação posterior

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| snapshot | longtext JSON | Dados da atividade | Estado da atividade no momento |
| data_conclusao | datetime | Quando foi registrada | Timestamp do registro |
| plano_trabalho_consolidacao_id | char(36) | FK consolidação | Período ao qual pertence |
| atividade_id | char(36) | FK para atividades | Atividade original |

### planos_trabalhos_consolidacoes_afastamentos
**Propósito:** Afastamentos que impactaram o período de consolidação
**Uso:** Registra licenças, férias que afetam a produtividade

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| snapshot | longtext JSON | Dados do afastamento | Detalhes do afastamento |
| data_conclusao | datetime | Quando foi registrado | Timestamp do registro |
| plano_trabalho_consolidacao_id | char(36) | FK consolidação | Período impactado |
| afastamento_id | char(36) | FK para afastamentos | Afastamento original |

### planos_trabalhos_consolidacoes_ocorrencias
**Propósito:** Ocorrências especiais durante o período de consolidação
**Uso:** Registra eventos que podem impactar a avaliação

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| snapshot | longtext JSON | Dados da ocorrência | Detalhes da ocorrência |
| data_conclusao | datetime | Quando foi registrada | Timestamp do registro |
| plano_trabalho_consolidacao_id | char(36) | FK consolidação | Período da ocorrência |
| ocorrencia_id | char(36) | FK para ocorrencias | Ocorrência original |

## Queries Comuns

### Buscar planos de um usuário
```sql
SELECT pt.*, p.nome as programa_nome, u.nome as unidade_nome, tm.nome as modalidade
FROM planos_trabalhos pt
JOIN programas p ON pt.programa_id = p.id
JOIN unidades u ON pt.unidade_id = u.id
JOIN tipos_modalidades tm ON pt.tipo_modalidade_id = tm.id
WHERE pt.usuario_id = ? AND pt.deleted_at IS NULL
ORDER BY pt.numero DESC;
```

### Listar entregas de um plano
```sql
SELECT pte.*, pee.nome as entrega_institucional
FROM planos_trabalhos_entregas pte
LEFT JOIN planos_entregas_entregas pee ON pte.plano_entrega_entrega_id = pee.id
WHERE pte.plano_trabalho_id = ? AND pte.deleted_at IS NULL;
```

### Consolidações pendentes de avaliação
```sql
SELECT ptc.*, pt.numero as plano_numero, u.nome as servidor_nome
FROM planos_trabalhos_consolidacoes ptc
JOIN planos_trabalhos pt ON ptc.plano_trabalho_id = pt.id
JOIN usuarios u ON pt.usuario_id = u.id
WHERE ptc.status = 'CONCLUIDO' AND ptc.avaliacao_id IS NULL
AND ptc.deleted_at IS NULL;
```

## Índices Recomendados
- `planos_trabalhos_usuario_id_status` (usuario_id, status)
- `planos_trabalhos_unidade_id_data_inicio` (unidade_id, data_inicio)
- `planos_trabalhos_consolidacoes_status` (status)
- `planos_trabalhos_entregas_plano_id` (plano_trabalho_id)