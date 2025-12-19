# Mock SIAPE

Mock da API SIAPE para testes locais do sistema PETRVS-PGD.

## Sumario

- [Visao Geral](#visao-geral)
- [Arquitetura](#arquitetura)
- [Inicio Rapido](#inicio-rapido)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dados e Seed](#dados-e-seed)
- [Cadastrando Usuarios](#cadastrando-usuarios)
- [Integracao com PETRVS](#integracao-com-petrvs)
- [Endpoints](#endpoints)
- [Exemplos de Requisicoes](#exemplos-de-requisicoes)
- [Testes](#testes)
- [Troubleshooting](#troubleshooting)

## Visao Geral

Este mock substitui localmente a API real do SIAPE (via ConectaGov) para permitir testes sem dependencia de servicos externos. Ele implementa todas as operacoes SOAP utilizadas pelo sistema PETRVS-PGD:

| Operacao | Descricao |
|----------|-----------|
| `listaUorgs` | Lista unidades organizacionais de um orgao |
| `dadosUorg` | Dados completos de uma unidade especifica |
| `listaServidores` | Lista servidores de uma unidade |
| `consultaDadosFuncionais` | Dados funcionais de um servidor (cargo, lotacao, etc) |
| `consultaDadosPessoais` | Dados pessoais de um servidor (nome, CPF, data nascimento) |

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PETRVS Backend                                │
│                                                                         │
│  ┌───────────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │ BuscarDadosSiapeJob │──>│ SiapeService     │──>│ ProcessaDadosBD  │  │
│  └───────────────────┘    └──────────────────┘    └──────────────────┘  │
│                                   │                        │            │
│                                   │ HTTP/SOAP              │ SQL        │
│                                   v                        v            │
└───────────────────────────────────┼────────────────────────┼────────────┘
                                    │                        │
                                    v                        v
                          ┌─────────────────┐      ┌──────────────────┐
                          │   Mock SIAPE    │      │ PETRVS Database  │
                          │                 │      │                  │
                          │ ┌─────────────┐ │      │ - usuarios       │
                          │ │ OAuth2      │ │      │ - unidades       │
                          │ │ Handler     │ │      │ - integracoes    │
                          │ └─────────────┘ │      └──────────────────┘
                          │ ┌─────────────┐ │
                          │ │ SOAP        │ │
                          │ │ Handler     │ │
                          │ └──────┬──────┘ │
                          │        │        │
                          │        v        │
                          │ ┌─────────────┐ │
                          │ │  SQLite DB  │ │
                          │ │             │ │
                          │ │ - unidades  │ │
                          │ │ - servidores│ │
                          │ │ - dados_    │ │
                          │ │   pessoais  │ │
                          │ └─────────────┘ │
                          └─────────────────┘
```

### Fluxo de Sincronizacao

1. **Job `BuscarDadosSiapeJob`** e disparado periodicamente no PETRVS
2. O job chama as operacoes SOAP do Mock SIAPE:
   - `listaUorgs` → Busca todas as unidades do orgao
   - `dadosUorg` → Busca detalhes de cada unidade
   - `listaServidores` → Busca servidores de cada unidade
   - `consultaDadosFuncionais` → Busca dados funcionais de cada servidor
   - `consultaDadosPessoais` → Busca dados pessoais de cada servidor
3. Os dados sao processados por `ProcessaDadosSiapeBD` e salvos no banco do PETRVS
4. **Usuarios sao sincronizados** baseados em CPF e matricula SIAPE

## Inicio Rapido

```bash
# 1. Entrar no diretorio do mock
cd external/mock-siape

# 2. (Opcional) Atualizar dados de unidades do SIORG
php scripts/fetch-siorg-data.php
php scripts/generate-seed.php > data/temp/generated-seed.php
php scripts/update-seeder.php

# 3. Iniciar o servidor
# Para localhost apenas:
php -S localhost:8080 -t public

# Para qualquer host (0.0.0.0):
php -S 0.0.0.0:8080 -t public

# 4. Em outro terminal, rodar os testes E2E
php tests/run-e2e.php
```

## Estrutura do Projeto

```
external/mock-siape/
├── public/
│   └── index.php              # Router principal
├── src/
│   ├── Config/
│   │   ├── config.php         # Configuracoes
│   │   └── namespaces.php     # Namespaces SOAP
│   ├── Database/
│   │   ├── Database.php       # Conexao SQLite
│   │   ├── Schema.php         # DDL das tabelas
│   │   └── Seeder.php         # Dados de exemplo (seed)
│   ├── Handlers/
│   │   ├── AuthHandler.php    # Endpoint OAuth2
│   │   └── SoapHandler.php    # Endpoint SOAP
│   ├── Operations/
│   │   ├── BaseOperation.php
│   │   ├── ListaUorgsOperation.php
│   │   ├── DadosUorgOperation.php
│   │   ├── ListaServidoresOperation.php
│   │   ├── ConsultaDadosFuncionaisOperation.php
│   │   └── ConsultaDadosPessoaisOperation.php
│   ├── Xml/
│   │   ├── XmlParser.php      # Parser de requisicoes
│   │   └── XmlBuilder.php     # Builder de respostas
│   └── Utils/
│       └── Validator.php      # Validacoes
├── scripts/
│   ├── fetch-siorg-data.php   # Busca dados do SIORG
│   ├── generate-seed.php      # Gera seed PHP
│   └── update-seeder.php      # Atualiza Seeder.php
├── data/
│   ├── siape.sqlite           # Banco (gerado automaticamente)
│   └── temp/                  # Dados temporarios do SIORG
│       ├── orgaos.json
│       ├── unidades.json
│       └── generated-seed.php
├── tests/
│   ├── E2E/
│   │   └── SoapFlowTest.php
│   ├── bootstrap.php
│   └── run-e2e.php
├── bootstrap.php
├── composer.json
└── README.md
```

## Dados e Seed

### Origem dos Dados

Os dados do Mock SIAPE vem de duas fontes:

| Tipo | Fonte | Descricao |
|------|-------|-----------|
| **Unidades** | [API SIORG](https://estruturaorganizacional.dados.gov.br/doc) | Dados publicos de orgaos e unidades |
| **Servidores** | Manual | Dados ficticios cadastrados no SQLite |

### Atualizando Dados de Unidades (SIORG)

Os scripts na pasta `scripts/` buscam dados reais de unidades da API publica SIORG:

```bash
cd external/mock-siape

# 1. Buscar dados do SIORG (salva em data/temp/)
php scripts/fetch-siorg-data.php

# 2. Gerar seed PHP a partir dos JSONs
php scripts/generate-seed.php > data/temp/generated-seed.php

# 3. Atualizar Seeder.php com os dados gerados
php scripts/update-seeder.php
```

**Orgaos incluidos na seed padrao:**

| Orgao | Codigo SIORG | Unidades |
|-------|--------------|----------|
| Ministerio da Educacao (MEC) | 244 | 50 |
| Ministerio da Saude (MS) | 304 | 50 |
| Ministerio da Fazenda (MF) | 308800 | 50 |
| Ministerio da Gestao e Inovacao (MGI) | 308803 | 50 |

### Estrutura do Banco SQLite

O banco `data/siape.sqlite` e criado automaticamente na primeira execucao:

```sql
-- Tabela de Unidades Organizacionais
CREATE TABLE unidades (
    codUorg VARCHAR(20) PRIMARY KEY,  -- Codigo da unidade
    codUorgPai VARCHAR(20),           -- Codigo da unidade pai
    codOrgao VARCHAR(20),             -- Codigo do orgao
    nomeUorg VARCHAR(255),            -- Nome da unidade
    siglaUorg VARCHAR(50),            -- Sigla da unidade
    siglaOrgao VARCHAR(20),           -- Sigla do orgao
    -- ... outros campos
);

-- Tabela de Servidores (Dados Funcionais)
CREATE TABLE servidores (
    cpf VARCHAR(11) NOT NULL,
    matriculaSiape VARCHAR(20),       -- Matricula SIAPE
    codOrgao VARCHAR(20),
    codUorgExercicio VARCHAR(20),     -- Unidade de exercicio
    codUorgLotacao VARCHAR(20),       -- Unidade de lotacao
    nomeCargo VARCHAR(255),
    emailInstitucional VARCHAR(255),  -- Email funcional (.gov.br)
    codSitFuncional VARCHAR(10),      -- Situacao funcional
    participaPGD VARCHAR(10),         -- 'sim' ou 'nao'
    ativo BOOLEAN,
    -- ... outros campos
    UNIQUE(cpf, matriculaSiape)
);

-- Tabela de Dados Pessoais
CREATE TABLE dados_pessoais (
    cpf VARCHAR(11) PRIMARY KEY,
    nome VARCHAR(255),                -- Nome completo
    dataNascimento VARCHAR(8),        -- Formato DDMMYYYY
    codSexo CHAR(1),                  -- 'M' ou 'F'
    -- ... outros campos
);
```

## Cadastrando Usuarios

Para que um usuario possa fazer login no PETRVS via sincronizacao SIAPE, ele precisa estar cadastrado em **duas tabelas** do Mock SIAPE:

### Passo 1: Cadastrar Dados Pessoais

```sql
-- Conectar ao banco SQLite
sqlite3 data/siape.sqlite

-- Inserir dados pessoais
INSERT INTO dados_pessoais (
    cpf, nome, codSexo, nomeSexo, dataNascimento,
    codCor, nomeCor, codEstadoCivil, nomeEstadoCivil,
    codNacionalidade, nomeNacionalidade,
    nomeMunicipNasc, ufNascimento, nomeMae
) VALUES (
    '99988877766',              -- CPF (apenas numeros, 11 digitos)
    'JOAO DA SILVA',            -- Nome completo (MAIUSCULO)
    'M',                        -- Codigo sexo
    'MASCULINO',                -- Nome sexo
    '15031990',                 -- Data nascimento (DDMMYYYY)
    '1',                        -- Codigo cor
    'BRANCA',                   -- Nome cor
    '2',                        -- Codigo estado civil
    'CASADO',                   -- Nome estado civil
    '1',                        -- Codigo nacionalidade
    'BRASILEIRO NATO',          -- Nome nacionalidade
    'BRASILIA',                 -- Municipio nascimento
    'DF',                       -- UF nascimento
    'MARIA DA SILVA'            -- Nome da mae
);
```

### Passo 2: Cadastrar Dados Funcionais (Servidor)

```sql
-- Inserir dados funcionais
INSERT INTO servidores (
    cpf, matriculaSiape, identUnica,
    codOrgao, siglaOrgao, nomeOrgao,
    codUorgExercicio, nomeUorgExercicio, siglaUorgExercicio,
    codUorgLotacao, nomeUorgLotacao, siglaUorgLotacao,
    codCargo, nomeCargo, siglaNivelCargo,
    codSitFuncional, nomeSitFuncional,
    codJornada, nomeJornada,
    siglaRegimeJuridico, nomeRegimeJuridico,
    emailInstitucional, participaPGD, ativo
) VALUES (
    '99988877766',              -- CPF (mesmo da tabela dados_pessoais)
    '3110078',                  -- Matricula SIAPE
    '031100789',                -- Identificacao unica
    '308803',                   -- Codigo do orgao (MGI)
    'MGI',                      -- Sigla do orgao
    'MINISTERIO DA GESTAO E DA INOVACAO EM SERVICOS PUBLICOS',
    '308803',                   -- Codigo unidade exercicio
    'MINISTERIO DA GESTAO E DA INOVACAO EM SERVICOS PUBLICOS',
    'MGI',
    '308803',                   -- Codigo unidade lotacao
    'MINISTERIO DA GESTAO E DA INOVACAO EM SERVICOS PUBLICOS',
    'MGI',
    '400001',                   -- Codigo cargo
    'ANALISTA DE SISTEMAS',     -- Nome cargo
    'NS',                       -- Nivel cargo (NS = Nivel Superior)
    '01',                       -- Codigo situacao funcional
    'ATIVO PERMANENTE',         -- Nome situacao funcional
    '40',                       -- Codigo jornada
    '40 HORAS SEMANAIS',        -- Nome jornada
    'ES',                       -- Regime juridico
    'ESTATUTARIO',              -- Nome regime juridico
    'joao.silva@gestao.gov.br', -- Email institucional (IMPORTANTE!)
    'sim',                      -- Participa PGD
    1                           -- Ativo
);
```

### Campos Obrigatorios para Login

| Campo | Tabela | Descricao |
|-------|--------|-----------|
| `cpf` | servidores + dados_pessoais | CPF do servidor (deve ser igual nas duas tabelas) |
| `matriculaSiape` | servidores | Matricula SIAPE unica |
| `emailInstitucional` | servidores | Email funcional (.gov.br) - usado para login |
| `codUorgExercicio` | servidores | Deve existir na tabela `unidades` |
| `codSitFuncional` | servidores | '01' = Ativo Permanente, '02' = Ativo Temporario |
| `nome` | dados_pessoais | Nome completo do servidor |
| `ativo` | servidores | Deve ser 1 (true) |

### Verificando o Cadastro

```sql
-- Verificar se o usuario foi cadastrado corretamente
SELECT
    s.cpf, s.matriculaSiape, s.emailInstitucional,
    s.codUorgExercicio, s.codSitFuncional, s.ativo,
    p.nome
FROM servidores s
JOIN dados_pessoais p ON s.cpf = p.cpf
WHERE s.cpf = '99988877766';

-- Verificar se a unidade existe
SELECT codUorg, nomeUorg, siglaUorg
FROM unidades
WHERE codUorg = '308803';
```

### Codigos de Situacao Funcional

| Codigo | Descricao | Pode Logar? |
|--------|-----------|-------------|
| 01 | ATIVO PERMANENTE | Sim |
| 02 | ATIVO TEMPORARIO | Sim |
| 08 | ATIVO EM OUTRO ORGAO | Nao |
| 99 | EXCLUIDO | Nao |

## Integracao com PETRVS

### Configuracao do Backend

Para usar o Mock SIAPE no PETRVS, configure o arquivo `.env`:

```env
# Configuracoes de integracao SIAPE para uso com Mock
INTEGRACAO_SIAPE_URL="http://localhost:8080"
INTEGRACAO_SIAPE_SIGLASISTEMA=PETRVS
INTEGRACAO_SIAPE_NOMESISTEMA=PETRVS-PGD
INTEGRACAO_SIAPE_SENHA=senha
INTEGRACAO_SIAPE_CPF=00000000000
INTEGRACAO_SIAPE_CODORGAO=308803

# Para ConectaGov (se estiver usando)
INTEGRACAO_SIAPE_CONECTAGOV_CHAVE=mock_client
INTEGRACAO_SIAPE_CONECTAGOV_SENHA=mock_secret
```

### Executando a Sincronizacao

A sincronizacao pode ser executada de duas formas:

**1. Via Job (recomendado)**
```bash
# No diretorio do backend PETRVS
php artisan queue:work siape_queue
```

**2. Via Artisan Command**
```bash
php artisan siape:executar {tenant_id}
```

### Fluxo de Sincronizacao Detalhado

```
1. BuscarDadosSiapeJob
   │
   ├─> BuscarDadosSiapeUnidades
   │   └─> Chama listaUorgs → Salva em siape_listaUorgs
   │
   ├─> BuscarDadosSiapeUnidade
   │   └─> Chama dadosUorg para cada unidade → Salva em siape_dadosUorg
   │
   ├─> BuscarDadosSiapeServidores
   │   └─> Chama listaServidores para cada unidade → Salva lista de CPFs
   │
   └─> BuscarDadosSiapeServidor
       ├─> Chama consultaDadosFuncionais → Salva em siape_consultaDadosFuncionais
       └─> Chama consultaDadosPessoais → Salva em siape_consultaDadosPessoais

2. ProcessaDadosSiapeBD
   │
   ├─> Processa dados de unidades → Atualiza tabela 'unidades'
   │
   └─> Processa dados de servidores
       ├─> Cria/atualiza usuario na tabela 'usuarios'
       ├─> Cria/atualiza vinculo na tabela 'unidade_integrantes'
       └─> Atribui lotacao e perfil ao usuario
```

### Tabelas do PETRVS Afetadas

| Tabela | Origem |
|--------|--------|
| `unidades` | dadosUorg + listaUorgs |
| `usuarios` | consultaDadosPessoais + consultaDadosFuncionais |
| `integracao_servidores` | Dados intermediarios da sincronizacao |
| `unidade_integrantes` | Vinculos usuario-unidade |

## Endpoints

### OAuth2 Token

```http
POST /oauth2/jwt-token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id=mock_client&client_secret=mock_secret
```

**Resposta:**
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "siape"
}
```

### SOAP

```http
POST /api-consulta-siape/v1/consulta-siape
Content-Type: text/xml
Authorization: Bearer <token>

<soap:Envelope>...</soap:Envelope>
```

### Health Check

```http
GET /health

{"status":"ok","database":"connected"}
```

## Exemplos de Requisicoes

### listaUorgs

Lista todas as unidades de um orgao.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ser="http://servico.wssiapenet">
  <soap:Body>
    <ser:listaUorgs>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>senha</senha>
      <cpf>00000000000</cpf>
      <codOrgao>308803</codOrgao>
    </ser:listaUorgs>
  </soap:Body>
</soap:Envelope>
```

### consultaDadosFuncionais

Busca dados funcionais de um servidor por CPF.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ser="http://servico.wssiapenet">
  <soap:Body>
    <ser:consultaDadosFuncionais>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>senha</senha>
      <cpf>99988877766</cpf>
    </ser:consultaDadosFuncionais>
  </soap:Body>
</soap:Envelope>
```

### consultaDadosPessoais

Busca dados pessoais de um servidor por CPF.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ser="http://servico.wssiapenet">
  <soap:Body>
    <ser:consultaDadosPessoais>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>senha</senha>
      <cpf>99988877766</cpf>
    </ser:consultaDadosPessoais>
  </soap:Body>
</soap:Envelope>
```

### dadosUorg

Busca dados detalhados de uma unidade.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ser="http://servico.wssiapenet">
  <soap:Body>
    <ser:dadosUorg>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>senha</senha>
      <cpf>00000000000</cpf>
      <codUorg>308803</codUorg>
    </ser:dadosUorg>
  </soap:Body>
</soap:Envelope>
```

### listaServidores

Lista servidores de uma unidade.

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ser="http://servico.wssiapenet">
  <soap:Body>
    <ser:listaServidores>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>senha</senha>
      <cpf>00000000000</cpf>
      <codUorg>308803</codUorg>
      <codOrgao>308803</codOrgao>
    </ser:listaServidores>
  </soap:Body>
</soap:Envelope>
```

## Testes

### Executando Testes E2E

```bash
# Iniciar o servidor em um terminal
# Para localhost apenas:
php -S localhost:8080 -t public

# Para qualquer host (0.0.0.0):
php -S 0.0.0.0:8080 -t public

# Rodar testes em outro terminal
php tests/run-e2e.php

# Com verbose
php tests/run-e2e.php --verbose

# Com URL customizada
php tests/run-e2e.php --url=http://localhost:9000
```

### Testes Incluidos

| Categoria | Teste | Descricao |
|-----------|-------|-----------|
| Basico | `testHealthCheck` | Verifica endpoint de saude |
| Basico | `testOAuth2WithBasicAuth` | Obtem token OAuth2 |
| SOAP | `testListaUorgs` | Lista unidades |
| SOAP | `testDadosUorg` | Obtem dados de unidade |
| SOAP | `testListaServidores` | Lista servidores |
| SOAP | `testConsultaDadosFuncionais` | Dados funcionais |
| SOAP | `testConsultaDadosPessoais` | Dados pessoais |
| Erro | `testDadosUorgNotFound` | Unidade inexistente |
| Erro | `testConsultaDadosFuncionaisNotFound` | CPF inexistente |
| Consistencia | `testDataConsistencyServidorInUorg` | Servidor na unidade correta |
| Consistencia | `testDataConsistencyFuncionaisMatchesPessoais` | CPF em ambas tabelas |
| Consistencia | `testDataConsistencyUorgHierarchy` | Hierarquia de unidades |
| Integracao | `testFullSyncFlow` | Fluxo completo de sincronizacao |

## Troubleshooting

### Erro: "Servidor com CPF X nao encontrado"

O CPF nao existe na tabela `servidores`. Cadastre o servidor conforme a secao [Cadastrando Usuarios](#cadastrando-usuarios).

### Erro: "Unidade com codUorg X nao encontrada"

A unidade nao existe na tabela `unidades`. Execute os scripts de seed ou adicione manualmente:

```sql
INSERT INTO unidades (codUorg, codOrgao, nomeUorg, siglaUorg, siglaOrgao)
VALUES ('308803', '308803', 'MINISTERIO DA GESTAO E INOVACAO', 'MGI', 'MGI');
```

### Usuario sincronizado mas nao consegue logar

Verifique:
1. O campo `emailInstitucional` esta preenchido
2. O campo `ativo` esta como 1
3. O campo `codSitFuncional` e '01' ou '02'
4. A unidade de exercicio (`codUorgExercicio`) existe

### Resetar Dados

```bash
# Remover banco (sera recriado na proxima execucao)
rm data/siape.sqlite

# Reiniciar servidor
# Para localhost apenas:
php -S localhost:8080 -t public

# Para qualquer host (0.0.0.0):
php -S 0.0.0.0:8080 -t public
```

### Verificando Logs

O Mock SIAPE exibe logs no console onde o servidor esta rodando. Para debug detalhado:

```bash
# Rodar com output detalhado
# Para localhost apenas:
php -S localhost:8080 -t public 2>&1 | tee mock-siape.log

# Para qualquer host (0.0.0.0):
php -S 0.0.0.0:8080 -t public 2>&1 | tee mock-siape.log
```

## Requisitos

- PHP >= 8.0
- Extensoes: pdo, pdo_sqlite, simplexml, dom, curl, json
