<?php

declare(strict_types=1);

namespace MockSiape\Operations;

/**
 * Lista todas as unidades organizacionais do orgao.
 */
class ListaUorgsOperation extends BaseOperation
{
    public function execute(): string
    {
        $codOrgao = $this->parser->getParameter('codOrgao');

        $stmt = $this->db->prepare("
            SELECT codUorg, nomeUorg, dataUltimaTransacao
            FROM unidades
            WHERE codOrgao = :codOrgao
            ORDER BY codUorg
        ");
        $stmt->execute(['codOrgao' => $codOrgao]);

        $unidades = $stmt->fetchAll();

        return $this->builder->buildListaUorgsResponse($unidades);
    }
}
