<?php

declare(strict_types=1);

/**
 * Mock SIAPE - Bootstrap
 *
 * Autoload and initialization for the Mock SIAPE service.
 */

define('MOCK_SIAPE_ROOT', __DIR__);
define('MOCK_SIAPE_DATA', __DIR__ . '/data');

// Simple PSR-4 autoloader
spl_autoload_register(function (string $class): void {
    $prefix = 'MockSiape\\';
    $baseDir = __DIR__ . '/src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// Load configuration
require_once __DIR__ . '/src/Config/config.php';
require_once __DIR__ . '/src/Config/namespaces.php';

// Initialize database on first run
$dbPath = MOCK_SIAPE_DATA . '/siape.sqlite';
if (!file_exists($dbPath)) {
    $schema = new \MockSiape\Database\Schema();
    $schema->create();

    $seeder = new \MockSiape\Database\Seeder();
    $seeder->run();
}
