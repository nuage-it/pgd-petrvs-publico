# Fluxo de Sincronizacao SIAPE - Job SincronizarSiapeJob

## Visao Geral

O `SincronizarSiapeJob` processa os dados coletados pelo `BuscarDadosSiapeJob` e atualiza as tabelas definitivas do sistema (usuarios, unidades). Este job transforma XMLs armazenados em tabelas temporarias em registros estruturados no banco de dados.

**IMPORTANTE**: Este job NAO faz requisicoes ao SIAPE. Ele apenas processa dados ja coletados pelo `BuscarDadosSiapeJob`.

## Pipeline Completo de Sincronizacao

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE SINCRONIZACAO SIAPE                          │
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
│  │ (XMLs brutos)       │         │ (dados estruturados)│                   │
│  │ - siape_listaUORG   │         │ - usuarios          │                   │
│  │ - siape_dadosUORG   │         │ - unidades          │                   │
│  │ - siape_lista       │         │ - integracao_       │                   │
│  │   Servidores        │         │   servidores        │                   │
│  │ - siape_consulta    │         │ - integracao_       │                   │
│  │   DadosFuncionais   │         │   unidades          │                   │
│  │ - siape_consulta    │         │ - unidades_         │                   │
│  │   DadosPessoais     │         │   integrantes       │                   │
│  └─────────────────────┘         └─────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Arquitetura de Classes

```
SincronizarSiapeJob
│
└── IntegracaoService.sincronizar()
    │
    ├── FASE 1: Unidades
    │   ├── IntegracaoSiapeService.retornarUorgs()
    │   │   └── ProcessaDadosSiapeBD.dadosUorg()
    │   │       └── Le siape_dadosUORG (processado=0)
    │   │       └── Parse XML com XPath
    │   │       └── Marca processado=1
    │   │
    │   ├── Atualiza integracao_unidades
    │   └── Atualiza unidades (hierarquia, dados)
    │
    ├── FASE 2: Servidores
    │   ├── IntegracaoSiapeService.retornarServidores()
    │   │   └── ProcessaDadosSiapeBD.dadosServidor()
    │   │       └── JOIN siape_consultaDadosPessoais + siape_consultaDadosFuncionais
    │   │       └── Parse XML com XPath
    │   │       └── Marca processado=1
    │   │
    │   ├── Servidor\Integracao.processar()
    │   │   └── Atualiza integracao_servidores
    │   │
    │   ├── Atualiza usuarios (dados pessoais)
    │   └── Atualiza lotacoes (unidades_integrantes)
    │
    └── FASE 3: Gestores (somente se Fases 1 e 2 = Sucesso)
        └── Gestor\Integracao.processar()
            └── Atribui GESTOR aos titulares das UORGs
```

## Estrutura do Job

### SincronizarSiapeJob.php

O job e extremamente simples - apenas orquestra a chamada ao IntegracaoService:

```php
class SincronizarSiapeJob implements ShouldQueue, ContratoJobSchedule
{
    public $timeout = 0;  // Sem limite de tempo

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'siape_queue';
    }

    public function handle(IntegracaoService $integracaoService)
    {
        ini_set('memory_limit', '-1');

        $entidades = Entidade::all();
        $inputs = [
            'unidades' => true,
            'servidores' => true,
            'gestores' => true,
        ];

        foreach ($entidades as $entidade) {
            $inputs['entidade'] = $entidade->id;
            $integracaoService->sincronizar($inputs);
        }
    }
}
```

**Caracteristicas:**
- **Queue**: `siape_queue`
- **Timeout**: Sem limite (`$timeout = 0`)
- **Memory**: Ilimitado (`memory_limit = -1`)
- **Execucao**: Para cada entidade cadastrada

## Fluxograma Detalhado

