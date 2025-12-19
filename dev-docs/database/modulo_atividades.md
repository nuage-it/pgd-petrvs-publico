# Módulo: Atividades - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo controla o registro e acompanhamento de atividades executadas pelos servidores. Permite registrar demandas, controlar tempo de execução, pausas e hierarquia de tarefas. É fundamental para o controle de produtividade e prestação de contas no trabalho remoto.

## Tabelas Principais

### atividades
**Propósito:** Registro das atividades/demandas executadas pelos servidores
**Uso:** Controla execução de trabalho, tempo gasto e entregas realizadas

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| numero | int(11) | Número sequencial | Gerado automaticamente |
| descricao | text | Assunto da atividade | O que está sendo executado |
| data_distribuicao | datetime | Data de cadastro | Quando a demanda foi criada |
| data_estipulada_entrega | datetime | Prazo para entrega | Deadline da atividade |
| data_inicio | datetime | Início da execução | Quando começou a trabalhar |
| data_entrega | datetime | Data da entrega | Quando foi concluída |
| data_arquivamento | datetime | Data de arquivamento | Quando foi arquivada |
| carga_horaria | double(8,2) | Carga horária do plano | Horas diárias de trabalho |
| tempo_planejado | double(8,2) | Tempo estimado | Horas previstas para execução |
| esforco | double(8,2) | Esforço planejado | Tempo que será empregado |
| tempo_despendido | double(8,2) | Tempo real gasto | Tempo líquido trabalhado |
| prioridade | int(11) | Nível de prioridade | Importância da atividade |
| progresso | decimal(5,2) | % de conclusão | Avanço da atividade |
| status | enum | Status atual | INCLUIDO, INICIADO, PAUSADO, CONCLUIDO |
| etiquetas | longtext JSON | Tags da atividade | Classificação |
| checklist | longtext JSON | Lista de verificação | Itens a serem cumpridos |
| plano_trabalho_id | char(36) | FK para planos_trabalhos | Plano vinculado |
| plano_trabalho_entrega_id | char(36) | FK para planos_trabalhos_entregas | Entrega vinculada |
| plano_trabalho_consolidacao_id | char(36) | FK consolidação | Período de consolidação |
| tipo_atividade_id | char(36) | FK para tipos_atividades | Classificação da atividade |
| demandante_id | char(36) | FK para usuarios | Quem solicitou |
| usuario_id | char(36) | FK para usuarios | Quem executa |
| unidade_id | char(36) | FK para unidades | Unidade executora |
| documento_requisicao_id | char(36) | FK para documentos | Documento de solicitação |
| documento_entrega_id | char(36) | FK para documentos | Documento de entrega |

**Relacionamentos:**
- Pode pertencer a um Plano de Trabalho
- Pode estar vinculada a uma Entrega do Plano
- Pode estar em uma Consolidação
- Tem um Tipo de Atividade
- Tem um Demandante (usuário)
- Pode ter um Executor (usuário)
- Pertence a uma Unidade
- Tem muitas Pausas
- Tem muitas Tarefas
- Pode ter Documentos anexos

### atividades_pausas
**Propósito:** Registra pausas durante a execução das atividades
**Uso:** Controla interrupções para cálculo preciso do tempo trabalhado

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_inicio | datetime | Início da pausa | Quando pausou |
| data_fim | datetime | Fim da pausa | Quando retomou |
| atividade_id | char(36) | FK para atividades | Atividade pausada |

**Relacionamentos:**
- Pertence a uma Atividade

### atividades_tarefas
**Propósito:** Tarefas específicas dentro de uma atividade
**Uso:** Decompõe atividades complexas em tarefas menores

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| descricao | text | Descrição da tarefa | O que deve ser feito |
| data_lancamento | datetime | Data de criação | Quando foi criada |
| tempo_estimado | double(8,2) | Tempo estimado | Horas previstas |
| data_conclusao | datetime | Data de conclusão | Quando foi finalizada |
| documento_id | char(36) | FK para documentos | Documento relacionado |
| atividade_id | char(36) | FK para atividades | Atividade pai |
| usuario_id | char(36) | FK para usuarios | Responsável pela tarefa |
| tipo_tarefa_id | char(36) | FK para tipos_tarefas | Classificação da tarefa |

