# Módulo: Planos de Entrega - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia os planos de entrega institucionais, que definem as entregas estratégicas das unidades organizacionais. Conecta o planejamento estratégico com a execução operacional, permitindo que as unidades definam suas entregas e acompanhem o progresso.

## Tabelas Principais

### entregas
**Propósito:** Tipos/modelos de entregas disponíveis no sistema
**Uso:** Define os tipos de produtos/serviços que podem ser entregues

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da entrega | Tipo de produto/serviço |
| descricao | varchar(255) | Descrição da entrega | Detalhamento do tipo |
| tipo_indicador | enum | Tipo do indicador | QUANTIDADE, VALOR, PORCENTAGEM, QUALITATIVO |
| lista_qualitativos | longtext JSON | Valores qualitativos | Para entregas do tipo qualitativo |
| checklist | longtext JSON | Lista de verificação | Critérios de qualidade padrão |
| etiquetas | longtext JSON | Tags da entrega | Classificação e organização |
| unidade_id | char(36) | FK para unidades | Unidade que criou o tipo |

**Relacionamentos:**
- Pertence a uma Unidade
- Tem muitas Entregas de Planos Institucionais
- Tem muitas Entregas de Planos de Trabalho

### planos_entregas
**Propósito:** Planos de entrega institucionais das unidades
**Uso:** Define entregas estratégicas da unidade, vinculadas ao planejamento institucional

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| numero | int(11) | Número sequencial | Gerado automaticamente |
| nome | varchar(256) | Nome do plano | Identificação do plano de entregas |
| data_inicio | datetime | Início da vigência | Quando o plano entra em vigor |
| data_fim | datetime | Fim da vigência | Quando o plano expira |
| data_arquivamento | datetime | Data de arquivamento | Quando foi arquivado |
| status | enum | Status atual | INCLUIDO, HOMOLOGANDO, ATIVO, CONCLUIDO, AVALIADO, SUSPENSO, CANCELADO |
| planejamento_id | char(36) | FK para planejamentos | Vincula ao planejamento estratégico |
| cadeia_valor_id | char(36) | FK para cadeias_valores | Processos organizacionais |
| unidade_id | char(36) | FK para unidades | Unidade responsável |
| programa_id | char(36) | FK para programas | Programa de gestão |
| criacao_usuario_id | char(36) | FK para usuarios | Quem criou o plano |
| avaliacao_id | char(36) | FK para avaliacoes | Avaliação do plano |
| okr_id | char(36) | FK para okrs | Vinculação com OKRs |
| data_envio_api_pgd | timestamp | Envio para API oficial | Integração com sistema central |

**Relacionamentos:**
- Pertence a uma Unidade
- Pertence a um Programa de Gestão
- Pode estar vinculado a um Planejamento Estratégico
- Pode estar vinculado a uma Cadeia de Valor
- Tem muitas Entregas (planos_entregas_entregas)
- Pode ter uma Avaliação
- Pode estar vinculado a OKRs

### planos_entregas_entregas
**Propósito:** Entregas específicas dentro do plano institucional
**Uso:** Define produtos/serviços que a unidade deve entregar

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| descricao | text | Descrição da entrega | O que será entregue |
| descricao_entrega | longtext | Título da entrega | Nome da entrega |
| descricao_meta | longtext | Descrição da meta | Objetivo a alcançar |
| destinatario | varchar(255) | Destinatário | Quem recebe a entrega |
| data_inicio | datetime | Início da entrega | Quando começa |
| data_fim | datetime | Fim da entrega | Prazo limite |
| homologado | tinyint(4) | Se foi homologada | Aprovação da entrega |
| progresso_esperado | decimal(5,2) | % esperado de progresso | Meta de avanço |
| progresso_realizado | decimal(5,2) | % realizado | Avanço real |
| meta | longtext JSON | Meta quantitativa | Valores a alcançar |
| realizado | longtext JSON | Valores realizados | Resultados obtidos |
| plano_entrega_id | char(36) | FK para planos_entregas | Plano ao qual pertence |
| entrega_id | char(36) | FK para entregas | Tipo de entrega |
| entrega_pai_id | char(36) | FK para si mesmo | Hierarquia de entregas |
| unidade_id | char(36) | FK para unidades | Unidade responsável |
| checklist | longtext JSON | Lista de verificação | Critérios de qualidade |
| etiquetas | longtext JSON | Tags da entrega | Classificação |

**Relacionamentos:**
- Pertence a um Plano de Entrega
- Pertence a um Tipo de Entrega
- Pode ter Entregas filhas (hierarquia)
- Pertence a uma Unidade
- Tem muitos Progressos registrados
- Pode estar vinculada a Objetivos do Planejamento
- Pode estar vinculada a Processos da Cadeia de Valor