```
┌─────────────────────────────────────────────────────────────────┐
│                   SincronizarSiapeJob                           │
│                        (START)                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ Configuracao   │
                    │ - memory_limit │
                    │   = -1         │
                    │ - timeout = 0  │
                    │ - max_exec =   │
                    │   30 min       │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ Para cada      │
                    │ Entidade       │
                    └────────┬───────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ FASE 1: Processamento de Unidades                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ProcessaDadosSiapeBD.dadosUorg()                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. SELECT * FROM siape_dadosUORG WHERE processado = 0    │  │
│  │ 2. Para cada XML:                                         │  │
│  │    - simplexml_load_string()                              │  │
│  │    - XPath: //ns1:dadosUorgResponse/out                   │  │
│  │    - Extrai 49 campos da UORG                             │  │
│  │ 3. UPDATE siape_dadosUORG SET processado = 1              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  IntegracaoSiapeService.retornarUorgs()                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - Transforma dados XML em array estruturado              │  │
│  │ - Resolve codigo_ibge do municipio                       │  │
│  │ - Define: id_servo, pai_servo, nomeuorg, siglauorg       │  │
│  │ - Define: cpf_titular_autoridade_uorg                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  IntegracaoService.sincronizacao() - Unidades                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Para cada UORG:                                        │  │
│  │    - Se nao existe em integracao_unidades: INSERT         │  │
│  │    - Se data_modificacao > local: UPDATE                  │  │
│  │                                                           │  │
│  │ 2. Atualiza tabela unidades:                              │  │
│  │    - Unidades novas: INSERT com path hierarquico          │  │
│  │    - Mudanca de pai: UPDATE path e filhos                 │  │
│  │    - Apenas dados: UPDATE nome, sigla, cidade_id          │  │
│  │                                                           │  │
│  │ 3. Ativa/Inativa unidades conforme SIAPE                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│ Resultado: integracao_unidades e unidades atualizadas          │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────┐
│ FASE 2: Processamento de Servidores                            │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ProcessaDadosSiapeBD.dadosServidor()                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. SELECT p.cpf, p.response, f.response                   │  │
│  │    FROM siape_consultaDadosPessoais p                     │  │
│  │    JOIN siape_consultaDadosFuncionais f ON p.cpf = f.cpf  │  │
│  │    WHERE p.processado = 0                                 │  │
│  │                                                           │  │
│  │ 2. Para cada CPF:                                         │  │
│  │    - Verifica blacklist                                   │  │
│  │    - Parse XML dados pessoais:                            │  │
│  │      XPath: //ns1:consultaDadosPessoaisResponse/out       │  │
│  │    - Parse XML dados funcionais:                          │  │
│  │      XPath: //tipo:DadosFuncionais                        │  │
│  │    - Trata multiplas matriculas                           │  │
│  │                                                           │  │
│  │ 3. UPDATE processado = 1 em ambas tabelas                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  IntegracaoSiapeService.retornarServidores()                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - Transforma dados em estrutura { pessoal, funcionais[] }│  │
│  │ - Filtra codSitFuncional = 8 (ATIVO_EM_OUTRO_ORGAO)      │  │
│  │ - Trata codSitFuncional = 76 (CONTRATO_TEMPORARIO)       │  │
│  │   -> Busca unidade pela sigla da lotacao                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Servidor\Integracao.processar()                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - Para cada servidor:                                     │  │
│  │   - Se nao existe em integracao_servidores: INSERT        │  │
│  │   - Se existe: UPDATE campos alterados                    │  │
│  │ - Valida email funcional nao vazio                        │  │
│  │ - Normaliza participa_pgd (sim/nao)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  IntegracaoService - Atualizacao de usuarios                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. Atualiza dados pessoais de usuarios existentes         │  │
│  │    - Compara: nome, email, apelido, telefone,             │  │
│  │      cod_jornada, modalidade_pgd, participa_pgd           │  │
│  │                                                           │  │
│  │ 2. Atualiza matriculas de usuarios sem matricula          │  │
│  │                                                           │  │
│  │ 3. Insere novos servidores (nao existem em usuarios)      │  │
│  │    - Trata mudanca de matricula (mesmo CPF/unidade)       │  │
│  │    - Gera email fake se duplicado                         │  │
│  │                                                           │  │
│  │ 4. Atualiza lotacoes (unidades_integrantes)               │  │
│  │    - Compara codigo_servo_exercicio com unidade atual     │  │
│  │    - Atribui "LOTADO" na nova unidade                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│ Resultado: integracao_servidores, usuarios, lotacoes           │
└────────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │ Fases 1 e 2        │
                    │ = Sucesso?         │
                    └────────┬───────────┘
                             │
                     Sim     │     Nao
               ┌─────────────┴─────────────┐
               │                           │
               ▼                           ▼
┌──────────────────────────────┐  ┌────────────────┐
│ FASE 3: Gestores             │  │ Fase 3 nao     │
├──────────────────────────────┤  │ executada      │
│                              │  └────────────────┘
│ Query de identificacao:      │
│ ┌──────────────────────────┐ │
│ │ SELECT                   │ │
│ │   u.id as id_unidade,    │ │
│ │   chefe.id as id_chefe   │ │
│ │ FROM integracao_unidades │ │
│ │ JOIN unidades            │ │
│ │ JOIN usuarios (por CPF)  │ │
│ │ WHERE NOT EXISTS (       │ │
│ │   atribuicao = 'GESTOR'  │ │
│ │ )                        │ │
│ └──────────────────────────┘ │
│                              │
│ Gestor\Integracao.processar()│
│ ┌──────────────────────────┐ │
│ │ Para cada chefia:        │ │
│ │ - Valida id_chefe        │ │
│ │ - Prepara atribuicoes:   │ │
│ │   [LOTADO, GESTOR]       │ │
│ │ - salvarIntegrantes()    │ │
│ │ - Altera perfil para     │ │
│ │   "Chefia" se aplicavel  │ │
│ └──────────────────────────┘ │
│                              │
│ Resultado: GESTOR atribuido  │
└──────────────────┬───────────┘
                   │
                   ▼
          ┌────────────────┐
          │   Job END      │
          │                │
          │ Salva resultado│
          │ na tabela      │
          │ integracoes    │
          └────────────────┘
```

