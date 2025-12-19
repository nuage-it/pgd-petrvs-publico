# Módulo: Integrações Externas - Estrutura do Banco de Dados

## Visão de Negócio
Este módulo gerencia integrações com sistemas externos como SIAPE, Login Único, Azure AD e APIs governamentais. Mantém sincronização de dados de servidores, unidades e autenticação multi-provider.

## Tabelas Principais

### integracoes
**Propósito:** Registra execuções das rotinas de integração com sistemas externos
**Uso:** Controla sincronizações, logs e resultados das integrações

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| data_execucao | datetime | Data da execução | Quando foi executada |
| atualizar_unidades | tinyint(1) | Se atualizou unidades | Flag de sincronização |
| atualizar_servidores | tinyint(1) | Se atualizou servidores | Flag de sincronização |
| atualizar_gestores | tinyint(1) | Se atualizou gestores | Flag de sincronização |
| usar_arquivos_locais | tinyint(1) | Se usou arquivos locais | Modo de operação |
| gravar_arquivos_locais | tinyint(1) | Se gravou arquivos | Backup local |
| resultado | longtext JSON | Resultado da execução | Logs e estatísticas |
| entidade_id | char(36) | FK para entidades | Entidade sincronizada |
| usuario_id | char(36) | FK para usuarios | Quem executou |

**Relacionamentos:**
- Pertence a uma Entidade
- Executada por um Usuário
- Gera registros em tabelas SIAPE

### integracao_servidores
**Propósito:** Dados de servidores importados do SIAPE
**Uso:** Armazena informações funcionais sincronizadas do sistema oficial

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| cpf | varchar(14) | CPF do servidor | Documento único |
| nome | varchar(200) | Nome completo | Nome oficial |
| matricula_siape | varchar(20) | Matrícula SIAPE | Identificação funcional |
| cod_uorg_lotacao | varchar(20) | Código unidade lotação | Onde está lotado |
| cod_uorg_exercicio | varchar(20) | Código unidade exercício | Onde trabalha |
| nome_cargo | varchar(100) | Nome do cargo | Cargo efetivo |
| classe_cargo | varchar(50) | Classe do cargo | Classificação |
| ref_padrao_cargo | varchar(20) | Referência padrão | Nível salarial |
| situacao_funcional | varchar(100) | Situação funcional | Ativo, aposentado, etc. |
| regime_juridico | varchar(100) | Regime jurídico | Estatutário, CLT, etc. |
| jornada_trabalho | varchar(50) | Jornada de trabalho | Horas semanais |
| data_exercicio_cargo | date | Data de exercício | Início no cargo |
| data_ingresso_cargofuncao | date | Data de ingresso | Entrada na função |
| data_ingresso_orgao | date | Data ingresso órgão | Entrada na instituição |
| data_ingresso_servicopublico | date | Data ingresso serviço | Entrada no serviço público |
| diploma_ingresso_cargofuncao | varchar(100) | Diploma de ingresso | Forma de ingresso |
| diploma_ingresso_servicopublico | varchar(100) | Diploma serviço público | Concurso, nomeação, etc. |
| ativo | tinyint(1) | Se está ativo | Status no SIAPE |

**Relacionamentos:**
- Pode estar vinculado a um Usuário do sistema
- Referencia Unidades pelos códigos

### integracao_unidades
**Propósito:** Dados de unidades organizacionais importadas do SIAPE
**Uso:** Estrutura organizacional oficial sincronizada

| Campo | Tipo | Descrição | Negócio |
|-------|------|-----------|---------|
| id | char(36) | Identificador único | Chave primária UUID |
| id_servo | varchar(50) | ID no sistema SERVO | Identificação SERVO |
| pai_servo | varchar(50) | ID pai no SERVO | Hierarquia SERVO |
| codigo_siape | varchar(50) | Código SIAPE | Identificação SIAPE |
| pai_siape | varchar(50) | Código pai SIAPE | Hierarquia SIAPE |
| codupag | varchar(50) | Código UPAG | Unidade pagadora |
| nomeuorg | varchar(200) | Nome da unidade | Denominação oficial |
| siglauorg | varchar(50) | Sigla da unidade | Abreviação |
| telefone | varchar(50) | Telefone | Contato |
| email | varchar(100) | Email | Contato eletrônico |
| natureza | varchar(50) | Natureza da unidade | Tipo organizacional |
| fronteira | varchar(50) | Fronteira | Localização especial |
| fuso_horario | varchar(50) | Fuso horário | Timezone |
| cod_uop | varchar(50) | Código UOP | Unidade operacional |
| cod_unidade | varchar(50) | Código unidade | Identificação |
| tipo | varchar(50) | Tipo da unidade | Classificação |
| tipo_desc | varchar(100) | Descrição do tipo | Detalhamento |
| na_rodovia | varchar(50) | Se na rodovia | Localização especial |
| logradouro | varchar(100) | Endereço | Localização |
| bairro | varchar(100) | Bairro | Localização |
| cep | varchar(50) | CEP | Código postal |
| ptn_ge_coordenada | varchar(50) | Coordenadas | Geolocalização |
| municipio_siafi_siape | varchar(100) | Município SIAFI | Localização oficial |
| municipio_siscom | varchar(100) | Município SISCOM | Sistema de comunicação |
| municipio_ibge | varchar(50) | Código IBGE | Município oficial |
| municipio_nome | varchar(100) | Nome município | Cidade |
| municipio_uf | varchar(50) | UF | Estado |
| ativa | varchar(50) | Se está ativa | Status |
| regimental | varchar(50) | Se é regimental | Tipo organizacional |
| data_modificacao | datetime | Data modificação | Última alteração |
| und_nu_adicional | varchar(50) | Número adicional | Identificação extra |
| cnpjupag | varchar(60) | CNPJ UPAG | Documento da unidade |
| cpf_titular_autoridade_uorg | varchar(14) | CPF titular | Autoridade responsável |
| cpf_substituto_autoridade_uorg | varchar(14) | CPF substituto | Autoridade substituta |

