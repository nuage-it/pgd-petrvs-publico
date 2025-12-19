# Documentação Técnica de Módulos

## Índice de Módulos

1. [Módulo Gestão de Planos de Trabalho](#módulo-gestão-de-planos-de-trabalho)
2. [Módulo Gestão de Atividades](#módulo-gestão-de-atividades)
3. [Módulo Integrações Externas](#módulo-integrações-externas)
4. [Módulo Configurações](#módulo-configurações)
5. [Módulo Relatórios](#módulo-relatórios)

---

# Módulo: Gestão de Planos de Trabalho

## Visão Geral Técnica

**Propósito:** Gerencia todo o ciclo de vida dos planos de trabalho individuais, desde criação até consolidação final, implementando regras de negócio complexas para workflow de aprovação e controle de status.

**Complexidade Geral:** 🔴 Crítica

**Métricas:**
- **Total de Classes:** 6
- **Linhas de Código:** ~3.500
- **Controllers:** 1 (PlanoTrabalhoController)
- **Services:** 1 (PlanoTrabalhoService)
- **Models:** 3 (PlanoTrabalho, PlanoTrabalhoEntrega, PlanoTrabalhoConsolidacao)
- **Jobs:** 0 (usa jobs compartilhados)
- **Testes:** 0 (cobertura: 0%)

---

## Controllers

### PlanoTrabalhoController

**Localização:** `/app/Http/Controllers/PlanoTrabalhoController.php`

**Complexidade:** 🔴 Crítica

**Responsabilidades:**
- Gerenciamento de ciclo de vida do plano (ativar, suspender, cancelar, arquivar)
- Controle de assinaturas TCR (Termo de Ciência e Responsabilidade)
- Validação de permissões complexas baseadas em hierarquia organizacional
- Operações de avaliação de planos

**Métodos:**

#### `getByUsuario(Request $request)`
**Endpoint:** `POST /api/PlanoTrabalho/get-by-usuario`

**Propósito:** Retorna planos de trabalho de um usuário específico com metadados de permissões

**Parâmetros de Request:**
```php
'usuario_id' => 'required',        // ID do usuário
'arquivados' => 'required',        // Incluir arquivados (boolean)
'plano_trabalho_id' => 'nullable'  // ID específico (opcional)
```

**Fluxo Interno:**
```
1. Validação de entrada (3 campos obrigatórios)
2. Chama PlanoTrabalhoService->getByUsuario()
3. Service executa query complexa com 8 relacionamentos
4. Adiciona metadados de permissões por plano
5. Retorna JSON com planos + programas relacionados
```

**Queries Executadas:**
```sql
SELECT * FROM planos_trabalhos 
  WHERE usuario_id = ? 
  ORDER BY numero DESC
  WITH unidade, tipoModalidade, consolidacoes.avaliacao, usuario
```

**Complexidade:** 3 queries | 8 relacionamentos | Performance: ⚠️ Pode melhorar (N+1 em metadados)

---

#### `ativar(Request $request)`
**Endpoint:** `POST /api/PlanoTrabalho/ativar`

**Propósito:** Ativa um plano de trabalho após validações complexas de regras de negócio

**Request Body:**
```json
{
  "id": "string (UUID)",
  "justificativa": "string (opcional)"
}
```

**Validação:**
- FormRequest: Validação inline no controller
- Regras:
  ```php
  'id' => 'required',
  'justificativa' => 'present'
  ```

**Fluxo Interno:**
```
1. Validação de permissões via checkPermissions("ATIVAR")
   ├─> Verifica capacidade MOD_PTR
   ├─> Valida status = INCLUIDO
   ├─> Aplica regras da TABELA_1 (hierarquia organizacional)
   ├─> Verifica ausência de assinaturas exigidas
   └─> Valida existência de pelo menos 1 entrega
2. Chama PlanoTrabalhoService->ativar($data, $unidade)
   ├─> Inicia transação DB
   ├─> Atualiza status para ATIVO
   ├─> Registra justificativa no histórico
   └─> Commit da transação
3. Retorna success: true
```

**Eventos Disparados:**
- `StatusAtualizado` → Ouvido por `AuditoriaListener` → Registra log de auditoria

**Tratamento de Erros:**
```php
try {
    // Processamento
} catch (IBaseException $e) {
    return response()->json(['error' => $e->getMessage()]);
} catch (Throwable $e) {
    $dataError = throwableToArrayLog($e);
    Log::error($dataError);
    return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
}
```

**Complexidade:** 🔴 Crítica (validações hierárquicas + transação + eventos)

---

#### `checkPermissions($action, $request, $service, $unidade, $usuario)`

**Responsabilidade:** Implementa validações de permissão baseadas em regras de negócio complexas

**Fluxo Detalhado:**
```php
switch ($action) {
    case 'ATIVAR':
        // (RN_PTR_P) Validações para ativação:
        1. Plano deve estar no status INCLUIDO
        2. Usuário deve respeitar TABELA_1 de hierarquia:
           - PT do Chefe: CF?, CF+, CS+
           - PT do Chefe Sub: CF, CS-, CS?
           - PT do Delegado: CF, CS, DL?
           - PT do Lotado/Colaborador: CF, CS, LC?
        3. Nenhuma assinatura TCR deve ser exigida
        4. Plano deve ter ao menos 1 entrega
        
        if (!$condicoes["planoIncluido"]) 
            throw ServerException("Plano deve estar INCLUIDO");
        
        // Lógica complexa de validação hierárquica
        $validoTabela1 = false;
        if ($condicoes["atribuicoesGestorUsuario"]["gestor"]) {
            $validoTabela1 = $condicoes["gestorUnidadeSuperior"] || 
                           $condicoes['usuarioEhParticipanteHabilitado'];
        }
        // ... mais validações
        
        if (!$validoTabela1) 
            throw ServerException("Usuário não atende TABELA_1");
}
```

**Regras de Negócio Implementadas:**
- ✅ RN_PTR_P: Condições para ativação de plano
- ✅ RN_PTR_Q: Cancelamento de assinatura
- ✅ RN_PTR_R: Condições para cancelamento
- ✅ RN_PTR_N: Regras de arquivamento
- ✅ RN_PTR_X: Regras de suspensão

**Complexidade:** 🔴 Crítica (múltiplas regras de negócio + hierarquia organizacional)

---

## Services

### PlanoTrabalhoService

**Localização:** `/app/Services/PlanoTrabalhoService.php`

**Complexidade:** 🔴 Crítica

**Propósito:** Implementa toda a lógica de negócio complexa para gestão de planos de trabalho, incluindo validações, cálculos de tempo, gestão de consolidações e controle de assinaturas TCR.

**Dependências:**
```php
public function __construct(
    private CalendarioService $calendarioService,
    private UtilService $utilService,
    private StatusService $statusService,
    private UnidadeService $unidadeService,
    private UsuarioService $usuarioService,
    private TemplateService $templateService,
    private TemplateDatasetService $templateDatasetService
) {}
```

**Métodos Principais:**

#### `validateStore(array $data, $unidade, $action): void`

**Responsabilidade:** Valida criação/edição de planos com regras de negócio complexas

**Fluxo Detalhado:**
```php
1. Busca entidades relacionadas (Usuario, TipoModalidade, Programa)
2. Valida unidade ativa
   if (!is_null($unidade?->data_inativacao))
       throw ServerException("A unidade está inativa");

3. Valida conflitos de período (RN_PTR_AA)
   $conflito = PlanoTrabalho::
       where("usuario_id", $data["usuario_id"])->
       where("data_inicio", "<=", $data["data_fim"])->
       where("data_fim", ">=", $data["data_inicio"])->
       where("status", "!=", "CANCELADO")->
       where("id", "!=", $data["id"])->
       first();
   
4. Valida documento TCR obrigatório
   if (empty($data["documento_id"]))
       throw ServerException("TCR não foi gerado");

5. Valida existência de entregas
   if (empty($data['entregas']))
       throw ServerException("Plano sem planejamento de trabalhos");

6. Valida modalidade e pedágio
   if ($tipoModalidade->exige_pedagio && !empty($usuario->pedagio)) {
       // Verifica sobreposição de datas
       $sobrepoe = !($fimPlano < $inicioPedagio || $inicioPlano > $fimPedagio);
       if ($sobrepoe) throw ServerException("Modalidade indisponível");
   }

7. Validações específicas por ação (INSERT/EDIT)
```

**Regras de Negócio Implementadas:**
- ✅ RN_PTR_V: Condições para criação de plano
- ✅ RN_PTR_M: Condições para alteração de plano
- ✅ RN_PTR_AA: Validação de conflitos de período
- ✅ RN_PTR_Y: Validação de lotação/colaborador
- ✅ RN_PTR_AD/AE: Imutabilidade de unidade/programa/usuário

**Complexidade:** 🔴 Crítica (múltiplas validações + queries + cálculos de data)

---

#### `atualizaConsolidacoes($plano): void`

**Responsabilidade:** Gera/atualiza períodos de consolidação baseados na periodicidade do programa

**Fluxo Detalhado:**
```php
DB::transaction(function () use ($plano) {
    1. Busca consolidações existentes ordenadas por data_inicio
    2. Calcula períodos baseados na periodicidade do programa
    
    while ($dataInicio->lessThanOrEqualTo($limite)) {
        $proximoFim = $this->proxDataConsolidacao($dataInicio, $programa);
        $dataFim = $proximoFim->greaterThan($limite) ? $limite : $proximoFim;
        
        3. Verifica se período já existe (RN_CSLD_4)
        $igual = $existentes->first(fn($c) => 
            $c->data_inicio === $dataInicio && 
            $c->data_fim === $dataFim
        );
        
        4. Verifica intersecção com períodos CONCLUIDO/AVALIADO
        $intersecao = $existentes->first(fn($c) => 
            $c->status !== "INCLUIDO" && 
            $dataInicio->lessThanOrEqualTo($c->data_fim) && 
            $dataFim->greaterThanOrEqualTo($c->data_inicio)
        );
        
        5. Aplica regras de consolidação (RN_CSLD_5, RN_CSLD_6)
        if (!empty($igual)) {
            // Mantém período existente
        } else if (!empty($intersecao)) {
            // Cria novo período ou mantém existente
        } else {
            // Cria novo período
            $novo = new PlanoTrabalhoConsolidacao([...]);
        }
    }
    
    6. Remove consolidações órfãs
    7. Atualiza datas finais considerando próxima consolidação
});
```

**Regras de Negócio Implementadas:**
- ✅ RN_CSLD_1: Geração automática de consolidações
- ✅ RN_CSLD_4: Manutenção de períodos iguais
- ✅ RN_CSLD_5: Tratamento de datas início iguais
- ✅ RN_CSLD_6: Criação de períodos intermediários

**Complexidade:** 🔴 Crítica (transação + loops + lógica temporal complexa)

**Performance:**
- ⚠️ Pode melhorar (múltiplas queries em loop)

---

#### `assinaturasExigidas($planoTrabalho): array`

**Responsabilidade:** Calcula assinaturas exigidas no TCR baseado no programa e hierarquia

**Fluxo Detalhado:**
```php
1. Valida campos obrigatórios do plano
2. Verifica cache de assinaturas
3. Busca entidades relacionadas (Programa, Usuario, Unidade)

$ids = [
    "participante" => [],
    "gestores_unidade_executora" => [],
    "gestores_unidade_lotacao" => [],
    "gestores_entidade" => []
];

4. Verifica exigências do programa
if ($programa->plano_trabalho_assinatura_participante) {
    $ids["participante"][] = $participante->id;
}

5. Calcula gestores por hierarquia (TABELA_3)
if ($programa->plano_trabalho_assinatura_gestor_unidade) {
    $ids["gestores_unidade_executora"] = 
        $this->unidadeService->getGestoresPorUnidade($unidade, ...);
}

6. Armazena resultado em cache
return $this->setBuffer("assinaturasExigidas", $keys, $ids);
```

**Complexidade:** ⚠️ Alta (cálculos hierárquicos + cache + múltiplas consultas)

---

## Models

### PlanoTrabalho

**Localização:** `/app/Models/PlanoTrabalho.php`

**Tabela:** `planos_trabalhos`

**Complexidade:** ⚠️ Alta

**Atributos:**

```php
// Fillable
protected $fillable = [
    'carga_horaria',        // double(8,2), carga horária diária
    'tempo_total',          // double(8,2), horas úteis totais do período
    'tempo_proporcional',   // double(8,2), tempo_total menos afastamentos
    'forma_contagem_carga_horaria', // enum('DIA','SEMANA','MES')
    'programa_id',          // char(36), FK para programas
    'usuario_id',           // char(36), FK para usuarios
    'criacao_usuario_id',   // char(36), quem criou o plano
    'unidade_id',           // char(36), unidade executora
    'documento_id',         // char(36), TCR associado
    'tipo_modalidade_id',   // char(36), modalidade de trabalho
    'data_inicio',          // datetime, início da vigência
    'data_fim',             // datetime, fim da vigência
    'data_arquivamento',    // datetime, quando foi arquivado
    'criterios_avaliacao',  // JSON, critérios personalizados
];

// Casts
protected $casts = [
    "criterios_avaliacao" => AsJson::class
];

// Constantes de Status
public const STATUSES = [
    'INCLUIDO' => 'Incluído',
    'AGUARDANDO_ASSINATURA' => 'Aguardando Assinatura',
    'ATIVO' => 'Aprovado',
    'CONCLUIDO' => 'Executado',
    'AVALIADO' => 'Avaliado',
    'SUSPENSO' => 'Suspenso',
    'CANCELADO' => 'Cancelado'
];

// Timestamps
public $timestamps = true; // created_at, updated_at

// Soft Deletes
use SoftDeletes; // deleted_at
```

**Relacionamentos:**

#### `usuario(): BelongsTo`
```php
return $this->belongsTo(Usuario::class);
```
**Descrição:** Participante do plano de trabalho
**Eager Loading:** Sempre usar `with('usuario')` para evitar N+1

#### `programa(): BelongsTo`
```php
return $this->belongsTo(Programa::class);
```
**Descrição:** Programa de gestão ao qual o plano está vinculado

#### `unidade(): BelongsTo`
```php
return $this->belongsTo(Unidade::class);
```
**Descrição:** Unidade executora do plano

#### `entregas(): HasMany`
```php
return $this->hasMany(PlanoTrabalhoEntrega::class);
```
**Descrição:** Entregas planejadas no plano
**Eager Loading:** Crítico para validações

#### `consolidacoes(): HasMany`
```php
return $this->hasMany(PlanoTrabalhoConsolidacao::class)->orderBy('data_inicio');
```
**Descrição:** Períodos de consolidação gerados automaticamente

#### `atividades(): HasMany`
```php
return $this->hasMany(Atividade::class);
```
**Descrição:** Atividades executadas no plano

#### `documento(): BelongsTo`
```php
return $this->belongsTo(Documento::class);
```
**Descrição:** TCR (Termo de Ciência e Responsabilidade) associado

**Total de Relacionamentos:** 12

**Eventos:**

```php
protected static function booted()
{
    static::creating(function ($planoTrabalho) {
        // Gera número sequencial via stored procedure
        $planoTrabalho->numero = DB::select("CALL sequence_plano_trabalho_numero()")[0]->number;
    });
}
```

**Observers:** Não possui observer registrado

**Traits Utilizados:**
- `SoftDeletes` - Deleção lógica
- `ModelBase` - Funcionalidades base customizadas

**Complexidade dos Relacionamentos:**
- Relacionamentos simples (1:N, N:1): 8
- Relacionamentos complexos (com ordenação): 2
- Relacionamentos polimórficos: 0

---

## Análise de Complexidade do Módulo

### Matriz de Complexidade

| Componente | LOC | Métodos | Dependências | Complexidade Ciclomática | Nível |
|------------|-----|---------|--------------|--------------------------|-------|
| PlanoTrabalhoController | ~800 | 15 | 3 | 45 | 🔴 |
| PlanoTrabalhoService | ~2500 | 35 | 7 | 120 | 🔴 |
| PlanoTrabalho | ~200 | 12 | 8 | 15 | ⚠️ |

### Pontos de Atenção

#### 🔴 Críticos
1. **PlanoTrabalhoService::checkPermissions()**
   - **Problema:** Método com 200+ linhas e múltiplas condições aninhadas
   - **Impacto:** Dificulta manutenção e testes
   - **Sugestão:** Extrair validações para classes Strategy específicas

2. **PlanoTrabalhoService::atualizaConsolidacoes()**
   - **Problema:** Lógica temporal complexa com múltiplos loops e condições
   - **Impacto:** Alto risco de bugs em cálculos de período
   - **Sugestão:** Refatorar para classe dedicada ConsolidacaoCalculator

#### ⚠️ Atenção
1. **PlanoTrabalhoController::getByUsuario()**
   - **Problema:** N+1 queries na geração de metadados
   - **Sugestão:** Implementar eager loading para metadados

### Dívida Técnica

- **Queries N+1:** Metadados de permissões calculados em loop
- **Lógica duplicada:** Validações de status espalhadas em múltiplos métodos
- **Falta de testes:** 0% de cobertura de testes
- **Acoplamento alto:** Service depende de 7 outros services

### Oportunidades de Refatoração

1. **Extrair Strategy Pattern para Validações**
   - Local: PlanoTrabalhoService::checkPermissions()
   - Benefício: Melhor testabilidade e manutenção
   - Esforço: Alto

2. **Implementar Value Objects para Períodos**
   - Local: Cálculos de consolidação
   - Benefício: Encapsulamento de lógica temporal
   - Esforço: Médio

---

## Padrões Técnicos Utilizados

### Validação
- [x] Validação inline nos controllers
- [x] Validação de regras de negócio em Services
- [ ] FormRequests dedicadas

### Transformação de Dados
- [ ] API Resources para responses
- [x] Arrays associativos para transferência
- [ ] DTOs estruturados

### Tratamento de Erros
- [x] Exceptions customizadas (ServerException)
- [x] Logging estruturado
- [x] Respostas padronizadas

### Performance
- [x] Eager loading seletivo
- [x] Cache de cálculos complexos (Buffer pattern)
- ⚠️ Queries N+1 em metadados
- [x] Transações para operações críticas

### Segurança
- [x] Validação de permissões hierárquicas
- [x] Sanitização via validação Laravel
- [x] Controle de acesso baseado em roles
- [x] Auditoria de operações críticas

---

## Diagrama de Fluxo Interno

### Operação: Ativação de Plano de Trabalho

```
┌─────────────────────────────────────────────────────────────────┐
│ REQUEST: POST /api/PlanoTrabalho/ativar                         │
│ Body: { id: "uuid", justificativa: "texto" }                   │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────────────┐
│ MIDDLEWARE CHAIN                                               │
│ 1. Authenticate → Verifica token Sanctum                      │
│ 2. TenancyMiddleware → Inicializa contexto tenant             │
└────────────┬───────────────────────────────────────────────────┘
             │ Dados validados
             ▼
┌────────────────────────────────────────────────────────────────┐
│ CONTROLLER: PlanoTrabalhoController::ativar()                 │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 1. Validação de entrada                                   │ │
│ │    $data = $request->validate([                          │ │
│ │        'id' => 'required',                               │ │
│ │        'justificativa' => 'present'                      │ │
│ │    ]);                                                   │ │
│ │                                                           │ │
│ │ 2. Verificação de permissões                             │ │
│ │    $this->checkPermissions("ATIVAR", ...)               │ │
│ │    ├─> Verifica capacidade MOD_PTR                      │ │
│ │    ├─> Valida status = INCLUIDO                         │ │
│ │    ├─> Aplica TABELA_1 (hierarquia)                     │ │
│ │    ├─> Verifica assinaturas TCR                         │ │
│ │    └─> Valida existência de entregas                    │ │
│ │                                                           │ │
│ │ 3. Chama service                                          │ │
│ │    $this->service->ativar($data, $unidade)              │ │
│ └──────────────────────────────────────────────────────────┘ │
└────────────┬───────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────────────┐
│ SERVICE: PlanoTrabalhoService::ativar()                       │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ DB::beginTransaction()                                    │ │
│ │                                                           │ │
│ │ 1. $planoTrabalho = PlanoTrabalho::find($data["id"])     │ │
│ │    └─> SELECT * FROM planos_trabalhos WHERE id = ?      │ │
│ │                                                           │ │
│ │ 2. $this->statusService->atualizaStatus(                │ │
│ │        $planoTrabalho, 'ATIVO', $justificativa          │ │
│ │    )                                                     │ │
│ │    ├─> INSERT INTO status_justificativas (...)          │ │
│ │    ├─> UPDATE planos_trabalhos SET status = 'ATIVO'     │ │
│ │    └─> event(new StatusAtualizado($plano))              │ │
│ │                                                           │ │
│ │ DB::commit()                                              │ │
│ └──────────────────────────────────────────────────────────┘ │
└────────────┬───────────────────────────────────────────────────┘
             │ Success: true
             ▼
┌────────────────────────────────────────────────────────────────┐
│ CONTROLLER (continuação)                                       │
│ - return response()->json(['success' => true])                │
└────────────┬───────────────────────────────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────────────┐
│ RESPONSE: 200 OK                                               │
│ Body: { "success": true }                                      │
└────────────────────────────────────────────────────────────────┘

PROCESSAMENTO ASSÍNCRONO (em background):
┌────────────────────────────────────────────────────────────────┐
│ EVENT: StatusAtualizado                                        │
│ ├─> AuditoriaListener → Registra log de auditoria             │
│ ├─> NotificacaoListener → Envia notificação ao participante   │
│ └─> IntegracaoListener → Sincroniza com sistemas externos     │
└────────────────────────────────────────────────────────────────┘
```

---