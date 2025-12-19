# Fluxo de Integracao SIAPE - Job BuscarDadosSiape

## Visao Geral

O `BuscarDadosSiapeJob` e responsavel por coletar dados do SIAPE via ConectaGov e armazena-los em tabelas temporarias para posterior processamento. Este job executa 4 etapas sequenciais de coleta de dados.

**IMPORTANTE**: Este job apenas **coleta** os dados do SIAPE. O processamento e persistencia nas tabelas definitivas (`usuarios`, `unidades`) e feito pelo `SincronizarSiapeJob`.

## Pipeline Completo de Sincronizacao

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PIPELINE DE SINCRONIZACAO SIAPE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐         ┌─────────────────────┐                   │
│  │ BuscarDadosSiapeJob │  ────►  │ SincronizarSiapeJob │                   │
│  │                     │         │                     │                   │
│  │ Coleta XMLs do      │         │ Processa XMLs e     │                   │
│  │ ConectaGov/SIAPE    │         │ atualiza BD local   │                   │
│  └─────────────────────┘         └─────────────────────┘                   │
│           │                                │                                │
│           ▼                                ▼                                │
│  ┌─────────────────────┐         ┌─────────────────────┐                   │
│  │ Tabelas Temporarias │         │ Tabelas Definitivas │                   │
│  │ - siape_listaUORG   │         │ - usuarios          │                   │
│  │ - siape_dadosUORG   │         │ - unidades          │                   │
│  │ - siape_lista       │         │ - integracao_       │                   │
│  │   Servidores        │         │   servidores        │                   │
│  │ - siape_consulta    │         │ - integracao_       │                   │
│  │   DadosFuncionais   │         │   unidades          │                   │
│  │ - siape_consulta    │         │                     │                   │
│  │   DadosPessoais     │         │                     │                   │
│  └─────────────────────┘         └─────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Arquitetura do BuscarDadosSiapeJob

```
BuscarDadosSiapeJob
├── BuscarDadosSiapeUnidades    (Etapa 1: listaUorgs)
├── BuscarDadosSiapeUnidade     (Etapa 2: dadosUorg)
├── BuscarDadosSiapeServidores  (Etapa 3: listaServidores)
└── BuscarDadosSiapeServidor    (Etapa 4: consultaDadosFuncionais + consultaDadosPessoais)
```

### Classe Base: BuscarDadosSiape

Todas as classes herdam de `BuscarDadosSiape` que fornece:

| Metodo | Descricao |
|--------|-----------|
| `getToken()` | Obtem token OAuth2 (cache de 59 min) |
| `executaRequisicoes()` | Executa lote de requisicoes paralelas (curl_multi) |
| `buscaSincrona()` | Executa requisicao unica sincrona |
| `prepareResponseXml()` | Sanitiza e parseia XML de resposta |
| `simpleXmlElementToArray()` | Converte SimpleXMLElement para array |

## Fluxograma Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                    BuscarDadosSiapeJob                          │
│                         (START)                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ Configuracao   │
                    │ - memory_limit │
                    │ - tenant config│
                    │ - validacoes   │
                    └────────┬───────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ ETAPA 1: BuscarDadosSiapeUnidades                              │
