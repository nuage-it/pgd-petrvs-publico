<?php

declare(strict_types=1);

namespace MockSiape\Utils;

use MockSiape\Database\Database;

/**
 * Utility class for validating credentials and tokens.
 */
class Validator
{
    /**
     * Validate an OAuth2 Bearer token.
     *
     * In mock mode, this always returns true if a token is present.
     */
    public static function validateToken(?string $authHeader): bool
    {
        if ($authHeader === null) {
            return false;
        }

        // Check Bearer prefix
        if (!str_starts_with($authHeader, 'Bearer ')) {
            return false;
        }

        $token = substr($authHeader, 7);

        if (empty($token)) {
            return false;
        }

        // In mock mode, we accept any non-empty token
        // Optionally check against stored tokens for more realism
        $db = Database::getInstance();
        $stmt = $db->prepare("
            SELECT COUNT(*) as cnt
            FROM tokens
            WHERE access_token = :token
              AND expires_at > datetime('now')
        ");
        $stmt->execute(['token' => $token]);
        $result = $stmt->fetch();

        // Accept any token in mock mode, but log if not in database
        return true;
    }

    /**
     * Validate CPF format (11 digits).
     */
    public static function validateCpf(string $cpf): bool
    {
        return preg_match('/^\d{11}$/', $cpf) === 1;
    }

    /**
     * Validate UORG code format.
     */
    public static function validateCodUorg(string $codUorg): bool
    {
        return preg_match('/^\d+$/', $codUorg) === 1;
    }
}
