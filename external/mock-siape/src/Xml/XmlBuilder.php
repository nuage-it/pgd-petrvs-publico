<?php

declare(strict_types=1);

namespace MockSiape\Xml;

use DOMDocument;
use DOMElement;

/**
 * XML Builder for SOAP responses.
 *
 * Builds SOAP envelopes following the SIAPE WS response format.
 */
class XmlBuilder
{
    private DOMDocument $doc;
    private DOMElement $envelope;
    private DOMElement $body;

    public function __construct()
    {
        $this->doc = new DOMDocument('1.0', 'UTF-8');
        $this->doc->formatOutput = true;

        // Create SOAP Envelope
        $this->envelope = $this->doc->createElementNS(NS_SOAP, 'soap:Envelope');
        $this->envelope->setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xsd', NS_XSD);
        $this->envelope->setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xsi', NS_XSI);
        $this->doc->appendChild($this->envelope);

        // Create SOAP Body
        $this->body = $this->doc->createElement('soap:Body');
        $this->envelope->appendChild($this->body);
    }

    /**
     * Build a listaUorgsResponse.
     *
     * Format matches example-5.xml with xmlns on child elements.
     */
    public function buildListaUorgsResponse(array $unidades): string
    {
        $response = $this->createResponseElement('listaUorgsResponse');
        $out = $this->createOutElement($response);

        foreach ($unidades as $unidade) {
            $uorg = $this->doc->createElementNS(NS_ENTIDADE, 'ns2:Uorg');
            $out->appendChild($uorg);

            // Child elements have xmlns attribute (as in real SIAPE response)
            $this->addChildWithXmlns($uorg, 'codigo', $unidade['codUorg'] ?? '', NS_ENTIDADE);
            $this->addChildWithXmlns($uorg, 'dataUltimaTransacao', $unidade['dataUltimaTransacao'] ?? '', NS_ENTIDADE);
            $this->addChildWithXmlns($uorg, 'nome', $unidade['nomeUorg'] ?? '', NS_ENTIDADE);
        }

        return $this->doc->saveXML();
    }

    /**
     * Build a dadosUorgResponse.
     */
    public function buildDadosUorgResponse(array $unidade): string
    {
        $response = $this->createResponseElement('dadosUorgResponse');
        $out = $this->createOutElement($response);

        // Map database columns to SIAPE XML element names
        $mapping = [
            'bairro' => 'bairro',
            'cep' => 'cep',
            'cnpjLocalizador' => 'cnpjLocalizador',
            'cnpjUpag' => 'cnpjUpag',
            'codAreaAtuaUorg' => 'codAreaAtuaUorg',
            'codMunicipio' => 'codMunicipio',
            'codOrgao' => 'codOrgao',
            'codSiorg' => 'codSiorg',
            'codSiorgOrgao' => 'codSiorgOrgao',
            'codUnidadeSiafi' => 'codUnidadeSiafi',
            'codUorg' => 'codUorg',
            'codUorgPagadora' => 'codUorgPagadora',
            'codUorgPai' => 'codUorgPai',
            'codUorgPessoal' => 'codUorgPessoal',
            'codUpagCentralizadora' => 'codUpagCentralizadora',
            'codigoPais' => 'codigoPais',
            'complemento' => 'complemento',
            'cpfSubstitutoAutoridadeUorg' => 'cpfSubstitutoAutoridadeUorg',
            'cpfTitularAutoridadeUorg' => 'cpfTitularAutoridadeUorg',
            'cxPostal' => 'cxPostal',
            'dataCriacaoUorg' => 'dataCriacaoUorg',
            'diplomaLegalCriacaoUorg' => 'diplomaLegalCriacaoUorg',
            'email' => 'email',
            'identificacaoAntecedentesUorg' => 'identificacaoAntecedentesUorg',
            'indicadorUorgAdministrativa' => 'indicadorUorgAdministrativa',
            'indicadorUorgDestIntegracao' => 'indicadorUorgDestIntegracao',
            'indicadorUorgPessoal' => 'indicadorUorgPessoal',
            'indicadorUorgRegimenta' => 'indicadorUorgRegimenta',
            'indicadorUorgUpag' => 'indicadorUorgUpag',
            'localFisico' => 'localFisico',
            'logradouro' => 'logradouro',
            'nomeAreaAtuaUorg' => 'nomeAreaAtuaUorg',
            'nomeExtendido' => 'nomeExtendido',
            'nomeMunicipio' => 'nomeMunicipio',
            'nomePais' => 'nomePais',
            'nomeUorg' => 'nomeUorg',
            'nomeUorgMaiusculo' => 'nomeUorgMaiusculo',
            'numero' => 'numero',
            'siglaOrgao' => 'siglaOrgao',
            'siglaUfMunicipio' => 'siglaUfMunicipio',
            'siglaUorg' => 'siglaUorg',
            'telefone' => 'telefone',
        ];

        // Add elements in alphabetical order (as in SIAPE)
        ksort($mapping);
        foreach ($mapping as $dbCol => $xmlName) {
            $this->addElementWithNs($out, $xmlName, $unidade[$dbCol] ?? '', NS_ENTIDADE);
        }

        return $this->doc->saveXML();
    }

