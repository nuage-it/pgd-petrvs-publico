<?php

declare(strict_types=1);

namespace MockSiape\Xml;

use DOMDocument;
use DOMXPath;

/**
 * XML Parser for SOAP requests.
 */
class XmlParser
{
    private DOMDocument $doc;
    private DOMXPath $xpath;

    public function __construct(string $xml)
    {
        $this->doc = new DOMDocument();
        $this->doc->loadXML($xml);

        $this->xpath = new DOMXPath($this->doc);
        // Register both soap and soapenv prefixes (back-end uses soapenv)
        $this->xpath->registerNamespace('soap', NS_SOAP);
        $this->xpath->registerNamespace('soapenv', NS_SOAP);
        $this->xpath->registerNamespace('ser', NS_SERVICO);
    }

    /**
     * Get the SOAP operation name from the request.
     */
    public function getOperation(): ?string
    {
        // Try to find the operation in the SOAP Body
        $body = $this->xpath->query('//soap:Body/*[1]');
        if ($body->length > 0) {
            $node = $body->item(0);
            $localName = $node->localName;
            return $localName;
        }

        return null;
    }

    /**
     * Get a parameter value from the SOAP request.
     */
    public function getParameter(string $name): ?string
    {
        // Try direct child of the operation
        $nodes = $this->xpath->query("//soap:Body//*[local-name()='{$name}']");

        if ($nodes->length > 0) {
            return $nodes->item(0)->textContent;
        }

        return null;
    }

    /**
     * Get all parameters from the SOAP request.
     */
    public function getAllParameters(): array
    {
        $params = [];
        $body = $this->xpath->query('//soap:Body/*[1]/*');

        foreach ($body as $node) {
            $params[$node->localName] = $node->textContent;
        }

        return $params;
    }

    /**
     * Validate that the request contains required parameters.
     */
    public function validate(array $required): array
    {
        $missing = [];
        foreach ($required as $param) {
            if ($this->getParameter($param) === null) {
                $missing[] = $param;
            }
        }
        return $missing;
    }

    /**
     * Get the raw XML string.
     */
    public function getXml(): string
    {
        return $this->doc->saveXML();
    }
}
