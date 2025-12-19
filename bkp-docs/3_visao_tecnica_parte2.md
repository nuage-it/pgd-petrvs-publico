# Módulo: Gestão de Atividades

## Visão Geral Técnica

**Propósito:** Controla execução de atividades com timer, pausas, hierarquia e validações de tempo baseadas em calendário organizacional.

**Complexidade Geral:** ⚠️ Alta

**Métricas:**
- **Total de Classes:** 4
- **Linhas de Código:** ~2.000
- **Controllers:** 1 (AtividadeController)
- **Services:** 1 (AtividadeService)
- **Models:** 3 (Atividade, AtividadePausa, AtividadeTarefa)
- **Jobs:** 0
- **Testes:** 0 (cobertura: 0%)

---

## Controllers

### AtividadeController

**Localização:** `/app/Http/Controllers/AtividadeController.php`

**Complexidade:** ⚠️ Alta

**Responsabilidades:**
- Controle de ciclo de vida da atividade (iniciar, pausar, concluir)
- Cálculo de prazos baseado em calendário
- Gestão de hierarquia de atividades
- Validação de permissões de execução

**Métodos:**

#### `iniciar(Request $request)`
**Endpoint:** `POST /api/Atividade/iniciar`

**Propósito:** Inicia execução de uma atividade com controle de tempo

**Request Body:**
```json
{
  "id": "string (UUID)",
  "usuario_id": "string (UUID)",
  "plano_trabalho_id": "string (UUID)",
  "plano_trabalho_entrega_id": "string (UUID)",
  "carga_horaria": "number",
  "tempo_planejado": "number",
  "data_inicio": "datetime",
  "suspender": "boolean"
}
```

**Fluxo Interno:**
```
1. Validação de 8 campos obrigatórios
2. Chama AtividadeService->iniciar($data, $unidade)
   ├─> Valida se atividade pode ser iniciada
   ├─> Verifica conflitos com outras atividades
   ├─> Suspende atividades em andamento (se solicitado)
   ├─> Atualiza data_inicio e status
   └─> Registra início no histórico
3. Retorna success: true
```

**Complexidade:** ⚠️ Alta (múltiplas validações + controle de estado)

---

#### `concluir(Request $request)`
**Endpoint:** `POST /api/Atividade/concluir`

**Propósito:** Finaliza atividade registrando tempo despendido e progresso

**Request Body:**
```json
{
  "id": "string (UUID)",
  "tipo_atividade_id": "string (UUID, nullable)",
  "esforco": "number",
  "progresso": "number (0-100)",
  "tempo_despendido": "number",
  "data_entrega": "datetime",
  "data_arquivamento": "datetime, nullable",
  "produtividade": "number, nullable",
  "descricao_tecnica": "string",
  "documento_entrega": "object, nullable"
}
```

**Fluxo Interno:**
```
1. Validação de 10 campos (8 obrigatórios)
2. Chama AtividadeService->concluir($data, $unidade)
   ├─> Calcula tempo total despendido
   ├─> Valida progresso (0-100%)
   ├─> Atualiza campos de conclusão
   ├─> Para timer se ativo
   ├─> Registra documento de entrega
   └─> Dispara evento AtividadeConcluida
3. Retorna success: true
```

**Complexidade:** ⚠️ Alta (cálculos de tempo + validações + eventos)

---

#### `pausar(Request $request)` / `reiniciar(Request $request)`
**Endpoints:** `POST /api/Atividade/pausar` | `POST /api/Atividade/reiniciar`

**Propósito:** Controla pausas na execução de atividades

**Fluxo Interno:**
```
1. Validação de atividade_id e data
2. Chama AtividadeService->pausar/reiniciar()
   ├─> Cria registro em atividades_pausas
   ├─> Calcula tempo de pausa
   ├─> Atualiza status da atividade
   └─> Registra no histórico
```

**Complexidade:** 🟢 Média (operação simples com registro de tempo)

---

## Services

### AtividadeService

**Localização:** `/app/Services/AtividadeService.php`

**Complexidade:** ⚠️ Alta

**Dependências:**
```php
public function __construct(
    private CalendarioService $calendarioService,
    private PlanoTrabalhoService $planoTrabalhoService,
    private UtilService $utilService
) {}
```

**Métodos Principais:**

#### `iniciar(array $data, $unidade): bool`

