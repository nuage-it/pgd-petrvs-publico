#!/usr/bin/env php
<?php

declare(strict_types=1);

/**
 * Mock SIAPE - E2E Test Runner
 *
 * Usage:
 *   php tests/run-e2e.php [--verbose] [--url=http://localhost:8080]
 *
 * Requirements:
 *   - Mock server running (php -S localhost:8080 -t public)
 *   - SQLite database with seeded data
 *
 * Example:
 *   # Terminal 1: Start the server
 *   cd external/mock-siape
 *   php -S localhost:8080 -t public
 *
 *   # Terminal 2: Run tests
 *   php tests/run-e2e.php
 */

require_once __DIR__ . '/bootstrap.php';

use MockSiape\Tests\E2E\SoapFlowTest;

// Parse command line arguments
$options = getopt('v', ['verbose', 'url::', 'help']);

if (isset($options['help'])) {
    echo <<<HELP
Mock SIAPE - E2E Test Runner

Usage:
  php tests/run-e2e.php [options]

Options:
  -v, --verbose    Show detailed output
  --url=URL        Mock server URL (default: http://localhost:8080)
  --help           Show this help message

Examples:
  php tests/run-e2e.php
  php tests/run-e2e.php --verbose
  php tests/run-e2e.php --url=http://localhost:9000

HELP;
    exit(0);
}

$verbose = isset($options['v']) || isset($options['verbose']);
$baseUrl = $options['url'] ?? 'http://localhost:8080';

// Check if server is running
$ch = curl_init($baseUrl . '/health');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

if ($httpCode !== 200) {
    echo "\n";
    echo "ERROR: Mock SIAPE server is not running at {$baseUrl}\n";
    echo "\n";
    echo "Please start the server first:\n";
    echo "  cd external/mock-siape\n";
    echo "  php -S localhost:8080 -t public\n";
    echo "\n";
    if ($error) {
        echo "Connection error: {$error}\n";
    }
    exit(1);
}

// Run tests
$tester = new SoapFlowTest($baseUrl, $verbose);
$results = $tester->runAll();

// Exit with appropriate code
exit($results['failed'] > 0 ? 1 : 0);
