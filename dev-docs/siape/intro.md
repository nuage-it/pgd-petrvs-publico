# Documentação de Integração SIAPE - PGD Petrvs MGI

## Sumário

1. [Visão Geral](#visão-geral)
2. [Autenticação](#autenticação)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Estrutura de Dados](#estrutura-de-dados)
5. [Endpoints](#endpoints)
6. [Fluxos de Processamento](#fluxos-de-processamento)
7. [Dados do SIAPE](#dados-do-siape)
8. [Jobs e Comandos](#jobs-e-comandos)
9. [Tratamento de Erros](#tratamento-de-erros)
10. [Estados de Usuário](#estados-de-usuário)
11. [Análise de Segurança](#análise-de-segurança)
12. [Pontos Positivos](#pontos-positivos)
13. [Diagramas](#diagramas)
14. [Estrutura de Arquivos](#estrutura-de-arquivos)
15. [Checklist de Implantação](#checklist-de-implantação)
16. [Glossário](#glossário)
17. [Referências](#referências)

## Visão Geral

A integração SIAPE (Sistema Integrado de Administração de Recursos Humanos) no PGD Petrvs MGI permite a sincronização automática de dados de servidores públicos e unidades organizacionais através da API do ConectaGov. O sistema implementa um fluxo robusto de coleta, processamento e sincronização de dados funcionais e pessoais.

### Objetivo

Manter os dados de usuários e unidades do sistema PGD sincronizados com as informações oficiais do SIAPE, garantindo:
- Dados atualizados de servidores públicos
- Estrutura organizacional atualizada (UORGs)
- Controle de situações funcionais especiais
- Gestão de blacklists para dados inconsistentes

### Arquitetura

O sistema utiliza uma arquitetura baseada em:
- **Protocolo SOAP/XML** via ConectaGov
- **Autenticação OAuth2** (Client Credentials)
- **Processamento assíncrono** com Jobs
- **Armazenamento temporário** de XMLs
- **Blacklists** para controle de qualidade

## Autenticação

### OAuth2 Client Credentials

A autenticação é realizada através do padrão OAuth2 com fluxo Client Credentials:

```php
// Configuração no SiapeGetToken trait
$authorizationHeader = 'Basic ' . base64_encode($client . ':' . $secret);

// Endpoint de token
POST /oauth2/jwt-token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client:secret)}
Body: grant_type=client_credentials
```

### Headers de Requisição

```php
$headers = [
    'x-cpf-usuario' => $this->getCpf(),
    'Authorization' => 'Bearer ' . $token,
    'Content-Type' => 'application/xml'
];
```

### Gerenciamento de Token

- **Cache de token**: Armazenado estaticamente na classe
- **Expiração**: 59 minutos (renovação automática)
- **Retry**: 2 tentativas com intervalo de 1 segundo

## Variáveis de Ambiente

### Configuração Principal (config/integracao.php)

```php
'siape' => [
    'upag' => env('INTEGRACAO_SIAPE_UPAG', ''),
    'url' => env('INTEGRACAO_SIAPE_URL', ''),
    'siglaSistema' => env('INTEGRACAO_SIAPE_SIGLASISTEMA', ''),
    'nomeSistema' => env('INTEGRACAO_SIAPE_NOMESISTEMA', ''),
    'senha' => env('INTEGRACAO_SIAPE_SENHA', ''),
    'cpf' => env('INTEGRACAO_SIAPE_CPF', ''),
    'codOrgao' => env('INTEGRACAO_SIAPE_CODORGAO', ''),
    'codUorg' => env('INTEGRACAO_SIAPE_CODUORG', ''),
    'parmExistPag' => env('INTEGRACAO_SIAPE_PARMEXISTPAG', ''),
    'parmTipoVinculo' => env('INTEGRACAO_SIAPE_PARMTIPOVINCULO', ''),
    'conectagov_chave' => env('INTEGRACAO_SIAPE_CONECTAGOV_CHAVE', '')
]
```

### Variáveis Obrigatórias

- `INTEGRACAO_SIAPE_URL`: URL base do ConectaGov
- `INTEGRACAO_SIAPE_CONECTAGOV_CHAVE`: Chave de autenticação
- `INTEGRACAO_SIAPE_CPF`: CPF do usuário sistema
- `INTEGRACAO_SIAPE_CODORGAO`: Código do órgão
- `INTEGRACAO_SIAPE_SIGLASISTEMA`: Sigla do sistema
- `INTEGRACAO_SIAPE_NOMESISTEMA`: Nome do sistema
- `INTEGRACAO_SIAPE_SENHA`: Senha do sistema

## Estrutura de Dados

### Tabelas Temporárias SIAPE

#### siape_listaUORG
```sql
CREATE TABLE siape_listaUORG (
    id UUID PRIMARY KEY,
    response LONGTEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### siape_dadosUORG
```sql
CREATE TABLE siape_dadosUORG (
    id UUID PRIMARY KEY,
    codigo VARCHAR(255),
    response LONGTEXT,
    processado TINYINT DEFAULT 0,
    data_modificacao TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### siape_listaServidores
```sql
CREATE TABLE siape_listaServidores (
    id UUID PRIMARY KEY,
    response LONGTEXT,
    data_modificacao TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### siape_consultaDadosPessoais
```sql
CREATE TABLE siape_consultaDadosPessoais (
    id UUID PRIMARY KEY,
    cpf VARCHAR(50),
    response LONGTEXT,
    processado TINYINT DEFAULT 0,
    data_modificacao TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### siape_consultaDadosFuncionais
```sql
CREATE TABLE siape_consultaDadosFuncionais (
    id UUID PRIMARY KEY,
    cpf VARCHAR(50),
    response LONGTEXT,
    processado TINYINT DEFAULT 0,
    data_modificacao TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

### Tabelas de Blacklist

#### siape_blacklist_servidores
```sql
CREATE TABLE siape_blacklist_servidores (
    id UUID PRIMARY KEY,
    cpf VARCHAR(50),
    matricula VARCHAR(255) NULL,
    response LONGTEXT,
    inativado TINYINT DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### siape_blacklist_unidades
```sql
CREATE TABLE siape_blacklist_unidades (
    id UUID PRIMARY KEY,
    codigo VARCHAR(255),
    response LONGTEXT,
    inativado TINYINT DEFAULT 0,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

### Tabelas de Destino

#### usuarios (campos SIAPE)
```sql
ALTER TABLE usuarios ADD COLUMN situacao_siape ENUM('ATIVO', 'INATIVO', 'ATIVO_TEMPORARIO') NOT NULL DEFAULT 'ATIVO';
ALTER TABLE usuarios ADD COLUMN data_ativacao_temporaria TIMESTAMP NULL;
ALTER TABLE usuarios ADD COLUMN justicativa_ativacao_temporaria TEXT NULL;
ALTER TABLE usuarios ADD COLUMN modalidade_pgd VARCHAR(255) NULL;
ALTER TABLE usuarios ADD COLUMN participa_pgd TINYINT NULL;
ALTER TABLE usuarios ADD COLUMN ident_unica VARCHAR(255) NULL;
```

#### tipos_modalidades_siape
```sql
CREATE TABLE tipos_modalidades_siape (
    id UUID PRIMARY KEY,
    tipo_modalidade_id UUID NULL,
    nome VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (tipo_modalidade_id) REFERENCES tipos_modalidades(id)
);
```

## Endpoints

### Endpoints Internos (API)

#### Processamento Individual
```
POST /api/usuario/processar-siape
POST /api/unidade/processar-siape
```

#### Consultas
```
POST /api/usuario/consultar-cpf-siape
POST /api/unidade/consultar-unidade-siape
```

#### Blacklist Management
```
POST /api/siape-blacklist/remover-cpf
POST /api/SiapeBlacklistServidor/query
POST /api/unidade/remover-blacklist
POST /api/SiapeBlacklistUnidade/query
```

### Operações SOAP Consumidas

#### listaUorgs
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:listaUorgs>
            <siglaSistema>{siglaSistema}</siglaSistema>
            <nomeSistema>{nomeSistema}</nomeSistema>
            <senha>{senha}</senha>
            <cpf>{cpf}</cpf>
            <codOrgao>{codOrgao}</codOrgao>
            <codUorg></codUorg>
        </ser:listaUorgs>
    </soapenv:Body>
</soapenv:Envelope>
```

#### dadosUorg
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:dadosUorg>
            <siglaSistema>{siglaSistema}</siglaSistema>
            <nomeSistema>{nomeSistema}</nomeSistema>
            <senha>{senha}</senha>
            <cpf>{cpf}</cpf>
            <codOrgao>{codOrgao}</codOrgao>
            <codUorg>{codUorg}</codUorg>
        </ser:dadosUorg>
    </soapenv:Body>
</soapenv:Envelope>
```

#### listaServidores
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:listaServidores>
            <siglaSistema>{siglaSistema}</siglaSistema>
            <nomeSistema>{nomeSistema}</nomeSistema>
            <senha>{senha}</senha>
            <cpf>{cpf}</cpf>
            <codOrgao>{codOrgao}</codOrgao>
            <codUorg>{codUorg}</codUorg>
        </ser:listaServidores>
    </soapenv:Body>
</soapenv:Envelope>
```

#### consultaDadosPessoais
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:consultaDadosPessoais>
            <siglaSistema>{siglaSistema}</siglaSistema>
            <nomeSistema>{nomeSistema}</nomeSistema>
            <senha>{senha}</senha>
            <cpf>{cpf}</cpf>
            <codOrgao>{codOrgao}</codOrgao>
            <parmExistPag>{parmExistPag}</parmExistPag>
            <parmTipoVinculo>{parmTipoVinculo}</parmTipoVinculo>
        </ser:consultaDadosPessoais>
    </soapenv:Body>
</soapenv:Envelope>
```

#### consultaDadosFuncionais
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:consultaDadosFuncionais>
            <siglaSistema>{siglaSistema}</siglaSistema>
            <nomeSistema>{nomeSistema}</nomeSistema>
            <senha>{senha}</senha>
            <cpf>{cpf}</cpf>
            <codOrgao>{codOrgao}</codOrgao>
            <parmExistPag>{parmExistPag}</parmExistPag>
            <parmTipoVinculo>{parmTipoVinculo}</parmTipoVinculo>
        </ser:consultaDadosFuncionais>
    </soapenv:Body>
</soapenv:Envelope>
```

## Fluxos de Processamento

### Fluxo Principal de Sincronização

```
1. BuscarDadosSiapeJob
   ├── BuscarDadosSiapeUnidades (listaUorgs)
   ├── BuscarDadosSiapeUnidade (dadosUorg para cada unidade)
   ├── BuscarDadosSiapeServidores (listaServidores por unidade)
   └── BuscarDadosSiapeServidor (dados pessoais/funcionais por CPF)

2. SincronizarSiapeJob
   ├── ProcessaDadosSiapeBD.dadosUorg()
   ├── ProcessaDadosSiapeBD.dadosServidor()
   └── IntegracaoSiapeService.retornarServidores()
```

### Fluxo de Processamento Individual

```
SiapeIndividualController
├── processaServidor(cpf)
├── processaUnidade(codigo)
└── consultaServidor(cpf)
```

### Fluxo de Inativação

```
InativacaoUsuariosSiape (Job)
├── Identifica usuários sem dados SIAPE há 30+ dias
├── Marca como INATIVO na situação_siape
└── Adiciona à blacklist se necessário

InativacaoUnidadesSiape (Job)
├── Identifica unidades sem dados SIAPE há 30+ dias
├── Marca data_inicio_inativacao
└── Adiciona à blacklist se necessário
```

## Dados do SIAPE

### Dados Pessoais Recebidos

```php
$dadosPessoais = [
    'nome' => 'Nome completo do servidor',
    'nomeSexo' => 'Masculino/Feminino',
    'nomeMunicipNasc' => 'Município de nascimento',
    'ufNascimento' => 'UF de nascimento',
    'dataNascimento' => 'ddmmaaaa' // Convertido para Y-m-d H:i:s
];
```

### Dados Funcionais Recebidos

```php
$dadosFuncionais = [
    'matriculaSiape' => 'Matrícula SIAPE',
    'codSitFuncional' => 'Código situação funcional',
    'codCargo' => 'Código do cargo',
    'codUorgExercicio' => 'Código UORG exercício',
    'codUorgLotacao' => 'Código UORG lotação',
    'siglaUorgLotacao' => 'Sigla UORG lotação',
    'codUpag' => 'Código UPAG',
    'dataOcorrIngressoOrgao' => 'Data ingresso órgão',
    'emailInstitucional' => 'Email institucional',
    'cpfChefiaImediata' => 'CPF chefia imediata',
    'emailChefiaImediata' => 'Email chefia imediata',
    'identUnica' => 'Identificação única',
    'modalidadePGD' => 'Modalidade PGD',
    'participaPGD' => 'Participa PGD (S/N)',
    'codJornada' => 'Código jornada',
    'nomeJornada' => 'Nome jornada',
    'codAtivFun' => 'Código atividade função'
];
```

### Dados de Unidade (UORG) Recebidos

```php
$dadosUorg = [
    'codUorg' => 'Código da UORG',
    'codUorgPai' => 'Código UORG pai',
    'codUorgPagadora' => 'Código UORG pagadora',
    'nomeExtendido' => 'Nome completo da unidade',
    'siglaUorg' => 'Sigla da unidade',
    'telefone' => 'Telefone',
    'email' => 'Email',
    'fronteira' => 'Fronteira',
    'cod_uop' => 'Código UOP',
    'cod_unidade' => 'Código unidade',
    'tipo' => 'Tipo unidade',
    'tipo_desc' => 'Descrição tipo',
    'na_rodovia' => 'Na rodovia',
    'logradouro' => 'Logradouro',
    'bairro' => 'Bairro',
    'cep' => 'CEP',
    'ptn_ge_coordenada' => 'Coordenadas',
    'nomeMunicipio' => 'Nome município',
    'siglaUfMunicipio' => 'UF município',
    'indicadorUorgRegimenta' => 'Indicador regimental',
    'und_nu_adicional' => 'Número adicional',
    'cnpjUpag' => 'CNPJ UPAG',
    'cpfTitularAutoridadeUorg' => 'CPF titular autoridade',
    'cpfSubstitutoAutoridadeUorg' => 'CPF substituto autoridade'
];
```

### Mapeamento de Modalidades PGD

```php
$mapeamento = [
    'presencial' => 'Presencial',
    'integral' => 'Teletrabalho (Integral)',
    'no exterior substituicao' => 'Teletrabalho com residência no exterior (hipóteses de substituição da Lei 8.112/90, inciso VIII do art. 12 do Decreto n. 11.072/2022)',
    'no exterior' => 'Teletrabalho com residência no exterior (autorização discricionária, §7º do art. 12 do Decreto n. 11.072/2022)',
    'parcial' => 'Teletrabalho (Parcial)'
];
```

## Jobs e Comandos

### Jobs Principais

#### BuscarDadosSiapeJob
- **Fila**: `siape_queue`
- **Função**: Busca dados do SIAPE via ConectaGov
- **Frequência**: Agendado
- **Timeout**: Ilimitado (memory_limit = -1)

#### SincronizarSiapeJob
- **Fila**: `siape_queue`
- **Função**: Processa dados coletados e sincroniza com BD
- **Frequência**: Após BuscarDadosSiapeJob
- **Timeout**: Ilimitado (memory_limit = -1)

#### InativacaoUsuariosSiape
- **Fila**: `siape_queue`
- **Função**: Inativa usuários sem dados SIAPE há 30+ dias
- **Frequência**: Diária

#### InativacaoUnidadesSiape
- **Fila**: `siape_queue`
- **Função**: Inativa unidades sem dados SIAPE há 30+ dias
- **Frequência**: Diária

### Comandos Artisan

#### ExecutaSiape
```bash
php artisan siape:executar
```

#### SiapeIndividual
```bash
php artisan siape:individual {cpf}
```

#### InativaUsuarioSiape
```bash
php artisan siape:inativar-usuarios
```

#### InativaUnidadesSiape
```bash
php artisan siape:inativar-unidades
```

## Tratamento de Erros

### Exceptions Específicas

#### ErrorDataSiapeException
- **Uso**: Erros no processamento de dados XML
- **Tratamento**: Log + continuação do processamento

#### ErrorDataSiapeFaultCodeException
- **Uso**: Fault codes específicos do SIAPE
- **Tratamento**: Adiciona à blacklist + log

#### RequestConectaGovException
- **Uso**: Erros de comunicação com ConectaGov
- **Tratamento**: Retry + log de erro

### Códigos de Erro SIAPE

```php
const FAULT_CODE = '0002';
const FAULT_STRINGS = [
    'Erro de conexão com o mainframe.',
    'Não existem dados para consulta',
    'Consulta não retornou dados.',
    'Consulta n&amp;#xE3;o retornou dados.'
];
```

### Situações Funcionais Especiais

```php
const SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO = 8;
const SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO = 76;
```

### Logs

#### SiapeLog (Facade)
- **Arquivo**: `storage/logs/siape.log`
- **Níveis**: INFO, WARN, ERROR
- **Rotação**: Automática pelo Laravel

#### Exemplos de Log
```php
SiapeLog::info('Servidor na blacklist: ' . $cpf);
SiapeLog::error('Erro ao processar servidor #' . $cpf, [$exception]);
SiapeLog::warn('CPF não encontrado no SIAPE: ' . $cpf);
```

## Estados de Usuário

### Enum UsuarioSituacaoSiape

```php
enum UsuarioSituacaoSiape: string
{
    case ATIVO = 'ATIVO';
    case INATIVO = 'INATIVO';
    case ATIVO_TEMPORARIO = 'ATIVO_TEMPORARIO';
}
```

### Transições de Estado

```
ATIVO → INATIVO
- Servidor não encontrado no SIAPE por 30+ dias
- Situação funcional = 8 (ativo em outro órgão)

ATIVO → ATIVO_TEMPORARIO
- Ativação manual temporária
- Requer justificativa e data limite

INATIVO → ATIVO
- Servidor retorna ao SIAPE
- Remoção automática da blacklist

ATIVO_TEMPORARIO → ATIVO
- Servidor confirmado no SIAPE
- Limpeza de dados temporários

ATIVO_TEMPORARIO → INATIVO
- Expiração do período temporário
- Não confirmação no SIAPE
```

### Regras de Negócio

1. **Múltiplas Matrículas**: Sistema identifica e gerencia múltiplas matrículas por CPF
2. **Contratos Temporários**: Mapeamento especial por sigla da unidade
3. **Blacklist Automática**: Adição automática em caso de erros consistentes
4. **Inativação Gradual**: Período de 30 dias antes da inativação definitiva

## Análise de Segurança

### Vulnerabilidades Identificadas

#### 1. Exposição de Dados Sensíveis
- **Risco**: CPFs e dados pessoais em logs
- **Impacto**: Alto
- **Mitigação**: Implementar mascaramento de dados sensíveis nos logs

#### 2. Armazenamento de XMLs Completos
- **Risco**: Dados pessoais armazenados indefinidamente
- **Impacto**: Médio
- **Mitigação**: Implementar política de retenção e purga de dados

#### 3. Ausência de Validação de Entrada
- **Risco**: Injeção XML/XXE
- **Impacto**: Alto
- **Mitigação**: Implementar validação rigorosa de XMLs recebidos

#### 4. Credenciais em Configuração
- **Risco**: Exposição de credenciais SIAPE
- **Impacto**: Crítico
- **Mitigação**: Usar vault de segredos (AWS Secrets Manager, HashiCorp Vault)

#### 5. Falta de Rate Limiting
- **Risco**: Sobrecarga da API SIAPE
- **Impacto**: Médio
- **Mitigação**: Implementar controle de taxa de requisições

### Riscos Operacionais

#### 1. Dependência Externa
- **Risco**: Indisponibilidade do ConectaGov/SIAPE
- **Impacto**: Alto
- **Mitigação**: Implementar fallback e cache de dados críticos

#### 2. Volume de Dados
- **Risco**: Crescimento descontrolado das tabelas temporárias
- **Impacto**: Médio
- **Mitigação**: Implementar limpeza automática e monitoramento

#### 3. Processamento Assíncrono
- **Risco**: Falhas silenciosas em jobs
- **Impacto**: Médio
- **Mitigação**: Implementar monitoramento de jobs e alertas

### Recomendações de Melhoria

1. **Implementar criptografia** para dados sensíveis em repouso
2. **Adicionar auditoria completa** de todas as operações
3. **Implementar circuit breaker** para chamadas externas
4. **Adicionar validação de integridade** dos dados recebidos
5. **Implementar backup** das configurações críticas
6. **Adicionar monitoramento** de performance e disponibilidade

## Pontos Positivos

### Boas Práticas Implementadas

#### 1. Arquitetura Robusta
- **Separação de responsabilidades** clara entre camadas
- **Padrão Repository** para acesso a dados
- **Services especializados** para cada operação
- **DTOs** para transferência de dados

#### 2. Tratamento de Erros
- **Exceptions específicas** para diferentes tipos de erro
- **Logging estruturado** com diferentes níveis
- **Retry automático** para falhas temporárias
- **Blacklist inteligente** para dados problemáticos

#### 3. Processamento Assíncrono
- **Jobs especializados** para diferentes operações
- **Filas dedicadas** para operações SIAPE
- **Controle de memória** para grandes volumes
- **Processamento em lotes** para otimização

#### 4. Flexibilidade
- **Configuração por ambiente** via variáveis
- **Processamento individual** para casos específicos
- **Múltiplos pontos de entrada** (jobs, comandos, API)
- **Suporte a diferentes modalidades** PGD

#### 5. Qualidade de Código
- **Nomenclatura consistente** seguindo padrões PSR
- **Documentação inline** adequada
- **Estrutura modular** bem organizada
- **Testes unitários** implementados

### Escalabilidade

- **Processamento paralelo** através de múltiplos workers
- **Chunking inteligente** para grandes volumes de dados
- **Cache de tokens** para otimização de autenticação
- **Índices otimizados** nas tabelas de dados

### Manutenibilidade

- **Código bem estruturado** e organizado
- **Separação clara** entre lógica de negócio e infraestrutura
- **Configuração centralizada** e flexível
- **Logging abrangente** para debugging

## Diagramas

### Diagrama de Sequência - Sincronização Completa

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Scheduler │    │BuscarDadosJob│    │ ConectaGov  │    │ProcessaDados │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
       │                   │                   │                   │
       │ Trigger Job       │                   │                   │
       ├──────────────────>│                   │                   │
       │                   │ OAuth2 Token      │                   │
       │                   ├──────────────────>│                   │
       │                   │ Access Token      │                   │
       │                   │<──────────────────┤                   │
       │                   │ listaUorgs        │                   │
       │                   ├──────────────────>│                   │
       │                   │ XML Response      │                   │
       │                   │<──────────────────┤                   │
       │                   │ Store XML         │                   │
       │                   ├───────────────────────────────────────>│
       │                   │ dadosUorg (each)  │                   │
       │                   ├──────────────────>│                   │
       │                   │ XML Response      │                   │
       │                   │<──────────────────┤                   │
       │                   │ Store XML         │                   │
       │                   ├───────────────────────────────────────>│
       │                   │ listaServidores   │                   │
       │                   ├──────────────────>│                   │
       │                   │ XML Response      │                   │
       │                   │<──────────────────┤                   │
       │                   │ Store XML         │                   │
       │                   ├───────────────────────────────────────>│
       │                   │ consultaDados     │                   │
       │                   ├──────────────────>│                   │
       │                   │ XML Response      │                   │
       │                   │<──────────────────┤                   │
       │                   │ Store XML         │                   │
       │                   ├───────────────────────────────────────>│
```

### Diagrama de Fluxo - Processamento de Servidor

```
┌─────────────────┐
│ Dados Servidor  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ CPF na Blacklist│ ──Yes──> [Skip]
└─────────────────┘
         │ No
         ▼
┌─────────────────┐
│ Parse XML Data  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Validate Data   │ ──Error──> [Add to Blacklist]
└─────────────────┘
         │ Valid
         ▼
┌─────────────────┐
│ Check Multiple  │
│ Matriculas      │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Process Special │
│ Situations      │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Update/Create   │
│ User Record     │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ Mark Processed  │
└─────────────────┘
```

### Diagrama de Estados - Usuário SIAPE

```
    ┌─────────┐
    │  ATIVO  │<──────────────────┐
    └─────────┘                   │
         │                        │
         │ 30+ days no SIAPE      │ Found in SIAPE
         │                        │
         ▼                        │
    ┌─────────┐              ┌─────────────────┐
    │ INATIVO │              │ ATIVO_TEMPORARIO│
    └─────────┘              └─────────────────┘
         │                        │
         │ Manual activation      │ Expires/Not found
         └────────────────────────┘
```

## Estrutura de Arquivos

### Organização do Código SIAPE

```
app/
├── Enums/
│   └── UsuarioSituacaoSiape.php
├── Exceptions/
│   ├── ErrorDataSiapeException.php
│   ├── ErrorDataSiapeFaultCodeException.php
│   ├── RequestConectaGovException.php
│   └── Siape/
│       └── SiapeRequestException.php
├── Facades/
│   ├── SiapeLog.php
│   └── SiapeLogFacade.php
├── Http/Controllers/
│   ├── SiapeBlackListServidorController.php
│   ├── SiapeBlacklistUnidadeController.php
│   └── SiapeIndividualController.php
├── Jobs/
│   ├── BuscarDadosSiapeJob.php
│   ├── InativacaoUnidadesSiape.php
│   ├── InativacaoUsuariosSiape.php
│   └── SincronizarSiapeJob.php
├── Models/
│   ├── SiapeBlackListServidor.php
│   ├── SiapeBlacklistUnidade.php
│   ├── SiapeConsultaDadosFuncionais.php
│   ├── SiapeConsultaDadosPessoais.php
│   ├── SiapeDadosUORG.php
│   ├── SiapeListaServidores.php
│   ├── SiapeListaUORGS.php
│   └── TipoModalidadeSiape.php
├── Services/
│   ├── IntegracaoSiapeService.php
│   ├── SiapeBlackListServidorService.php
│   ├── SiapeBlacklistUnidadeService.php
│   ├── SiapeIndividualService.php
│   ├── SiapeIndividualServidorService.php
│   ├── SiapeIndividualUnidadeService.php
│   ├── TipoModalidadeSiapeService.php
│   └── Siape/
│       ├── BuscarDados/
│       │   ├── BuscarDadosSiape.php
│       │   ├── BuscarDadosSiapeServidor.php
│       │   ├── BuscarDadosSiapeServidores.php
│       │   ├── BuscarDadosSiapeUnidade.php
│       │   └── BuscarDadosSiapeUnidades.php
│       ├── Consulta/
│       │   ├── Resources/
│       │   │   ├── DadosFuncionaisResource.php
│       │   │   ├── DadosPessoaisResource.php
│       │   │   ├── SiapeResource.php
│       │   │   ├── UnidadeResource.php
│       │   │   └── UnidadesResource.php
│       │   ├── Traits/
│       │   │   ├── SiapeConfig.php
│       │   │   └── SiapeGetToken.php
│       │   ├── XML/
│       │   │   ├── Body/
│       │   │   │   ├── SiapeBody.php
│       │   │   │   ├── SiapeBodyDadosFuncionais.php
│       │   │   │   ├── SiapeBodyDadosPessoais.php
│       │   │   │   ├── SiapeBodyUnidade.php
│       │   │   │   └── SiapeBodyUnidades.php
│       │   │   └── SiapeXMLElement.php
│       │   ├── SiapeBaseService.php
│       │   ├── SiapeDadosFuncionaisService.php
│       │   ├── SiapeDadosPessoaisService.php
│       │   ├── SiapeService.php
│       │   ├── SiapeUnidadeService.php
│       │   └── SiapeUnidadesService.php
│       ├── Contrato/
│       │   └── InterfaceIntegracao.php
│       ├── Gestor/
│       │   └── Integracao.php
│       ├── Servidor/
│       │   ├── Integracao.php
│       │   ├── PreparaServidor.php
│       │   └── ServidorDTO.php
│       ├── Unidade/
│       │   ├── Enum/
│       │   │   └── Atribuicao.php
│       │   ├── Atribuicao.php
│       │   ├── Integracao.php
│       │   └── VinculoDTO.php
│       ├── DadosExternosSiape.php
│       ├── Erros.php
│       ├── Imprimir.php
│       └── ProcessaDadosSiapeBD.php
└── Console/Commands/
    ├── ExecutaSiape.php
    ├── InativaUnidadesSiape.php
    ├── InativaUsuarioSiape.php
    └── SiapeIndividual.php
```

### Configurações

```
config/
└── integracao.php (seção siape)

database/migrations/tenant/
├── 2024_09_27_113035_create_uorg_and_servidores_tables.php
├── 2024_09_27_192027_add_processado_to_siape_tables.php
├── 2024_10_01_164031_add_soft_deletes_to_siape_tables.php
├── 2024_10_01_200620_add_cpf_to_siape_tables.php
├── 2025_02_25_004613_create_siape_blacklist_servidores_table.php
├── 2025_02_25_004614_create_siape_blacklist_unidades_table.php
├── 2025_08_13_190000_add_situacao_siape_to_usuarios_table.php
└── 2025_08_20_130050_create_tipo_modalidade_siape_table.php

routes/
└── api_tenant.php (rotas SIAPE)
```

## Checklist de Implantação

### Pré-requisitos

- [ ] Credenciais ConectaGov configuradas
- [ ] Variáveis de ambiente definidas
- [ ] Banco de dados configurado
- [ ] Filas Redis/Database configuradas
- [ ] Supervisor para workers configurado

### Configuração Inicial

- [ ] Executar migrations SIAPE
- [ ] Configurar variáveis de ambiente
- [ ] Testar conectividade com ConectaGov
- [ ] Configurar jobs schedulers
- [ ] Configurar logs específicos

### Testes de Integração

- [ ] Testar autenticação OAuth2
- [ ] Testar busca de unidades
- [ ] Testar busca de servidores
- [ ] Testar processamento individual
- [ ] Validar blacklists funcionando

### Monitoramento

- [ ] Configurar alertas de falha de jobs
- [ ] Monitorar crescimento das tabelas
- [ ] Configurar alertas de API rate limit
- [ ] Monitorar logs de erro
- [ ] Configurar métricas de performance

### Segurança

- [ ] Validar criptografia de dados sensíveis
- [ ] Configurar rotação de logs
- [ ] Implementar backup das configurações
- [ ] Validar controles de acesso
- [ ] Testar recuperação de desastres

### Produção

- [ ] Executar sincronização inicial
- [ ] Validar dados importados
- [ ] Configurar rotinas de manutenção
- [ ] Treinar equipe de suporte
- [ ] Documentar procedimentos operacionais

## Glossário

**SIAPE**: Sistema Integrado de Administração de Recursos Humanos
**ConectaGov**: Plataforma de integração do governo federal
**UORG**: Unidade Organizacional
**UPAG**: Unidade Pagadora
**CPF**: Cadastro de Pessoa Física
**OAuth2**: Protocolo de autorização
**SOAP**: Simple Object Access Protocol
**XML**: eXtensible Markup Language
**DTO**: Data Transfer Object
**UUID**: Universally Unique Identifier
**Blacklist**: Lista de itens bloqueados/problemáticos
**Job**: Tarefa assíncrona
**Queue**: Fila de processamento
**Tenant**: Inquilino (multi-tenancy)
**Soft Delete**: Exclusão lógica (não física)
**Chunk**: Lote/pedaço de dados
**Rate Limit**: Limite de taxa de requisições
**Circuit Breaker**: Padrão de proteção contra falhas
**Retry**: Tentativa de reexecução
**Fallback**: Alternativa em caso de falha

## Referências

### Documentação Oficial

- [Programa de Gestão - MGI](https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao)
- [Sistema PGD Petrvs - Manuais](https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao/sistemas-e-api-de-dados/sistema-pgd-petrvs)

### Tecnologias Utilizadas

- [Laravel Framework](https://laravel.com/docs)
- [Laravel Queues](https://laravel.com/docs/queues)
- [OAuth2 RFC](https://tools.ietf.org/html/rfc6749)
- [SOAP Protocol](https://www.w3.org/TR/soap/)

### Padrões e Boas Práticas

- [PSR-4 Autoloading](https://www.php-fig.org/psr/psr-4/)
- [PSR-12 Coding Style](https://www.php-fig.org/psr/psr-12/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

---

**Versão**: 1.0  
**Data**: Dezembro 2024  
**Autor**: Sistema PGD Petrvs MGI  
**Revisão**: Análise completa da integração SIAPE