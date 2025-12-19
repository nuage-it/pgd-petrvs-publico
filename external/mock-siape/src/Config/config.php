<?php

declare(strict_types=1);

/**
 * Mock SIAPE - Configuration
 */

// OAuth2 mock credentials (always accepted)
define('MOCK_OAUTH_CLIENT_ID', 'mock_client');
define('MOCK_OAUTH_CLIENT_SECRET', 'mock_secret');
define('MOCK_OAUTH_TOKEN_LIFETIME', 3600);

// SIAPE mock credentials
define('MOCK_SIAPE_SIGLA_SISTEMA', 'PETRVS');
define('MOCK_SIAPE_NOME_SISTEMA', 'PETRVS-PGD');
define('MOCK_SIAPE_COD_ORGAO', '15000');

// SOAP endpoint path
define('MOCK_SOAP_PATH', '/api-consulta-siape/v1/consulta-siape');
define('MOCK_OAUTH_PATH', '/oauth2/jwt-token');
