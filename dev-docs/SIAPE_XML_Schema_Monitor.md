# Sistema de Monitoramento de Schema XML SIAPE

## Visão Geral

Sistema para mapear estruturas XML do SIAPE, detectar mudanças automaticamente e gerar alertas quando novos parsers são necessários.

## Implementação

### 1. Schema Mapper - Extração de Estrutura XML

```php
<?php

namespace App\Services\Siape\Schema;

class XmlSchemaMapper
{
    public function extractSchema(\SimpleXMLElement $xml, string $rootPath = ''): array
    {
        $schema = [];
        
        foreach ($xml as $key => $value) {
            $currentPath = $rootPath ? "$rootPath.$key" : $key;
            
            if ($value->count() > 0) {
                // Elemento com filhos
                $schema[$currentPath] = [
                    'type' => 'object',
                    'children' => $this->extractSchema($value, $currentPath),
                    'attributes' => $this->extractAttributes($value)
                ];
            } else {
                // Elemento folha
                $schema[$currentPath] = [
                    'type' => $this->detectType((string)$value),
                    'sample_value' => $this->sanitizeValue((string)$value),
                    'attributes' => $this->extractAttributes($value)
                ];
            }
        }
        
        return $schema;
    }
    
    private function extractAttributes(\SimpleXMLElement $element): array
    {
        $attributes = [];
        foreach ($element->attributes() as $name => $value) {
            $attributes[$name] = $this->detectType((string)$value);
        }
        return $attributes;
    }
    
    private function detectType(string $value): string
    {
        if (empty($value)) return 'empty';
        if (is_numeric($value)) return 'numeric';
        if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $value)) return 'date_br';
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) return 'date_iso';
        if (preg_match('/^\d{11}$/', $value)) return 'cpf';
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) return 'email';
        return 'string';
    }
    
    private function sanitizeValue(string $value): string
    {
        // Remove dados sensíveis para o schema
        if (preg_match('/^\d{11}$/', $value)) return 'CPF_MASKED';
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) return 'EMAIL_MASKED';
        return strlen($value) > 50 ? substr($value, 0, 50) . '...' : $value;
    }
}
```

### 2. Schema Storage - Armazenamento de Schemas

```php
<?php

namespace App\Services\Siape\Schema;

use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SchemaStorage
{
    private const SCHEMA_PATH = 'siape/schemas';
    
    public function saveSchema(string $operation, array $schema): string
    {
        $timestamp = Carbon::now()->format('Y-m-d_H-i-s');
        $filename = "{$operation}_{$timestamp}.json";
        $path = self::SCHEMA_PATH . "/{$operation}/{$filename}";
        
        $schemaData = [
            'operation' => $operation,
            'timestamp' => $timestamp,
            'schema' => $schema,
            'hash' => $this->generateSchemaHash($schema)
        ];
        
        Storage::put($path, json_encode($schemaData, JSON_PRETTY_PRINT));
        
        return $path;
    }
    
    public function getLatestSchema(string $operation): ?array
    {
        $files = Storage::files(self::SCHEMA_PATH . "/{$operation}");
        
        if (empty($files)) {
            return null;
        }
        
        // Pega o arquivo mais recente
        $latestFile = collect($files)->sort()->last();
        $content = Storage::get($latestFile);
        
        return json_decode($content, true);
    }
    
    public function getAllSchemas(string $operation): array
    {
        $files = Storage::files(self::SCHEMA_PATH . "/{$operation}");
        $schemas = [];
        
        foreach ($files as $file) {
            $content = Storage::get($file);
            $schemas[] = json_decode($content, true);
        }
        
        return collect($schemas)->sortBy('timestamp')->values()->all();
    }
    
    private function generateSchemaHash(array $schema): string
    {
        return md5(json_encode($this->normalizeSchema($schema)));
    }
    
    private function normalizeSchema(array $schema): array
    {
        // Remove valores de exemplo para comparação estrutural
        return array_map(function ($item) {
            if (is_array($item)) {
                unset($item['sample_value']);
                if (isset($item['children'])) {
                    $item['children'] = $this->normalizeSchema($item['children']);
                }
            }
            return $item;
        }, $schema);
    }
}
```

### 3. Schema Comparator - Detecção de Mudanças