│ Operacao: listaUorgs                                           │
├────────────────────────────────────────────────────────────────┤
│ 1. Trunca tabela siape_listaUORG                               │
│ 2. Obtem token OAuth2 (Basic Auth)                             │
│ 3. Monta XML SOAP listaUorgs                                   │
│ 4. Envia requisicao sincrona                                   │
│ 5. Armazena XML completo em siape_listaUORG                    │
│                                                                 │
│ Resultado: Lista de todas as UORGs do orgao                    │
│ Requisicoes: 1                                                  │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ ETAPA 2: BuscarDadosSiapeUnidade                               │
│ Operacao: dadosUorg (para cada unidade)                        │
├────────────────────────────────────────────────────────────────┤
│ 1. Trunca tabela siape_dadosUORG                               │
│ 2. Le siape_listaUORG (processado=0)                           │
│ 3. Parse XML e extrai codigos das UORGs                        │
│ 4. Filtra UORGs:                                               │
│    - Remove blacklist (siape_blacklist_unidades)               │
│    - Compara com integracao_unidades.codigo_siape              │
│    - Se nao existe OU data_modificacao NULL OU                 │
│      dataUltimaTransacao > data_modificacao → Processa         │
│ 5. Para cada UORG filtrada: monta XML SOAP dadosUorg           │
│ 6. Executa requisicoes em lotes paralelos (curl_multi)         │
│ 7. Armazena XMLs em siape_dadosUORG                            │
│ 8. Marca siape_listaUORG.processado = 1                        │
│                                                                 │
│ Resultado: Detalhes completos de cada unidade                  │
│ Requisicoes: N (apenas unidades modificadas)                   │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ ETAPA 3: BuscarDadosSiapeServidores                            │
│ Operacao: listaServidores (para cada unidade)                  │
├────────────────────────────────────────────────────────────────┤
│ 1. Trunca tabela siape_listaServidores                         │
│ 2. Le siape_listaUORG (processado=1)                           │
│ 3. Parse XML e extrai codigos das UORGs                        │
│ 4. Para cada UORG: monta XML SOAP listaServidores              │
│ 5. Executa requisicoes em lotes paralelos                      │
│ 6. Armazena respostas em lotes de 1000 registros               │
│                                                                 │
│ Resultado: Lista de CPFs por unidade                           │
│ Requisicoes: N (uma por unidade)                               │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ ETAPA 4: BuscarDadosSiapeServidor                              │
│ Operacoes: consultaDadosFuncionais + consultaDadosPessoais     │
├────────────────────────────────────────────────────────────────┤
│ 1. Trunca tabelas:                                             │
│    - siape_consultaDadosPessoais                               │
│    - siape_consultaDadosFuncionais                             │
│ 2. Le siape_listaServidores (processado=0)                     │
│ 3. Parse XMLs e extrai CPFs unicos                             │
│ 4. Filtra servidores:                                          │
│    - Remove blacklist (siape_blacklist_servidores)             │
│    - Compara com integracao_servidores                         │
│    - Se nao existe OU data_modificacao NULL OU                 │
│      dataUltimaTransacao > data_modificacao → Processa         │
│ 5. Executa consultaDadosFuncionais em lotes paralelos          │
│ 6. Executa consultaDadosPessoais em lotes paralelos            │
│ 7. Armazena XMLs em tabelas respectivas                        │
│ 8. Marca siape_listaServidores.processado = 1                  │
│                                                                 │
│ Resultado: Dados funcionais e pessoais de cada servidor        │
│ Requisicoes: 2×M (funcionais + pessoais para cada CPF)         │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   Job END      │
                    │   Log: END     │
                    └────────────────┘
```

---

## Detalhamento das Etapas

### ETAPA 1: BuscarDadosSiapeUnidades

**Arquivo**: `BuscarDadosSiapeUnidades.php`

**Objetivo**: Obter lista de todas as unidades organizacionais do orgao

**Operacao SOAP**: `listaUorgs`

**Fluxo**:
1. Trunca tabela `siape_listaUORG`
2. Obtem token OAuth2 via `getToken()` (Basic Auth)
3. Constroi XML SOAP:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
  <soapenv:Body>
    <ser:listaUorgs>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>***</senha>
      <cpf>00000000000</cpf>
      <codOrgao>15000</codOrgao>
      <codUorg></codUorg>
    </ser:listaUorgs>
  </soapenv:Body>
</soapenv:Envelope>
```
4. Envia requisicao sincrona via `buscaSincrona()`
5. Armazena resposta XML completa em `siape_listaUORG`

**Tabela de Destino**: `siape_listaUORG`

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador unico |
| response | TEXT | XML completo da resposta |
| processado | INT | 0=pendente, 1=processado |
| created_at | DATETIME | Data criacao |
| updated_at | DATETIME | Data atualizacao |