**Relacionamentos:**
- Pertence a uma Atividade
- Tem um Responsável (usuário)
- Tem um Tipo de Tarefa
- Pode ter um Documento anexo
- Pode ter Comentários

## Tabelas de Apoio

### tipos_atividades
**Propósito:** Classificação das atividades por tipo
**Uso:** Categoriza atividades para relatórios e análises

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Classificação |
| descricao | text | Descrição detalhada | Explicação do tipo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| icone | varchar(100) | Ícone CSS | Representação visual |
| cor | varchar(100) | Cor em hex | Identificação visual |

### tipos_tarefas
**Propósito:** Classificação das tarefas por tipo
**Uso:** Categoriza tarefas para organização e relatórios

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Classificação |
| descricao | text | Descrição detalhada | Explicação do tipo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| icone | varchar(100) | Ícone CSS | Representação visual |
| cor | varchar(100) | Cor em hex | Identificação visual |

## Queries Comuns

### Atividades de um usuário por status
```sql
SELECT a.*, ta.nome as tipo_atividade, u_dem.nome as demandante_nome
FROM atividades a
LEFT JOIN tipos_atividades ta ON a.tipo_atividade_id = ta.id
LEFT JOIN usuarios u_dem ON a.demandante_id = u_dem.id
WHERE a.usuario_id = ? AND a.status = ?
AND a.deleted_at IS NULL
ORDER BY a.data_distribuicao DESC;
```

### Tempo total trabalhado em atividades
```sql
SELECT 
    SUM(a.tempo_despendido) as tempo_total,
    COUNT(*) as total_atividades,
    AVG(a.tempo_despendido) as tempo_medio
FROM atividades a
WHERE a.usuario_id = ? 
AND a.status = 'CONCLUIDO'
AND a.data_entrega BETWEEN ? AND ?
AND a.deleted_at IS NULL;
```

### Atividades com pausas detalhadas
```sql
SELECT a.descricao, a.tempo_despendido,
       COUNT(ap.id) as total_pausas,
       SUM(TIMESTAMPDIFF(MINUTE, ap.data_inicio, ap.data_fim)) as tempo_pausas_minutos
FROM atividades a
LEFT JOIN atividades_pausas ap ON a.id = ap.atividade_id
WHERE a.id = ?
GROUP BY a.id;
```

### Tarefas de uma atividade
```sql
SELECT at.*, tt.nome as tipo_tarefa, u.nome as responsavel_nome
FROM atividades_tarefas at
LEFT JOIN tipos_tarefas tt ON at.tipo_tarefa_id = tt.id
LEFT JOIN usuarios u ON at.usuario_id = u.id
WHERE at.atividade_id = ? AND at.deleted_at IS NULL
ORDER BY at.data_lancamento ASC;
```

### Produtividade por tipo de atividade
```sql
SELECT ta.nome as tipo_atividade,
       COUNT(*) as total_atividades,
       AVG(a.tempo_despendido) as tempo_medio,
       SUM(a.tempo_despendido) as tempo_total
FROM atividades a
JOIN tipos_atividades ta ON a.tipo_atividade_id = ta.id
WHERE a.usuario_id = ? 
AND a.status = 'CONCLUIDO'
AND a.data_entrega BETWEEN ? AND ?
AND a.deleted_at IS NULL
GROUP BY ta.id, ta.nome
ORDER BY tempo_total DESC;
```

### Atividades em atraso
```sql
SELECT a.*, ta.nome as tipo_atividade, u.nome as executor_nome
FROM atividades a
LEFT JOIN tipos_atividades ta ON a.tipo_atividade_id = ta.id
LEFT JOIN usuarios u ON a.usuario_id = u.id
WHERE a.data_estipulada_entrega < NOW()
AND a.status IN ('INCLUIDO', 'INICIADO', 'PAUSADO')
AND a.deleted_at IS NULL
ORDER BY a.data_estipulada_entrega ASC;
```

## Índices Recomendados
- `atividades_usuario_id_status` (usuario_id, status)
- `atividades_data_distribuicao` (data_distribuicao)
- `atividades_data_estipulada_entrega` (data_estipulada_entrega)
- `atividades_plano_trabalho_id` (plano_trabalho_id)
- `atividades_unidade_id` (unidade_id)
- `atividades_pausas_atividade_id` (atividade_id)
- `atividades_tarefas_atividade_id` (atividade_id)