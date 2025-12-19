<?php
/**
 * Script para gerar seed de unidades a partir dos dados SIORG
 *
 * Uso: php generate-seed.php > ../data/temp/generated-seed.php
 *
 * Lê dados de data/temp/unidades.json e gera PHP para o Seeder.php
 */

$tempDir = __DIR__ . '/../data/temp';
$unidadesFile = "$tempDir/unidades.json";
$orgaosFile = "$tempDir/orgaos.json";

// Limite de unidades por órgão (para não gerar seed muito grande)
$maxUnidadesPorOrgao = 50;

// Dados padrão do SIAPE que não vêm do SIORG
$defaultData = [
    'codUorgPagadora' => null,
    'codUorgPessoal' => '000001',
    'numero' => 'S/N',
    'complemento' => '',
    'codigoPais' => '076',
    'nomePais' => 'BRASIL',
    'indicadorUorgRegimenta' => 'N',
    'dataUltimaTransacao' => date('dmY'),
];

// Mapeamento de código de órgão SIORG para código SIAPE
$orgaoMapping = [
    '244' => ['codOrgao' => '25000', 'sigla' => 'MEC'],      // MEC
    '304' => ['codOrgao' => '36000', 'sigla' => 'MS'],       // MS
    '308800' => ['codOrgao' => '25000', 'sigla' => 'MF'],    // MF
    '308803' => ['codOrgao' => '47000', 'sigla' => 'MGI'],   // MGI
];

// Mapeamento de código de município para Brasília (padrão federal)
$defaultMunicipio = [
    'codMunicipio' => '9701',
    'nomeMunicipio' => 'BRASILIA',
    'siglaUfMunicipio' => 'DF',
];

/**
 * Converte data YYYY-MM-DD para DDMMYYYY
 */
function formatDate(?string $date): ?string {
    if (!$date) return null;
    $parts = explode('-', $date);
    if (count($parts) !== 3) return null;
    return $parts[2] . $parts[1] . $parts[0];
}

/**
 * Converte texto para uppercase e remove acentos
 */
function normalizeText(?string $text): string {
    if (!$text) return '';
    $text = mb_strtoupper($text, 'UTF-8');
    // Normaliza acentos
    $text = preg_replace(
        ['/[ÁÀÂÃ]/u', '/[ÉÊ]/u', '/[ÍÎ]/u', '/[ÓÔÕ]/u', '/[ÚÛ]/u', '/Ç/u'],
        ['A', 'E', 'I', 'O', 'U', 'C'],
        $text
    );
    return $text;
}

/**
 * Mapeia unidade SIORG para formato Mock-SIAPE
 */
function mapUnidade(array $u, array $orgaoMapping, array $defaultData, array $defaultMunicipio): array {
    $codigoOrgao = $u['codigoOrgaoEntidade'] ?? '';
    $orgaoInfo = $orgaoMapping[$codigoOrgao] ?? ['codOrgao' => $codigoOrgao, 'sigla' => $u['siglaOrgao'] ?? ''];

    $nome = normalizeText($u['nome'] ?? '');
    $sigla = normalizeText($u['sigla'] ?? '');

    return array_merge($defaultData, [
        'codUorg' => $u['codigoUnidade'] ?? '',
        'codUorgPai' => $u['codigoUnidadePai'] ?? '',
        'codUorgPagadora' => $u['codigoOrgaoEntidade'] ?? '',
        'codOrgao' => $orgaoInfo['codOrgao'],
        'nomeUorg' => $nome,
        'nomeExtendido' => $nome,
        'nomeUorgMaiusculo' => $nome,
        'siglaUorg' => $sigla,
        'siglaOrgao' => normalizeText($u['siglaOrgao'] ?? ''),
        'telefone' => $u['telefone'] ?? null,
        'email' => $u['email'] ?? null,
        'logradouro' => normalizeText($u['logradouro'] ?? ''),
        'bairro' => normalizeText($u['bairro'] ?? ''),
        'cep' => preg_replace('/\D/', '', $u['cep'] ?? ''),
        'codMunicipio' => $defaultMunicipio['codMunicipio'],
        'nomeMunicipio' => normalizeText($u['municipio'] ?? '') ?: $defaultMunicipio['nomeMunicipio'],
        'siglaUfMunicipio' => normalizeText($u['uf'] ?? '') ?: $defaultMunicipio['siglaUfMunicipio'],
        'codSiorg' => $u['codigoUnidade'] ?? '',
        'codSiorgOrgao' => $u['codigoOrgaoEntidade'] ?? '',
        'indicadorUorgRegimenta' => ($u['tipoUnidade'] === 'orgao') ? 'S' : 'N',
    ]);
}