**Dados Retornados**:
```xml
<ns2:Uorg xmlns:ns2="http://entidade.wssiapenet">
  <codigo xmlns="http://entidade.wssiapenet">9001</codigo>
  <dataUltimaTransacao xmlns="http://entidade.wssiapenet">15012026</dataUltimaTransacao>
  <nome xmlns="http://entidade.wssiapenet">SECRETARIA DE TECNOLOGIA</nome>
</ns2:Uorg>
```

---

### ETAPA 2: BuscarDadosSiapeUnidade

**Arquivo**: `BuscarDadosSiapeUnidade.php`

**Objetivo**: Obter detalhes completos de cada unidade

**Operacao SOAP**: `dadosUorg` (uma requisicao por unidade)

**Fluxo**:
1. Trunca tabela `siape_dadosUORG`
2. Le registro mais recente de `siape_listaUORG` onde `processado=0`
3. Parse XML e extrai array de unidades via XPath `//ns2:Uorg`
4. **Filtragem inteligente**:
   ```php
   // Verifica blacklist
   $estaNaBlackList = $blacklistUnidades->firstWhere('codigo', $unidade['codigo']);
   if ($estaNaBlackList) return false;

   // Verifica se ja foi processada
   $unidadeProcessada = $unidadesJaProcessadas->firstWhere('codigo_siape', $unidade['codigo']);

   if (!$unidadeProcessada) return true;  // Nova unidade
   if (is_null($unidadeProcessada->data_modificacao)) return true;  // Sem data

   // Compara datas
   if ($dataModificacaoSiape > $dataModificacaoBD) return true;  // Modificada

   return false;  // Ja atualizada, skip
   ```
5. Para cada unidade filtrada, monta XML:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
  <soapenv:Body>
    <ser:dadosUorg>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>***</senha>
      <cpf>00000000000</cpf>
      <codOrgao>15000</codOrgao>
      <codUorg>9001</codUorg>
    </ser:dadosUorg>
  </soapenv:Body>
</soapenv:Envelope>
```
6. Divide em lotes de N requisicoes (configuravel via `INTEGRACAO_SIAPE_CONECTAGOV_QTD_MAX_REQUISICOES`)
7. Executa requisicoes paralelas via `curl_multi_exec()` com `sleep(1)` entre iteracoes
8. Armazena cada resposta em `siape_dadosUORG`
9. Marca `siape_listaUORG.processado = 1`

**Tabela de Destino**: `siape_dadosUORG`

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador unico |
| codigo | VARCHAR | Codigo da UORG |
| response | TEXT | XML completo da resposta |
| data_modificacao | DATE | Data da ultima transacao (formato Y-m-d) |
| processado | INT | 0=pendente (usado pelo SincronizarSiapeJob) |
| created_at | DATETIME | Data criacao |
| updated_at | DATETIME | Data atualizacao |

**Dados Retornados**: 40+ campos incluindo:
- Identificacao: `codUorg`, `codUorgPai`, `nomeUorg`, `nomeExtendido`, `siglaUorg`
- Organizacao: `codOrgao`, `siglaOrgao`, `codUorgPagadora`
- Endereco: `logradouro`, `bairro`, `cep`, `nomeMunicipio`, `siglaUfMunicipio`
- Contato: `email`, `telefone`
- Gestores: `cpfTitularAutoridadeUorg`, `cpfSubstitutoAutoridadeUorg`
- Indicadores: `indicadorUorgRegimenta`, `indicadorUorgUpag`

---

### ETAPA 3: BuscarDadosSiapeServidores

**Arquivo**: `BuscarDadosSiapeServidores.php`

**Objetivo**: Obter lista de servidores de cada unidade

**Operacao SOAP**: `listaServidores` (uma requisicao por unidade)

**Fluxo**:
1. Trunca tabela `siape_listaServidores`
2. Le registro mais recente de `siape_listaUORG` onde `processado=1`
3. Parse XML e extrai array de unidades
4. Para cada unidade, monta XML:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
  <soapenv:Body>
    <ser:listaServidores>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>***</senha>
      <cpf>00000000000</cpf>
      <codOrgao>15000</codOrgao>
      <codUorg>9001</codUorg>
    </ser:listaServidores>
  </soapenv:Body>
</soapenv:Envelope>
```
5. Divide em lotes de N requisicoes
6. Executa requisicoes paralelas
7. Armazena respostas em lotes de 1000 registros (MAX_INSERT_DB)

