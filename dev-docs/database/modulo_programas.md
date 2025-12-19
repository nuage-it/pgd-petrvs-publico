# Módulo: Programas de Gestão - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia os programas de gestão (PGD) que definem as regras, prazos e configurações para o trabalho remoto/híbrido. Cada programa estabelece as diretrizes para criação de planos de trabalho e entregas institucionais.

## Tabelas Principais

### programas
**Propósito:** Programas de gestão que regulamentam o PGD na instituição
**Uso:** Define regras, prazos, avaliações e configurações para planos de trabalho

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(255) | Nome do programa | Identificação do programa |
| normativa | varchar(255) | Normativa regulamentadora | Base legal do programa |
| link_normativa | varchar(255) | Link da normativa | URL do documento |
| link_autorizacao | varchar(255) | Link da autorização | URL da autorização |
| data_inicio | datetime | Início da vigência | Quando o programa inicia |
| data_fim | datetime | Fim da vigência | Quando o programa expira |
| prazo_max_plano_entrega | int(11) | Prazo máximo (dias) | Limite para planos de entrega |
| termo_obrigatorio | tinyint(4) | Se TCR é obrigatório | Exige termo de responsabilidade |
| config | longtext JSON | Configurações gerais | Parâmetros do programa |
| periodicidade_consolidacao | enum | Período de avaliação | MENSAL, TRIMESTRAL, etc. |
| periodicidade_valor | int(11) | Valor da periodicidade | Dia específico ou quantidade |
| dias_tolerancia_consolidacao | int(11) | Tolerância consolidação | Dias extras para consolidar |
| dias_tolerancia_avaliacao | int(11) | Tolerância avaliação | Dias extras para avaliar |
| dias_tolerancia_recurso_avaliacao | int(11) | Tolerância recurso | Dias para recorrer |
| nota_padrao_avaliacao | longtext JSON | Nota automática | Nota quando não avaliado |
| registra_comparecimento | tinyint(4) | Se registra presença | Controle de comparecimento |
| plano_trabalho_assinatura_participante | tinyint(4) | Exige assinatura servidor | TCR assinado pelo servidor |
| plano_trabalho_assinatura_gestor_lotacao | tinyint(4) | Exige assinatura gestor lotação | TCR assinado pelo gestor |
| plano_trabalho_assinatura_gestor_unidade | tinyint(4) | Exige assinatura gestor unidade | TCR assinado pelo gestor |
| plano_trabalho_assinatura_gestor_entidade | tinyint(4) | Exige assinatura gestor entidade | TCR assinado pelo gestor |
| plano_trabalho_criterios_avaliacao | longtext JSON | Critérios de avaliação | Como avaliar planos |
| checklist_avaliacao_entregas_plano_entrega | longtext JSON | Checklist plano entrega | Critérios para avaliar |
| checklist_avaliacao_entregas_plano_trabalho | longtext JSON | Checklist plano trabalho | Critérios para avaliar |
| unidade_id | char(36) | FK para unidades | Unidade instituidora |
| unidade_autorizadora_id | char(36) | FK para unidades | Unidade que autoriza |
| tipo_avaliacao_plano_trabalho_id | char(36) | FK tipos_avaliacoes | Tipo para planos trabalho |
| tipo_avaliacao_plano_entrega_id | char(36) | FK tipos_avaliacoes | Tipo para planos entrega |
| tipo_justificativa_id | char(36) | FK tipos_justificativas | Justificativas permitidas |
| template_tcr_id | char(36) | FK templates | Template do TCR |
| tipo_documento_tcr_id | char(36) | FK tipos_documentos | Tipo do documento TCR |
| documento_id | char(36) | FK documentos | Documento base do programa |

**Relacionamentos:**
- Pertence a uma Unidade instituidora
- Pode ter uma Unidade autorizadora
- Tem Tipos de Avaliação específicos
- Pode ter Tipo de Justificativa
- Pode ter Template para TCR
- Tem muitos Participantes
- Tem muitos Planos de Trabalho
- Tem muitos Planos de Entrega

### programas_participantes
**Propósito:** Servidores habilitados a participar do programa
**Uso:** Controla quem pode criar planos de trabalho no programa

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| habilitado | tinyint(4) | Se está habilitado | Pode participar do programa |
| programa_id | char(36) | FK para programas | Programa de participação |
| usuario_id | char(36) | FK para usuarios | Servidor participante |
| documento_id | char(36) | FK para documentos | Documento de habilitação |

**Relacionamentos:**
- Pertence a um Programa
- Pertence a um Usuário
- Pode ter um Documento de habilitação

## Tabelas de Apoio

