<?php
/**
 * Script para buscar dados de órgãos e unidades da API SIORG
 *
 * Uso: php fetch-siorg-data.php
 *
 * Salva os dados em data/temp/ para posterior processamento
 */

// Configuração
$baseUrl = 'https://estruturaorganizacional.dados.gov.br/doc';
$tempDir = __DIR__ . '/../data/temp';

// Órgãos a buscar (códigos SIORG)
$orgaos = [
    244 => 'MEC',      // Ministério da Educação
    304 => 'MS',       // Ministério da Saúde
    308800 => 'MF',    // Ministério da Fazenda
    308803 => 'MGI',   // Ministério da Gestão e da Inovação
];

/**
 * Faz requisição HTTP GET
 */
function httpGet(string $url): ?array {
    echo "  Buscando: $url\n";

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 120,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'User-Agent: PETRVS-Mock-SIAPE/1.0'
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    // curl_close() removido - deprecated no PHP 8.5, sem efeito desde PHP 8.0

    if ($error) {
        echo "  ERRO: $error\n";
        return null;
    }

    if ($httpCode !== 200) {
        echo "  ERRO HTTP: $httpCode\n";
        return null;
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "  ERRO JSON: " . json_last_error_msg() . "\n";
        return null;
    }

    return $data;
}

/**
 * Busca unidades de um órgão específico
 */
function buscarUnidadesOrgao(string $baseUrl, int $codigoOrgao, string $sigla): ?array {
    echo "\n=== Buscando unidades do órgão: $sigla (código: $codigoOrgao) ===\n";

    $url = "$baseUrl/estrutura-organizacional/completa?codigoUnidade=$codigoOrgao&retornarOrgaoEntidadeVinculados=NAO";
    $data = httpGet($url);

    if (!$data) {
        return null;
    }

    if (isset($data['servico']['codigoErro']) && $data['servico']['codigoErro'] !== 0) {
        echo "  ERRO SIORG: " . ($data['servico']['mensagem'] ?? 'Erro desconhecido') . "\n";
        return null;
    }

    $unidades = $data['unidades'] ?? [];
    echo "  Encontradas " . count($unidades) . " unidades\n";

    return $unidades;
}

/**
 * Extrai o código numérico de uma URL SIORG
 */
function extrairCodigo(?string $url): ?string {
    if (!$url) return null;
    $parts = explode('/', $url);
    return end($parts) ?: null;
}

/**
 * Processa e normaliza dados das unidades
 */
function processarUnidades(array $unidades, string $siglaOrgao): array {
    $processed = [];

    foreach ($unidades as $u) {
        $processed[] = [
            'codigoUnidade' => extrairCodigo($u['codigoUnidade'] ?? null),
            'codigoUnidadePai' => extrairCodigo($u['codigoUnidadePai'] ?? null),
            'codigoOrgaoEntidade' => extrairCodigo($u['codigoOrgaoEntidade'] ?? null),
            'nome' => $u['nome'] ?? '',
            'sigla' => $u['sigla'] ?? '',
            'siglaOrgao' => $siglaOrgao,
            'tipoUnidade' => extrairCodigo($u['codigoTipoUnidade'] ?? null),
            'nivelNormatizacao' => $u['nivelNormatizacao'] ?? null,
            // Dados de endereço (se disponível na API completa)
            'municipio' => $u['municipio'] ?? null,
            'uf' => $u['uf'] ?? null,
            'cep' => $u['cep'] ?? null,
            'logradouro' => $u['logradouro'] ?? null,
            'bairro' => $u['bairro'] ?? null,
            'telefone' => $u['telefone'] ?? null,
            'email' => $u['email'] ?? null,
            // Dados complementares
            'versaoConsulta' => $u['versaoConsulta'] ?? null,
            'dataInicialVersaoConsulta' => $u['dataInicialVersaoConsulta'] ?? null,
        ];
    }

    return $processed;
}

// ============================================================================
// EXECUÇÃO PRINCIPAL
// ============================================================================

echo "=======================================================\n";
echo "SIORG Data Fetcher - Mock-SIAPE Seed Generator\n";
echo "=======================================================\n";
echo "Data: " . date('Y-m-d H:i:s') . "\n";
echo "Diretório temp: $tempDir\n";

// Garantir que o diretório existe
if (!is_dir($tempDir)) {
    mkdir($tempDir, 0755, true);
    echo "Diretório temp criado.\n";
}

$todosOrgaos = [];
$todasUnidades = [];

foreach ($orgaos as $codigo => $sigla) {
    $unidades = buscarUnidadesOrgao($baseUrl, $codigo, $sigla);

    if ($unidades) {
        $processed = processarUnidades($unidades, $sigla);
        $todasUnidades = array_merge($todasUnidades, $processed);

        // Identificar o órgão principal
        foreach ($processed as $u) {
            if ($u['codigoUnidade'] === (string)$codigo) {
                $todosOrgaos[] = $u;
                break;
            }
        }
    }

    // Pequena pausa para não sobrecarregar a API
    sleep(1);
}

// Salvar dados
echo "\n=== Salvando dados ===\n";

// Salvar órgãos
$orgaosFile = "$tempDir/orgaos.json";
file_put_contents($orgaosFile, json_encode($todosOrgaos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Órgãos salvos em: $orgaosFile (" . count($todosOrgaos) . " registros)\n";

// Salvar unidades
$unidadesFile = "$tempDir/unidades.json";
file_put_contents($unidadesFile, json_encode($todasUnidades, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Unidades salvas em: $unidadesFile (" . count($todasUnidades) . " registros)\n";

// Resumo
echo "\n=== RESUMO ===\n";
echo "Total de órgãos: " . count($todosOrgaos) . "\n";
echo "Total de unidades: " . count($todasUnidades) . "\n";
echo "\nPróximo passo: php scripts/generate-seed.php\n";