**Tabela de Destino**: `siape_listaServidores`

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador unico |
| response | TEXT | XML completo da resposta |
| processado | INT | 0=pendente, 1=processado |
| created_at | DATETIME | Data criacao |
| updated_at | DATETIME | Data atualizacao |

**Dados Retornados**:
```xml
<ns2:Servidor xmlns:ns2="http://entidade.wssiapenet">
  <cpf xmlns="http://entidade.wssiapenet">12345678901</cpf>
  <dataUltimaTransacao xmlns="http://entidade.wssiapenet">15022025</dataUltimaTransacao>
</ns2:Servidor>
```

---

### ETAPA 4: BuscarDadosSiapeServidor

**Arquivo**: `BuscarDadosSiapeServidor.php`

**Objetivo**: Obter dados funcionais e pessoais de cada servidor

**Operacoes SOAP**:
- `consultaDadosFuncionais`
- `consultaDadosPessoais`

**Fluxo**:
1. Trunca tabelas:
   - `siape_consultaDadosPessoais`
   - `siape_consultaDadosFuncionais`
2. Le todos registros de `siape_listaServidores` onde `processado=0`
3. Parse XMLs e extrai CPFs unicos (remove duplicatas usando chave `cpf.dataUltimaTransacao`)
4. **Filtragem inteligente**:
   ```php
   // Verifica blacklist
   $estaNaBlackList = $blacklistServidores->firstWhere('cpf', $servidor['cpf']);
   if ($estaNaBlackList) return false;

   // Verifica se ja foi processado
   $servidorProcessado = $servidoresJaProcessadas->firstWhere('cpf', $servidor['cpf']);

   if (!$servidorProcessado) return true;  // Novo servidor
   if (is_null($servidorProcessado->data_modificacao)) return true;  // Sem data

   // Compara datas
   if ($dataModificacaoSiape > $dataModificacaoBD) return true;  // Modificado

   return false;  // Ja atualizado, skip
   ```

5. **Sub-etapa 4A: Dados Funcionais**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
  <soapenv:Body>
    <ser:consultaDadosFuncionais>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>***</senha>
      <cpf>12345678901</cpf>
      <codOrgao>15000</codOrgao>
      <parmExistPag>N</parmExistPag>
      <parmTipoVinculo>0</parmTipoVinculo>
    </ser:consultaDadosFuncionais>
  </soapenv:Body>
</soapenv:Envelope>
```

6. **Sub-etapa 4B: Dados Pessoais**
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
  <soapenv:Body>
    <ser:consultaDadosPessoais>
      <siglaSistema>PETRVS</siglaSistema>
      <nomeSistema>PETRVS-PGD</nomeSistema>
      <senha>***</senha>
      <cpf>12345678901</cpf>
      <codOrgao>15000</codOrgao>
      <parmExistPag>N</parmExistPag>
      <parmTipoVinculo>0</parmTipoVinculo>
    </ser:consultaDadosPessoais>
  </soapenv:Body>
</soapenv:Envelope>
```

7. Marca todos registros de `siape_listaServidores.processado = 1`

**Tabelas de Destino**:

`siape_consultaDadosFuncionais`:

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador unico |
| cpf | VARCHAR(11) | CPF do servidor |
| response | TEXT | XML completo |
| data_modificacao | DATE | Data da ultima transacao |
| processado | INT | 0=pendente (usado pelo SincronizarSiapeJob) |
| created_at | DATETIME | Data criacao |
| updated_at | DATETIME | Data atualizacao |