**Fluxo Detalhado:**
```php
1. Busca atividade e valida estado
   $atividade = Atividade::find($data['id']);
   if ($atividade->data_inicio) 
       throw new ServerException("Atividade já iniciada");

2. Verifica conflitos com outras atividades
   $ativas = $this->atividadesAtivas($data['usuario_id']);
   if (count($ativas) > 0 && !$data['suspender'])
       throw new ServerException("Usuário possui atividades em andamento");

3. Suspende atividades conflitantes
   if ($data['suspender']) {
       foreach ($ativas as $ativa) {
           $this->pausar(['atividade_id' => $ativa->id, 'data' => now()]);
       }
   }

4. Inicia atividade
   DB::transaction(function() use ($atividade, $data) {
       $atividade->data_inicio = $data['data_inicio'];
       $atividade->tempo_planejado = $data['tempo_planejado'];
       $atividade->save();
       
       // Registra no histórico
       $this->registrarHistorico($atividade, 'INICIADA');
   });
```

**Regras de Negócio:**
- ✅ Usuário pode ter apenas 1 atividade ativa por vez
- ✅ Atividade deve estar no status adequado para início
- ✅ Validação de permissões de execução

**Complexidade:** ⚠️ Alta (controle de estado + transações + validações)

---

## Models

### Atividade

**Localização:** `/app/Models/Atividade.php`

**Tabela:** `atividades`

**Complexidade:** ⚠️ Alta

**Atributos:**
```php
protected $fillable = [
    'numero',                    // int, número sequencial
    'descricao',                // text, descrição da atividade
    'tempo_planejado',          // double, horas planejadas
    'tempo_despendido',         // double, horas realmente gastas
    'data_inicio',              // datetime, quando iniciou
    'data_entrega',             // datetime, quando foi entregue
    'data_estipulada_entrega',  // datetime, prazo estipulado
    'progresso',                // int(0-100), percentual de conclusão
    'esforco',                  // double, esforço despendido
    'produtividade',            // double, produtividade calculada
    'plano_trabalho_id',        // FK para plano de trabalho
    'plano_trabalho_entrega_id', // FK para entrega do plano
    'usuario_id',               // FK para executor
    'tipo_atividade_id',        // FK para tipo de atividade
    'atividade_pai_id',         // FK para hierarquia (self-reference)
];

protected $casts = [
    'etiquetas' => 'array',
    'checklist' => 'array',
    'comentarios' => 'array'
];
```

**Relacionamentos:**

#### `planoTrabalho(): BelongsTo`
```php
return $this->belongsTo(PlanoTrabalho::class);
```

#### `usuario(): BelongsTo`
```php
return $this->belongsTo(Usuario::class);
```

#### `pausas(): HasMany`
```php
return $this->hasMany(AtividadePausa::class);
```

#### `filhas(): HasMany`
```php
return $this->hasMany(Atividade::class, 'atividade_pai_id');
```

#### `pai(): BelongsTo`
```php
return $this->belongsTo(Atividade::class, 'atividade_pai_id');
```

**Scopes:**

#### `scopeAtivas($query)`
```php
return $query->whereNotNull('data_inicio')->whereNull('data_entrega');
```

#### `scopeNaoIniciadas($query)`
```php
return $query->whereNull('data_inicio');
```

**Total de Relacionamentos:** 8

**Complexidade dos Relacionamentos:**
- Relacionamentos simples: 6
- Auto-relacionamento hierárquico: 2

---

# Módulo: Integrações Externas

## Visão Geral Técnica

**Propósito:** Gerencia integrações com sistemas governamentais (SIAPE, Login Único, Azure AD) e processamento assíncrono de sincronização de dados.

**Complexidade Geral:** 🔴 Crítica

**Métricas:**
- **Total de Classes:** 8
- **Linhas de Código:** ~4.000
- **Controllers:** 3
- **Services:** 4
- **Models:** 5
- **Jobs:** 2
- **Testes:** 0 (cobertura: 0%)

---

## Jobs

### SincronizarSiapeJob

**Localização:** `/app/Jobs/SincronizarSiapeJob.php`

**Complexidade:** 🔴 Crítica

**Propósito:** Sincronização completa e automática de dados do SIAPE para todas as entidades do sistema

**Configuração:**
```php
public $timeout = 0;              // Sem timeout (processo longo)
public $queue = 'siape_queue';    // Fila específica para SIAPE
public $tries = 1;                // Apenas 1 tentativa
```

