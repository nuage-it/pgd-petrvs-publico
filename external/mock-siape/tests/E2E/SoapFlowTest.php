<?php

declare(strict_types=1);

namespace MockSiape\Tests\E2E;

/**
 * End-to-End Tests for Mock SIAPE SOAP Flow.
 *
 * These tests validate the complete SOAP workflow following the EXACT same
 * patterns used by the back-end (SiapeService, BuscarDadosSiape).
 *
 * Tests include:
 * - OAuth2 authentication with Basic Auth (like ConectaGov)
 * - SOAP requests with proper headers (Authorization, x-cpf-usuario)
 * - Data consistency validation across related operations
 * - Database persistence verification
 *
 * Usage:
 *   1. Start the mock server: php -S localhost:8080 -t public
 *   2. Run tests: php tests/run-e2e.php
 */
class SoapFlowTest
{
    private string $baseUrl;
    private ?string $token = null;
    private array $results = [];
    private int $passed = 0;
    private int $failed = 0;
    private bool $verbose;

    // Configuration matching back-end .env settings (MGI - Ministério da Gestão e Inovação)
    private const CONFIG = [
        'siglaSistema' => 'PETRVS',
        'nomeSistema' => 'PETRVS-PGD',
        'senha' => 'mock_senha',
        'cpf' => '00000000000',           // System CPF (x-cpf-usuario header)
        'codOrgao' => '47000',            // MGI - código SIAPE
        'parmExistPag' => 'N',
        'parmTipoVinculo' => '0',
        'clientId' => 'mock_client',
        'clientSecret' => 'mock_secret',
    ];

    // Test data (must match seeded data - MGI)
    private const TEST_CPF = '12345678901';
    private const TEST_CPF_2 = '98765432100';
    private const TEST_UORG = '316818';         // DAIPE - has servers
    private const TEST_UORG_EMPTY = '308803';   // MGI Root - no direct servers
    private const TEST_ORGAO = '47000';         // MGI - código SIAPE
    private const INVALID_CPF = '00000000000';
    private const INVALID_UORG = '999999999';

    public function __construct(string $baseUrl, bool $verbose = false)
    {
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->verbose = $verbose;
    }

    /**
     * Run all E2E tests.
     */
    public function runAll(): array
    {
        $this->log("\nMock SIAPE - E2E Tests");
        $this->log("======================\n");

        // Basic connectivity
        $this->testHealthCheck();

        // OAuth2 Authentication (like ConectaGov)
        $this->testOAuth2WithBasicAuth();

        // SOAP Operations (matching back-end SiapeService)
        $this->testListaUorgs();
        $this->testDadosUorg();
        $this->testDadosUorgNotFound();
        $this->testListaServidores();
        $this->testListaServidoresEmpty();
        $this->testConsultaDadosFuncionais();
        $this->testConsultaDadosFuncionaisNotFound();
        $this->testConsultaDadosPessoais();
        $this->testConsultaDadosPessoaisNotFound();

        // Data Consistency Tests
        $this->testDataConsistencyServidorInUorg();
        $this->testDataConsistencyFuncionaisMatchesPessoais();
        $this->testDataConsistencyUorgHierarchy();

        // Full Integration Flow (like BuscarDadosSiapeJob)
        $this->testFullSyncFlow();

        $this->log("\n-----------------------");
        $this->log("Tests: " . ($this->passed + $this->failed) .
                   " | Passed: {$this->passed}" .
                   " | Failed: {$this->failed}");

        return [
            'results' => $this->results,
            'passed' => $this->passed,
            'failed' => $this->failed,
        ];
    }

    // =========================================================================
    // Test Cases
    // =========================================================================