`siape_consultaDadosPessoais`: Mesma estrutura

**Dados Funcionais Retornados**: 70+ campos incluindo:
- Identificacao: `matriculaSiape`, `identUnica`
- Situacao: `codSitFuncional`, `nomeSitFuncional`
- Cargo: `codCargo`, `nomeCargo`, `codClasse`, `codPadrao`
- Lotacao: `codUorgExercicio`, `codUorgLotacao`, `siglaUorgExercicio`
- Contato: `emailInstitucional`, `emailServidor`
- Chefia: `cpfChefiaImediata`, `emailChefiaImediata`
- PGD: `modalidadePGD`, `participaPGD`
- Jornada: `codJornada`, `nomeJornada`
- Datas: `dataExercicioNoOrgao`, `dataOcorrExclusao`

**Dados Pessoais Retornados**:
- `nome`, `nomeSexo`, `dataNascimento`
- `nomeMunicipNasc`, `ufNascimento`
- `nomeMae`, `nomePai`
- `codEstadoCivil`, `nomeEstadoCivil`

---

## Mecanismos de Otimizacao

### 1. Requisicoes Paralelas (curl_multi)

```php
$multiCurl = curl_multi_init();
foreach ($xmlsData as $key => $xmlData) {
    $curlHandles[$key] = curl_init();
    curl_setopt_array($curlHandles[$key], [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $xmlData,
    ]);
    curl_multi_add_handle($multiCurl, $curlHandles[$key]);
}

do {
    $status = curl_multi_exec($multiCurl, $active);
    curl_multi_select($multiCurl);
    sleep(1);  // Delay para nao sobrecarregar o servidor
} while ($active && $status == CURLM_OK);
```

**Beneficio**: Reduz tempo de execucao em ate 90%

**Nota**: Ha um `sleep(1)` entre iteracoes para evitar sobrecarga no ConectaGov.

### 2. Filtragem Inteligente

Evita requisicoes desnecessarias comparando:
- `dataUltimaTransacao` do SIAPE (formato ddmmyyyy)
- `data_modificacao` do banco local (formato Y-m-d)

```php
$dataModificacaoSiape = DateTime::createFromFormat('dmY', $servidor['dataUltimaTransacao'])
    ->format('Y-m-d 00:00:00');

if ($dataModificacaoSiape > $dataModificacaoBD) {
    return true;  // Processa - dados foram modificados
}
```

**Beneficio**: Reduz volume de requisicoes em 70-90% apos primeira sincronizacao

### 3. Blacklist

Servidores/unidades com erros consistentes sao adicionados a blacklist:
- `siape_blacklist_servidores` - CPFs que retornam erro
- `siape_blacklist_unidades` - Codigos UORG que retornam erro

**Beneficio**: Evita requisicoes que sempre falham (ex: servidores de outros orgaos)

### 4. Processamento em Lotes

Inserts no banco em lotes de 1000 registros:
```php
const MAX_INSERT_DB = 1000;

$lotesInserts = array_chunk($inserts, self::MAX_INSERT_DB, true);
foreach ($lotesInserts as $insert) {
    Model::insert($insert);
}
```

**Beneficio**: Reduz overhead de transacoes no banco

### 5. Cache de Token OAuth2

Token armazenado estaticamente com validade de 59 minutos:
```php
protected static $token = null;
protected static $tokenExpiresAt = null;

public function getToken()
{
    if (self::$token && now()->lessThan(self::$tokenExpiresAt)) {
        return self::$token;  // Retorna token em cache
    }

    // ... obtem novo token ...

    self::$token = $data['access_token'];
    self::$tokenExpiresAt = now()->addMinutes(59);
}
```

**Beneficio**: Evita requisicoes de autenticacao desnecessarias

---

## Configuracoes

