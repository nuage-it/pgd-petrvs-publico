<?php

declare(strict_types=1);

namespace MockSiape\Operations;

use MockSiape\Database\Database;
use MockSiape\Xml\XmlBuilder;
use MockSiape\Xml\XmlParser;
use PDO;

/**
 * Base class for SOAP operations.
 */
abstract class BaseOperation
{
    protected PDO $db;
    protected XmlParser $parser;
    protected XmlBuilder $builder;

    public function __construct(XmlParser $parser)
    {
        $this->db = Database::getInstance();
        $this->parser = $parser;
        $this->builder = new XmlBuilder();
    }

    /**
     * Execute the operation and return the XML response.
     */
    abstract public function execute(): string;

    /**
     * Build a SOAP fault response for "not found" errors.
     */
    protected function buildNotFoundFault(string $message): string
    {
        return $this->builder->buildFault('0002', $message);
    }
}
