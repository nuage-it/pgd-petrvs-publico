# Módulo: Avaliações - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo implementa o sistema de avaliação de planos de trabalho e entregas institucionais. Permite que gestores avaliem o desempenho dos servidores com notas, justificativas e recursos. É fundamental para o controle de qualidade e feedback no PGD.

## Tabelas Principais

### avaliacoes
**Propósito:** Registra avaliações de planos de trabalho e entregas
**Uso:** Armazena notas, justificativas e recursos das avaliações

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_avaliacao | datetime | Data da avaliação | Quando foi avaliado |
| nota | longtext JSON | Nota da avaliação | Pontuação atribuída |
| justificativa | text | Comentário do avaliador | Explicação da nota |
| justificativas | longtext JSON | Justificativas estruturadas | Critérios detalhados |
| recurso | text | Recurso do avaliado | Contestação da avaliação |
| avaliador_id | char(36) | FK para usuarios | Quem avaliou |
| plano_trabalho_consolidacao_id | char(36) | FK consolidação | Período avaliado |
| plano_entrega_id | char(36) | FK para planos_entregas | Plano institucional avaliado |
| tipo_avaliacao_id | char(36) | FK para tipos_avaliacoes | Tipo de avaliação |
| tipo_avaliacao_nota_id | char(36) | FK para tipos_avaliacoes_notas | Nota padrão aplicada |

**Relacionamentos:**
- Feita por um Avaliador (usuário)
- Pode avaliar uma Consolidação de Plano de Trabalho
- Pode avaliar um Plano de Entrega
- Tem um Tipo de Avaliação
- Pode ter uma Nota Padrão
- Tem muitos Checklists de Entregas

### avaliacoes_entregas_checklist
**Propósito:** Checklist detalhado para avaliação de entregas específicas
**Uso:** Avalia entregas individuais com critérios específicos

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| checklist | longtext JSON | Lista de verificação | Critérios avaliados |
| avaliacao_id | char(36) | FK para avaliacoes | Avaliação pai |
| plano_trabalho_entrega_id | char(36) | FK para planos_trabalhos_entregas | Entrega do plano individual |
| plano_entrega_entrega_id | char(36) | FK para planos_entregas_entregas | Entrega do plano institucional |

**Relacionamentos:**
- Pertence a uma Avaliação
- Pode avaliar uma Entrega de Plano de Trabalho
- Pode avaliar uma Entrega de Plano Institucional

## Tabelas de Configuração

### tipos_avaliacoes
**Propósito:** Define tipos de avaliação disponíveis no sistema
**Uso:** Configura diferentes modalidades de avaliação

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Identificação |
| descricao | text | Descrição detalhada | Explicação do tipo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| periodicidade | enum | Frequência da avaliação | MENSAL, TRIMESTRAL, etc. |
| nota_maxima | decimal(5,2) | Nota máxima possível | Escala de avaliação |
| nota_minima | decimal(5,2) | Nota mínima possível | Escala de avaliação |
| permite_recurso | tinyint(4) | Se permite recurso | Contestação permitida |
| prazo_recurso_dias | int(11) | Prazo para recurso | Dias para contestar |

### tipos_avaliacoes_notas
**Propósito:** Notas padrão para cada tipo de avaliação
**Uso:** Define escalas e notas automáticas

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da nota | Ex: Excelente, Bom |
| descricao | text | Descrição da nota | Critérios para esta nota |
| nota | decimal(5,2) | Valor numérico | Pontuação |
| sequencia | int(11) | Ordem de exibição | Ordenação |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| tipo_avaliacao_id | char(36) | FK para tipos_avaliacoes | Tipo ao qual pertence |

### tipos_avaliacoes_justificativas
**Propósito:** Justificativas padrão para facilitar avaliações
**Uso:** Oferece opções pré-definidas de justificativas

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da justificativa | Título |
| descricao | text | Texto da justificativa | Conteúdo completo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| tipo_avaliacao_id | char(36) | FK para tipos_avaliacoes | Tipo ao qual pertence |

## Queries Comuns