## FASE 1: Processamento de Unidades - Detalhamento

### Fonte de Dados

**Tabela**: `siape_dadosUORG`

| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador |
| codigo | VARCHAR | Codigo da UORG |
| response | TEXT | XML completo da resposta dadosUorg |
| data_modificacao | DATETIME | Data da ultima transacao SIAPE |
| processado | TINYINT | 0 = pendente, 1 = processado |

### Parse do XML dadosUorg

O XML segue o formato da operacao `dadosUorgResponse`:

```xml
<soap:Envelope>
  <soap:Body>
    <ns1:dadosUorgResponse xmlns:ns1="http://servico.wssiapenet">
      <out xmlns="">
        <codUorg xmlns="http://entidade.wssiapenet">009999</codUorg>
        <codUorgPai xmlns="http://entidade.wssiapenet">007777</codUorgPai>
        <nomeExtendido xmlns="http://entidade.wssiapenet">COORDENACAO GERAL...</nomeExtendido>
        <siglaUorg xmlns="http://entidade.wssiapenet">CGSA</siglaUorg>
        <cpfTitularAutoridadeUorg xmlns="http://entidade.wssiapenet">10987654321</cpfTitularAutoridadeUorg>
        <cpfSubstitutoAutoridadeUorg xmlns="http://entidade.wssiapenet">12345678901</cpfSubstitutoAutoridadeUorg>
        <!-- 43 campos adicionais -->
      </out>
    </ns1:dadosUorgResponse>
  </soap:Body>
</soap:Envelope>
```

### Campos Extraidos (49 campos)

| Campo XML | Campo BD | Exemplo |
|-----------|----------|---------|
| codUorg | id_servo, codigo_siape | 009999 |
| codUorgPai | pai_servo, pai_siape | 007777 |
| nomeExtendido | nomeuorg | COORDENACAO GERAL... |
| siglaUorg | siglauorg | CGSA |
| telefone | telefone | 006231234567890000 |
| email | email | contato@gov.br |
| nomeMunicipio | municipio_nome | GOIANIA |
| codMunicipio | municipio_ibge | 9712 |
| siglaUfMunicipio | municipio_uf | GO |
| cpfTitularAutoridadeUorg | cpf_titular_autoridade_uorg | 10987654321 |
| cpfSubstitutoAutoridadeUorg | cpf_substituto_autoridade_uorg | 12345678901 |
| indicadorUorgRegimenta | regimental | N |
| cnpjUpag | cnpjupag | 22222222000155 |

### Logica de Atualizacao

```php
// IntegracaoService.sincronizacao() - Unidades

foreach ($uos as $uo) {
    $uorg_codigo = $uo["id_servo"];
    $uorg_ativa = $uo["ativa"] == 'true';

    // Compara timestamps
    $uorg_siape_data_modificacao = asTimeStamp($uo["data_modificacao"]);
    $iu_data_modificacao = asTimeStamp($query_iu->value('data_modificacao'));
    $u_data_modificacao = asTimeStamp($query_u->value('data_modificacao'));

    if (empty($query_iu->value('id_servo'))) {
        // INSERT em integracao_unidades
        $registro = new IntegracaoUnidade($unidade);
        $registro->save();
    } else if ($uorg_siape_data_modificacao > $iu_data_modificacao
               || $uorg_siape_data_modificacao > $u_data_modificacao) {
        // UPDATE em integracao_unidades
        $query_iu->update($unidade);
    }
}
```

### Hierarquia de Unidades

Tres cenarios de atualizacao na tabela `unidades`:

