# Guia de Migração para Amazon RDS MySQL - Petrvs PGD

## Problemas Identificados e Soluções

### 1. Stored Procedures e Functions

#### Problema
O sistema utiliza stored procedures e functions que podem requerer privilégios SUPER no MySQL tradicional, mas o RDS MySQL não permite esses privilégios.

#### Functions Identificadas
- `fn_obter_unidade_hierarquia` - Function para hierarquia de unidades
- `GETUUID` - Function para geração de UUID (já comentada)
- Múltiplas procedures de sequência (`sequence_*`)

#### Solução
**Configurar Parameter Group no RDS:**
```sql
-- No Parameter Group do RDS, definir:
log_bin_trust_function_creators = 1
```

**Alternativa - Refatorar Functions:**
```php
// Substituir function fn_obter_unidade_hierarquia por método PHP
class UnidadeService {
    public function obterHierarquia($unidadeId) {
        $hierarquia = [];
        $unidade = Unidade::find($unidadeId);
        
        while ($unidade) {
            array_unshift($hierarquia, $unidade->sigla);
            $unidade = $unidade->unidadePai;
        }
        
        return implode('/', $hierarquia);
    }
}
```

### 2. Views Complexas

#### Problema
Views que utilizam functions podem falhar se as functions não estiverem disponíveis.

#### Views Identificadas
- `view_api_pgd`
- `view_relatorio_plano_trabalho` (usa `fn_obter_unidade_hierarquia`)

#### Solução
```sql
-- Recriar view sem function
CREATE OR REPLACE VIEW view_relatorio_plano_trabalho AS
SELECT 
    pt.id,
    pt.numero,
    pt.status,
    CAST(pt.data_inicio AS DATE) AS dataInicio,
    CAST(pt.data_fim AS DATE) AS dataFim,
    pt.unidade_id,
    usu.nome AS participanteNome,
    -- Substituir function por subquery
    (SELECT GROUP_CONCAT(u2.sigla ORDER BY nivel DESC SEPARATOR '/')
     FROM (
         WITH RECURSIVE ancestrais AS (
             SELECT id, sigla, unidade_pai_id, 1 AS nivel
             FROM unidades WHERE id = pt.unidade_id
             UNION ALL
             SELECT u.id, u.sigla, u.unidade_pai_id, a.nivel + 1
             FROM unidades u
             JOIN ancestrais a ON u.id = a.unidade_pai_id
             WHERE u.unidade_pai_id IS NOT NULL
         )
         SELECT sigla, nivel FROM ancestrais
     ) u2
    ) AS unidadeHierarquia,
    uni.sigla AS unidadeSigla,
    pt.tipo_modalidade_id,
    tm.nome AS tipoModalidadeNome
FROM planos_trabalhos pt
JOIN usuarios usu ON usu.id = pt.usuario_id
JOIN unidades uni ON uni.id = pt.unidade_id
JOIN tipos_modalidades tm ON tm.id = pt.tipo_modalidade_id
WHERE pt.deleted_at IS NULL;
```

### 3. Configurações MySQL Específicas

#### Problema
Configurações do `my.cnf` podem não ser aplicáveis no RDS.

#### Configurações Atuais
```ini
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci
max_allowed_packet=64M
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
```

#### Solução RDS
```bash
# Configurar via Parameter Group:
# - character_set_server = utf8mb4
# - collation_server = utf8mb4_general_ci  
# - max_allowed_packet = 67108864 (64MB)
# - slow_query_log = 1
# - long_query_time = 1.0
```

### 4. Configuração de Conexão

#### Problema
Configurações de conexão precisam ser ajustadas para RDS.

#### Solução
```php
// config/database.php - Configuração para RDS
'mysql' => [
    'driver' => 'mysql',
    'url' => env('DATABASE_URL'),
    'host' => env('DB_HOST', 'petrvs-rds.cluster-xxxxx.us-east-1.rds.amazonaws.com'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'petrvs'),
    'username' => env('DB_USERNAME', 'admin'),
    'password' => env('DB_PASSWORD', ''),
    'unix_socket' => env('DB_SOCKET', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    'strict' => true,
    'engine' => null,
    'options' => extension_loaded('pdo_mysql') ? array_filter([
        PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        PDO::ATTR_PERSISTENT => false, // Desabilitar para RDS
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ]) : [],
],
```

