# Módulo: Cadastros Básicos - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia cadastros auxiliares como tipos, feriados, cidades e outras entidades de apoio ao sistema. Fornece dados de referência para classificação, configuração e operação dos demais módulos.

## Tabelas de Tipos e Classificações

### tipos_atividades
**Propósito:** Classificação das atividades por tipo
**Uso:** Categoriza atividades para relatórios e controle

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Classificação |
| descricao | text | Descrição detalhada | Explicação do tipo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| icone | varchar(100) | Classe CSS do ícone | Representação visual |
| cor | varchar(100) | Cor em hexadecimal | Identificação visual |

### tipos_avaliacoes
**Propósito:** Tipos de avaliação disponíveis no sistema
**Uso:** Define modalidades de avaliação de desempenho

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Identificação |
| descricao | text | Descrição detalhada | Explicação do tipo |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| periodicidade | enum | Frequência | MENSAL, TRIMESTRAL, etc. |
| nota_maxima | decimal(5,2) | Nota máxima | Escala de avaliação |
| nota_minima | decimal(5,2) | Nota mínima | Escala de avaliação |

### tipos_documentos
**Propósito:** Classificação dos documentos do sistema
**Uso:** Categoriza documentos por finalidade

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Classificação |
| descricao | text | Descrição detalhada | Explicação |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| template_padrao | text | Template padrão | Modelo do documento |

### tipos_modalidades
**Propósito:** Modalidades de trabalho (remoto, híbrido, presencial)
**Uso:** Define como o servidor pode trabalhar

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da modalidade | Ex: Teletrabalho |
| descricao | text | Descrição detalhada | Explicação |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| exige_pedagio | tinyint(4) | Se exige pedágio | Restrição temporal |
| permite_alteracao | tinyint(4) | Se permite mudança | Flexibilidade |

### tipos_processos
**Propósito:** Tipos de processos organizacionais
**Uso:** Classifica processos da cadeia de valor

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do tipo | Classificação |
| descricao | text | Descrição detalhada | Explicação |
| ativo | tinyint(4) | Se está ativo | Controle de uso |
| cor | varchar(100) | Cor em hex | Identificação visual |

## Tabelas Geográficas e Temporais

### cidades
**Propósito:** Cadastro de cidades brasileiras
**Uso:** Localização de unidades e usuários

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| codigo_ibge | varchar(20) | Código IBGE | Identificação oficial |
| nome | varchar(256) | Nome da cidade | Denominação |
| tipo | set | Tipo da cidade | MUNICIPIO, DISTRITO, CAPITAL |
| uf | varchar(2) | Unidade Federativa | Estado |
| timezone | int(11) | Fuso horário UTC | Diferença para UTC |

### feriados
**Propósito:** Cadastro de feriados nacionais, estaduais e municipais
**Uso:** Cálculo de dias úteis e planejamento

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(250) | Descrição do feriado | Nome do feriado |
| dia | int(11) | Dia do mês ou semana | 1-31 ou 1-7 |
| mes | int(11) | Mês | 1-12 |
| ano | int(11) | Ano específico | Para feriados únicos |
| tipoDia | enum | Tipo do dia | MES, SEMANA |
| recorrente | tinyint(4) | Se repete anualmente | Feriado fixo |
| abrangencia | enum | Abrangência | NACIONAL, ESTADUAL, MUNICIPAL |
| codigo_ibge | varchar(8) | Código IBGE | Para feriados locais |
| uf | varchar(2) | UF | Para feriados estaduais |
| entidade_id | char(36) | FK para entidades | Entidade específica |
| cidade_id | char(36) | FK para cidades | Cidade específica |

## Tabelas de Recursos Humanos

### cargos
**Propósito:** Cadastro de cargos públicos
**Uso:** Classificação funcional dos servidores

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do cargo | Denominação oficial |
| nivel | varchar(256) | Nível do cargo | Classificação |
| descricao | varchar(256) | Descrição | Atribuições |
| siape | varchar(256) | Código SIAPE | Identificação oficial |
| cbo | varchar(256) | Código CBO | Classificação brasileira |
| efetivo | tinyint(4) | Se é efetivo | Cargo ou função |
| ativo | tinyint(4) | Se está ativo | Controle de uso |

### funcoes
**Propósito:** Cadastro de funções comissionadas
**Uso:** Funções de confiança e gratificadas

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da função | Denominação |
| nivel | varchar(256) | Nível da função | Classificação |
| descricao | varchar(256) | Descrição | Atribuições |
| siape | varchar(256) | Código SIAPE | Identificação oficial |
| cbo | varchar(256) | Código CBO | Classificação |
| ativo | tinyint(4) | Se está ativo | Controle de uso |

## Tabelas de Configuração

