<?php

declare(strict_types=1);

namespace MockSiape\Operations;

/**
 * Retorna dados completos de uma unidade organizacional.
 */
class DadosUorgOperation extends BaseOperation
{
    public function execute(): string
    {
        $codUorg = $this->parser->getParameter('codUorg');

        $stmt = $this->db->prepare("
            SELECT *
            FROM unidades
            WHERE codUorg = :codUorg
        ");
        $stmt->execute(['codUorg' => $codUorg]);

        $unidade = $stmt->fetch();

        if (!$unidade) {
            return $this->buildNotFoundFault("Unidade {$codUorg} nao encontrada");
        }

        return $this->builder->buildDadosUorgResponse($unidade);
    }
}
