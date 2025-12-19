# Módulo: Relatórios e Indicadores - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gera relatórios gerenciais e calcula indicadores de desempenho para diferentes níveis organizacionais. Fornece dados para tomada de decisão, acompanhamento de metas e prestação de contas do PGD.

## Views e Estruturas de Dados

### view_api_pgd
**Propósito:** View para integração com a API oficial do PGD
**Uso:** Padroniza dados para envio ao sistema central do governo

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| plano_trabalho_id | char(36) | ID do plano | Identificação única |
| servidor_cpf | varchar(14) | CPF do servidor | Identificação do servidor |
| servidor_nome | varchar(256) | Nome do servidor | Identificação |
| servidor_matricula | varchar(50) | Matrícula SIAPE | Identificação funcional |
| unidade_codigo | varchar(50) | Código da unidade | Identificação da unidade |
| unidade_nome | varchar(256) | Nome da unidade | Denominação |
| programa_nome | varchar(255) | Nome do programa | Identificação do programa |
| modalidade_nome | varchar(256) | Modalidade de trabalho | Tipo de trabalho |
| data_inicio | datetime | Início do plano | Período de vigência |
| data_fim | datetime | Fim do plano | Período de vigência |
| status | varchar(50) | Status atual | Situação do plano |
| carga_horaria | double(8,2) | Carga horária | Horas de trabalho |
| entregas_total | int(11) | Total de entregas | Quantidade planejada |
| entregas_concluidas | int(11) | Entregas concluídas | Quantidade realizada |
| percentual_execucao | decimal(5,2) | % de execução | Progresso geral |
| data_ultima_avaliacao | datetime | Última avaliação | Quando foi avaliado |
| nota_ultima_avaliacao | decimal(5,2) | Nota da avaliação | Desempenho |

## Tabelas de Apoio para Relatórios

### audits
**Propósito:** Log de auditoria de todas as operações do sistema
**Uso:** Rastreabilidade, compliance e análise de uso

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | bigint unsigned | Identificador único | Chave primária |
| user_type | varchar(255) | Tipo do usuário | Classe do modelo |
| user_id | char(36) | ID do usuário | Quem fez a ação |
| event | varchar(255) | Tipo de evento | created, updated, deleted |
| auditable_type | varchar(255) | Tipo do objeto | Classe auditada |
| auditable_id | char(36) | ID do objeto | Registro auditado |
| old_values | longtext JSON | Valores antigos | Estado anterior |
| new_values | longtext JSON | Valores novos | Estado atual |
| url | text | URL da requisição | Contexto da ação |
| ip_address | varchar(45) | IP do usuário | Origem da ação |
| user_agent | varchar(1023) | User agent | Navegador/sistema |
| tags | varchar(255) | Tags da auditoria | Classificação |
| created_at | timestamp | Data da ação | Quando ocorreu |
| error_message | longtext | Mensagem de erro | Se houve erro |

### sequences
**Propósito:** Controla sequências numéricas do sistema
**Uso:** Gera números sequenciais para documentos e registros

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária |
| nome | varchar(100) | Nome da sequência | Identificação |
| valor | bigint | Valor atual | Próximo número |
| incremento | int | Incremento | Passo da sequência |
| prefixo | varchar(20) | Prefixo | Texto inicial |
| sufixo | varchar(20) | Sufixo | Texto final |
| ativo | tinyint(4) | Se está ativo | Controle de uso |

## Queries para Relatórios

### Relatório de Produtividade por Servidor
```sql
SELECT 
    u.nome as servidor_nome,
    u.matricula,
    un.nome as unidade_nome,
    COUNT(pt.id) as total_planos,
    SUM(CASE WHEN pt.status = 'CONCLUIDO' THEN 1 ELSE 0 END) as planos_concluidos,
    AVG(CASE WHEN a.nota IS NOT NULL THEN CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2)) END) as nota_media,
    SUM(at.tempo_despendido) as tempo_total_atividades
FROM usuarios u
LEFT JOIN planos_trabalhos pt ON u.id = pt.usuario_id
LEFT JOIN unidades un ON pt.unidade_id = un.id
LEFT JOIN planos_trabalhos_consolidacoes ptc ON pt.id = ptc.plano_trabalho_id
LEFT JOIN avaliacoes a ON ptc.avaliacao_id = a.id
LEFT JOIN atividades at ON pt.id = at.plano_trabalho_id AND at.status = 'CONCLUIDO'
WHERE pt.data_inicio BETWEEN ? AND ?
AND u.deleted_at IS NULL
GROUP BY u.id, u.nome, u.matricula, un.nome
ORDER BY nota_media DESC, planos_concluidos DESC;
```