**Cenario 1: Unidade Nova**
```php
if (empty($unidade->id)) {
    $dados_path_pai = $this->buscaOuInserePai($unidade, $entidade_id);
    $path = $dados_path_pai["path"] . "/" . $dados_path_pai["unidade_id"];

    Unidade::insertGetId([
        'id' => Uuid::uuid4(),
        'path' => $path,
        'codigo' => $unidade->id_servo,
        'nome' => $unidade->nomeuorg,
        'sigla' => $unidade->siglauorg,
        'unidade_pai_id' => $dados_path_pai["unidade_id"],
        // ...
    ]);
}
```

**Cenario 2: Mudanca de Pai (Hierarquia)**
```php
else if (($unidade->pai_servo != $unidade->codigo_pai_antigo)
         && ($unidade->id != $unidade->id_pai_antigo)) {

    // Atualiza a unidade
    DB::update("UPDATE unidades SET path = :path, unidade_pai_id = :unidade_id ...");

    // Atualiza paths de todas as filhas
    DB::update('UPDATE unidades SET path = REPLACE(path, :antes, :depois)
                WHERE path LIKE :like');
}
```

**Cenario 3: Apenas Dados Alterados**
```php
else {
    DB::update("UPDATE unidades SET codigo = :codigo, nome = :nome,
                sigla = :sigla, cidade_id = :cidade_id WHERE id = :id");
}
```

### Constante Especial: Unidade Raiz

```php
const CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI = 999999;

// Identifica unidade raiz quando pai_servo = 999999
$siapeUnidadeRaiz = IntegracaoUnidade::where('pai_servo', 999999)->first();
```

## FASE 2: Processamento de Servidores - Detalhamento

### Fonte de Dados

**Tabelas**: `siape_consultaDadosPessoais` + `siape_consultaDadosFuncionais`

```sql
-- Query de leitura (ProcessaDadosSiapeBD.dadosServidor())
SELECT
    p.cpf,
    p.response AS responseDadosPessoais,
    f.response AS responseDadosFuncionais,
    p.data_modificacao
FROM siape_consultaDadosPessoais AS p
JOIN siape_consultaDadosFuncionais AS f ON p.cpf = f.cpf
WHERE p.processado = 0
```

### Parse do XML consultaDadosPessoais

```xml
<soap:Envelope>
  <soap:Body>
    <ns1:consultaDadosPessoaisResponse xmlns:ns1="http://servico.wssiapenet">
      <out xmlns="">
        <nome xmlns="http://tipo.servico.wssiapenet">MARIANA SOUZA PEREIRA</nome>
        <nomeSexo xmlns="http://tipo.servico.wssiapenet">FEMININO</nomeSexo>
        <dataNascimento xmlns="http://tipo.servico.wssiapenet">15031990</dataNascimento>
        <nomeMunicipNasc xmlns="http://tipo.servico.wssiapenet">GOIANIA</nomeMunicipNasc>
        <ufNascimento xmlns="http://tipo.servico.wssiapenet">GO</ufNascimento>
        <!-- campos adicionais -->
      </out>
    </ns1:consultaDadosPessoaisResponse>
  </soap:Body>
</soap:Envelope>
```

### Parse do XML consultaDadosFuncionais

```xml
<soap:Envelope>
  <soap:Body>
    <ns1:consultaDadosFuncionaisResponse xmlns:ns1="http://servico.wssiapenet">
      <out xmlns="">
        <dadosFuncionais xmlns="http://tipo.servico.wssiapenet">
          <DadosFuncionais>
            <matriculaSiape>2510012</matriculaSiape>
            <codCargo>400000</codCargo>
            <codSitFuncional>02</codSitFuncional>
            <codUorgExercicio>000000002</codUorgExercicio>
            <codUorgLotacao>000003000</codUorgLotacao>
            <emailInstitucional>FUNCIONARIO@GOV.BR</emailInstitucional>
            <identUnica>025100123</identUnica>
            <modalidadePGD></modalidadePGD>
            <participaPGD>sim</participaPGD>
            <codJornada>30</codJornada>
            <nomeJornada>30 HORAS SEMANAIS</nomeJornada>
            <cpfChefiaImediata>12345678901</cpfChefiaImediata>
            <emailChefiaImediata>CHEFIA@EXEMPLO.COM</emailChefiaImediata>
            <!-- campos adicionais -->
          </DadosFuncionais>
        </dadosFuncionais>
      </out>
    </ns1:consultaDadosFuncionaisResponse>
  </soap:Body>
</soap:Envelope>
```

### Tratamento de Situacoes Funcionais Especiais