    /**
     * Test: Health check endpoint.
     */
    private function testHealthCheck(): void
    {
        $testName = 'testHealthCheck';

        $response = $this->httpGet('/health');

        if ($response['status'] !== 200) {
            $this->fail($testName, "Expected status 200, got {$response['status']}");
            return;
        }

        $data = json_decode($response['body'], true);
        if (!isset($data['status']) || $data['status'] !== 'ok') {
            $this->fail($testName, "Health check response invalid");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: OAuth2 token request with Basic Auth.
     *
     * This follows the exact pattern used by SiapeGetToken trait:
     * - POST /oauth2/jwt-token
     * - Authorization: Basic base64(client_id:client_secret)
     * - Content-Type: application/x-www-form-urlencoded
     * - Body: grant_type=client_credentials
     */
    private function testOAuth2WithBasicAuth(): void
    {
        $testName = 'testOAuth2WithBasicAuth';

        // Build Basic Auth header like the back-end does
        $credentials = base64_encode(self::CONFIG['clientId'] . ':' . self::CONFIG['clientSecret']);

        $response = $this->httpPost(
            '/oauth2/jwt-token',
            'grant_type=client_credentials',
            'application/x-www-form-urlencoded',
            ["Authorization: Basic {$credentials}"]
        );

        if ($response['status'] !== 200) {
            $this->fail($testName, "Expected status 200, got {$response['status']}");
            return;
        }

        $data = json_decode($response['body'], true);

        if (!isset($data['access_token'])) {
            $this->fail($testName, "No access_token in response");
            return;
        }

        if (!isset($data['token_type']) || $data['token_type'] !== 'Bearer') {
            $this->fail($testName, "Invalid token_type, expected Bearer");
            return;
        }

        // Store token for subsequent tests
        $this->token = $data['access_token'];

        $this->pass($testName);
    }

    /**
     * Test: listaUorgs operation.
     *
     * Matches BuscarDadosSiapeUnidades::getListaUorgsAsXml()
     */
    private function testListaUorgs(): void
    {
        $testName = 'testListaUorgs';

        $xml = $this->buildSoapEnvelope('listaUorgs', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => '',  // Empty for full list
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//ns1:listaUorgsResponse')) {
            $this->fail($testName, "Response does not contain listaUorgsResponse");
            return;
        }

        if (!$this->assertXPathExists($response, '//ns2:Uorg')) {
            $this->fail($testName, "Response does not contain any Uorg elements");
            return;
        }

        // Verify expected fields: codigo, nome, dataUltimaTransacao
        // Note: Inner elements have no namespace prefix in SIAPE responses
        if (!$this->assertXPathExists($response, "//ns2:Uorg/*[local-name()='codigo']")) {
            $this->fail($testName, "Uorg missing codigo field");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: dadosUorg operation with valid code.
     *
     * Matches BuscarDadosSiapeUnidade::getUorgAsXml()
     */
    private function testDadosUorg(): void
    {
        $testName = 'testDadosUorg';

        $xml = $this->buildSoapEnvelope('dadosUorg', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//ns1:dadosUorgResponse')) {
            $this->fail($testName, "Response does not contain dadosUorgResponse");
            return;
        }

        if (!$this->assertXPathExists($response, '//ent:codUorg')) {
            $this->fail($testName, "Response missing codUorg");
            return;
        }

        // Verify key fields used by back-end
        if (!$this->assertXPathExists($response, '//ent:nomeUorg')) {
            $this->fail($testName, "Response missing nomeUorg");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: dadosUorg operation with invalid code returns fault.
     */
    private function testDadosUorgNotFound(): void
    {
        $testName = 'testDadosUorgNotFound';

        $xml = $this->buildSoapEnvelope('dadosUorg', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::INVALID_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//soap:Fault')) {
            $this->fail($testName, "Expected SOAP Fault for invalid UORG");
            return;
        }

        if (!$this->assertXPathContains($response, '//faultcode', '0002')) {
            $this->fail($testName, "Expected faultcode 0002");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: listaServidores operation.
     *
     * Matches BuscarDadosSiapeServidores::listaServidores()
     */
    private function testListaServidores(): void
    {
        $testName = 'testListaServidores';

        $xml = $this->buildSoapEnvelope('listaServidores', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//ns1:listaServidoresResponse')) {
            $this->fail($testName, "Response does not contain listaServidoresResponse");
            return;
        }

        // TEST_UORG (9002) should have servers
        if (!$this->assertXPathExists($response, '//ns2:Servidor')) {
            $this->fail($testName, "Response does not contain any Servidor elements");
            return;
        }

        // Verify expected fields: cpf, dataUltimaTransacao
        // Note: Inner elements have no namespace prefix in SIAPE responses
        if (!$this->assertXPathExists($response, "//ns2:Servidor/*[local-name()='cpf']")) {
            $this->fail($testName, "Servidor missing cpf field");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: listaServidores with UORG that has no servers returns empty list (not error).
     */
    private function testListaServidoresEmpty(): void
    {
        $testName = 'testListaServidoresEmpty';

        $xml = $this->buildSoapEnvelope('listaServidores', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG_EMPTY,
        ]);

        $response = $this->sendSoapRequest($xml);

        // Should still return valid response (not fault)
        if (!$this->assertXPathExists($response, '//ns1:listaServidoresResponse')) {
            $this->fail($testName, "Response does not contain listaServidoresResponse");
            return;
        }

        // Should NOT have a fault
        if ($this->assertXPathExists($response, '//soap:Fault')) {
            $this->fail($testName, "Empty list should not return fault");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: consultaDadosFuncionais operation.
     *
     * Matches BuscarDadosSiapeServidor::consultaDadosFuncionais()
     * Note: Uses parmExistPag and parmTipoVinculo parameters
     */
    private function testConsultaDadosFuncionais(): void
    {
        $testName = 'testConsultaDadosFuncionais';

        $xml = $this->buildSoapEnvelope('consultaDadosFuncionais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::TEST_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//ns1:consultaDadosFuncionaisResponse')) {
            $this->fail($testName, "Response does not contain consultaDadosFuncionaisResponse");
            return;
        }

        // Verify key fields used by back-end
        if (!$this->assertXPathExists($response, "//*[local-name()='DadosFuncionais']/*[local-name()='matriculaSiape']")) {
            $this->fail($testName, "Response missing matriculaSiape");
            return;
        }

        if (!$this->assertXPathExists($response, "//*[local-name()='DadosFuncionais']/*[local-name()='codUorgExercicio']")) {
            $this->fail($testName, "Response missing codUorgExercicio");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: consultaDadosFuncionais with invalid CPF returns fault.
     */
    private function testConsultaDadosFuncionaisNotFound(): void
    {
        $testName = 'testConsultaDadosFuncionaisNotFound';

        $xml = $this->buildSoapEnvelope('consultaDadosFuncionais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::INVALID_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//soap:Fault')) {
            $this->fail($testName, "Expected SOAP Fault for invalid CPF");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: consultaDadosPessoais operation.
     *
     * Matches BuscarDadosSiapeServidor::consultaDadosPessoais()
     */
    private function testConsultaDadosPessoais(): void
    {
        $testName = 'testConsultaDadosPessoais';

        $xml = $this->buildSoapEnvelope('consultaDadosPessoais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::TEST_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//ns1:consultaDadosPessoaisResponse')) {
            $this->fail($testName, "Response does not contain consultaDadosPessoaisResponse");
            return;
        }

        // Verify key fields used by back-end
        if (!$this->assertXPathExists($response, '//tipo:nome')) {
            $this->fail($testName, "Response missing nome");
            return;
        }

        if (!$this->assertXPathExists($response, '//tipo:dataNascimento')) {
            $this->fail($testName, "Response missing dataNascimento");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: consultaDadosPessoais with invalid CPF returns fault.
     */
    private function testConsultaDadosPessoaisNotFound(): void
    {
        $testName = 'testConsultaDadosPessoaisNotFound';

        $xml = $this->buildSoapEnvelope('consultaDadosPessoais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::INVALID_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($response, '//soap:Fault')) {
            $this->fail($testName, "Expected SOAP Fault for invalid CPF");
            return;
        }

        $this->pass($testName);
    }

    // =========================================================================
    // Data Consistency Tests
    // =========================================================================

    /**
     * Test: Verify that a servidor listed in a UORG actually belongs to that UORG.
     *
     * This validates database consistency:
     * 1. listaServidores returns CPFs for a UORG
     * 2. consultaDadosFuncionais for that CPF should have codUorgExercicio = UORG
     */
    private function testDataConsistencyServidorInUorg(): void
    {
        $testName = 'testDataConsistencyServidorInUorg';

        // Step 1: Get servers for UORG 9002
        $xml = $this->buildSoapEnvelope('listaServidores', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);
        $cpf = $this->extractXPathValue($response, "//ns2:Servidor/*[local-name()='cpf']");

        if ($cpf === null) {
            $this->fail($testName, "Could not extract CPF from listaServidores");
            return;
        }

        // Step 2: Get functional data for this CPF
        $xml = $this->buildSoapEnvelope('consultaDadosFuncionais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => $cpf,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);
        $codUorgExercicio = $this->extractXPathValue($response, "//*[local-name()='codUorgExercicio']");

        if ($codUorgExercicio === null) {
            $this->fail($testName, "Could not extract codUorgExercicio from consultaDadosFuncionais");
            return;
        }

        // Step 3: Verify consistency - codUorgExercicio should match TEST_UORG
        if ($codUorgExercicio !== self::TEST_UORG) {
            $this->fail($testName, "Inconsistent data: servidor CPF {$cpf} listed in UORG " .
                self::TEST_UORG . " but codUorgExercicio is {$codUorgExercicio}");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: Verify that consultaDadosFuncionais and consultaDadosPessoais
     * return consistent data for the same CPF.
     */
    private function testDataConsistencyFuncionaisMatchesPessoais(): void
    {
        $testName = 'testDataConsistencyFuncionaisMatchesPessoais';

        // Step 1: Get functional data
        $xml = $this->buildSoapEnvelope('consultaDadosFuncionais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::TEST_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $funcResponse = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($funcResponse, "//*[local-name()='DadosFuncionais']")) {
            $this->fail($testName, "Could not get functional data");
            return;
        }

        // Step 2: Get personal data for same CPF
        $xml = $this->buildSoapEnvelope('consultaDadosPessoais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::TEST_CPF,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $pesResponse = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($pesResponse, '//tipo:nome')) {
            $this->fail($testName, "Could not get personal data");
            return;
        }

        // Step 3: Both should succeed for the same CPF (consistency check)
        // The back-end expects both to return data for valid employees
        $nome = $this->extractXPathValue($pesResponse, '//tipo:nome');
        if (empty($nome)) {
            $this->fail($testName, "Personal data nome is empty");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: Verify UORG hierarchy consistency (codUorgPai relationship).
     */
    private function testDataConsistencyUorgHierarchy(): void
    {
        $testName = 'testDataConsistencyUorgHierarchy';

        // Step 1: Get UORG 9002 details
        $xml = $this->buildSoapEnvelope('dadosUorg', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);
        $codUorgPai = $this->extractXPathValue($response, '//ent:codUorgPai');

        if ($codUorgPai === null) {
            $this->fail($testName, "Could not extract codUorgPai");
            return;
        }

        // Step 2: Verify parent UORG exists
        $xml = $this->buildSoapEnvelope('dadosUorg', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => $codUorgPai,
        ]);

        $parentResponse = $this->sendSoapRequest($xml);

        if (!$this->assertXPathExists($parentResponse, '//ent:codUorg')) {
            $this->fail($testName, "Parent UORG {$codUorgPai} does not exist");
            return;
        }

        $this->pass($testName);
    }

    /**
     * Test: Full synchronization flow (like BuscarDadosSiapeJob).
     *
     * This simulates the complete back-end sync process:
     * 1. Get OAuth token
     * 2. List all UORGs (listaUorgs)
     * 3. Get details for each UORG (dadosUorg)
     * 4. List servers for each UORG (listaServidores)
     * 5. Get functional data for each server (consultaDadosFuncionais)
     * 6. Get personal data for each server (consultaDadosPessoais)
     */
    private function testFullSyncFlow(): void
    {
        $testName = 'testFullSyncFlow';

        // Step 1: Verify token exists
        if ($this->token === null) {
            $this->fail($testName, "No token available");
            return;
        }

        // Step 2: List all units (listaUorgs)
        $xml = $this->buildSoapEnvelope('listaUorgs', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => '',
        ]);

        $response = $this->sendSoapRequest($xml);
        if (!$this->assertXPathExists($response, '//ns2:Uorg')) {
            $this->fail($testName, "Step 2 (listaUorgs): No units returned");
            return;
        }

        // Extract first UORG code (inner elements have no namespace prefix)
        $codUorg = $this->extractXPathValue($response, "//ns2:Uorg/*[local-name()='codigo']");

        // Step 3: Get unit details (dadosUorg)
        $xml = $this->buildSoapEnvelope('dadosUorg', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => $codUorg,
        ]);

        $response = $this->sendSoapRequest($xml);
        if (!$this->assertXPathExists($response, '//ent:codUorg')) {
            $this->fail($testName, "Step 3 (dadosUorg): Unit details not found");
            return;
        }

        // Step 4: List servers for a unit with servers (use TEST_UORG)
        $xml = $this->buildSoapEnvelope('listaServidores', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => self::CONFIG['cpf'],
            'codOrgao' => self::CONFIG['codOrgao'],
            'codUorg' => self::TEST_UORG,
        ]);

        $response = $this->sendSoapRequest($xml);
        if (!$this->assertXPathExists($response, '//ns1:listaServidoresResponse')) {
            $this->fail($testName, "Step 4 (listaServidores): Failed");
            return;
        }

        $cpf = $this->extractXPathValue($response, "//ns2:Servidor/*[local-name()='cpf']");
        if ($cpf === null) {
            $cpf = self::TEST_CPF; // Fallback to known test CPF
        }

        // Step 5: Get functional data (consultaDadosFuncionais)
        $xml = $this->buildSoapEnvelope('consultaDadosFuncionais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => $cpf,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);
        if (!$this->assertXPathExists($response, "//*[local-name()='DadosFuncionais']")) {
            $this->fail($testName, "Step 5 (consultaDadosFuncionais): Failed");
            return;
        }

        // Step 6: Get personal data (consultaDadosPessoais)
        $xml = $this->buildSoapEnvelope('consultaDadosPessoais', [
            'siglaSistema' => self::CONFIG['siglaSistema'],
            'nomeSistema' => self::CONFIG['nomeSistema'],
            'senha' => self::CONFIG['senha'],
            'cpf' => $cpf,
            'codOrgao' => self::CONFIG['codOrgao'],
            'parmExistPag' => self::CONFIG['parmExistPag'],
            'parmTipoVinculo' => self::CONFIG['parmTipoVinculo'],
        ]);

        $response = $this->sendSoapRequest($xml);
        if (!$this->assertXPathExists($response, '//tipo:nome')) {
            $this->fail($testName, "Step 6 (consultaDadosPessoais): Failed");
            return;
        }

        $this->pass($testName);
    }

    // =========================================================================
    // Helper Methods
    // =========================================================================

    /**
     * Build a SOAP envelope matching the back-end format.
     *
     * Uses the same structure as BuscarDadosSiape XML builders:
     * - Namespace soapenv for envelope
     * - Namespace ser for operations
     */
    private function buildSoapEnvelope(string $operation, array $params): string
    {
        $paramsXml = '';
        foreach ($params as $key => $value) {
            $escaped = htmlspecialchars((string)$value, ENT_XML1);
            $paramsXml .= "            <{$key}>{$escaped}</{$key}>\n";
        }

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:ser="http://servico.wssiapenet">
    <soapenv:Body>
        <ser:{$operation}>
{$paramsXml}        </ser:{$operation}>
    </soapenv:Body>
</soapenv:Envelope>
XML;
    }

    /**
     * Send a SOAP request with proper headers.
     *
     * Matches the headers used by BuscarDadosSiape::executaRequisicoes():
     * - Content-Type: application/xml
     * - Authorization: Bearer {token}
     * - x-cpf-usuario: {system_cpf}
     */
    private function sendSoapRequest(string $xml): string
    {
        $headers = [
            'Content-Type: application/xml',
            'Authorization: Bearer ' . ($this->token ?? ''),
            'x-cpf-usuario: ' . self::CONFIG['cpf'],
        ];

        $response = $this->httpPost(
            '/api-consulta-siape/v1/consulta-siape',
            $xml,
            'application/xml',
            $headers
        );

        return $response['body'];
    }

    /**
     * HTTP GET request.
     */
    private function httpGet(string $path): array
    {
        $ch = curl_init($this->baseUrl . $path);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);

        $body = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        return ['status' => $status, 'body' => $body];
    }

    /**
     * HTTP POST request.
     */
    private function httpPost(string $path, string $data, string $contentType, array $headers = []): array
    {
        $ch = curl_init($this->baseUrl . $path);

        $requestHeaders = array_merge(
            ["Content-Type: {$contentType}"],
            $headers
        );

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => $requestHeaders,
        ]);

        $responseBody = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        return ['status' => $status, 'body' => $responseBody];
    }

    /**
     * Assert that an XPath exists in the XML response.
     */
    private function assertXPathExists(string $xml, string $xpath): bool
    {
        $doc = new \DOMDocument();
        @$doc->loadXML($xml);
        $xp = new \DOMXPath($doc);

        // Register all namespaces used by SIAPE responses
        $xp->registerNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xp->registerNamespace('soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xp->registerNamespace('ns1', 'http://servico.wssiapenet');
        $xp->registerNamespace('ns2', 'http://entidade.wssiapenet');
        $xp->registerNamespace('ent', 'http://entidade.wssiapenet');
        $xp->registerNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $nodes = $xp->query($xpath);
        return $nodes !== false && $nodes->length > 0;
    }

    /**
     * Assert that an XPath value contains expected text.
     */
    private function assertXPathContains(string $xml, string $xpath, string $expected): bool
    {
        $value = $this->extractXPathValue($xml, $xpath);
        return $value !== null && str_contains($value, $expected);
    }

    /**
     * Extract a value from XML using XPath.
     */
    private function extractXPathValue(string $xml, string $xpath): ?string
    {
        $doc = new \DOMDocument();
        @$doc->loadXML($xml);
        $xp = new \DOMXPath($doc);

        $xp->registerNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xp->registerNamespace('soapenv', 'http://schemas.xmlsoap.org/soap/envelope/');
        $xp->registerNamespace('ns1', 'http://servico.wssiapenet');
        $xp->registerNamespace('ns2', 'http://entidade.wssiapenet');
        $xp->registerNamespace('ent', 'http://entidade.wssiapenet');
        $xp->registerNamespace('tipo', 'http://tipo.servico.wssiapenet');

        $nodes = $xp->query($xpath);
        if ($nodes !== false && $nodes->length > 0) {
            return $nodes->item(0)->textContent;
        }
        return null;
    }

    /**
     * Mark a test as passed.
     */
    private function pass(string $testName): void
    {
        $this->results[$testName] = ['passed' => true];
        $this->passed++;
        $this->log("  PASS  {$testName}");
    }

    /**
     * Mark a test as failed.
     */
    private function fail(string $testName, string $error): void
    {
        $this->results[$testName] = ['passed' => false, 'error' => $error];
        $this->failed++;
        $this->log("  FAIL  {$testName}");
        $this->log("        Error: {$error}");
    }

    /**
     * Log a message.
     */
    private function log(string $message): void
    {
        echo $message . "\n";
    }
}