**Dados de Entrada:**
```php
public function __construct(
    private readonly ?string $tenantId = null
) {}
```

**Fluxo de Processamento:**
```php
public function handle(IntegracaoService $integracaoService)
{
    ini_set('memory_limit', '-1'); // Remove limite de memória
    
    try {
        1. Inicializa serviço de integração
           $integracaoService = new IntegracaoService([], $this->tenantId);
        
        2. Busca todas as entidades do sistema
           $entidades = Entidade::all();
        
        3. Define escopo da sincronização
           $inputs = [
               'unidades' => true,      // Sincronizar estrutura organizacional
               'servidores' => true,    // Sincronizar dados de servidores
               'gestores' => true,      // Sincronizar hierarquia de gestão
           ];
        
        4. Processa cada entidade
           foreach ($entidades as $entidade) {
               $inputs['entidade'] = $entidade->id;
               Log::alert("Job SincronizarPetrvs: " . json_encode($inputs));
               $integracaoService->sincronizar($inputs);
           }
        
        Log::info("Job SincronizarPetrvs END");
        
    } catch (\Exception $e) {
        Log::error("Erro ao processar Job SincronizarPetrvs " . $e->getMessage());
        return false;
    }
}
```

**Tratamento de Falhas:**
```php
// Não possui método failed() - falhas são apenas logadas
// Job não é reprocessado automaticamente
```

**Dependências Externas:**
- API SOAP SIAPE - `https://www1.siapenet.gov.br/WSSiapenet/services/ConsultaSIAPE?wsdl`
- Serviço: IntegracaoService - Processamento de dados SIAPE

**Tempo Médio de Execução:** ~30-60 minutos (dependendo do volume de dados)

**Frequência de Execução:** Agendado diariamente via Laravel Schedule

**Impacto no Sistema:**
- CPU: Alto (processamento XML + validações)
- Memória: Crítico (memory_limit = -1)
- I/O Disco: Alto (múltiplas inserções/atualizações)
- Rede: Alto (múltiplas chamadas SOAP)

**Complexidade:** 🔴 Crítica (integração externa + volume de dados + processamento longo)

---

## Services

### IntegracaoService

**Localização:** `/app/Services/IntegracaoService.php`

**Complexidade:** 🔴 Crítica

**Propósito:** Orquestra sincronização de dados entre SIAPE e sistema local, processando estruturas organizacionais e dados funcionais

**Dependências:**
```php
public function __construct(
    private IntegracaoSiapeService $siapeService,
    private UsuarioService $usuarioService,
    private UnidadeService $unidadeService,
    private string $tenantId
) {}
```

**Métodos Principais:**

#### `sincronizar(array $inputs): bool`

**Responsabilidade:** Coordena processo completo de sincronização

**Fluxo Detalhado:**
```php
1. Validação de entrada
   if (empty($inputs['entidade'])) 
       throw new ServerException("Entidade obrigatória");

2. Inicialização do contexto
   $this->setTenantContext($inputs['entidade']);
   
3. Sincronização de unidades (se solicitado)
   if ($inputs['unidades']) {
       $unidadesXml = $this->siapeService->consultarUnidades();
       $this->processarUnidades($unidadesXml);
   }

4. Sincronização de servidores (se solicitado)
   if ($inputs['servidores']) {
       $servidoresXml = $this->siapeService->consultarServidores();
       $this->processarServidores($servidoresXml);
   }

5. Sincronização de gestores (se solicitado)
   if ($inputs['gestores']) {
       $this->atualizarHierarquiaGestores();
   }

6. Limpeza e otimização
   $this->inativarRegistrosOrfaos();
   $this->otimizarIndices();
```

**Tratamento de Erros:**
```php
try {
    // Processamento
} catch (SoapFault $e) {
    Log::error('Erro SOAP SIAPE: ' . $e->getMessage());
    throw new IntegrationException('Falha na comunicação com SIAPE');
} catch (\Exception $e) {
    Log::error('Erro geral integração: ' . $e->getMessage());
    throw $e;
}
```

**Complexidade:** 🔴 Crítica (orquestração + múltiplas integrações + tratamento de erros)

---

#### `processarServidores(string $xmlData): void`

**Responsabilidade:** Processa dados XML de servidores do SIAPE