**Relacionamentos:**
- Pode estar vinculada a uma Unidade do sistema
- Tem hierarquia através dos campos pai

## Tabelas de Dados SIAPE

### siape_consultaDadosFuncionais
**Propósito:** Cache de consultas funcionais do SIAPE
**Uso:** Armazena dados funcionais detalhados dos servidores

### siape_consultaDadosPessoais
**Propósito:** Cache de consultas pessoais do SIAPE
**Uso:** Armazena dados pessoais dos servidores

### siape_dadosUORG
**Propósito:** Cache de dados de unidades organizacionais
**Uso:** Informações detalhadas das UORGs

### siape_listaServidores
**Propósito:** Lista de servidores do SIAPE
**Uso:** Relação completa de servidores da entidade

### siape_listaUORG
**Propósito:** Lista de unidades organizacionais
**Uso:** Estrutura organizacional completa

## Queries Comuns

### Última integração executada
```sql
SELECT i.*, e.nome as entidade_nome, u.nome as usuario_nome
FROM integracoes i
JOIN entidades e ON i.entidade_id = e.id
LEFT JOIN usuarios u ON i.usuario_id = u.id
WHERE i.entidade_id = ?
ORDER BY i.data_execucao DESC
LIMIT 1;
```

### Servidores não sincronizados
```sql
SELECT is_srv.*
FROM integracao_servidores is_srv
LEFT JOIN usuarios u ON is_srv.cpf = u.cpf
WHERE u.id IS NULL 
AND is_srv.ativo = 1
ORDER BY is_srv.nome;
```

### Unidades não sincronizadas
```sql
SELECT iu.*
FROM integracao_unidades iu
LEFT JOIN unidades u ON iu.codigo_siape = u.codigo
WHERE u.id IS NULL 
AND iu.ativa = '1'
ORDER BY iu.nomeuorg;
```

### Divergências de dados entre SIAPE e sistema
```sql
SELECT u.nome as nome_sistema, is_srv.nome as nome_siape,
       u.matricula as matricula_sistema, is_srv.matricula_siape,
       u.situacao_funcional as situacao_sistema, is_srv.situacao_funcional as situacao_siape
FROM usuarios u
JOIN integracao_servidores is_srv ON u.cpf = is_srv.cpf
WHERE (u.nome != is_srv.nome 
   OR u.matricula != is_srv.matricula_siape 
   OR u.situacao_funcional != is_srv.situacao_funcional)
AND u.deleted_at IS NULL;
```

### Estatísticas da última integração
```sql
SELECT 
    JSON_EXTRACT(i.resultado, '$.servidores_processados') as servidores_processados,
    JSON_EXTRACT(i.resultado, '$.servidores_atualizados') as servidores_atualizados,
    JSON_EXTRACT(i.resultado, '$.unidades_processadas') as unidades_processadas,
    JSON_EXTRACT(i.resultado, '$.unidades_atualizadas') as unidades_atualizadas,
    JSON_EXTRACT(i.resultado, '$.tempo_execucao') as tempo_execucao,
    i.data_execucao
FROM integracoes i
WHERE i.entidade_id = ?
ORDER BY i.data_execucao DESC
LIMIT 1;
```

### Servidores inativos no SIAPE
```sql
SELECT is_srv.nome, is_srv.cpf, is_srv.matricula_siape, is_srv.situacao_funcional
FROM integracao_servidores is_srv
WHERE is_srv.ativo = 0
ORDER BY is_srv.nome;
```

### Hierarquia de unidades SIAPE
```sql
WITH RECURSIVE hierarquia_siape AS (
    SELECT codigo_siape, nomeuorg, pai_siape, 0 as nivel, nomeuorg as caminho
    FROM integracao_unidades 
    WHERE pai_siape IS NULL OR pai_siape = ''
    
    UNION ALL
    
    SELECT iu.codigo_siape, iu.nomeuorg, iu.pai_siape, hs.nivel + 1,
           CONCAT(hs.caminho, ' > ', iu.nomeuorg)
    FROM integracao_unidades iu
    JOIN hierarquia_siape hs ON iu.pai_siape = hs.codigo_siape
)
SELECT * FROM hierarquia_siape ORDER BY caminho;
```

### Gestores por unidade (dados SIAPE)
```sql
SELECT iu.nomeuorg, iu.siglauorg,
       srv_tit.nome as titular_nome,
       srv_sub.nome as substituto_nome
FROM integracao_unidades iu
LEFT JOIN integracao_servidores srv_tit ON iu.cpf_titular_autoridade_uorg = srv_tit.cpf
LEFT JOIN integracao_servidores srv_sub ON iu.cpf_substituto_autoridade_uorg = srv_sub.cpf
WHERE iu.codigo_siape = ?;
```

## Índices Recomendados
- `integracoes_entidade_data` (entidade_id, data_execucao)
- `integracao_servidores_cpf` (cpf)
- `integracao_servidores_matricula` (matricula_siape)
- `integracao_servidores_ativo` (ativo)
- `integracao_unidades_codigo_siape` (codigo_siape)
- `integracao_unidades_pai_siape` (pai_siape)
- `integracao_unidades_ativa` (ativa)