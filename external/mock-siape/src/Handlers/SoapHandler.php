<?php

declare(strict_types=1);

namespace MockSiape\Handlers;

use MockSiape\Operations\ConsultaDadosFuncionaisOperation;
use MockSiape\Operations\ConsultaDadosPessoaisOperation;
use MockSiape\Operations\DadosUorgOperation;
use MockSiape\Operations\ListaServidoresOperation;
use MockSiape\Operations\ListaUorgsOperation;
use MockSiape\Utils\Validator;
use MockSiape\Xml\XmlBuilder;
use MockSiape\Xml\XmlParser;

/**
 * SOAP Handler for SIAPE operations.
 *
 * Routes SOAP requests to the appropriate operation handlers.
 */
class SoapHandler
{
    private const OPERATIONS = [
        'listaUorgs' => ListaUorgsOperation::class,
        'dadosUorg' => DadosUorgOperation::class,
        'listaServidores' => ListaServidoresOperation::class,
        'consultaDadosFuncionais' => ConsultaDadosFuncionaisOperation::class,
        'consultaDadosPessoais' => ConsultaDadosPessoaisOperation::class,
    ];

    public function handle(): void
    {
        // Set response headers
        header('Content-Type: text/xml; charset=utf-8');

        // Only accept POST requests
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->sendError(405, 'Method not allowed');
            return;
        }

        // Validate Authorization header (optional in mock mode)
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!Validator::validateToken($authHeader)) {
            // In mock mode, we'll accept requests without token but log a warning
            error_log('Mock SIAPE: Request without valid authorization token');
        }

        // Get raw XML body
        $rawBody = file_get_contents('php://input');

        if (empty($rawBody)) {
            $this->sendSoapFault('Client', 'Empty request body');
            return;
        }

        try {
            $parser = new XmlParser($rawBody);
            $operation = $parser->getOperation();

            if ($operation === null) {
                $this->sendSoapFault('Client', 'Could not determine SOAP operation');
                return;
            }

            if (!isset(self::OPERATIONS[$operation])) {
                $this->sendSoapFault('Client', "Unknown operation: {$operation}");
                return;
            }

            $operationClass = self::OPERATIONS[$operation];
            $handler = new $operationClass($parser);
            $response = $handler->execute();

            echo $response;
        } catch (\Exception $e) {
            error_log("Mock SIAPE Error: " . $e->getMessage());
            $this->sendSoapFault('Server', 'Internal server error: ' . $e->getMessage());
        }
    }

    private function sendError(int $statusCode, string $message): void
    {
        http_response_code($statusCode);
        $builder = new XmlBuilder();
        echo $builder->buildFault('HTTP', $message);
    }

    private function sendSoapFault(string $code, string $message): void
    {
        http_response_code(500);
        $builder = new XmlBuilder();
        echo $builder->buildFault($code, $message);
    }
}