```php
// IntegracaoSiapeService.php
const SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO = 8;
const SITUACAO_FUNCIONAL_CONTRATO_TEMPORARIO = 76;

// Codigo 8: Ignora completamente
if ($dadosFuncionais['codSitFuncional'] == 8) {
    return null;
}

// Codigo 76: Busca unidade pela sigla da lotacao
if ($dadosFuncionais['codSitFuncional'] == 76) {
    $sigla = $dadosFuncionais['siglaUorgLotacao'];
    $unidade = Unidade::where('sigla', $sigla)->first();
    $dadosFuncionais['codUorgExercicio'] = $unidade->codigo;
}
```

### Tratamento de Multiplas Matriculas

Um servidor pode ter multiplas matriculas (ex: mudanca de cargo). O sistema:

1. Identifica CPFs com mais de uma matricula em `usuarios`
2. Verifica quais matriculas estao ativas no XML
3. Ativa as presentes, adiciona as demais a blacklist

```php
// ProcessaDadosSiapeBD.php
private function processaMultiplasMatriculasInativas(string $cpf, array $dadosFuncionaisArray)
{
    $usuarios = Usuario::where('cpf', $cpf)
        ->whereNotNull('matricula')
        ->havingRaw('COUNT(DISTINCT matricula) > 1')
        ->get();

    if ($usuarios->count() <= 1) return;

    $activeMatriculas = $this->obterMatriculasAtivas($dadosFuncionaisArray);

    foreach ($usuarios as $usuario) {
        if (in_array($usuario->matricula, $activeMatriculas)) {
            $this->ativarMatricula($usuario);
        } else {
            $this->adicionarBlacklistSeElegivel($cpf, $usuario);
        }
    }
}
```

### Servidor\Integracao - Processamento

A classe `Servidor\Integracao` processa cada servidor e atualiza `integracao_servidores`:

```php
// Servidor/Integracao.php
public function processar(): void
{
    foreach ($this->getServidores() as $servidor) {
        $entidades = $this->montaEntidadeServidor($servidor);
        foreach ($entidades as $entidade) {
            $this->salvaEntidade($entidade);
        }
    }
}

private function salvaEntidade(entidade $entidade): void
{
    $registroDobanco = $this->repository->getServidor($entidade->cpf, $entidade->matriculasiape);

    if ($registroDobanco == null) {
        // INSERT
        $this->repository->save($entidade);
    } else {
        // UPDATE campos alterados
        $dadosAtualizados = $entidade->only([
            'nome', 'emailfuncional', 'sexo', 'codigo_servo_exercicio',
            'modalidade_pgd', 'participa_pgd', 'cod_jornada', 'nome_jornada'
            // ...
        ]);
        $this->repository->update($entidade->cpf, $entidade->matriculasiape, $dadosAtualizados);
    }
}
```

### Normalizacao de participa_pgd

```php
// Servidor/Integracao.php
private function normalizeParticipaPGD($value): ?string
{
    // Aceita: 'SIM', 'S', true, 1 -> 'sim'
    // Aceita: 'NAO', 'NÃO', 'N', false, 0, 'nÃ£o' -> 'não'
    // Default: 'não'

    if (in_array($v, ['1', 's', 'sim', 'yes', 'true'])) return 'sim';
    if (in_array($v, ['0', 'n', 'não', 'nao', 'no', 'false'])) return 'não';

    return 'não';
}
```

### Validacao de Modalidade PGD

```php
// IntegracaoService.php
private function validarModalidadePgd($modalidadeString)
{
    // Se ja e UUID, verifica existencia
    if (preg_match('/^[0-9a-f]{8}-...$/i', $modalidadeString)) {
        $exists = DB::table('tipos_modalidades_siape')
            ->where('id', $modalidadeString)->exists();
        return $exists ? $modalidadeString : null;
    }

    // Se e nome, busca UUID
    $modalidade = DB::table('tipos_modalidades_siape')
        ->where('nome', $modalidadeString)->first();

    return $modalidade ? $modalidade->id : null;
}
```

### Email Duplicado

Quando um email ja existe para outro usuario:

```php
// IntegracaoService.php
private function verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake(string $email, string $matricula)
{
    $usuario = Usuario::where('email', $email)->first();

    if (!empty($usuario)) {
        // Gera email fake baseado na matricula
        $novoemail = $usuario->matricula . "@petrvs.gov.br";

        // Se ainda duplicado, usa UUID
        if (Usuario::where('email', $novoemail)->exists()) {
            $novoemail = Str::uuid() . "@petrvs.gov.br";
        }

        $usuario->update(['email' => $novoemail]);
    }
}
```

### Mudanca de Matricula (Mesmo CPF/Unidade)

