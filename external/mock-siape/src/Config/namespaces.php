<?php

declare(strict_types=1);

/**
 * Mock SIAPE - XML/SOAP Namespaces
 *
 * Based on the real SIAPE WS responses.
 */

// SOAP envelope namespace
define('NS_SOAP', 'http://schemas.xmlsoap.org/soap/envelope/');

// XSD namespaces
define('NS_XSD', 'http://www.w3.org/2001/XMLSchema');
define('NS_XSI', 'http://www.w3.org/2001/XMLSchema-instance');

// SIAPE service namespace (used in operation responses like ns1:)
define('NS_SERVICO', 'http://servico.wssiapenet');

// SIAPE entity namespace (used for data elements like ns2:)
define('NS_ENTIDADE', 'http://entidade.wssiapenet');

// SIAPE type namespace (used for typed data like consultaDadosPessoais)
define('NS_TIPO', 'http://tipo.servico.wssiapenet');

// Namespace prefixes
define('PREFIX_SOAP', 'soap');
define('PREFIX_NS1', 'ns1');
define('PREFIX_NS2', 'ns2');