```php
<?php

namespace App\Services\Siape\Schema;

class SchemaComparator
{
    public function compareSchemas(array $oldSchema, array $newSchema): array
    {
        return [
            'is_different' => $this->isDifferent($oldSchema, $newSchema),
            'changes' => $this->detectChanges($oldSchema, $newSchema),
            'severity' => $this->calculateSeverity($oldSchema, $newSchema)
        ];
    }
    
    private function isDifferent(array $oldSchema, array $newSchema): bool
    {
        return $this->normalizeForComparison($oldSchema) !== $this->normalizeForComparison($newSchema);
    }
    
    private function detectChanges(array $oldSchema, array $newSchema): array
    {
        $changes = [];
        
        // Campos removidos
        $removedFields = array_diff_key($oldSchema, $newSchema);
        foreach ($removedFields as $field => $data) {
            $changes[] = [
                'type' => 'removed',
                'field' => $field,
                'old_data' => $data
            ];
        }
        
        // Campos adicionados
        $addedFields = array_diff_key($newSchema, $oldSchema);
        foreach ($addedFields as $field => $data) {
            $changes[] = [
                'type' => 'added',
                'field' => $field,
                'new_data' => $data
            ];
        }
        
        // Campos modificados
        $commonFields = array_intersect_key($oldSchema, $newSchema);
        foreach ($commonFields as $field => $oldData) {
            $newData = $newSchema[$field];
            
            if ($this->isFieldModified($oldData, $newData)) {
                $changes[] = [
                    'type' => 'modified',
                    'field' => $field,
                    'old_data' => $oldData,
                    'new_data' => $newData,
                    'modifications' => $this->getFieldModifications($oldData, $newData)
                ];
            }
        }
        
        return $changes;
    }
    
    private function calculateSeverity(array $oldSchema, array $newSchema): string
    {
        $changes = $this->detectChanges($oldSchema, $newSchema);
        
        $hasRemovedFields = collect($changes)->contains('type', 'removed');
        $hasTypeChanges = collect($changes)->contains(function ($change) {
            return $change['type'] === 'modified' && 
                   in_array('type_changed', $change['modifications'] ?? []);
        });
        
        if ($hasRemovedFields || $hasTypeChanges) {
            return 'critical';
        }
        
        $hasAddedFields = collect($changes)->contains('type', 'added');
        if ($hasAddedFields) {
            return 'medium';
        }
        
        return empty($changes) ? 'none' : 'low';
    }
    
    private function isFieldModified(array $oldData, array $newData): bool
    {
        // Compara tipo
        if (($oldData['type'] ?? null) !== ($newData['type'] ?? null)) {
            return true;
        }
        
        // Compara atributos
        if (($oldData['attributes'] ?? []) !== ($newData['attributes'] ?? [])) {
            return true;
        }
        
        // Compara filhos recursivamente
        if (isset($oldData['children']) && isset($newData['children'])) {
            return $this->isDifferent($oldData['children'], $newData['children']);
        }
        
        return false;
    }
    
    private function getFieldModifications(array $oldData, array $newData): array
    {
        $modifications = [];
        
        if (($oldData['type'] ?? null) !== ($newData['type'] ?? null)) {
            $modifications[] = 'type_changed';
        }
        
        if (($oldData['attributes'] ?? []) !== ($newData['attributes'] ?? [])) {
            $modifications[] = 'attributes_changed';
        }
        
        return $modifications;
    }
    
    private function normalizeForComparison(array $schema): array
    {
        ksort($schema);
        return array_map(function ($item) {
            if (is_array($item)) {
                unset($item['sample_value']);
                if (isset($item['children'])) {
                    $item['children'] = $this->normalizeForComparison($item['children']);
                }
                ksort($item);
            }
            return $item;
        }, $schema);
    }
}
```

### 4. Schema Monitor - Monitoramento Automático

