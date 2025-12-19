# Módulo: Usuários e Unidades - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia usuários, unidades organizacionais, perfis de acesso e estrutura hierárquica da organização. É a base para autenticação, autorização e organização institucional do sistema PGD.

## Tabelas Principais

### usuarios
**Propósito:** Cadastro de usuários do sistema (servidores públicos)
**Uso:** Controla acesso, dados pessoais e funcionais dos servidores

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome completo | Nome do servidor |
| email | varchar(256) | Email institucional | Contato e login |
| cpf | varchar(14) | CPF do servidor | Documento único |
| matricula | varchar(50) | Matrícula SIAPE | Identificação funcional |
| telefone | varchar(20) | Telefone de contato | Comunicação |
| sexo | enum | Sexo | M, F |
| data_nascimento | date | Data de nascimento | Informação pessoal |
| situacao_funcional | varchar(100) | Situação no SIAPE | Ativo, aposentado, etc. |
| nivel | varchar(50) | Nível do cargo | Classificação funcional |
| codigo_siape | varchar(20) | Código SIAPE | Integração com SIAPE |
| ativo | tinyint(4) | Se está ativo | Controle de acesso |
| pedagio | datetime | Data limite pedagio | Restrição temporal |
| texto_complementar_plano | text | Texto padrão | Para planos de trabalho |
| config | longtext JSON | Configurações pessoais | Preferências do usuário |
| perfil_id | char(36) | FK para perfis | Perfil de acesso |
| lotacao_id | char(36) | FK para unidades | Unidade de lotação |

**Relacionamentos:**
- Tem um Perfil de acesso
- Tem uma Lotação (unidade)
- Pode ser Integrante de várias Unidades
- Tem muitos Planos de Trabalho
- Pode ser Gestor de Unidades
- Tem muitas Atividades
- Pode fazer Avaliações

### unidades
**Propósito:** Estrutura organizacional da instituição
**Uso:** Define hierarquia, gestores e configurações das unidades

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da unidade | Denominação oficial |
| sigla | varchar(50) | Sigla da unidade | Abreviação |
| codigo | varchar(50) | Código da unidade | Identificação numérica |
| path | text | Caminho hierárquico | IDs dos pais separados por / |
| instituidora | tinyint(4) | Se é instituidora | Pode criar programas |
| ativa | tinyint(4) | Se está ativa | Controle de uso |
| data_inativacao | datetime | Data de inativação | Quando foi desativada |
| texto_complementar_plano | text | Texto padrão | Para planos da unidade |
| notificacoes | longtext JSON | Config. notificações | Configurações de envio |
| entidade_id | char(36) | FK para entidades | Entidade à qual pertence |
| unidade_pai_id | char(36) | FK para si mesmo | Hierarquia organizacional |
| gestor_id | char(36) | FK para usuarios | Gestor titular |
| gestor_substituto_id | char(36) | FK para usuarios | Gestor substituto |
| cidade_id | char(36) | FK para cidades | Localização |

**Relacionamentos:**
- Pertence a uma Entidade
- Pode ter uma Unidade Pai (hierarquia)
- Tem um Gestor titular
- Pode ter um Gestor substituto
- Está em uma Cidade
- Tem muitos Integrantes
- Tem muitos Planos de Trabalho
- Tem muitos Planos de Entrega

### unidades_integrantes
**Propósito:** Relaciona usuários com unidades e suas atribuições
**Uso:** Define quem trabalha em cada unidade e com que função

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_inicio | datetime | Início da integração | Quando começou na unidade |
| data_fim | datetime | Fim da integração | Quando saiu da unidade |
| atribuicoes | longtext JSON | Funções na unidade | Papéis desempenhados |
| unidade_id | char(36) | FK para unidades | Unidade de trabalho |
| usuario_id | char(36) | FK para usuarios | Servidor integrante |

**Relacionamentos:**
- Pertence a uma Unidade
- Pertence a um Usuário
- Tem muitas Atribuições específicas

### unidades_integrantes_atribuicoes
**Propósito:** Atribuições específicas dos integrantes nas unidades
**Uso:** Define papéis detalhados como gestor, colaborador, etc.

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| atribuicao | varchar(100) | Tipo de atribuição | GESTOR, COLABORADOR, etc. |
| data_inicio | datetime | Início da atribuição | Quando assumiu |
| data_fim | datetime | Fim da atribuição | Quando deixou |
| unidade_integrante_id | char(36) | FK para unidades_integrantes | Integração pai |

## Tabelas de Configuração

### perfis
**Propósito:** Perfis de acesso e permissões do sistema
**Uso:** Controla o que cada usuário pode fazer no sistema

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome do perfil | Identificação |
| descricao | text | Descrição detalhada | Explicação das permissões |
| nivel | int(11) | Nível hierárquico | Evita elevação de privilégios |