### tipos_modalidades
**Propósito:** Modalidades de trabalho disponíveis (remoto, híbrido, presencial)
**Uso:** Define como o servidor pode trabalhar

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da modalidade | Ex: Teletrabalho, Híbrido |
| descricao | text | Descrição detalhada | Explicação da modalidade |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| exige_pedagio | tinyint(4) | Se exige pedágio | Restrição temporal |
| permite_alteracao | tinyint(4) | Se permite mudança | Flexibilidade |

### tipos_justificativas
**Propósito:** Tipos de justificativas para ações no sistema
**Uso:** Padroniza justificativas para alterações e decisões

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da justificativa | Identificação |
| descricao | text | Descrição detalhada | Explicação completa |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| exige_observacoes | tinyint(4) | Se exige texto adicional | Detalhamento obrigatório |

## Queries Comuns

### Programas vigentes de uma unidade
```sql
SELECT p.*, u.nome as unidade_nome, ua.nome as unidade_autorizadora
FROM programas p
JOIN unidades u ON p.unidade_id = u.id
LEFT JOIN unidades ua ON p.unidade_autorizadora_id = ua.id
WHERE p.unidade_id = ? 
AND p.data_inicio <= NOW() 
AND p.data_fim >= NOW()
AND p.deleted_at IS NULL
ORDER BY p.data_inicio DESC;
```

### Participantes habilitados de um programa
```sql
SELECT u.nome, u.email, u.matricula, pp.habilitado
FROM programas_participantes pp
JOIN usuarios u ON pp.usuario_id = u.id
WHERE pp.programa_id = ? 
AND pp.habilitado = 1
AND pp.deleted_at IS NULL
ORDER BY u.nome;
```

### Programas com prazos vencendo
```sql
SELECT p.nome, p.data_fim, u.nome as unidade_nome,
       DATEDIFF(p.data_fim, NOW()) as dias_restantes
FROM programas p
JOIN unidades u ON p.unidade_id = u.id
WHERE p.data_fim > NOW()
AND p.data_fim <= DATE_ADD(NOW(), INTERVAL 30 DAY)
AND p.deleted_at IS NULL
ORDER BY p.data_fim ASC;
```

### Configurações de assinatura de um programa
```sql
SELECT p.nome,
       p.plano_trabalho_assinatura_participante as exige_assinatura_servidor,
       p.plano_trabalho_assinatura_gestor_lotacao as exige_assinatura_gestor_lotacao,
       p.plano_trabalho_assinatura_gestor_unidade as exige_assinatura_gestor_unidade,
       p.plano_trabalho_assinatura_gestor_entidade as exige_assinatura_gestor_entidade
FROM programas p
WHERE p.id = ?;
```

### Estatísticas de participação por programa
```sql
SELECT p.nome as programa_nome,
       COUNT(pp.id) as total_participantes,
       SUM(CASE WHEN pp.habilitado = 1 THEN 1 ELSE 0 END) as habilitados,
       SUM(CASE WHEN pp.habilitado = 0 THEN 1 ELSE 0 END) as desabilitados
FROM programas p
LEFT JOIN programas_participantes pp ON p.id = pp.programa_id
WHERE p.deleted_at IS NULL
GROUP BY p.id, p.nome
ORDER BY total_participantes DESC;
```

### Modalidades disponíveis
```sql
SELECT tm.nome, tm.descricao, tm.exige_pedagio, tm.permite_alteracao
FROM tipos_modalidades tm
WHERE tm.ativo = 1 AND tm.deleted_at IS NULL
ORDER BY tm.nome;
```

### Programas por periodicidade de consolidação
```sql
SELECT periodicidade_consolidacao, COUNT(*) as total_programas
FROM programas 
WHERE deleted_at IS NULL
AND data_inicio <= NOW() 
AND data_fim >= NOW()
GROUP BY periodicidade_consolidacao
ORDER BY total_programas DESC;
```

### Verificar se usuário pode participar de programa
```sql
SELECT pp.habilitado, u.nome as usuario_nome, p.nome as programa_nome
FROM programas_participantes pp
JOIN usuarios u ON pp.usuario_id = u.id
JOIN programas p ON pp.programa_id = p.id
WHERE pp.usuario_id = ? AND pp.programa_id = ?
AND pp.deleted_at IS NULL;
```

## Índices Recomendados
- `programas_unidade_id_vigencia` (unidade_id, data_inicio, data_fim)
- `programas_data_fim` (data_fim)
- `programas_participantes_programa_usuario` (programa_id, usuario_id)
- `programas_participantes_habilitado` (habilitado)
- `tipos_modalidades_ativo` (ativo)
- `tipos_justificativas_ativo` (ativo)