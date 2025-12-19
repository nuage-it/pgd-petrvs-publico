<?php

declare(strict_types=1);

namespace MockSiape\Database;

/**
 * Database schema creation for Mock SIAPE.
 */
class Schema
{
    public function create(): void
    {
        $db = Database::getInstance();

        // Create unidades table
        $db->exec("
            CREATE TABLE IF NOT EXISTS unidades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codUorg VARCHAR(20) UNIQUE NOT NULL,
                codUorgPai VARCHAR(20),
                codUorgPagadora VARCHAR(20),
                codUorgPessoal VARCHAR(20),
                codOrgao VARCHAR(20),
                nomeUorg VARCHAR(255),
                nomeExtendido VARCHAR(500),
                nomeUorgMaiusculo VARCHAR(255),
                siglaUorg VARCHAR(50),
                siglaOrgao VARCHAR(20),
                telefone VARCHAR(50),
                email VARCHAR(255),
                logradouro VARCHAR(255),
                numero VARCHAR(20),
                complemento VARCHAR(100),
                bairro VARCHAR(100),
                cep VARCHAR(20),
                cxPostal VARCHAR(20),
                codMunicipio VARCHAR(20),
                nomeMunicipio VARCHAR(100),
                siglaUfMunicipio VARCHAR(2),
                codigoPais VARCHAR(10),
                nomePais VARCHAR(100),
                localFisico VARCHAR(255),
                codSiorg VARCHAR(20),
                codSiorgOrgao VARCHAR(20),
                codUnidadeSiafi VARCHAR(20),
                codAreaAtuaUorg VARCHAR(10),
                nomeAreaAtuaUorg VARCHAR(100),
                cpfTitularAutoridadeUorg VARCHAR(11),
                cpfSubstitutoAutoridadeUorg VARCHAR(11),
                cnpjLocalizador VARCHAR(20),
                cnpjUpag VARCHAR(20),
                codUpagCentralizadora VARCHAR(20),
                indicadorUorgAdministrativa CHAR(1),
                indicadorUorgDestIntegracao CHAR(1),
                indicadorUorgPessoal CHAR(1),
                indicadorUorgRegimenta CHAR(1),
                indicadorUorgUpag CHAR(1),
                dataCriacaoUorg VARCHAR(8),
                diplomaLegalCriacaoUorg VARCHAR(255),
                identificacaoAntecedentesUorg VARCHAR(100),
                dataUltimaTransacao VARCHAR(8),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create servidores table
        $db->exec("
            CREATE TABLE IF NOT EXISTS servidores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cpf VARCHAR(11) NOT NULL,
                matriculaSiape VARCHAR(20),
                identUnica VARCHAR(50),
                codOrgao VARCHAR(20),
                siglaOrgao VARCHAR(20),
                nomeOrgao VARCHAR(255),
                codUorgExercicio VARCHAR(20),
                nomeUorgExercicio VARCHAR(255),
                siglaUorgExercicio VARCHAR(50),
                codUorgLotacao VARCHAR(20),
                nomeUorgLotacao VARCHAR(255),
                siglaUorgLotacao VARCHAR(50),
                codUpag VARCHAR(30),
                nomeUpag VARCHAR(255),
                siglaUpag VARCHAR(50),
                codCargo VARCHAR(20),
                nomeCargo VARCHAR(255),
                siglaNivelCargo VARCHAR(10),
                codClasse VARCHAR(10),
                nomeClasse VARCHAR(100),
                codPadrao VARCHAR(10),
                codFuncao VARCHAR(20),
                nomeFuncao VARCHAR(255),
                codNovaFuncao VARCHAR(20),
                nomeNovaFuncao VARCHAR(255),
                dataIngressoFuncao VARCHAR(8),
                dataIngressoNovaFuncao VARCHAR(8),
                codAtivFun VARCHAR(20),
                nomeAtivFun VARCHAR(255),
                codSitFuncional VARCHAR(10),
                nomeSitFuncional VARCHAR(100),
                codJornada VARCHAR(10),
                nomeJornada VARCHAR(100),
                siglaRegimeJuridico VARCHAR(10),
                nomeRegimeJuridico VARCHAR(100),
                codOcorrIngressoServPublico VARCHAR(20),
                nomeOcorrIngressoServPublico VARCHAR(255),
                dataOcorrIngressoServPublico VARCHAR(8),
                codOcorrIngressoOrgao VARCHAR(20),
                nomeOcorrIngressoOrgao VARCHAR(255),
                dataOcorrIngressoOrgao VARCHAR(8),
                dataExercicioNoOrgao VARCHAR(8),
                codOcorrExclusao VARCHAR(20),
                nomeOcorrExclusao VARCHAR(255),
                dataOcorrExclusao VARCHAR(8),
                codOcorrAposentadoria VARCHAR(20),
                nomeOcorrAposentadoria VARCHAR(255),
                dataOcorrAposentadoria VARCHAR(8),
                codOcorrIsencaoIR VARCHAR(20),
                nomeOcorrIsencaoIR VARCHAR(255),
                dataIniOcorrIsencaoIR VARCHAR(8),
                dataFimOcorrIsencaoIR VARCHAR(8),
                codOcorrPSS VARCHAR(20),
                nomeOcorrPSS VARCHAR(255),
                dataIniOcorrPSS VARCHAR(8),
                dataFimOcorrPSS VARCHAR(8),
                codigoOrgaoOrigem VARCHAR(20),
                siglaOrgaoOrigem VARCHAR(20),
                emailInstitucional VARCHAR(255),
                emailServidor VARCHAR(255),
                cpfChefiaImediata VARCHAR(11),
                emailChefiaImediata VARCHAR(255),
                nomeChefeUorg VARCHAR(255),
                codValeTransporte VARCHAR(20),
                valorValeTransporte VARCHAR(20),
                tipoValeAR VARCHAR(20),
                dataIniValeAR VARCHAR(8),
                dataFimValeAR VARCHAR(8),
                percentualTS VARCHAR(20),
                pontuacaoDesempenho VARCHAR(20),
                dataUorgExercicio VARCHAR(8),
                dataUorgLotacao VARCHAR(8),
                modalidadePGD VARCHAR(100),
                participaPGD VARCHAR(10),
                dataUltimaTransacao VARCHAR(8),
                ativo BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(cpf, matriculaSiape)
            )
        ");

        // Create dados_pessoais table
        $db->exec("
            CREATE TABLE IF NOT EXISTS dados_pessoais (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cpf VARCHAR(11) UNIQUE NOT NULL,
                nome VARCHAR(255),
                codSexo CHAR(1),
                nomeSexo VARCHAR(20),
                dataNascimento VARCHAR(8),
                codCor VARCHAR(10),
                nomeCor VARCHAR(50),
                codEstadoCivil VARCHAR(10),
                nomeEstadoCivil VARCHAR(50),
                codNacionalidade VARCHAR(10),
                nomeNacionalidade VARCHAR(100),
                codDefFisica VARCHAR(10),
                nomeDefFisica VARCHAR(100),
                nomeMunicipNasc VARCHAR(100),
                ufNascimento VARCHAR(2),
                nomePais VARCHAR(100),
                nomeMae VARCHAR(255),
                nomePai VARCHAR(255),
                numPisPasep VARCHAR(20),
                grupoSanguineo VARCHAR(10),
                dataChegBrasil VARCHAR(8),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create tokens table (for OAuth simulation)
        $db->exec("
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                access_token VARCHAR(500) NOT NULL,
                client_id VARCHAR(100),
                expires_at DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create indexes
        $db->exec("CREATE INDEX IF NOT EXISTS idx_servidores_cpf ON servidores(cpf)");
        $db->exec("CREATE INDEX IF NOT EXISTS idx_servidores_uorg ON servidores(codUorgExercicio)");
        $db->exec("CREATE INDEX IF NOT EXISTS idx_unidades_orgao ON unidades(codOrgao)");
    }
}
