<?php

declare(strict_types=1);

/**
 * Mock SIAPE - Test Bootstrap
 */

require_once __DIR__ . '/../bootstrap.php';

// Autoload test classes
spl_autoload_register(function (string $class): void {
    $prefix = 'MockSiape\\Tests\\';
    $baseDir = __DIR__ . '/';

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