### Variaveis de Ambiente

```env
# URL do ConectaGov
INTEGRACAO_SIAPE_URL=https://api.conectagov.estaleiro.serpro.gov.br

# Credenciais OAuth2 (Client Credentials)
INTEGRACAO_SIAPE_CONECTAGOV_CHAVE=client_id
INTEGRACAO_SIAPE_CONECTAGOV_SENHA=client_secret

# Configuracoes do Sistema
INTEGRACAO_SIAPE_CPF=00000000000
INTEGRACAO_SIAPE_CODORGAO=15000
INTEGRACAO_SIAPE_SIGLASISTEMA=PETRVS
INTEGRACAO_SIAPE_NOMESISTEMA=PETRVS-PGD
INTEGRACAO_SIAPE_SENHA=senha_sistema

# Parametros opcionais
INTEGRACAO_SIAPE_PARMEXISTPAG=N
INTEGRACAO_SIAPE_PARMTIPOVINCULO=0

# Performance
INTEGRACAO_SIAPE_CONECTAGOV_QTD_MAX_REQUISICOES=10
```

### Limites

| Parametro | Valor Padrao | Maximo | Descricao |
|-----------|--------------|--------|-----------|
| Requisicoes paralelas | 10 | 30 (ConectaGov) | `QUANTIDADE_MAXIMA_REQUISICOES` |
| Insert em lote | 1000 | - | `MAX_INSERT_DB` |
| Memory limit | -1 (ilimitado) | - | `ini_set('memory_limit', '-1')` |
| Fila | siape_queue | - | Queue dedicada |
| Cache token | 59 min | 60 min | Validade do token |

---

## Tratamento de Erros

### Erros de Requisicao

```php
try {
    $response = $this->executaRequisicoes($lote);
} catch (RequestConectaGovException $e) {
    Log::error('Erro ConectaGov', [$e->getMessage()]);
    // Continua processamento dos proximos lotes
}
```

### Erros de XML

```php
libxml_use_internal_errors(true);
$responseXml = simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA);

if ($responseXml === false) {
    $errors = libxml_get_errors();
    foreach ($errors as $error) {
        Log::error('XML Error: ' . $error->message);
    }
    libxml_clear_errors();
    throw new RequestConectaGovException('Invalid XML response');
}
```

### SOAP Faults

Respostas com `<soap:Fault>` sao tratadas pelo `ProcessaDadosSiapeBD`:
```xml
<soap:Fault>
  <faultcode>0002</faultcode>
  <faultstring>Nao existem dados para os parametros informados</faultstring>
</soap:Fault>
```

Resultado:
- Servidor/Unidade adicionado a blacklist
- Log de erro registrado
- Processamento continua para os demais

---

## Monitoramento

### Logs Importantes

```
Job BuscarDadosSiapeJob - Tenant {id}: START
Busca das Unidades iniciada
Busca das unidades finalizada
Processamento de Unidade iniciado
Unidades a serem processadas: 150
Lote 1 de 15
Quantidade de requisicoes abertas: 10
Tempo total de execucao: 45.2 segundos
Processamento de Unidade finalizado
Iniciando busca de servidores...
Quantidade de requisicoes abertas: 150
Busca de servidores finalizada
Iniciando processamento de servidor...
Servidores a serem processadas: 3500
Busca de Dados Funcionais
Lote 1 de 350
Busca de Dados Pessoais
Lote 1 de 350
Finalizando processamento de servidor
Job BuscarDadosSiapeJob Tenant {id} - END
```

### Metricas Importantes

| Metrica | Onde Encontrar |
|---------|----------------|
| Tempo por etapa | "Tempo total de execucao: X segundos" |
| Unidades processadas | "Unidades a serem processadas: N" |
| Servidores processados | "Servidores a serem processadas: N" |
| Requisicoes abertas | "Quantidade de requisicoes abertas: N" |
| Erros de requisicao | Log::error |
| Blacklist | "esta na black list devera ser ignorado" |