    /**
     * Build a listaServidoresResponse.
     *
     * Format matches example-4.xml with xmlns on child elements.
     */
    public function buildListaServidoresResponse(array $servidores): string
    {
        $response = $this->createResponseElement('listaServidoresResponse');
        $out = $this->createOutElement($response);

        foreach ($servidores as $servidor) {
            $srv = $this->doc->createElementNS(NS_ENTIDADE, 'ns2:Servidor');
            $out->appendChild($srv);

            // Child elements have xmlns attribute (as in real SIAPE response)
            $this->addChildWithXmlns($srv, 'cpf', $servidor['cpf'] ?? '', NS_ENTIDADE);
            $this->addChildWithXmlns($srv, 'dataUltimaTransacao', $servidor['dataUltimaTransacao'] ?? '', NS_ENTIDADE);
        }

        return $this->doc->saveXML();
    }

    /**
     * Build a consultaDadosFuncionaisResponse.
     */
    public function buildConsultaDadosFuncionaisResponse(array $servidor): string
    {
        $response = $this->createResponseElement('consultaDadosFuncionaisResponse');
        $out = $this->createOutElement($response);

        // Create dadosFuncionais container
        $dadosFuncionais = $this->doc->createElementNS(NS_TIPO, 'dadosFuncionais');
        $out->appendChild($dadosFuncionais);

        // Create DadosFuncionais inner element
        $df = $this->doc->createElement('DadosFuncionais');
        $dadosFuncionais->appendChild($df);

        // Map all functional data fields
        $fields = [
            'codAtivFun', 'codCargo', 'codClasse', 'codFuncao', 'codJornada',
            'codNovaFuncao', 'codOcorrAposentadoria', 'codOcorrExclusao',
            'codOcorrIngressoOrgao', 'codOcorrIngressoServPublico', 'codOcorrIsencaoIR',
            'codOcorrPSS', 'codOrgao', 'codPadrao', 'codSitFuncional',
            'codUorgExercicio', 'codUorgLotacao', 'codUpag', 'codValeTransporte',
            'codigoOrgaoOrigem', 'cpfChefiaImediata', 'dataExercicioNoOrgao',
            'dataFimOcorrIsencaoIR', 'dataFimOcorrPSS', 'dataFimValeAR',
            'dataIngressoFuncao', 'dataIngressoNovaFuncao', 'dataIniOcorrIsencaoIR',
            'dataIniOcorrPSS', 'dataIniValeAR', 'dataOcorrAposentadoria',
            'dataOcorrExclusao', 'dataOcorrIngressoOrgao', 'dataOcorrIngressoServPublico',
            'dataUorgExercicio', 'dataUorgLotacao', 'emailChefiaImediata',
            'emailInstitucional', 'emailServidor', 'identUnica', 'matriculaSiape',
            'modalidadePGD', 'nomeAtivFun', 'nomeCargo', 'nomeChefeUorg',
            'nomeClasse', 'nomeFuncao', 'nomeJornada', 'nomeNovaFuncao',
            'nomeOcorrAposentadoria', 'nomeOcorrExclusao', 'nomeOcorrIngressoOrgao',
            'nomeOcorrIngressoServPublico', 'nomeOcorrIsencaoIR', 'nomeOcorrPSS',
            'nomeOrgao', 'nomeRegimeJuridico', 'nomeSitFuncional', 'nomeUorgExercicio',
            'nomeUorgLotacao', 'nomeUpag', 'participaPGD', 'percentualTS',
            'pontuacaoDesempenho', 'siglaNivelCargo', 'siglaOrgao', 'siglaOrgaoOrigem',
            'siglaRegimeJuridico', 'siglaUorgExercicio', 'siglaUorgLotacao',
            'siglaUpag', 'tipoValeAR', 'valorValeTransporte',
        ];

        foreach ($fields as $field) {
            $elem = $this->doc->createElement($field, $servidor[$field] ?? '');
            $df->appendChild($elem);
        }

        return $this->doc->saveXML();
    }

