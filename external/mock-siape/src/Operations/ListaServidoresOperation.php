<?php

declare(strict_types=1);

namespace MockSiape\Operations;

/**
 * Lista todos os servidores de uma unidade organizacional.
 */
class ListaServidoresOperation extends BaseOperation
{
    public function execute(): string
    {
        $codUorg = $this->parser->getParameter('codUorg');

        $stmt = $this->db->prepare("
            SELECT cpf, dataUltimaTransacao
            FROM servidores
            WHERE codUorgExercicio = :codUorg
              AND ativo = 1
            ORDER BY cpf
        ");
        $stmt->execute(['codUorg' => $codUorg]);

        $servidores = $stmt->fetchAll();

        return $this->builder->buildListaServidoresResponse($servidores);
    }
}
