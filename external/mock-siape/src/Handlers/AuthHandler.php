<?php

declare(strict_types=1);

namespace MockSiape\Handlers;

use MockSiape\Database\Database;

/**
 * OAuth2 Authentication Handler.
 *
 * Simulates the ConectaGov OAuth2 token endpoint.
 * Always returns a valid token for testing purposes.
 */
class AuthHandler
{
    public function handle(): void
    {
        // Set response headers
        header('Content-Type: application/json; charset=utf-8');

        // Only accept POST requests
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError(405, 'Method not allowed');
            return;
        }

        // Parse request body
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        if (str_contains($contentType, 'application/x-www-form-urlencoded')) {
            $grantType = $_POST['grant_type'] ?? '';
            $clientId = $_POST['client_id'] ?? '';
            $clientSecret = $_POST['client_secret'] ?? '';
        } elseif (str_contains($contentType, 'application/json')) {
            $body = json_decode(file_get_contents('php://input'), true) ?? [];
            $grantType = $body['grant_type'] ?? '';
            $clientId = $body['client_id'] ?? '';
            $clientSecret = $body['client_secret'] ?? '';
        } else {
            // Try to parse from raw input
            parse_str(file_get_contents('php://input'), $params);
            $grantType = $params['grant_type'] ?? '';
            $clientId = $params['client_id'] ?? '';
            $clientSecret = $params['client_secret'] ?? '';
        }

        // Check Authorization header (Basic auth)
        if (empty($clientId) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $auth = $_SERVER['HTTP_AUTHORIZATION'];
            if (str_starts_with($auth, 'Basic ')) {
                $decoded = base64_decode(substr($auth, 6));
                if ($decoded !== false && str_contains($decoded, ':')) {
                    [$clientId, $clientSecret] = explode(':', $decoded, 2);
                }
            }
        }

        // Validate grant_type
        if ($grantType !== 'client_credentials') {
            $this->sendError(400, 'unsupported_grant_type', 'Only client_credentials grant type is supported');
            return;
        }

        // Generate mock token (always success in mock mode)
        $token = $this->generateToken($clientId);

        // Store token in database
        $this->storeToken($token, $clientId);

        // Return successful response
        $response = [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => MOCK_OAUTH_TOKEN_LIFETIME,
            'scope' => 'siape',
        ];

        echo json_encode($response);
    }

    private function generateToken(string $clientId): string
    {
        // Generate a mock JWT-like token
        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode([
            'sub' => $clientId,
            'iat' => time(),
            'exp' => time() + MOCK_OAUTH_TOKEN_LIFETIME,
            'iss' => 'mock-siape',
            'scope' => 'siape',
        ]));
        $signature = base64_encode(hash_hmac('sha256', "{$header}.{$payload}", 'mock-secret', true));

        return "{$header}.{$payload}.{$signature}";
    }

    private function storeToken(string $token, string $clientId): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare("
            INSERT INTO tokens (access_token, client_id, expires_at)
            VALUES (:token, :client_id, datetime('now', '+' || :lifetime || ' seconds'))
        ");
        $stmt->execute([
            'token' => $token,
            'client_id' => $clientId,
            'lifetime' => MOCK_OAUTH_TOKEN_LIFETIME,
        ]);
    }

    private function sendError(int $statusCode, string $error, string $description = ''): void
    {
        http_response_code($statusCode);

        $response = ['error' => $error];
        if ($description) {
            $response['error_description'] = $description;
        }

        echo json_encode($response);
    }
}