### 5. Variáveis de Ambiente

#### Ajustes Necessários
```bash
# .env para RDS
DB_CONNECTION=mysql
DB_HOST=petrvs-rds.cluster-xxxxx.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=petrvs
DB_USERNAME=admin
DB_PASSWORD=sua_senha_segura

# Para SSL (recomendado)
MYSQL_ATTR_SSL_CA=/path/to/rds-ca-2019-root.pem
```

### 6. Migrations Problemáticas

#### Functions que Podem Falhar
```php
// 2022_11_20_100816_function_getuuid.php
// Já está comentada devido a privilégios

// 2025_06_10_163440_add-fn-unidade-hierarquia.php  
// Pode falhar sem log_bin_trust_function_creators = 1
```

#### Solução
```php
// Modificar migration para verificar RDS
public function up(): void
{
    // Verificar se é RDS
    $isRDS = str_contains(config('database.connections.mysql.host'), 'rds.amazonaws.com');
    
    if (!$isRDS) {
        DB::statement(<<<EOD
            CREATE FUNCTION `fn_obter_unidade_hierarquia`...
        EOD);
    } else {
        // Log que function não foi criada no RDS
        Log::info('Function fn_obter_unidade_hierarquia não criada - ambiente RDS');
    }
}
```

## Checklist de Migração

### Pré-Migração
- [ ] Criar Parameter Group com `log_bin_trust_function_creators = 1`
- [ ] Configurar charset e collation adequados
- [ ] Definir `max_allowed_packet = 64MB`
- [ ] Habilitar slow query log se necessário

### Durante Migração
- [ ] Exportar dados do container MySQL
- [ ] Criar instância RDS com Parameter Group configurado
- [ ] Importar dados para RDS
- [ ] Testar stored procedures e functions
- [ ] Verificar views que dependem de functions

### Pós-Migração
- [ ] Atualizar configurações de conexão
- [ ] Testar funcionalidades críticas
- [ ] Monitorar logs de erro
- [ ] Verificar performance das queries
- [ ] Configurar backups automáticos

### Testes Críticos
- [ ] Hierarquia de unidades (view_relatorio_plano_trabalho)
- [ ] Procedures de sequência automática
- [ ] Views da API PGD
- [ ] Relatórios que usam views complexas

## Alternativas de Implementação

### 1. Substituir Functions por Eloquent
```php
// Em vez de function SQL, usar Eloquent com closures
$planosTrabalho = PlanoTrabalho::with(['unidade' => function($query) {
    $query->with('ancestrais');
}])->get()->map(function($plano) {
    $plano->unidadeHierarquia = $plano->unidade->obterHierarquia();
    return $plano;
});
```

### 2. Cache de Hierarquias
```php
// Cache das hierarquias para performance
class UnidadeService {
    public function obterHierarquiaComCache($unidadeId) {
        return Cache::remember("hierarquia_unidade_{$unidadeId}", 3600, function() use ($unidadeId) {
            return $this->obterHierarquia($unidadeId);
        });
    }
}
```

### 3. Materialized Views Simuladas
```php
// Criar tabela para simular materialized view
Schema::create('view_relatorio_plano_trabalho_cache', function (Blueprint $table) {
    $table->id();
    $table->uuid('plano_trabalho_id');
    $table->string('unidade_hierarquia');
    $table->timestamps();
    
    $table->index('plano_trabalho_id');
});
```

## Monitoramento Pós-Migração

### Queries a Monitorar
```sql
-- Verificar se functions existem
SELECT ROUTINE_NAME, ROUTINE_TYPE 
FROM INFORMATION_SCHEMA.ROUTINES 
WHERE ROUTINE_SCHEMA = 'petrvs';

-- Verificar views
SELECT TABLE_NAME, VIEW_DEFINITION 
FROM INFORMATION_SCHEMA.VIEWS 
WHERE TABLE_SCHEMA = 'petrvs';

-- Monitorar slow queries
SELECT * FROM mysql.slow_log 
WHERE start_time > DATE_SUB(NOW(), INTERVAL 1 HOUR);
```

### Alertas Recomendados
- Falhas em stored procedures
- Queries com tempo > 2 segundos
- Conexões rejeitadas
- Uso de CPU > 80%
- Uso de memória > 85%