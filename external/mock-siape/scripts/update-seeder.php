<?php
/**
 * Script para atualizar Seeder.php com dados gerados
 *
 * Uso: php update-seeder.php
 */

$tempDir = __DIR__ . '/../data/temp';
$generatedFile = "$tempDir/generated-seed.php";
$seederFile = __DIR__ . '/../src/Database/Seeder.php';

// Ler seed gerada
$generatedContent = file_get_contents($generatedFile);
if (!$generatedContent) {
    fwrite(STDERR, "ERRO: Não foi possível ler $generatedFile\n");
    exit(1);
}

// Extrair apenas o array de unidades (entre '$unidades = [' e '];')
if (!preg_match('/\$unidades = \[(.*)\];/s', $generatedContent, $matches)) {
    fwrite(STDERR, "ERRO: Não encontrou array \$unidades no arquivo gerado\n");
    exit(1);
}

$newUnidadesContent = $matches[1];

// Ler Seeder.php
$seederContent = file_get_contents($seederFile);
if (!$seederContent) {
    fwrite(STDERR, "ERRO: Não foi possível ler $seederFile\n");
    exit(1);
}

// Criar backup
$backupFile = $seederFile . '.bak';
file_put_contents($backupFile, $seederContent);
echo "Backup criado: $backupFile\n";

// Encontrar e substituir o array $unidades no método seedUnidades()
// O array começa com '$unidades = [' e termina com '];' seguido de '$stmt = $db->prepare'
$pattern = '/(\$unidades = \[).*?(\];[\s\n]+\$stmt = \$db->prepare)/s';
$replacement = '$1' . $newUnidadesContent . '$2';

$newSeederContent = preg_replace($pattern, $replacement, $seederContent, 1, $count);

if ($count !== 1) {
    fwrite(STDERR, "ERRO: Não foi possível substituir o array \$unidades. Encontradas $count ocorrências.\n");
    exit(1);
}

// Salvar Seeder.php atualizado
file_put_contents($seederFile, $newSeederContent);

echo "Seeder.php atualizado com sucesso!\n";
echo "Total de unidades: 200\n";