```php
<?php

namespace App\Services\Siape\Schema;

use App\Notifications\SiapeSchemaChangeNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SchemaMonitor
{
    public function __construct(
        private XmlSchemaMapper $mapper,
        private SchemaStorage $storage,
        private SchemaComparator $comparator
    ) {}
    
    public function monitorXml(string $operation, \SimpleXMLElement $xml): void
    {
        try {
            // Extrai schema do XML atual
            $currentSchema = $this->mapper->extractSchema($xml);
            
            // Busca último schema conhecido
            $lastKnownSchema = $this->storage->getLatestSchema($operation);
            
            if ($lastKnownSchema === null) {
                // Primeiro schema para esta operação
                $this->storage->saveSchema($operation, $currentSchema);
                $this->logSchemaEvent($operation, 'first_schema_saved');
                return;
            }
            
            // Compara schemas
            $comparison = $this->comparator->compareSchemas(
                $lastKnownSchema['schema'],
                $currentSchema
            );
            
            if ($comparison['is_different']) {
                // Salva novo schema
                $this->storage->saveSchema($operation, $currentSchema);
                
                // Gera alerta baseado na severidade
                $this->handleSchemaChange($operation, $comparison);
            }
            
        } catch (\Exception $e) {
            Log::error("Erro no monitoramento de schema SIAPE", [
                'operation' => $operation,
                'error' => $e->getMessage()
            ]);
        }
    }
    
    private function handleSchemaChange(string $operation, array $comparison): void
    {
        $severity = $comparison['severity'];
        $changes = $comparison['changes'];
        
        // Log da mudança
        Log::warning("Schema SIAPE alterado", [
            'operation' => $operation,
            'severity' => $severity,
            'changes_count' => count($changes),
            'changes' => $changes
        ]);
        
        // Notificação baseada na severidade
        if (in_array($severity, ['critical', 'medium'])) {
            $this->sendNotification($operation, $severity, $changes);
        }
        
        // Métricas
        $this->recordMetrics($operation, $severity, count($changes));
    }
    
    private function sendNotification(string $operation, string $severity, array $changes): void
    {
        $recipients = config('siape.schema_change_recipients', []);
        
        if (!empty($recipients)) {
            Notification::route('mail', $recipients)
                ->notify(new SiapeSchemaChangeNotification($operation, $severity, $changes));
        }
    }
    
    private function recordMetrics(string $operation, string $severity, int $changesCount): void
    {
        // Registra métricas para monitoramento
        if (class_exists('\Prometheus\CollectorRegistry')) {
            $registry = app(\Prometheus\CollectorRegistry::class);
            
            $counter = $registry->getOrRegisterCounter(
                'siape',
                'schema_changes_total',
                'Total schema changes detected',
                ['operation', 'severity']
            );
            
            $counter->inc([$operation, $severity]);
        }
    }
    
    private function logSchemaEvent(string $operation, string $event): void
    {
        Log::info("Evento de schema SIAPE", [
            'operation' => $operation,
            'event' => $event,
            'timestamp' => now()->toISOString()
        ]);
    }
}
```

### 5. Integração com Parser Existente

```php
<?php

namespace App\Services\Siape;

use App\Services\Siape\Schema\SchemaMonitor;

class ProcessaDadosSiapeBDWithMonitoring extends ProcessaDadosSiapeBD
{
    public function __construct(private SchemaMonitor $schemaMonitor)
    {
        parent::__construct();
    }
    
    public function processaDadosPessoais(string $cpf, string $dadosPessoais): array
    {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosPessoais);
            
            // Monitora schema antes do processamento
            $this->schemaMonitor->monitorXml('dados_pessoais', $xmlResponse);
            
            // Processamento normal
            return parent::processaDadosPessoais($cpf, $dadosPessoais);
            
        } catch (\Exception $e) {
            // Em caso de erro, ainda tenta monitorar se possível
            if (isset($xmlResponse)) {
                $this->schemaMonitor->monitorXml('dados_pessoais_error', $xmlResponse);
            }
            throw $e;
        }
    }
    
    public function processaDadosFuncionais(string $cpf, string $dadosFuncionais): array
    {
        try {
            $xmlResponse = $this->prepareResponseServidorXml($cpf, $dadosFuncionais);
            
            // Monitora schema
            $this->schemaMonitor->monitorXml('dados_funcionais', $xmlResponse);
            
            return parent::processaDadosFuncionais($cpf, $dadosFuncionais);
            
        } catch (\Exception $e) {
            if (isset($xmlResponse)) {
                $this->schemaMonitor->monitorXml('dados_funcionais_error', $xmlResponse);
            }
            throw $e;
        }
    }
    
    public function processaDadosUorg(string $codigo, $dados): ?\SimpleXMLElement
    {
        try {
            $responseXml = $this->prepareResponseUorgXml($codigo, $dados);
            
            // Monitora schema
            $this->schemaMonitor->monitorXml('dados_uorg', $responseXml);
            
            return parent::processaDadosUorg($codigo, $dados);
            
        } catch (\Exception $e) {
            if (isset($responseXml)) {
                $this->schemaMonitor->monitorXml('dados_uorg_error', $responseXml);
            }
            throw $e;
        }
    }
}
```

### 6. Notification para Alertas