    /**
     * Build a consultaDadosPessoaisResponse.
     */
    public function buildConsultaDadosPessoaisResponse(array $pessoa): string
    {
        $response = $this->createResponseElement('consultaDadosPessoaisResponse');
        $out = $this->createOutElement($response);

        // Map personal data fields
        $fields = [
            'codCor', 'codDefFisica', 'codEstadoCivil', 'codNacionalidade',
            'codSexo', 'dataChegBrasil', 'dataNascimento', 'grupoSanguineo',
            'nome', 'nomeCor', 'nomeDefFisica', 'nomeEstadoCivil', 'nomeMae',
            'nomeMunicipNasc', 'nomeNacionalidade', 'nomePai', 'nomePais',
            'nomeSexo', 'numPisPasep', 'ufNascimento',
        ];

        foreach ($fields as $field) {
            $this->addElementWithNs($out, $field, $pessoa[$field] ?? '', NS_TIPO);
        }

        return $this->doc->saveXML();
    }

    /**
     * Build a SOAP Fault response.
     */
    public function buildFault(string $faultCode, string $faultString): string
    {
        $fault = $this->doc->createElement('soap:Fault');
        $this->body->appendChild($fault);

        $code = $this->doc->createElement('faultcode', $faultCode);
        $fault->appendChild($code);

        $string = $this->doc->createElement('faultstring', $faultString);
        $fault->appendChild($string);

        return $this->doc->saveXML();
    }

    private function createResponseElement(string $operationName): DOMElement
    {
        $response = $this->doc->createElementNS(NS_SERVICO, "ns1:{$operationName}");
        $this->body->appendChild($response);
        return $response;
    }

    private function createOutElement(DOMElement $parent): DOMElement
    {
        $out = $this->doc->createElement('out');
        $out->setAttribute('xmlns', '');
        $parent->appendChild($out);
        return $out;
    }

    private function addElementWithNs(DOMElement $parent, string $name, string $value, string $ns): void
    {
        $elem = $this->doc->createElement($name, htmlspecialchars($value, ENT_XML1));
        $elem->setAttribute('xmlns', $ns);
        $parent->appendChild($elem);
    }

    /**
     * Add a child element with xmlns attribute (for elements inside ns2:Uorg/ns2:Servidor).
     *
     * This matches the real SIAPE API format where child elements have their own
     * xmlns declaration even when the parent already has the namespace prefix.
     */
    private function addChildWithXmlns(DOMElement $parent, string $name, string $value, string $ns): void
    {
        $elem = $this->doc->createElement($name, htmlspecialchars($value, ENT_XML1));
        $elem->setAttribute('xmlns', $ns);
        $parent->appendChild($elem);
    }
}