### entidades
**Propósito:** Órgãos e entidades da administração pública
**Uso:** Configuração institucional do sistema

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| sigla | varchar(100) | Sigla da entidade | Abreviação |
| nome | varchar(256) | Nome da entidade | Denominação oficial |
| abrangencia | enum | Abrangência | NACIONAL, ESTADUAL, MUNICIPAL |
| codigo_ibge | varchar(8) | Código IBGE | Localização |
| uf | varchar(2) | UF | Estado |
| carga_horaria_padrao | int(11) | Carga horária padrão | Horas diárias |
| gravar_historico_processo | tinyint(4) | Se grava histórico | Auditoria |
| layout_formulario_atividade | enum | Layout do formulário | COMPLETO, SIMPLIFICADO |
| campos_ocultos_atividade | longtext JSON | Campos ocultos | Customização |
| nomenclatura | longtext JSON | Nomenclatura | Termos específicos |
| notificacoes | longtext JSON | Config. notificações | Configurações |
| forma_contagem_carga_horaria | enum | Forma de contagem | DIA, SEMANA, MES |
| expediente | longtext JSON | Horário de expediente | Configuração |
| tipo_modalidade_id | char(36) | FK tipos_modalidades | Modalidade padrão |
| cidade_id | char(36) | FK para cidades | Localização |
| gestor_id | char(36) | FK para usuarios | Gestor da entidade |
| gestor_substituto_id | char(36) | FK para usuarios | Gestor substituto |
| email_responsavel_siape | varchar(100) | Email responsável | Integração SIAPE |
| email_remetente_siape | varchar(100) | Email remetente | Integração SIAPE |

## Queries Comuns

### Feriados de um período e localidade
```sql
SELECT f.nome, f.dia, f.mes, f.ano, f.recorrente
FROM feriados f
WHERE (f.abrangencia = 'NACIONAL' 
   OR (f.abrangencia = 'ESTADUAL' AND f.uf = ?)
   OR (f.abrangencia = 'MUNICIPAL' AND f.codigo_ibge = ?))
AND ((f.recorrente = 1 AND f.mes BETWEEN ? AND ?)
   OR (f.recorrente = 0 AND f.ano = ? AND f.mes BETWEEN ? AND ?))
AND f.deleted_at IS NULL
ORDER BY f.mes, f.dia;
```

### Tipos ativos por categoria
```sql
SELECT 'Atividades' as categoria, nome, descricao FROM tipos_atividades WHERE ativo = 1
UNION ALL
SELECT 'Avaliações' as categoria, nome, descricao FROM tipos_avaliacoes WHERE ativo = 1
UNION ALL
SELECT 'Documentos' as categoria, nome, descricao FROM tipos_documentos WHERE ativo = 1
UNION ALL
SELECT 'Modalidades' as categoria, nome, descricao FROM tipos_modalidades WHERE ativo = 1
ORDER BY categoria, nome;
```

### Cidades por estado
```sql
SELECT c.nome, c.codigo_ibge, c.tipo
FROM cidades c
WHERE c.uf = ?
ORDER BY c.nome;
```

### Cargos e funções ativos
```sql
SELECT 'Cargo' as tipo, nome, nivel, siape, cbo FROM cargos WHERE ativo = 1
UNION ALL
SELECT 'Função' as tipo, nome, nivel, siape, cbo FROM funcoes WHERE ativo = 1
ORDER BY tipo, nome;
```

### Configurações de uma entidade
```sql
SELECT e.nome, e.sigla, e.carga_horaria_padrao,
       e.forma_contagem_carga_horaria, e.layout_formulario_atividade,
       tm.nome as modalidade_padrao,
       c.nome as cidade_nome,
       ug.nome as gestor_nome,
       ugs.nome as gestor_substituto_nome
FROM entidades e
LEFT JOIN tipos_modalidades tm ON e.tipo_modalidade_id = tm.id
LEFT JOIN cidades c ON e.cidade_id = c.id
LEFT JOIN usuarios ug ON e.gestor_id = ug.id
LEFT JOIN usuarios ugs ON e.gestor_substituto_id = ugs.id
WHERE e.id = ?;
```

## Índices Recomendados
- `cidades_codigo_ibge_unique` (codigo_ibge) UNIQUE
- `cidades_uf_nome` (uf, nome)
- `feriados_abrangencia_uf_codigo` (abrangencia, uf, codigo_ibge)
- `feriados_mes_dia` (mes, dia)
- `tipos_atividades_ativo` (ativo)
- `tipos_avaliacoes_ativo` (ativo)
- `tipos_documentos_ativo` (ativo)
- `tipos_modalidades_ativo` (ativo)
- `cargos_ativo_siape` (ativo, siape)
- `funcoes_ativo_siape` (ativo, siape)
- `entidades_sigla_unique` (sigla) UNIQUE