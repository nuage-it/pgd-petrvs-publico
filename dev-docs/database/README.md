# Documentação do Banco de Dados - Sistema PGD Petrvs

## Visão Geral

Esta documentação apresenta a estrutura do banco de dados do Sistema PGD Petrvs organizada por módulos funcionais. Cada arquivo contém as tabelas, relacionamentos e queries específicas de um módulo, facilitando o entendimento e manutenção do sistema.

## Estrutura dos Módulos

### 📋 [Planos de Trabalho](./modulo_planos_trabalho.md)
**Negócio:** Gestão de planos individuais de trabalho remoto/híbrido
- `planos_trabalhos` - Planos individuais dos servidores
- `planos_trabalhos_entregas` - Entregas definidas nos planos
- `planos_trabalhos_consolidacoes` - Períodos de avaliação
- Tabelas de consolidação (atividades, afastamentos, ocorrências)

### 🏢 [Planos de Entrega](./modulo_planos_entrega.md)
**Negócio:** Gestão de planos institucionais das unidades
- `planos_entregas` - Planos institucionais das unidades
- `planos_entregas_entregas` - Entregas específicas dos planos
- `planos_entregas_entregas_progressos` - Acompanhamento de progresso
- Tabelas de relacionamento (objetivos, processos, OKRs)

### ⚡ [Atividades](./modulo_atividades.md)
**Negócio:** Controle de execução e tempo de atividades
- `atividades` - Registro de atividades executadas
- `atividades_pausas` - Controle de pausas na execução
- `atividades_tarefas` - Decomposição em tarefas menores
- `tipos_atividades` e `tipos_tarefas` - Classificações

### 📊 [Avaliações](./modulo_avaliacoes.md)
**Negócio:** Sistema de avaliação de desempenho
- `avaliacoes` - Avaliações de planos e entregas
- `avaliacoes_entregas_checklist` - Checklist detalhado
- `tipos_avaliacoes` - Configuração de tipos de avaliação
- Tabelas de notas e justificativas padrão

### 👥 [Usuários e Unidades](./modulo_usuarios_unidades.md)
**Negócio:** Estrutura organizacional e controle de acesso
- `usuarios` - Cadastro de servidores
- `unidades` - Estrutura organizacional
- `unidades_integrantes` - Relacionamento usuário-unidade
- `perfis` e `capacidades` - Controle de permissões

### 📋 [Programas de Gestão](./modulo_programas.md)
**Negócio:** Configuração e regras dos programas PGD
- `programas` - Programas de gestão institucionais
- `programas_participantes` - Servidores habilitados
- `tipos_modalidades` - Modalidades de trabalho
- `tipos_justificativas` - Justificativas padrão

### 🔄 [Integrações](./modulo_integracoes.md)
**Negócio:** Sincronização com sistemas externos (SIAPE, Login Único)
- `integracoes` - Log de execuções de integração
- `integracao_servidores` - Dados do SIAPE (servidores)
- `integracao_unidades` - Dados do SIAPE (unidades)
- Tabelas de cache SIAPE

### 📈 [Relatórios e Indicadores](./modulo_relatorios.md)
**Negócio:** Geração de relatórios e indicadores gerenciais
- `view_api_pgd` - View para API oficial
- `audits` - Log de auditoria completo
- `sequences` - Controle de numeração
- Queries para relatórios gerenciais

### 🗂️ [Cadastros Básicos](./modulo_cadastros_basicos.md)
**Negócio:** Dados de referência e configuração
- `cidades` e `feriados` - Dados geográficos e temporais
- `cargos` e `funcoes` - Estrutura de RH
- `entidades` - Configuração institucional
- Diversos tipos de classificação

## Convenções do Banco

### Padrões de Nomenclatura
- **Tabelas:** snake_case no plural (ex: `planos_trabalhos`)
- **Campos:** snake_case (ex: `data_inicio`)
- **IDs:** char(36) UUID como chave primária
- **Foreign Keys:** `{tabela}_id` (ex: `usuario_id`)

### Campos Padrão
Todas as tabelas principais possuem:
- `id` char(36) - Chave primária UUID
- `created_at` timestamp - Data de criação
- `updated_at` timestamp - Data de atualização
- `deleted_at` timestamp - Soft delete (quando aplicável)

### Tipos de Dados Comuns
- **Datas:** datetime para timestamps, date para datas
- **Textos:** varchar(256) para nomes, text para descrições
- **JSON:** longtext com constraint JSON_VALID
- **Booleanos:** tinyint(4) com valores 0/1
- **Decimais:** decimal(5,2) para percentuais, double(8,2) para horas

### Relacionamentos
- **1:N:** Foreign key na tabela filha
- **N:N:** Tabela de relacionamento com sufixo apropriado
- **Hierarquia:** Campo `{tabela}_pai_id` e `path` para navegação

## Índices e Performance

### Índices Obrigatórios
- Chaves primárias (automático)
- Foreign keys (recomendado)
- Campos de busca frequente
- Campos de ordenação em relatórios

### Índices Compostos Importantes
- `(usuario_id, status)` - Consultas por usuário e status
- `(unidade_id, data_inicio)` - Consultas por unidade e período
- `(data_inicio, data_fim)` - Consultas por período
- `(deleted_at)` - Soft delete queries

## Integridade e Constraints

### Constraints de Integridade
- Foreign keys com `ON UPDATE CASCADE`
- Campos obrigatórios com `NOT NULL`
- Valores únicos com `UNIQUE`
- Validação JSON com `CHECK (json_valid(campo))`

### Soft Delete
Tabelas principais usam soft delete com campo `deleted_at`:
```sql
WHERE deleted_at IS NULL  -- Registros ativos
WHERE deleted_at IS NOT NULL  -- Registros excluídos
```

## Auditoria e Logs

### Sistema de Auditoria
- Tabela `audits` registra todas as operações CRUD
- Campos: usuário, ação, valores antigos/novos, timestamp
- Usado para compliance e rastreabilidade

### Logs de Integração
- Tabela `integracoes` registra execuções de sincronização
- Resultado em JSON com estatísticas e erros
- Histórico completo de sincronizações

## Backup e Manutenção

### Estratégia de Backup
- Backup completo diário
- Backup incremental a cada 4 horas
- Retenção de 30 dias para backups completos
- Retenção de 7 dias para backups incrementais

### Manutenção Recomendada
- Limpeza de logs antigos (> 1 ano)
- Otimização de índices mensalmente
- Análise de queries lentas semanalmente
- Monitoramento de crescimento das tabelas

## Versionamento

### Controle de Versão
- Migrations do Laravel para alterações de schema
- Versionamento semântico para releases
- Changelog detalhado de alterações
- Testes de migração em ambiente de homologação

### Compatibilidade
- Alterações backward-compatible quando possível
- Deprecação gradual de campos/tabelas
- Documentação de breaking changes
- Plano de migração para alterações críticas