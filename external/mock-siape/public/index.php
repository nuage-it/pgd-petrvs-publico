<?php

declare(strict_types=1);

/**
 * Mock SIAPE - Entry Point
 *
 * Routes incoming requests to the appropriate handlers.
 *
 * Usage:
 *   php -S localhost:8080 -t public
 *
 * Endpoints:
 *   POST /oauth2/jwt-token                     - OAuth2 token endpoint
 *   POST /api-consulta-siape/v1/consulta-siape - SOAP endpoint
 */

require_once __DIR__ . '/../bootstrap.php';

use MockSiape\Handlers\AuthHandler;
use MockSiape\Handlers\SoapHandler;

// Get request URI without query string
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple router
switch (true) {
    // OAuth2 token endpoint
    case $uri === '/oauth2/jwt-token':
    case $uri === MOCK_OAUTH_PATH:
        $handler = new AuthHandler();
        $handler->handle();
        break;

    // SOAP endpoint
    case $uri === '/api-consulta-siape/v1/consulta-siape':
    case $uri === MOCK_SOAP_PATH:
        $handler = new SoapHandler();
        $handler->handle();
        break;

    // Health check
    case $uri === '/health':
    case $uri === '/':
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'ok',
            'service' => 'mock-siape',
            'version' => '1.0.0',
            'endpoints' => [
                'oauth' => MOCK_OAUTH_PATH,
                'soap' => MOCK_SOAP_PATH,
            ],
        ]);
        break;

    // 404 for unknown routes
    default:
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'Not found',
            'path' => $uri,
            'available_endpoints' => [
                'POST ' . MOCK_OAUTH_PATH,
                'POST ' . MOCK_SOAP_PATH,
                'GET /health',
            ],
        ]);
        break;
}
