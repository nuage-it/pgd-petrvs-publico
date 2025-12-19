<?php

declare(strict_types=1);

namespace MockSiape\Operations;

/**
 * Retorna dados pessoais de um servidor pelo CPF.
 */
class ConsultaDadosPessoaisOperation extends BaseOperation
{
    public function execute(): string
    {
        $cpf = $this->parser->getParameter('cpf');

        $stmt = $this->db->prepare("
            SELECT *
            FROM dados_pessoais
            WHERE cpf = :cpf
        ");
        $stmt->execute(['cpf' => $cpf]);

        $pessoa = $stmt->fetch();

        if (!$pessoa) {
            return $this->buildNotFoundFault("Dados pessoais do CPF {$cpf} nao encontrados");
        }

        return $this->builder->buildConsultaDadosPessoaisResponse($pessoa);
    }
}