```php
// IntegracaoService.php
private function verificaSeUsuarioSoMudouMatricula($cpfCheck, $unidadeExercicioIdCheck, $matriculaNova)
{
    $usuarioLotadoMesmaUnidade = DB::table('usuarios as u')
        ->join('unidades_integrantes as ui', 'ui.usuario_id', '=', 'u.id')
        ->where('u.cpf', $cpfCheck)
        ->where('ui.unidade_id', $unidadeExercicioIdCheck)
        ->where('uia.atribuicao', 'LOTADO')
        ->first();

    if ($usuarioLotadoMesmaUnidade) {
        // Atualiza matricula sem criar novo usuario
        DB::table('usuarios')
            ->where('id', $usuarioLotadoMesmaUnidade->id)
            ->update(['matricula' => $matriculaNova]);
        return false; // Nao criar novo usuario
    }

    return true; // Criar novo usuario
}
```

## FASE 3: Processamento de Gestores - Detalhamento

### Condicao de Execucao

```php
// Gestores so sao atualizados se Fases 1 e 2 = Sucesso
if ($this->result['unidades']['Resultado'] == 'Sucesso'
    && $this->result['servidores']['Resultado'] == 'Sucesso') {
    // Executa Fase 3
}
```

### Query de Identificacao de Chefes

A query identifica usuarios que devem ser GESTOR mas ainda nao tem a atribuicao:

```php
// IntegracaoService.php - Query simplificada
$primeira = DB::table('integracao_unidades as iu')
    ->join('unidades as u', 'iu.codigo_siape', '=', 'u.codigo')
    ->leftJoin('usuarios as chefe', function ($join) {
        $join->on('iu.cpf_titular_autoridade_uorg', '=', 'chefe.cpf')
            ->whereNull('chefe.deleted_at');
    })
    ->join('unidades_integrantes as ui', function ($join) {
        $join->on('chefe.id', '=', 'ui.usuario_id')
            ->on('u.id', '=', 'ui.unidade_id');
    })
    ->join('unidades_integrantes_atribuicoes as uia', function ($join) {
        $join->on('ui.id', '=', 'uia.unidade_integrante_id')
            ->where('uia.atribuicao', '=', 'LOTADO');
    })
    ->whereNotExists(function ($query) {
        // Nao tem atribuicao GESTOR ainda
        $query->from('unidades_integrantes_atribuicoes')
            ->where('atribuicao', '=', 'GESTOR');
    })
    ->select(['u.id as id_unidade', 'chefe.id as id_chefe']);
```

### Gestor\Integracao - Processamento

```php
// Gestor/Integracao.php
public function processar(): void
{
    foreach ($this->dados as $dado) {
        $this->processaChefia($dado);
    }
}

private function processaChefia(array $dado): void
{
    if (empty($dado['id_chefe'])) {
        // Remove gestor atual se CPF nao informado
        $this->removeAtualGestorDaUnidade($unidade);
        return;
    }

    $usuarioChefia = $this->userModel->find($dado['id_chefe']);
    $atribuicoesAtuais = $usuarioChefia->getUnidadesAtribuicoesAttribute();

    // Prepara atribuicoes: mantem existentes + adiciona GESTOR
    $chefeAtribuicoes = $this->preparaChefia($atribuicoesAtuais, $dado['id_unidade']);
    // Resultado: ['LOTADO', 'GESTOR'] ou atribuicoes existentes + 'GESTOR'

    $vinculo = [[
        'usuario_id' => $dado['id_chefe'],
        'unidade_id' => $dado['id_unidade'],
        'atribuicoes' => $chefeAtribuicoes,
    ]];

    $this->unidadeIntegranteService->salvarIntegrantes($vinculo, false);

    // Altera perfil para "Chefia" se nao for admin/dev
    $this->alteraPerfilAdministradorNegocial($dado['id_chefe'], $usuarioChefia);
}
```

### Preparacao de Atribuicoes do Gestor

```php
private function preparaChefia(array|null $atribuicoesAtuais, string $unidadeId): array
{
    if (empty($atribuicoesAtuais[$unidadeId])) {
        return ['LOTADO', 'GESTOR'];
    }

    // Remove DELEGADO e GESTOR_SUBSTITUTO (incompativeis com GESTOR)
    $atribuicoes = array_diff($atribuicoesAtuais[$unidadeId], ['DELEGADO', 'GESTOR_SUBSTITUTO']);

    // Adiciona GESTOR se nao tiver
    if (!in_array('GESTOR', $atribuicoes)) {
        $atribuicoes[] = 'GESTOR';
    }

    return array_values(array_unique($atribuicoes));
}
```