**Fluxo Detalhado:**
```php
1. Parse do XML SIAPE
   $servidores = $this->parseXmlServidores($xmlData);
   
2. Processamento em lotes
   $chunks = array_chunk($servidores, 100); // Lotes de 100
   
   foreach ($chunks as $chunk) {
       DB::transaction(function() use ($chunk) {
           foreach ($chunk as $servidorSiape) {
               3. Busca ou cria usuário local
               $usuario = $this->usuarioService->findByCpf($servidorSiape['cpf']);
               
               if (!$usuario) {
                   $usuario = $this->usuarioService->createFromSiape($servidorSiape);
               } else {
                   4. Atualiza dados existentes
                   $this->usuarioService->updateFromSiape($usuario, $servidorSiape);
               }
               
               5. Processa lotações
               $this->processarLotacoes($usuario, $servidorSiape['lotacoes']);
               
               6. Atualiza atribuições
               $this->atualizarAtribuicoes($usuario, $servidorSiape);
           }
       });
   }
```

**Performance:**
- ✅ Processamento em lotes para otimizar memória
- ✅ Transações por chunk para consistência
- ⚠️ Pode gerar N+1 queries em relacionamentos

**Complexidade:** 🔴 Crítica (processamento XML + transações + múltiplas atualizações)

---

## Análise de Complexidade dos Módulos

### Matriz de Complexidade Geral

| Módulo | Controllers | Services | Models | Jobs | Complexidade Total |
|--------|-------------|----------|--------|------|-------------------|
| Planos de Trabalho | 1 (🔴) | 1 (🔴) | 3 (⚠️) | 0 | 🔴 Crítica |
| Atividades | 1 (⚠️) | 1 (⚠️) | 3 (⚠️) | 0 | ⚠️ Alta |
| Integrações | 3 (⚠️) | 4 (🔴) | 5 (🟢) | 2 (🔴) | 🔴 Crítica |

### Pontos Críticos do Sistema

#### 🔴 Críticos Gerais
1. **Falta de Testes Automatizados**
   - **Problema:** 0% de cobertura em módulos críticos
   - **Impacto:** Alto risco de regressão em mudanças
   - **Sugestão:** Implementar testes unitários para Services primeiro

2. **Queries N+1 Generalizadas**
   - **Problema:** Padrão recorrente em múltiplos módulos
   - **Impacto:** Performance degradada com volume de dados
   - **Sugestão:** Auditoria completa de queries + eager loading

3. **Acoplamento Alto entre Services**
   - **Problema:** Services dependem de muitos outros services
   - **Impacto:** Dificulta testes e manutenção
   - **Sugestão:** Implementar interfaces e injeção de dependência

#### ⚠️ Atenção Geral
1. **Validações Espalhadas**
   - **Problema:** Lógica de validação duplicada entre Controllers e Services
   - **Sugestão:** Centralizar em FormRequests e Rules customizadas

2. **Falta de DTOs**
   - **Problema:** Transferência de dados via arrays associativos
   - **Sugestão:** Implementar DTOs tipados para maior segurança

### Recomendações Arquiteturais

1. **Implementar Command/Query Separation (CQRS)**
   - Separar operações de leitura e escrita
   - Otimizar queries de consulta
   - Simplificar commands de alteração

2. **Extrair Domain Services**
   - Mover regras de negócio complexas para domain services
   - Reduzir responsabilidades dos application services
   - Melhorar testabilidade

3. **Implementar Event Sourcing para Auditoria**
   - Registrar todos os eventos de mudança de estado
   - Facilitar reconstrução de histórico
   - Melhorar rastreabilidade

4. **Adicionar Circuit Breaker para Integrações**
   - Proteger sistema de falhas em APIs externas
   - Implementar fallback strategies
   - Melhorar resiliência

---

## Métricas de Qualidade Recomendadas

### Cobertura de Testes
- **Meta:** 80% para Services críticos
- **Prioridade:** PlanoTrabalhoService, IntegracaoService, AtividadeService

### Performance
- **Meta:** < 200ms para 95% das requisições
- **Monitoramento:** APM para identificar gargalos
- **Otimização:** Cache de queries frequentes

### Manutenibilidade
- **Complexidade Ciclomática:** < 10 por método
- **Acoplamento:** < 5 dependências por classe
- **Coesão:** Responsabilidade única por classe

### Confiabilidade
- **Disponibilidade:** 99.9% uptime
- **Recuperação:** < 5 minutos para falhas críticas
- **Monitoramento:** Alertas proativos para integrações