### capacidades
**Propósito:** Capacidades/permissões específicas dos perfis
**Uso:** Define granularmente o que cada perfil pode fazer

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| perfil_id | char(36) | FK para perfis | Perfil que tem a capacidade |
| tipo_capacidade_id | char(36) | FK para tipos_capacidades | Tipo de permissão |

### tipos_capacidades
**Propósito:** Tipos de capacidades/permissões disponíveis
**Uso:** Define todas as permissões possíveis no sistema

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| nome | varchar(256) | Nome da capacidade | Ex: MOD_PTR, MOD_PEN |
| descricao | text | Descrição da permissão | O que permite fazer |
| ativo | tinyint(4) | Se está ativo | Controle de uso |

## Queries Comuns

### Usuários de uma unidade com suas atribuições
```sql
SELECT u.nome as usuario_nome, u.email, u.matricula,
       ui.data_inicio, ui.data_fim,
       GROUP_CONCAT(uia.atribuicao) as atribuicoes
FROM usuarios u
JOIN unidades_integrantes ui ON u.id = ui.usuario_id
LEFT JOIN unidades_integrantes_atribuicoes uia ON ui.id = uia.unidade_integrante_id
WHERE ui.unidade_id = ? 
AND (ui.data_fim IS NULL OR ui.data_fim > NOW())
AND u.deleted_at IS NULL
GROUP BY u.id
ORDER BY u.nome;
```

### Hierarquia de unidades
```sql
WITH RECURSIVE hierarquia AS (
    SELECT id, nome, sigla, unidade_pai_id, 0 as nivel, nome as caminho
    FROM unidades 
    WHERE unidade_pai_id IS NULL AND ativa = 1
    
    UNION ALL
    
    SELECT u.id, u.nome, u.sigla, u.unidade_pai_id, h.nivel + 1,
           CONCAT(h.caminho, ' > ', u.nome)
    FROM unidades u
    JOIN hierarquia h ON u.unidade_pai_id = h.id
    WHERE u.ativa = 1
)
SELECT * FROM hierarquia ORDER BY caminho;
```

### Gestores de uma unidade e superiores
```sql
SELECT u.nome as unidade_nome, 
       ug.nome as gestor_nome, ug.email as gestor_email,
       ugs.nome as substituto_nome, ugs.email as substituto_email
FROM unidades u
LEFT JOIN usuarios ug ON u.gestor_id = ug.id
LEFT JOIN usuarios ugs ON u.gestor_substituto_id = ugs.id
WHERE u.id = ? AND u.deleted_at IS NULL;
```

### Permissões de um usuário
```sql
SELECT u.nome as usuario_nome, p.nome as perfil_nome,
       tc.nome as capacidade, tc.descricao
FROM usuarios u
JOIN perfis p ON u.perfil_id = p.id
JOIN capacidades c ON p.id = c.perfil_id
JOIN tipos_capacidades tc ON c.tipo_capacidade_id = tc.id
WHERE u.id = ? AND tc.ativo = 1
ORDER BY tc.nome;
```

### Usuários por situação funcional
```sql
SELECT situacao_funcional, COUNT(*) as total_usuarios
FROM usuarios 
WHERE ativo = 1 AND deleted_at IS NULL
GROUP BY situacao_funcional
ORDER BY total_usuarios DESC;
```

### Unidades sem gestor
```sql
SELECT u.nome, u.sigla, u.codigo
FROM unidades u
WHERE u.gestor_id IS NULL 
AND u.ativa = 1 
AND u.deleted_at IS NULL
ORDER BY u.nome;
```

### Servidores com pedagio vencendo
```sql
SELECT u.nome, u.email, u.matricula, u.pedagio,
       DATEDIFF(u.pedagio, NOW()) as dias_restantes
FROM usuarios u
WHERE u.pedagio IS NOT NULL 
AND u.pedagio > NOW()
AND u.pedagio <= DATE_ADD(NOW(), INTERVAL 30 DAY)
AND u.ativo = 1
ORDER BY u.pedagio ASC;
```

## Índices Recomendados
- `usuarios_email_unique` (email) UNIQUE
- `usuarios_cpf_unique` (cpf) UNIQUE
- `usuarios_matricula` (matricula)
- `usuarios_perfil_id` (perfil_id)
- `usuarios_lotacao_id` (lotacao_id)
- `unidades_entidade_id` (entidade_id)
- `unidades_unidade_pai_id` (unidade_pai_id)
- `unidades_gestor_id` (gestor_id)
- `unidades_integrantes_unidade_usuario` (unidade_id, usuario_id)
- `unidades_integrantes_data_fim` (data_fim)
- `capacidades_perfil_tipo` (perfil_id, tipo_capacidade_id)