/**
 * Gera código PHP para array de unidade
 */
function generatePhpArray(array $unidade): string {
    $lines = ["            ["];
    foreach ($unidade as $key => $value) {
        if ($value === null) {
            $val = 'null';
        } elseif (is_string($value)) {
            $val = "'" . addslashes($value) . "'";
        } else {
            $val = $value;
        }
        $lines[] = "                '$key' => $val,";
    }
    $lines[] = "            ],";
    return implode("\n", $lines);
}

// ============================================================================
// EXECUÇÃO PRINCIPAL
// ============================================================================

// Verificar arquivos
if (!file_exists($unidadesFile)) {
    fwrite(STDERR, "ERRO: Arquivo não encontrado: $unidadesFile\n");
    fwrite(STDERR, "Execute primeiro: php scripts/fetch-siorg-data.php\n");
    exit(1);
}

// Carregar unidades
$unidades = json_decode(file_get_contents($unidadesFile), true);
if (!$unidades) {
    fwrite(STDERR, "ERRO: Falha ao carregar unidades.json\n");
    exit(1);
}

fwrite(STDERR, "Carregadas " . count($unidades) . " unidades\n");

// Agrupar por órgão
$porOrgao = [];
foreach ($unidades as $u) {
    $orgao = $u['codigoOrgaoEntidade'] ?? 'unknown';
    if (!isset($porOrgao[$orgao])) {
        $porOrgao[$orgao] = [];
    }
    $porOrgao[$orgao][] = $u;
}

fwrite(STDERR, "Órgãos encontrados: " . implode(', ', array_keys($porOrgao)) . "\n");

// Selecionar unidades (limitado por órgão)
$selected = [];
foreach ($porOrgao as $orgao => $unidadesOrgao) {
    // Primeiro adiciona o órgão raiz (identifica por tipoUnidade ou codigoUnidade == codigoOrgaoEntidade)
    $orgaoRaiz = null;
    $outras = [];

    foreach ($unidadesOrgao as $u) {
        $isRaiz = ($u['tipoUnidade'] ?? '') === 'orgao' ||
                  ($u['codigoUnidade'] ?? '') === ($u['codigoOrgaoEntidade'] ?? '');
        if ($isRaiz && !$orgaoRaiz) {
            $orgaoRaiz = $u;
        } else {
            $outras[] = $u;
        }
    }

    if ($orgaoRaiz) {
        $selected[] = $orgaoRaiz;
        fwrite(STDERR, "    -> Órgão raiz encontrado: " . ($orgaoRaiz['nome'] ?? 'N/A') . "\n");
    }

    // Adiciona outras unidades até o limite
    $count = $orgaoRaiz ? 1 : 0;
    foreach ($outras as $u) {
        if ($count >= $maxUnidadesPorOrgao) break;
        $selected[] = $u;
        $count++;
    }

    fwrite(STDERR, "  $orgao: " . count($unidadesOrgao) . " total, $count selecionadas\n");
}

fwrite(STDERR, "Total selecionadas: " . count($selected) . "\n\n");

// Gerar output PHP
echo "<?php\n";
echo "/**\n";
echo " * Seed de unidades gerada automaticamente a partir de dados SIORG\n";
echo " * Gerado em: " . date('Y-m-d H:i:s') . "\n";
echo " * Total de unidades: " . count($selected) . "\n";
echo " */\n\n";
echo "\$unidades = [\n";

foreach ($selected as $u) {
    $mapped = mapUnidade($u, $orgaoMapping, $defaultData, $defaultMunicipio);
    echo generatePhpArray($mapped) . "\n";
}

echo "];\n";

fwrite(STDERR, "Seed gerada com sucesso!\n");
fwrite(STDERR, "Copie o conteúdo para Seeder.php ou use redirecionamento de output.\n");