---

## Fluxo Individual de CPF

Alem do job em lote, existe o fluxo individual para atualizar um CPF especifico:

**Classe**: `SiapeIndividualServidorService`

**Metodo**: `fluxoSiape(string $cpf)`

```
┌─────────────────────────────────────────────────────────────────┐
│              Fluxo Individual de CPF                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. consultaDadosFuncionais(cpf)  → Dados funcionais           │
│  2. consultaDadosPessoais(cpf)    → Dados pessoais             │
│                                                                 │
│  Para cada registro funcional:                                  │
│  3. dadosUorg(codUorgExercicio)   → Dados da unidade           │
│  4. listaUorgs()                  → Lista todas unidades       │
│                                                                 │
│  5. IntegracaoService->sincronizar() → Atualiza BD             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Pre-requisito**: A unidade do servidor deve ja existir no banco. Caso contrario:
```
Exception: "O CPF {cpf} pertence a unidade de codigo {codUorg},
que ainda nao foi processada. E preciso fazer uma carga total
na unidade primeiro."
```

**Requisicoes por CPF**: 4+ (funcionais + pessoais + unidade + listaUorgs)

---

## Diagrama de Dados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TABELAS TEMPORARIAS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐                                                   │
│  │ siape_listaUORG     │ ← ETAPA 1 (listaUorgs)                           │
│  │ - id                │                                                   │
│  │ - response (XML)    │──────────────────────────┐                        │
│  │ - processado        │                          │                        │
│  └─────────────────────┘                          │                        │
│                                                    │ lido por              │
│  ┌─────────────────────┐                          ▼                        │
│  │ siape_dadosUORG     │ ← ETAPA 2 (dadosUorg)                            │
│  │ - id                │                                                   │
│  │ - codigo            │                                                   │
│  │ - response (XML)    │                                                   │
│  │ - data_modificacao  │                                                   │
│  │ - processado        │───────────────────────────────┐                   │
│  └─────────────────────┘                               │                   │
│                                                         │ usado por        │
│  ┌─────────────────────┐                               ▼                   │
│  │siape_listaServidores│ ← ETAPA 3 (listaServidores)                      │
│  │ - id                │                          ┌─────────────────────┐  │
│  │ - response (XML)    │──────────┐               │ SincronizarSiapeJob │  │
│  │ - processado        │          │               │                     │  │
│  └─────────────────────┘          │ lido por      │ ProcessaDadosSiapeBD│  │
│                                    ▼               │                     │  │
│  ┌──────────────────────────┐                     │ IntegracaoService   │  │
│  │siape_consultaDados       │ ← ETAPA 4           └──────────┬──────────┘  │
│  │Funcionais                │   (consultaDadosFuncionais)    │             │
│  │ - id                     │                                │             │
│  │ - cpf                    │────────────────────────────────┤             │
│  │ - response (XML)         │                                │             │
│  │ - data_modificacao       │                                │             │
│  │ - processado             │                                │             │
│  └──────────────────────────┘                                │             │
│                                                               │             │
│  ┌──────────────────────────┐                                │             │
│  │siape_consultaDados       │ ← ETAPA 4                      │             │
│  │Pessoais                  │   (consultaDadosPessoais)      │             │
│  │ - id                     │                                │             │
│  │ - cpf                    │────────────────────────────────┘             │
│  │ - response (XML)         │                                              │
│  │ - data_modificacao       │                                              │
│  │ - processado             │                                              │
│  └──────────────────────────┘                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ processa e atualiza
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TABELAS DEFINITIVAS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐                       │
│  │ unidades            │     │ usuarios            │                       │
│  │ - id                │     │ - id                │                       │
│  │ - codigo            │     │ - cpf               │                       │
│  │ - sigla             │     │ - matricula         │                       │
│  │ - nome              │     │ - nome              │                       │
│  │ - ...               │     │ - ...               │                       │
│  └─────────────────────┘     └─────────────────────┘                       │
│                                                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐                       │
│  │ integracao_unidades │     │ integracao_         │                       │
│  │ - id                │     │ servidores          │                       │
│  │ - codigo_siape      │     │ - id                │                       │
│  │ - data_modificacao  │     │ - cpf               │                       │
│  └─────────────────────┘     │ - data_modificacao  │                       │
│                               └─────────────────────┘                       │
│                                                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐                       │
│  │ siape_blacklist_    │     │ siape_blacklist_    │                       │
│  │ unidades            │     │ servidores          │                       │
│  │ - id                │     │ - id                │                       │
│  │ - codigo            │     │ - cpf               │                       │
│  │ - response          │     │ - matricula         │                       │
│  └─────────────────────┘     │ - response          │                       │
│                               └─────────────────────┘                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Exemplo de Execucao

### Cenario: Orgao com 200 unidades e 5000 servidores

**Primeira Execucao (Carga Inicial)**:

| Etapa | Operacao | Requisicoes | Tempo Estimado |
|-------|----------|-------------|----------------|
| 1 | listaUorgs | 1 | <1s |
| 2 | dadosUorg | 200 | 2-3 min |
| 3 | listaServidores | 200 | 2-3 min |
| 4 | consultaDadosFuncionais | 5000 | 8-10 min |
| 4 | consultaDadosPessoais | 5000 | 8-10 min |
| **Total** | | **10.401** | **15-20 min** |

**Execucoes Subsequentes (Incremental)**:

| Etapa | Operacao | Requisicoes | Tempo Estimado |
|-------|----------|-------------|----------------|
| 1 | listaUorgs | 1 | <1s |
| 2 | dadosUorg | ~20 (modificadas) | <30s |
| 3 | listaServidores | 200 | 2-3 min |
| 4 | consultaDadosFuncionais | ~500 (modificados) | 1-2 min |
| 4 | consultaDadosPessoais | ~500 (modificados) | 1-2 min |
| **Total** | | **~1.221** | **2-5 min** |

---

## Desenvolvimento e Testes

### Mock SIAPE

Para desenvolvimento e testes sem acesso ao ConectaGov real, utilize o Mock SIAPE:

```bash
# Iniciar mock
cd external/mock-siape
php -S localhost:8080 -t public