### Avaliações de um servidor
```sql
SELECT a.*, u_av.nome as avaliador_nome, ta.nome as tipo_avaliacao,
       ptc.data_inicio, ptc.data_fim
FROM avaliacoes a
JOIN usuarios u_av ON a.avaliador_id = u_av.id
JOIN tipos_avaliacoes ta ON a.tipo_avaliacao_id = ta.id
LEFT JOIN planos_trabalhos_consolidacoes ptc ON a.plano_trabalho_consolidacao_id = ptc.id
LEFT JOIN planos_trabalhos pt ON ptc.plano_trabalho_id = pt.id
WHERE pt.usuario_id = ? AND a.deleted_at IS NULL
ORDER BY a.data_avaliacao DESC;
```

### Avaliações pendentes de um gestor
```sql
SELECT ptc.*, pt.numero as plano_numero, u.nome as servidor_nome,
       DATEDIFF(NOW(), ptc.data_conclusao) as dias_pendente
FROM planos_trabalhos_consolidacoes ptc
JOIN planos_trabalhos pt ON ptc.plano_trabalho_id = pt.id
JOIN usuarios u ON pt.usuario_id = u.id
JOIN unidades_integrantes ui ON pt.unidade_id = ui.unidade_id
WHERE ptc.status = 'CONCLUIDO' 
AND ptc.avaliacao_id IS NULL
AND ui.usuario_id = ? -- gestor
AND ui.atribuicoes LIKE '%GESTOR%'
AND ptc.deleted_at IS NULL;
```

### Estatísticas de avaliação por período
```sql
SELECT 
    ta.nome as tipo_avaliacao,
    COUNT(*) as total_avaliacoes,
    AVG(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_media,
    MIN(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_minima,
    MAX(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_maxima
FROM avaliacoes a
JOIN tipos_avaliacoes ta ON a.tipo_avaliacao_id = ta.id
WHERE a.data_avaliacao BETWEEN ? AND ?
AND a.deleted_at IS NULL
GROUP BY ta.id, ta.nome;
```

### Recursos de avaliação
```sql
SELECT a.*, u_av.nome as avaliador_nome, u_ser.nome as servidor_nome,
       ptc.data_inicio, ptc.data_fim
FROM avaliacoes a
JOIN usuarios u_av ON a.avaliador_id = u_av.id
JOIN planos_trabalhos_consolidacoes ptc ON a.plano_trabalho_consolidacao_id = ptc.id
JOIN planos_trabalhos pt ON ptc.plano_trabalho_id = pt.id
JOIN usuarios u_ser ON pt.usuario_id = u_ser.id
WHERE a.recurso IS NOT NULL AND a.recurso != ''
AND a.deleted_at IS NULL
ORDER BY a.data_avaliacao DESC;
```

### Checklist de entregas avaliadas
```sql
SELECT aec.*, pte.descricao as entrega_descricao,
       JSON_LENGTH(aec.checklist) as total_itens_checklist
FROM avaliacoes_entregas_checklist aec
LEFT JOIN planos_trabalhos_entregas pte ON aec.plano_trabalho_entrega_id = pte.id
LEFT JOIN planos_entregas_entregas pee ON aec.plano_entrega_entrega_id = pee.id
WHERE aec.avaliacao_id = ?
AND aec.deleted_at IS NULL;
```

### Histórico de avaliações de uma unidade
```sql
SELECT u.nome as unidade_nome, u_ser.nome as servidor_nome,
       a.data_avaliacao, a.nota, a.justificativa,
       ta.nome as tipo_avaliacao
FROM avaliacoes a
JOIN planos_trabalhos_consolidacoes ptc ON a.plano_trabalho_consolidacao_id = ptc.id
JOIN planos_trabalhos pt ON ptc.plano_trabalho_id = pt.id
JOIN usuarios u_ser ON pt.usuario_id = u_ser.id
JOIN unidades u ON pt.unidade_id = u.id
JOIN tipos_avaliacoes ta ON a.tipo_avaliacao_id = ta.id
WHERE u.id = ? AND a.deleted_at IS NULL
ORDER BY a.data_avaliacao DESC;
```

## Índices Recomendados
- `avaliacoes_avaliador_id_data` (avaliador_id, data_avaliacao)
- `avaliacoes_plano_trabalho_consolidacao_id` (plano_trabalho_consolidacao_id)
- `avaliacoes_plano_entrega_id` (plano_entrega_id)
- `avaliacoes_tipo_avaliacao_id` (tipo_avaliacao_id)
- `avaliacoes_entregas_checklist_avaliacao_id` (avaliacao_id)
- `tipos_avaliacoes_notas_tipo_sequencia` (tipo_avaliacao_id, sequencia)