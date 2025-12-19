<?php

declare(strict_types=1);

namespace MockSiape\Operations;

/**
 * Retorna dados funcionais de um servidor pelo CPF.
 */
class ConsultaDadosFuncionaisOperation extends BaseOperation
{
    public function execute(): string
    {
        $cpf = $this->parser->getParameter('cpf');

        $stmt = $this->db->prepare("
            SELECT *
            FROM servidores
            WHERE cpf = :cpf
              AND ativo = 1
            ORDER BY matriculaSiape DESC
            LIMIT 1
        ");
        $stmt->execute(['cpf' => $cpf]);

        $servidor = $stmt->fetch();

        if (!$servidor) {
            return $this->buildNotFoundFault("Servidor com CPF {$cpf} nao encontrado");
        }

        return $this->builder->buildConsultaDadosFuncionaisResponse($servidor);
    }
}