# Configurar .env
INTEGRACAO_SIAPE_URL=http://localhost:8080
INTEGRACAO_SIAPE_CONECTAGOV_CHAVE=mock_client
INTEGRACAO_SIAPE_CONECTAGOV_SENHA=mock_secret
```

**Testes E2E do Mock**:
```bash
php tests/run-e2e.php --verbose
```

Ver: [Mock SIAPE README](../../external/mock-siape/README.md)

---

## Referencias

- [Documentacao SIAPE](intro.md)
- [Mock SIAPE](../../external/mock-siape/README.md)
- [Exemplos XML](./example-1.xml)

### Arquivos do Codigo

| Arquivo | Descricao |
|---------|-----------|
| `app/Jobs/BuscarDadosSiapeJob.php` | Job principal |
| `app/Jobs/SincronizarSiapeJob.php` | Job de sincronizacao |
| `app/Services/Siape/BuscarDados/BuscarDadosSiape.php` | Classe base |
| `app/Services/Siape/BuscarDados/BuscarDadosSiapeUnidades.php` | Etapa 1 |
| `app/Services/Siape/BuscarDados/BuscarDadosSiapeUnidade.php` | Etapa 2 |
| `app/Services/Siape/BuscarDados/BuscarDadosSiapeServidores.php` | Etapa 3 |
| `app/Services/Siape/BuscarDados/BuscarDadosSiapeServidor.php` | Etapa 4 |
| `app/Services/Siape/ProcessaDadosSiapeBD.php` | Processamento de XMLs |
| `app/Services/IntegracaoService.php` | Sincronizacao com BD |
| `app/Services/SiapeIndividualServidorService.php` | Fluxo individual CPF |