```php
<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SiapeSchemaChangeNotification extends Notification
{
    public function __construct(
        private string $operation,
        private string $severity,
        private array $changes
    ) {}
    
    public function via($notifiable): array
    {
        return ['mail'];
    }
    
    public function toMail($notifiable): MailMessage
    {
        $subject = "SIAPE Schema Change Detected - {$this->severity}";
        
        $message = (new MailMessage)
            ->subject($subject)
            ->line("Uma mudança no schema XML do SIAPE foi detectada.")
            ->line("**Operação:** {$this->operation}")
            ->line("**Severidade:** " . strtoupper($this->severity))
            ->line("**Número de mudanças:** " . count($this->changes));
        
        if ($this->severity === 'critical') {
            $message->error()
                ->line("⚠️ **ATENÇÃO: Mudança crítica detectada!**")
                ->line("Esta mudança pode quebrar o parser atual e requer ação imediata.");
        }
        
        $message->line("**Detalhes das mudanças:**");
        
        foreach ($this->changes as $change) {
            $changeText = $this->formatChange($change);
            $message->line("• {$changeText}");
        }
        
        $message->action('Ver Schemas no Sistema', url('/admin/siape/schemas'));
        
        return $message;
    }
    
    private function formatChange(array $change): string
    {
        switch ($change['type']) {
            case 'added':
                return "Campo adicionado: {$change['field']}";
            case 'removed':
                return "Campo removido: {$change['field']}";
            case 'modified':
                $mods = implode(', ', $change['modifications'] ?? []);
                return "Campo modificado: {$change['field']} ({$mods})";
            default:
                return "Mudança desconhecida em: {$change['field']}";
        }
    }
}
```

### 7. Command para Análise Manual

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Siape\Schema\SchemaStorage;
use App\Services\Siape\Schema\SchemaComparator;

class AnalyzeSiapeSchemas extends Command
{
    protected $signature = 'siape:analyze-schemas {operation} {--compare-all}';
    protected $description = 'Analisa schemas SIAPE salvos';
    
    public function handle(SchemaStorage $storage, SchemaComparator $comparator): void
    {
        $operation = $this->argument('operation');
        $schemas = $storage->getAllSchemas($operation);
        
        if (empty($schemas)) {
            $this->error("Nenhum schema encontrado para operação: {$operation}");
            return;
        }
        
        $this->info("Encontrados " . count($schemas) . " schemas para {$operation}");
        
        if ($this->option('compare-all')) {
            $this->compareAllSchemas($schemas, $comparator);
        } else {
            $this->showLatestSchema($schemas);
        }
    }
    
    private function compareAllSchemas(array $schemas, SchemaComparator $comparator): void
    {
        for ($i = 1; $i < count($schemas); $i++) {
            $oldSchema = $schemas[$i - 1];
            $newSchema = $schemas[$i];
            
            $comparison = $comparator->compareSchemas(
                $oldSchema['schema'],
                $newSchema['schema']
            );
            
            if ($comparison['is_different']) {
                $this->warn("Mudança detectada entre {$oldSchema['timestamp']} e {$newSchema['timestamp']}");
                $this->line("Severidade: {$comparison['severity']}");
                $this->line("Mudanças: " . count($comparison['changes']));
                
                foreach ($comparison['changes'] as $change) {
                    $this->line("  • {$change['type']}: {$change['field']}");
                }
                $this->line('');
            }
        }
    }
    
    private function showLatestSchema(array $schemas): void
    {
        $latest = end($schemas);
        $this->info("Schema mais recente: {$latest['timestamp']}");
        $this->info("Hash: {$latest['hash']}");
        $this->line(json_encode($latest['schema'], JSON_PRETTY_PRINT));
    }
}
```

### 8. Configuração

```php
// config/siape.php
return [
    'schema_monitoring' => [
        'enabled' => env('SIAPE_SCHEMA_MONITORING', true),
        'storage_path' => 'siape/schemas',
        'recipients' => [
            'dev-team@example.com',
            'siape-admin@example.com'
        ],
        'alert_severities' => ['critical', 'medium']
    ]
];
```

## Uso do Sistema

### 1. Monitoramento Automático
O sistema monitora automaticamente todos os XMLs processados e detecta mudanças estruturais.

### 2. Alertas por Email
Quando mudanças críticas são detectadas, alertas são enviados automaticamente.

### 3. Análise Manual
```bash
# Ver schemas de uma operação
php artisan siape:analyze-schemas dados_pessoais

# Comparar todos os schemas
php artisan siape:analyze-schemas dados_pessoais --compare-all
```

### 4. Métricas
O sistema registra métricas que podem ser visualizadas em dashboards de monitoramento.

## Benefícios

1. **Detecção Proativa**: Identifica mudanças antes que quebrem o sistema
2. **Alertas Inteligentes**: Notifica apenas mudanças relevantes
3. **Histórico Completo**: Mantém histórico de todas as mudanças
4. **Análise de Impacto**: Classifica severidade das mudanças
5. **Facilita Manutenção**: Ajuda a criar novos parsers quando necessário