### planos_entregas_entregas_progressos
**Propósito:** Registros de progresso das entregas ao longo do tempo
**Uso:** Acompanha a evolução das entregas com registros periódicos

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_progresso | date | Data do registro | Quando foi registrado |
| homologado | tinyint(4) | Se foi homologado | Validação do progresso |
| progresso_esperado | decimal(5,2) | % esperado na data | Meta para o período |
| progresso_realizado | decimal(5,2) | % realizado na data | Avanço real registrado |
| data_inicio | datetime | Início do período | Período de referência |
| data_fim | datetime | Fim do período | Período de referência |
| meta | longtext JSON | Meta do período | Valores esperados |
| realizado | longtext JSON | Realizado no período | Valores alcançados |
| usuario_id | char(36) | FK para usuarios | Quem registrou |
| plano_entrega_entrega_id | char(36) | FK para planos_entregas_entregas | Entrega acompanhada |

**Relacionamentos:**
- Pertence a uma Entrega do Plano
- Registrado por um Usuário

## Tabelas de Relacionamento

### planos_entregas_entregas_objetivos
**Propósito:** Vincula entregas aos objetivos do planejamento estratégico
**Uso:** Conecta execução operacional com estratégia institucional

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| planejamento_objetivo_id | char(36) | FK para planejamentos_objetivos | Objetivo estratégico |
| entrega_id | char(36) | FK para planos_entregas_entregas | Entrega operacional |

### planos_entregas_entregas_processos
**Propósito:** Vincula entregas aos processos da cadeia de valor
**Uso:** Conecta entregas aos processos organizacionais

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| cadeia_processo_id | char(36) | FK para cadeias_valores_processos | Processo organizacional |
| entrega_id | char(36) | FK para planos_entregas_entregas | Entrega relacionada |

### planos_entregas_entregas_resultados_chaves
**Propósito:** Vincula entregas aos resultados-chave dos OKRs
**Uso:** Conecta entregas com metodologia OKR

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| okr_objetivo_resultado_chave_id | char(36) | FK para okrs_objetivos_resultados_chaves | Resultado-chave |
| entrega_id | char(36) | FK para planos_entregas_entregas | Entrega vinculada |

## Queries Comuns

### Tipos de entregas disponíveis
```sql
SELECT e.*, u.nome as unidade_nome
FROM entregas e
LEFT JOIN unidades u ON e.unidade_id = u.id
WHERE e.deleted_at IS NULL
ORDER BY e.nome;
```

### Listar planos de entrega de uma unidade
```sql
SELECT pe.*, p.nome as programa_nome, u.nome as unidade_nome
FROM planos_entregas pe
JOIN programas p ON pe.programa_id = p.id
JOIN unidades u ON pe.unidade_id = u.id
WHERE pe.unidade_id = ? AND pe.deleted_at IS NULL
ORDER BY pe.numero DESC;
```

### Entregas de um plano com progresso atual
```sql
SELECT pee.*, e.nome as tipo_entrega,
       pee.progresso_realizado,
       pee.progresso_esperado,
       (pee.progresso_realizado - pee.progresso_esperado) as desvio
FROM planos_entregas_entregas pee
JOIN entregas e ON pee.entrega_id = e.id
WHERE pee.plano_entrega_id = ? AND pee.deleted_at IS NULL
ORDER BY pee.data_fim ASC;
```

### Histórico de progresso de uma entrega
```sql
SELECT peep.*, u.nome as usuario_nome
FROM planos_entregas_entregas_progressos peep
JOIN usuarios u ON peep.usuario_id = u.id
WHERE peep.plano_entrega_entrega_id = ?
ORDER BY peep.data_progresso DESC;
```

### Entregas vinculadas a objetivos estratégicos
```sql
SELECT pee.descricao_entrega, po.nome as objetivo_estrategico, et.nome as eixo_tematico
FROM planos_entregas_entregas pee
JOIN planos_entregas_entregas_objetivos peeo ON pee.id = peeo.entrega_id
JOIN planejamentos_objetivos po ON peeo.planejamento_objetivo_id = po.id
JOIN eixos_tematicos et ON po.eixo_tematico_id = et.id
WHERE pee.plano_entrega_id = ?;
```

## Índices Recomendados
- `entregas_unidade_id` (unidade_id)
- `entregas_tipo_indicador` (tipo_indicador)
- `planos_entregas_unidade_id_status` (unidade_id, status)
- `planos_entregas_programa_id` (programa_id)
- `planos_entregas_entregas_plano_id` (plano_entrega_id)
- `planos_entregas_entregas_entrega_id` (entrega_id)
- `planos_entregas_entregas_data_fim` (data_fim)
- `planos_entregas_entregas_progressos_entrega_data` (plano_entrega_entrega_id, data_progresso)