### Relatório de Desempenho por Unidade
```sql
SELECT 
    un.nome as unidade_nome,
    un.sigla,
    COUNT(DISTINCT pt.id) as total_planos,
    COUNT(DISTINCT pt.usuario_id) as total_servidores,
    AVG(CASE WHEN a.nota IS NOT NULL THEN CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2)) END) as nota_media_unidade,
    SUM(CASE WHEN pt.status = 'CONCLUIDO' THEN 1 ELSE 0 END) as planos_concluidos,
    (SUM(CASE WHEN pt.status = 'CONCLUIDO' THEN 1 ELSE 0 END) * 100.0 / COUNT(pt.id)) as percentual_conclusao
FROM unidades un
LEFT JOIN planos_trabalhos pt ON un.id = pt.unidade_id
LEFT JOIN planos_trabalhos_consolidacoes ptc ON pt.id = ptc.plano_trabalho_id
LEFT JOIN avaliacoes a ON ptc.avaliacao_id = a.id
WHERE pt.data_inicio BETWEEN ? AND ?
AND un.deleted_at IS NULL
GROUP BY un.id, un.nome, un.sigla
HAVING total_planos > 0
ORDER BY nota_media_unidade DESC;
```

### Indicadores Gerais do PGD
```sql
SELECT 
    'Planos de Trabalho' as indicador,
    COUNT(*) as total,
    SUM(CASE WHEN status = 'ATIVO' THEN 1 ELSE 0 END) as ativos,
    SUM(CASE WHEN status = 'CONCLUIDO' THEN 1 ELSE 0 END) as concluidos,
    SUM(CASE WHEN status = 'AVALIADO' THEN 1 ELSE 0 END) as avaliados
FROM planos_trabalhos 
WHERE deleted_at IS NULL

UNION ALL

SELECT 
    'Planos de Entrega' as indicador,
    COUNT(*) as total,
    SUM(CASE WHEN status = 'ATIVO' THEN 1 ELSE 0 END) as ativos,
    SUM(CASE WHEN status = 'CONCLUIDO' THEN 1 ELSE 0 END) as concluidos,
    SUM(CASE WHEN status = 'AVALIADO' THEN 1 ELSE 0 END) as avaliados
FROM planos_entregas 
WHERE deleted_at IS NULL

UNION ALL

SELECT 
    'Atividades' as indicador,
    COUNT(*) as total,
    SUM(CASE WHEN status = 'INICIADO' THEN 1 ELSE 0 END) as ativos,
    SUM(CASE WHEN status = 'CONCLUIDO' THEN 1 ELSE 0 END) as concluidos,
    0 as avaliados
FROM atividades 
WHERE deleted_at IS NULL;
```

### Relatório de Modalidades de Trabalho
```sql
SELECT 
    tm.nome as modalidade,
    COUNT(pt.id) as total_planos,
    AVG(pt.carga_horaria) as carga_horaria_media,
    COUNT(DISTINCT pt.usuario_id) as total_servidores,
    COUNT(DISTINCT pt.unidade_id) as total_unidades
FROM tipos_modalidades tm
LEFT JOIN planos_trabalhos pt ON tm.id = pt.tipo_modalidade_id
WHERE pt.data_inicio BETWEEN ? AND ?
AND tm.deleted_at IS NULL
GROUP BY tm.id, tm.nome
ORDER BY total_planos DESC;
```

### Evolução Temporal dos Planos
```sql
SELECT 
    DATE_FORMAT(pt.data_inicio, '%Y-%m') as mes_ano,
    COUNT(*) as planos_criados,
    SUM(CASE WHEN pt.status = 'CONCLUIDO' THEN 1 ELSE 0 END) as planos_concluidos,
    AVG(pt.carga_horaria) as carga_horaria_media
FROM planos_trabalhos pt
WHERE pt.data_inicio >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
AND pt.deleted_at IS NULL
GROUP BY DATE_FORMAT(pt.data_inicio, '%Y-%m')
ORDER BY mes_ano;
```

### Relatório de Avaliações por Período
```sql
SELECT 
    DATE_FORMAT(a.data_avaliacao, '%Y-%m') as mes_ano,
    COUNT(*) as total_avaliacoes,
    AVG(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_media,
    MIN(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_minima,
    MAX(CAST(JSON_EXTRACT(a.nota, '$.valor') AS DECIMAL(5,2))) as nota_maxima,
    COUNT(CASE WHEN a.recurso IS NOT NULL AND a.recurso != '' THEN 1 END) as total_recursos
FROM avaliacoes a
WHERE a.data_avaliacao >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
AND a.deleted_at IS NULL
GROUP BY DATE_FORMAT(a.data_avaliacao, '%Y-%m')
ORDER BY mes_ano;
```

### Auditoria de Ações por Usuário
```sql
SELECT 
    u.nome as usuario_nome,
    u.email,
    COUNT(*) as total_acoes,
    COUNT(CASE WHEN a.event = 'created' THEN 1 END) as criações,
    COUNT(CASE WHEN a.event = 'updated' THEN 1 END) as atualizações,
    COUNT(CASE WHEN a.event = 'deleted' THEN 1 END) as exclusões,
    MAX(a.created_at) as ultima_acao
FROM audits a
LEFT JOIN usuarios u ON a.user_id = u.id
WHERE a.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.nome, u.email
ORDER BY total_acoes DESC
LIMIT 50;
```

## Índices para Performance de Relatórios
- `audits_user_id_created_at` (user_id, created_at)
- `audits_auditable_type_created_at` (auditable_type, created_at)
- `planos_trabalhos_data_inicio_status` (data_inicio, status)
- `planos_entregas_data_inicio_status` (data_inicio, status)
- `avaliacoes_data_avaliacao` (data_avaliacao)
- `atividades_status_data_entrega` (status, data_entrega)