### Alteracao de Perfil

O gestor recebe perfil de "Chefia", exceto se for:
- Administrador Negocial
- Desenvolvedor
- Administrador Geral

```php
private function alteraPerfilAdministradorNegocial($idUsuario, $queryChefe): void
{
    $perfilChefe = $this->nivelAcessoService->getPerfilChefia();
    $perfisProtegidos = [
        $this->nivelAcessoService->getPerfilAdministrador()->id,
        $this->nivelAcessoService->getPerfilDesenvolvedor()->id,
        $this->nivelAcessoService->getPerfilAdministradorGeral()->id,
    ];

    if (!in_array($queryChefe->perfil->id, $perfisProtegidos)) {
        $this->perfilService->alteraPerfilUsuario($idUsuario, $perfilChefe->id);
    }
}
```

## Blacklist

### Tabelas de Blacklist

**siape_blacklist_servidores**
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador |
| cpf | VARCHAR(11) | CPF do servidor |
| matricula | VARCHAR(20) | Matricula (opcional) |
| response | TEXT | XML da resposta que causou blacklist |

**siape_blacklist_unidades**
| Campo | Tipo | Descricao |
|-------|------|-----------|
| id | UUID | Identificador |
| codigo | VARCHAR(20) | Codigo da UORG |
| response | TEXT | XML da resposta que causou blacklist |

### Quando Adicionar a Blacklist

**Servidores**:
```php
// 1. SOAP Fault codigo 0002 (nao encontrado)
if ($fault && $fault[0]->faultcode === '0002') {
    SiapeBlackListServidor::firstOrCreate(['cpf' => $cpf]);
}

// 2. Multiplas matriculas inativas
if (!in_array($matricula, $activeMatriculas)) {
    SiapeBlackListServidor::firstOrCreate([
        'matricula' => $usuario->matricula,
        'cpf' => $cpf
    ]);
}
```

**Unidades**:
```php
// SOAP Fault codigo 0002 (nao encontrada)
if ($fault && $fault[0]->faultcode === '0002') {
    SiapeBlacklistUnidade::firstOrCreate(['codigo' => $codigo]);
}
```

### Verificacao de Blacklist

```php
// Antes de processar servidor
private function cpfNaBlackList(string $cpf): bool
{
    return SiapeBlackListServidor::where('cpf', $cpf)
        ->whereNull('matricula')  // Apenas blacklist por CPF, nao por matricula
        ->exists();
}
```

### Remocao da Blacklist

A remocao e automatica quando dados validos retornam do SIAPE:

```php
// Ao ativar matricula
private function ativarMatricula(Usuario $usuario): void
{
    SiapeBlackListServidor::where('matricula', $usuario->matricula)->delete();
    $usuario->update(['situacao_siape' => 'ATIVO']);
}
```

## Resultado da Sincronizacao

### Estrutura do Resultado

```php
$this->result = [
    'unidades' => [
        'Resultado' => 'Sucesso' | 'ERRO: mensagem',
        'Observações' => [
            'Total de unidades importadas do SIAPE: 150 (apenas ATIVAS)',
            '5 unidades novas informadas pelo SIAPE foram inseridas no Petrvs!',
            '3 unidades sofreram alteração na hierarquia...',
            '12 unidades mantiveram sua hierarquia mas sofreram alteração...',
        ],
        'Falhas' => []
    ],
    'servidores' => [
        'Resultado' => 'Sucesso' | 'ERRO: mensagem',
        'Observações' => [
            'Total de servidores importados do SIAPE: 3500 (apenas ATIVOS)',
            '120 servidores foram atualizados...',
            'Na tabela Usuários constam agora 3500 servidores!'
        ],
        'Falhas' => []
    ],
    'gestores' => [
        'Resultado' => 'Sucesso' | 'Os gestores não foram atualizados...',
        'Observações' => [
            'Sucesso: 85 chefias foram atualizadas com sucesso!',
            'Erro: 2 chefias não puderam ser atualizadas!',
            'Aviso: 5 chefias vazias ou não encontradas!'
        ],
        'Falhas' => []
    ]
];
```

### Persistencia do Resultado

O resultado e salvo na tabela `integracoes`:

```php
$integracao = $this->store([
    'entidade_id' => $inputs['entidade'],
    'atualizar_unidades' => true,
    'atualizar_servidores' => true,
    'atualizar_gestores' => true,
    'usuario_id' => null,  // Job automatico
    'data_execucao' => Carbon::now(),
    'resultado' => json_encode($this->result, JSON_UNESCAPED_UNICODE)
], null);
```

## Metricas e Monitoramento

### Logs Gerados

```php
// Inicio
Log::info("Job SincronizarPetrvs START");
SiapeLog::info("Iniciando sincronização de dados do SIAPE");

// Unidades
SiapeLog::info("Iniciando sincronização de Unidades");
SiapeLog::info("Salvando unidade na tabela Integracao unidade", $unidade);
SiapeLog::info("Atualizando unidade na tabela Integracao unidade", $unidade);

// Servidores
SiapeLog::info("Iniciando sincronização de Servidores");
SiapeLog::info("Atualizando dados do servidor Matricula: " . $matricula);
SiapeLog::info("Inserindo servidor na tabela Usuários", $registro->toArray());

// Gestores
SiapeLog::info("Iniciando a fase de reconstrução das funções de chefia!");

// Fim
Log::info("Job SincronizarPetrvs END");
SiapeLog::info("Sincronização de dados do SIAPE finalizada");
```

### Metricas Tipicas

| Metrica | Valor Tipico | Observacao |
|---------|--------------|------------|
| Duracao total | 5-15 minutos | Depende do volume de dados |
| Unidades processadas | 100-500 | Por entidade |
| Servidores processados | 1000-10000 | Por entidade |
| Gestores atualizados | 50-200 | Por entidade |
| Uso de memoria | 500MB-2GB | memory_limit = -1 |

## Comparacao: BuscarDados vs Sincronizar

| Aspecto | BuscarDadosSiapeJob | SincronizarSiapeJob |
|---------|---------------------|---------------------|
| Funcao | Coleta dados via API | Processa dados locais |
| Entrada | API ConectaGov/SIAPE | Tabelas temporarias |
| Saida | XMLs em tabelas temp | Tabelas definitivas |
| Requisicoes | Multiplas ao SIAPE | Zero ao SIAPE |
| Duracao | 15-30 min | 5-15 min |
| Dependencia externa | Sim (ConectaGov) | Nao |
| Falha parcial | Continua proxima UORG | Rollback por fase |

## Sequencia de Execucao

```
Agendamento Recomendado (Cron):

02:00 - BuscarDadosSiapeJob    (coleta dados do SIAPE)
         │
         ▼
03:00 - SincronizarSiapeJob    (processa dados coletados)
         │
         ▼
04:00 - InativacaoUsuariosSiape (manutencao de usuarios)
```

### Configuracao do Scheduler

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Buscar dados do SIAPE - 02:00
    $schedule->job(new BuscarDadosSiapeJob())
        ->dailyAt('02:00')
        ->onOneServer();

    // Sincronizar dados - 03:00
    $schedule->job(new SincronizarSiapeJob())
        ->dailyAt('03:00')
        ->onOneServer();
}
```

## Desenvolvimento e Testes

### Mock SIAPE

Para testes locais, utilize o Mock SIAPE em `external/mock-siape`:

```bash
# Iniciar mock
cd external/mock-siape
php -S localhost:8080 -t public

# Configurar .env
INTEGRACAO_SIAPE_URL=http://localhost:8080
```

### Executar Sincronizacao Manual

```bash
# Via artisan
php artisan queue:work siape_queue --once

# Via API (requer autenticacao)
curl -X POST 'http://localhost/api/integracao' \
  -H 'X-ENTIDADE: SIGLA' \
  -d 'unidades=true&servidores=true&gestores=true&entidade=UUID'
```

### Verificar Processamentos Pendentes

```php
// IntegracaoService.php
public function buscaProcessamentosPendentes(): array
{
    return [
        'siapeDadosUORG' => SiapeDadosUORG::where('processado', 0)->count() > 1,
        'siapeDadosPessoais' => SiapeConsultaDadosPessoais::where('processado', 0)->count() > 1,
        'siapeDadosFuncionais' => SiapeConsultaDadosFuncionais::where('processado', 0)->count() > 1
    ];
}
```

## Referencias

- [Fluxo BuscarDadosSiape](fluxo-buscar-dados-siape.md)
- [Documentacao SIAPE](intro.md)
- Job: `back-end/app/Jobs/SincronizarSiapeJob.php`
- Service: `back-end/app/Services/IntegracaoService.php`
- Service: `back-end/app/Services/IntegracaoSiapeService.php`
- Processor: `back-end/app/Services/Siape/ProcessaDadosSiapeBD.php`
- Servidor: `back-end/app/Services/Siape/Servidor/Integracao.php`
- Gestor: `back-end/app/Services/Siape/Gestor/Integracao.php`
