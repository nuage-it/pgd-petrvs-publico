'use client'

import {
  Home, Database, GitBranch, Settings, Activity, Layers, Code,
  Filter, User, Zap, Lock, Clock, Package, BarChart, TrendingUp,
  UserCheck, BookOpen, ExternalLink, FileText
} from 'lucide-react'
import { useEffect } from 'react'
import {
  DocHeader,
  Breadcrumb,
  BreadcrumbItem,
  SectionTitle,
  WhiteCard,
  InfoBox,
  InfoGrid,
  InfoGridItem
} from '../components/doc-components'

export default function IntegracaoSiape() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          margin: 0;
          padding: 0;
          background: white !important;
          font-size: 10pt;
          line-height: 1.3;
        }
        .print-hide {
          display: none !important;
        }
        .page-break {
          page-break-before: always;
          break-before: page;
        }
        .avoid-break {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        h1, h2, h3 {
          page-break-after: avoid;
          break-after: avoid;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .container {
          max-width: 100% !important;
          padding: 0 !important;
        }
        .grid {
          display: block !important;
        }
        .grid > div {
          margin-bottom: 0.5rem;
        }
        footer {
          page-break-before: always;
        }
      }
      @page {
        margin: 1.5cm;
        size: A4;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/', icon: Home },
    { label: 'Integração SIAPE', icon: Database }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DocHeader
        title="PGD Petrvs MGI - Documentação"
        subtitle="Sistema de Programa de Gestão e Desempenho"
      />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        {/* Título principal */}
        <div className="mb-8 avoid-break">
          <SectionTitle level={1}>Fluxo de Integração SIAPE</SectionTitle>
          <p className="text-lg text-gray-700">
            Documentação técnica do BuscarDadosSiapeJob - Coleta de dados do SIAPE via ConectaGov
          </p>
        </div>

        {/* Visão Geral */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={Database}>Visão Geral</SectionTitle>
          <p className="mb-4 text-gray-700">
            O <strong>BuscarDadosSiapeJob</strong> é responsável por coletar dados do SIAPE via ConectaGov e
            armazená-los em tabelas temporárias para posterior processamento. Este job executa 4 etapas sequenciais
            de coleta de dados.
          </p>
          <InfoBox variant="warning" icon={Activity} title="IMPORTANTE">
            Este job apenas <strong>coleta</strong> os dados do SIAPE. O processamento e persistência nas tabelas
            definitivas (usuarios, unidades) é feito pelo <strong>SincronizarSiapeJob</strong>.
          </InfoBox>
        </WhiteCard>

        {/* Pipeline Completo */}
        <WhiteCard className="avoid-break">
          <SectionTitle level={2}>Pipeline Completo de Sincronização</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-lg bg-govbr-blue-50 border-2 border-govbr-blue-600">
              <div className="flex items-center gap-2 mb-3">
                <Database size={24} className="text-govbr-blue-600" />
                <h3 className="text-lg font-semibold text-govbr-blue-600">BuscarDadosSiapeJob</h3>
              </div>
              <p className="text-sm mb-3 text-gray-700">
                Coleta XMLs do ConectaGov/SIAPE
              </p>
              <div className="text-xs text-gray-500">
                <strong>Tabelas Temporárias:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>siape_listaUORG</li>
                  <li>siape_dadosUORG</li>
                  <li>siape_listaServidores</li>
                  <li>siape_consultaDadosFuncionais</li>
                  <li>siape_consultaDadosPessoais</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-green-50 border-2 border-govbr-green-700">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={24} className="text-govbr-green-700" />
                <h3 className="text-lg font-semibold text-govbr-green-700">SincronizarSiapeJob</h3>
              </div>
              <p className="text-sm mb-3 text-gray-700">
                Processa XMLs e atualiza BD local
              </p>
              <div className="text-xs text-gray-500">
                <strong>Tabelas Definitivas:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>usuarios</li>
                  <li>unidades</li>
                  <li>integracao_servidores</li>
                  <li>integracao_unidades</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="font-semibold">Coleta de Dados</span>
            <span className="text-2xl text-govbr-blue-600">→</span>
            <span className="font-semibold">Processamento e Persistência</span>
          </div>
        </WhiteCard>

        {/* Arquitetura */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={Layers}>Arquitetura do BuscarDadosSiapeJob</SectionTitle>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
              { num: 1, title: 'BuscarDadosSiapeUnidades', sub: 'listaUorgs' },
              { num: 2, title: 'BuscarDadosSiapeUnidade', sub: 'dadosUorg' },
              { num: 3, title: 'BuscarDadosSiapeServidores', sub: 'listaServidores' },
              { num: 4, title: 'BuscarDadosSiapeServidor', sub: 'consultaDados Funcionais + Pessoais' }
            ].map((step) => (
              <div key={step.num} className="p-4 rounded-lg text-center bg-govbr-blue-50 border border-govbr-blue-600">
                <div className="text-2xl font-bold mb-2 text-govbr-blue-600">{step.num}</div>
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.sub}</p>
              </div>
            ))}
          </div>
        </WhiteCard>

        {/* Classe Base */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Code} iconColor="text-govbr-green-700">Classe Base: BuscarDadosSiape</SectionTitle>
          <p className="mb-4 text-gray-700">
            Todas as classes herdam de <strong>BuscarDadosSiape</strong> que fornece métodos compartilhados:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left p-3 text-gray-900">Método</th>
                  <th className="text-left p-3 text-gray-900">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'getToken()', desc: 'Obtém token OAuth2 (cache de 59 min)' },
                  { method: 'executaRequisicoes()', desc: 'Executa lote de requisições paralelas (curl_multi)' },
                  { method: 'buscaSincrona()', desc: 'Executa requisição única síncrona' },
                  { method: 'prepareResponseXml()', desc: 'Sanitiza e parseia XML de resposta' },
                  { method: 'simpleXmlElementToArray()', desc: 'Converte SimpleXMLElement para array' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-3 font-mono text-xs text-govbr-blue-600">{row.method}</td>
                    <td className="p-3 text-gray-700">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WhiteCard>

        {/* Etapa 1 */}
        <WhiteCard className="page-break avoid-break">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold bg-govbr-blue-600">1</div>
            <h2 className="text-2xl font-semibold text-gray-900">ETAPA 1: BuscarDadosSiapeUnidades</h2>
          </div>
          <InfoGrid columns={3} gap="md" className="mb-4">
            <InfoGridItem icon={FileText} title="Arquivo" variant="gray">
              <span className="font-mono text-sm">BuscarDadosSiapeUnidades.php</span>
            </InfoGridItem>
            <InfoGridItem icon={Code} title="Operação SOAP" variant="gray">
              <span className="font-mono text-sm">listaUorgs</span>
            </InfoGridItem>
            <InfoGridItem icon={Activity} title="Requisições" variant="gray">
              <span className="font-mono text-sm">1</span>
            </InfoGridItem>
          </InfoGrid>
          <p className="mb-4 text-gray-700">
            <strong>Objetivo:</strong> Obter lista de todas as unidades organizacionais do órgão
          </p>
          <div className="p-4 rounded-lg mb-4 bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Fluxo de Execução</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Trunca tabela siape_listaUORG</li>
              <li>Obtém token OAuth2 (Basic Auth)</li>
              <li>Monta XML SOAP listaUorgs</li>
              <li>Envia requisição síncrona</li>
              <li>Armazena XML completo em siape_listaUORG</li>
            </ol>
          </div>
          <TableDestino
            title="siape_listaUORG"
            fields={[
              { campo: 'id', tipo: 'UUID', desc: 'Identificador único' },
              { campo: 'response', tipo: 'TEXT', desc: 'XML completo da resposta' },
              { campo: 'processado', tipo: 'INT', desc: '0=pendente, 1=processado' }
            ]}
          />
        </WhiteCard>

        {/* Etapa 2 */}
        <WhiteCard className="page-break avoid-break">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold bg-govbr-blue-600">2</div>
            <h2 className="text-2xl font-semibold text-gray-900">ETAPA 2: BuscarDadosSiapeUnidade</h2>
          </div>
          <InfoGrid columns={3} gap="md" className="mb-4">
            <InfoGridItem icon={FileText} title="Arquivo" variant="gray">
              <span className="font-mono text-sm">BuscarDadosSiapeUnidade.php</span>
            </InfoGridItem>
            <InfoGridItem icon={Code} title="Operação SOAP" variant="gray">
              <span className="font-mono text-sm">dadosUorg</span>
            </InfoGridItem>
            <InfoGridItem icon={Activity} title="Requisições" variant="gray">
              <span className="font-mono text-sm">N (paralelas)</span>
            </InfoGridItem>
          </InfoGrid>
          <p className="mb-4 text-gray-700">
            <strong>Objetivo:</strong> Obter detalhes completos de cada unidade (uma requisição por unidade)
          </p>
          <div className="p-4 rounded-lg mb-4 bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Fluxo de Execução</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Trunca tabela siape_dadosUORG</li>
              <li>Lê siape_listaUORG (processado=0)</li>
              <li>Parse XML e extrai códigos das UORGs</li>
              <li>Filtra UORGs (blacklist + comparação de datas)</li>
              <li>Monta XML SOAP dadosUorg para cada UORG filtrada</li>
              <li>Executa requisições em lotes paralelos (curl_multi)</li>
              <li>Armazena XMLs em siape_dadosUORG</li>
              <li>Marca siape_listaUORG.processado = 1</li>
            </ol>
          </div>
          <InfoBox variant="warning" icon={Filter} title="Filtragem Inteligente">
            <p className="text-sm mb-2">Evita requisições desnecessárias comparando:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
              <li>Remove blacklist (siape_blacklist_unidades)</li>
              <li>Compara com integracao_unidades.codigo_siape</li>
              <li>Se não existe OU data_modificacao NULL OU dataUltimaTransacao {'>'} data_modificacao → Processa</li>
            </ul>
            <p className="text-xs mt-2 text-govbr-green-700">
              <strong>Benefício:</strong> Reduz volume de requisições em 70-90% após primeira sincronização
            </p>
          </InfoBox>
          <TableDestino
            title="siape_dadosUORG"
            fields={[
              { campo: 'id', tipo: 'UUID', desc: 'Identificador único' },
              { campo: 'codigo', tipo: 'VARCHAR', desc: 'Código da UORG' },
              { campo: 'response', tipo: 'TEXT', desc: 'XML completo da resposta' },
              { campo: 'data_modificacao', tipo: 'DATE', desc: 'Data da última transação (formato Y-m-d)' },
              { campo: 'processado', tipo: 'INT', desc: '0=pendente (usado pelo SincronizarSiapeJob)' }
            ]}
          />
        </WhiteCard>

        {/* Etapa 3 */}
        <WhiteCard className="page-break avoid-break">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold bg-govbr-blue-600">3</div>
            <h2 className="text-2xl font-semibold text-gray-900">ETAPA 3: BuscarDadosSiapeServidores</h2>
          </div>
          <InfoGrid columns={3} gap="md" className="mb-4">
            <InfoGridItem icon={FileText} title="Arquivo" variant="gray">
              <span className="font-mono text-sm">BuscarDadosSiapeServidores.php</span>
            </InfoGridItem>
            <InfoGridItem icon={Code} title="Operação SOAP" variant="gray">
              <span className="font-mono text-sm">listaServidores</span>
            </InfoGridItem>
            <InfoGridItem icon={Activity} title="Requisições" variant="gray">
              <span className="font-mono text-sm">N (uma por unidade)</span>
            </InfoGridItem>
          </InfoGrid>
          <p className="mb-4 text-gray-700">
            <strong>Objetivo:</strong> Obter lista de servidores de cada unidade
          </p>
          <div className="p-4 rounded-lg mb-4 bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Fluxo de Execução</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Trunca tabela siape_listaServidores</li>
              <li>Lê siape_listaUORG (processado=1)</li>
              <li>Parse XML e extrai códigos das UORGs</li>
              <li>Para cada UORG: monta XML SOAP listaServidores</li>
              <li>Executa requisições em lotes paralelos</li>
              <li>Armazena respostas em lotes de 1000 registros</li>
            </ol>
          </div>
          <TableDestino
            title="siape_listaServidores"
            fields={[
              { campo: 'id', tipo: 'UUID', desc: 'Identificador único' },
              { campo: 'response', tipo: 'TEXT', desc: 'XML completo da resposta' },
              { campo: 'processado', tipo: 'INT', desc: '0=pendente, 1=processado' }
            ]}
          />
        </WhiteCard>

        {/* Etapa 4 */}
        <WhiteCard className="page-break">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold bg-govbr-blue-600">4</div>
            <h2 className="text-2xl font-semibold text-gray-900">ETAPA 4: BuscarDadosSiapeServidor</h2>
          </div>
          <InfoGrid columns={3} gap="md" className="mb-4">
            <InfoGridItem icon={FileText} title="Arquivo" variant="gray">
              <span className="font-mono text-sm">BuscarDadosSiapeServidor.php</span>
            </InfoGridItem>
            <InfoGridItem icon={Code} title="Operações SOAP" variant="gray">
              <span className="font-mono text-sm">consultaDadosFuncionais + consultaDadosPessoais</span>
            </InfoGridItem>
            <InfoGridItem icon={Activity} title="Requisições" variant="gray">
              <span className="font-mono text-sm">2×M (por CPF)</span>
            </InfoGridItem>
          </InfoGrid>
          <p className="mb-4 text-gray-700">
            <strong>Objetivo:</strong> Obter dados funcionais e pessoais de cada servidor
          </p>
          <div className="p-4 rounded-lg mb-4 bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Fluxo de Execução</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Trunca tabelas: siape_consultaDadosPessoais e siape_consultaDadosFuncionais</li>
              <li>Lê siape_listaServidores (processado=0)</li>
              <li>Parse XMLs e extrai CPFs únicos</li>
              <li>Filtra servidores (blacklist + comparação de datas)</li>
              <li>Executa consultaDadosFuncionais em lotes paralelos</li>
              <li>Executa consultaDadosPessoais em lotes paralelos</li>
              <li>Armazena XMLs em tabelas respectivas</li>
              <li>Marca siape_listaServidores.processado = 1</li>
            </ol>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-govbr-green-700" />
                <h3 className="font-semibold text-sm text-govbr-green-700">Sub-etapa 4A: Dados Funcionais</h3>
              </div>
              <p className="text-xs mb-2 text-gray-700">70+ campos incluindo:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                <li>matriculaSiape, identUnica</li>
                <li>codSitFuncional, nomeSitFuncional</li>
                <li>codCargo, nomeCargo</li>
                <li>codUorgExercicio, codUorgLotacao</li>
                <li>emailInstitucional, cpfChefiaImediata</li>
                <li>modalidadePGD, participaPGD</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-govbr-green-700" />
                <h3 className="font-semibold text-sm text-govbr-green-700">Sub-etapa 4B: Dados Pessoais</h3>
              </div>
              <p className="text-xs mb-2 text-gray-700">Dados pessoais incluindo:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                <li>nome, nomeSexo, dataNascimento</li>
                <li>nomeMunicipNasc, ufNascimento</li>
                <li>nomeMae, nomePai</li>
                <li>codEstadoCivil, nomeEstadoCivil</li>
              </ul>
            </div>
          </div>
          <TableDestino
            title="siape_consultaDadosFuncionais / siape_consultaDadosPessoais"
            fields={[
              { campo: 'id', tipo: 'UUID', desc: 'Identificador único' },
              { campo: 'cpf', tipo: 'VARCHAR(11)', desc: 'CPF do servidor' },
              { campo: 'response', tipo: 'TEXT', desc: 'XML completo' },
              { campo: 'data_modificacao', tipo: 'DATE', desc: 'Data da última transação' },
              { campo: 'processado', tipo: 'INT', desc: '0=pendente (usado pelo SincronizarSiapeJob)' }
            ]}
            note="* Estrutura idêntica para siape_consultaDadosFuncionais e siape_consultaDadosPessoais"
          />
        </WhiteCard>

        {/* Otimizações */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Zap} iconColor="text-govbr-green-700">Mecanismos de Otimização</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Requisições Paralelas', desc: 'Uso de curl_multi para execução simultânea', benefit: 'Reduz tempo em até 90%' },
              { icon: Filter, title: 'Filtragem Inteligente', desc: 'Compara dataUltimaTransacao com data_modificacao', benefit: 'Reduz requisições em 70-90%' },
              { icon: Lock, title: 'Blacklist', desc: 'Ignora CPFs/UORGs com erros consistentes', benefit: 'Evita requisições que sempre falham' },
              { icon: Clock, title: 'Cache de Token', desc: 'Token OAuth2 armazenado por 59 minutos', benefit: 'Evita autenticações desnecessárias' },
              { icon: Package, title: 'Processamento em Lotes', desc: 'Inserts no banco em lotes de 1000 registros', benefit: 'Reduz overhead de transações' }
            ].map((opt, i) => (
              <div key={i} className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
                <div className="flex items-center gap-2 mb-2">
                  <opt.icon size={18} className="text-govbr-green-700" />
                  <h3 className="font-semibold text-govbr-green-700">{opt.title}</h3>
                </div>
                <p className="text-sm mb-2 text-gray-700">{opt.desc}</p>
                <p className="text-xs text-govbr-green-700"><strong>Benefício:</strong> {opt.benefit}</p>
              </div>
            ))}
          </div>
        </WhiteCard>

        {/* Configurações */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Settings}>Configurações</SectionTitle>
          <div className="p-4 rounded-lg mb-4 bg-gray-50 border border-gray-200">
            <h3 className="font-semibold mb-3 text-sm text-gray-900">Variáveis de Ambiente</h3>
            <div className="space-y-2 text-xs font-mono text-gray-700">
              {[
                { key: 'INTEGRACAO_SIAPE_URL', val: 'https://api.conectagov.estaleiro.serpro.gov.br' },
                { key: 'INTEGRACAO_SIAPE_CONECTAGOV_CHAVE', val: 'client_id' },
                { key: 'INTEGRACAO_SIAPE_CONECTAGOV_SENHA', val: 'client_secret' },
                { key: 'INTEGRACAO_SIAPE_CPF', val: '00000000000' },
                { key: 'INTEGRACAO_SIAPE_CODORGAO', val: '15000' },
                { key: 'INTEGRACAO_SIAPE_CONECTAGOV_QTD_MAX_REQUISICOES', val: '10' }
              ].map((env, i) => (
                <div key={i} className="p-2 rounded bg-govbr-blue-50">
                  <strong>{env.key}</strong>={env.val}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <p className="text-sm font-semibold mb-2 text-gray-900">Limites e Parâmetros</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left p-3 text-gray-900">Parâmetro</th>
                  <th className="text-left p-3 text-gray-900">Valor Padrão</th>
                  <th className="text-left p-3 text-gray-900">Máximo</th>
                  <th className="text-left p-3 text-gray-900">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: 'Requisições paralelas', val: '10', max: '30', desc: 'QUANTIDADE_MAXIMA_REQUISICOES' },
                  { param: 'Insert em lote', val: '1000', max: '-', desc: 'MAX_INSERT_DB' },
                  { param: 'Memory limit', val: '-1 (ilimitado)', max: '-', desc: "ini_set('memory_limit', '-1')" },
                  { param: 'Cache token', val: '59 min', max: '60 min', desc: 'Validade do token OAuth2' },
                  { param: 'Fila', val: 'siape_queue', max: '-', desc: 'Queue dedicada' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-3 font-mono text-xs text-govbr-blue-600">{row.param}</td>
                    <td className="p-3 text-gray-700">{row.val}</td>
                    <td className="p-3 text-gray-700">{row.max}</td>
                    <td className="p-3 text-gray-500">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WhiteCard>

        {/* Monitoramento */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={BarChart}>Monitoramento</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-900">Logs Importantes</h3>
              <div className="space-y-2 text-xs font-mono p-3 rounded bg-gray-50 text-gray-700">
                <div>Job BuscarDadosSiapeJob - Tenant {'{id}'}: START</div>
                <div>Busca das Unidades iniciada</div>
                <div>Processamento de Unidade iniciado</div>
                <div>Unidades a serem processadas: 150</div>
                <div>Lote 1 de 15</div>
                <div>Quantidade de requisições abertas: 10</div>
                <div>Tempo total de execução: 45.2 segundos</div>
                <div>Servidores a serem processadas: 3500</div>
                <div>Job BuscarDadosSiapeJob Tenant {'{id}'} - END</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-900">Métricas</h3>
              <div className="space-y-2">
                {[
                  { title: 'Tempo por etapa', val: '"Tempo total de execução: X segundos"' },
                  { title: 'Unidades processadas', val: '"Unidades a serem processadas: N"' },
                  { title: 'Servidores processados', val: '"Servidores a serem processadas: N"' },
                  { title: 'Requisições abertas', val: '"Quantidade de requisições abertas: N"' }
                ].map((metric, i) => (
                  <div key={i} className="p-3 rounded bg-govbr-blue-50 border border-govbr-blue-600">
                    <p className="text-xs font-semibold mb-1 text-govbr-blue-600">{metric.title}</p>
                    <p className="text-xs text-gray-500">{metric.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </WhiteCard>

        {/* Exemplo de Execução */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={TrendingUp} iconColor="text-govbr-green-700">Exemplo de Execução</SectionTitle>
          <p className="mb-4 text-gray-700">
            <strong>Cenário:</strong> Órgão com 200 unidades e 5000 servidores
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ExecucaoTable
              title="Primeira Execução (Carga Inicial)"
              variant="warning"
              rows={[
                { etapa: 'listaUorgs', req: '1', tempo: '<1s' },
                { etapa: 'dadosUorg', req: '200', tempo: '2-3 min' },
                { etapa: 'listaServidores', req: '200', tempo: '2-3 min' },
                { etapa: 'consultaDadosFuncionais', req: '5000', tempo: '8-10 min' },
                { etapa: 'consultaDadosPessoais', req: '5000', tempo: '8-10 min' }
              ]}
              total={{ req: '10.401', tempo: '15-20 min' }}
            />
            <ExecucaoTable
              title="Execuções Subsequentes (Incremental)"
              variant="success"
              rows={[
                { etapa: 'listaUorgs', req: '1', tempo: '<1s' },
                { etapa: 'dadosUorg', req: '~20', tempo: '<30s' },
                { etapa: 'listaServidores', req: '200', tempo: '2-3 min' },
                { etapa: 'consultaDadosFuncionais', req: '~500', tempo: '1-2 min' },
                { etapa: 'consultaDadosPessoais', req: '~500', tempo: '1-2 min' }
              ]}
              total={{ req: '~1.221', tempo: '2-5 min' }}
            />
          </div>
          <InfoBox variant="info" className="mt-4">
            <strong>Redução:</strong> Após a primeira sincronização, o tempo de execução é reduzido em aproximadamente
            <strong className="text-govbr-green-700"> 75-80%</strong> devido à filtragem inteligente.
          </InfoBox>
        </WhiteCard>

        {/* Fluxo Individual */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={UserCheck}>Fluxo Individual de CPF</SectionTitle>
          <p className="mb-4 text-gray-700">
            Além do job em lote, existe o fluxo individual para atualizar um CPF específico.
          </p>
          <InfoGrid columns={2} gap="md" className="mb-4">
            <InfoGridItem icon={Code} title="Classe" variant="gray">
              <span className="font-mono text-sm">SiapeIndividualServidorService</span>
            </InfoGridItem>
            <InfoGridItem icon={Code} title="Método" variant="gray">
              <span className="font-mono text-sm">fluxoSiape(string $cpf)</span>
            </InfoGridItem>
          </InfoGrid>
          <div className="p-4 rounded-lg mb-4 bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Fluxo de Execução</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>consultaDadosFuncionais(cpf) → Dados funcionais</li>
              <li>consultaDadosPessoais(cpf) → Dados pessoais</li>
              <li>Para cada registro funcional:</li>
              <li className="ml-6">dadosUorg(codUorgExercicio) → Dados da unidade</li>
              <li className="ml-6">listaUorgs() → Lista todas unidades</li>
              <li>IntegracaoService-{'>'}sincronizar() → Atualiza BD</li>
            </ol>
          </div>
          <InfoBox variant="warning" icon={Activity} title="Pré-requisito">
            A unidade do servidor deve já existir no banco. Caso contrário, é necessário fazer uma carga total na unidade primeiro.
            <p className="text-xs mt-2 text-gray-500">
              <strong>Requisições por CPF:</strong> 4+ (funcionais + pessoais + unidade + listaUorgs)
            </p>
          </InfoBox>
        </WhiteCard>

        {/* Referências */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={BookOpen} iconColor="text-govbr-green-700">Referências e Arquivos</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-900">Arquivos do Código</h3>
              <div className="space-y-2 text-xs">
                {[
                  { path: 'app/Jobs/BuscarDadosSiapeJob.php', desc: 'Job principal' },
                  { path: 'app/Jobs/SincronizarSiapeJob.php', desc: 'Job de sincronização' },
                  { path: 'app/Services/Siape/BuscarDados/', desc: 'Classes das 4 etapas' },
                  { path: 'app/Services/Siape/ProcessaDadosSiapeBD.php', desc: 'Processamento de XMLs' },
                  { path: 'app/Services/IntegracaoService.php', desc: 'Sincronização com BD' }
                ].map((file, i) => (
                  <div key={i} className="p-2 rounded bg-gray-50 border border-gray-200">
                    <p className="font-mono text-govbr-blue-600">{file.path}</p>
                    <p className="text-gray-500">{file.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm text-gray-900">Documentação Adicional</h3>
              <div className="space-y-2">
                <a href="https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 p-3 rounded hover:bg-blue-50 transition-colors bg-govbr-blue-50 border border-govbr-blue-600 no-underline">
                  <ExternalLink size={16} className="text-govbr-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-govbr-blue-600">Portal PGD - MGI</p>
                    <p className="text-xs text-gray-500">Documentação oficial do programa</p>
                  </div>
                </a>
                <div className="p-3 rounded bg-green-50 border border-govbr-green-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-govbr-green-700" />
                    <p className="text-sm font-semibold text-govbr-green-700">Mock SIAPE</p>
                  </div>
                  <p className="text-xs text-gray-500">external/mock-siape/README.md</p>
                </div>
                <div className="p-3 rounded bg-green-50 border border-govbr-green-700">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-govbr-green-700" />
                    <p className="text-sm font-semibold text-govbr-green-700">Documentação SIAPE</p>
                  </div>
                  <p className="text-xs text-gray-500">docs/siape/intro.md</p>
                </div>
              </div>
            </div>
          </div>
        </WhiteCard>

        {/* Resumo Final */}
        <WhiteCard className="avoid-break">
          <SectionTitle level={2}>Resumo</SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Database, color: 'bg-govbr-blue-600', title: '4 Etapas Sequenciais', desc: 'Coleta organizada de unidades e servidores' },
              { icon: Zap, color: 'bg-govbr-green-700', title: '5 Otimizações', desc: 'Reduz tempo e volume de requisições' },
              { icon: GitBranch, color: 'bg-amber-500', title: 'Pipeline Completo', desc: 'Coleta + Sincronização automática' }
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </WhiteCard>
      </main>

      <footer className="text-white py-8 mt-12 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Ministério da Gestão e da Inovação em Serviços Públicos</p>
          <p className="text-sm mt-2 opacity-60">
            Desenvolvido seguindo as diretrizes do Design System gov.br
          </p>
        </div>
      </footer>
    </div>
  )
}

// Componente auxiliar para tabelas de destino
function TableDestino({ title, fields, note }: {
  title: string
  fields: { campo: string; tipo: string; desc: string }[]
  note?: string
}) {
  return (
    <div className="overflow-x-auto mt-4">
      <p className="text-sm font-semibold mb-2 text-gray-900">Tabela de Destino: {title}</p>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="text-left p-2 text-gray-900">Campo</th>
            <th className="text-left p-2 text-gray-900">Tipo</th>
            <th className="text-left p-2 text-gray-900">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, i) => (
            <tr key={i} className="border-b border-gray-200">
              <td className="p-2 font-mono text-govbr-blue-600">{field.campo}</td>
              <td className="p-2 text-gray-500">{field.tipo}</td>
              <td className="p-2 text-gray-700">{field.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="text-xs mt-2 text-gray-500">{note}</p>}
    </div>
  )
}

// Componente auxiliar para tabelas de execução
function ExecucaoTable({ title, variant, rows, total }: {
  title: string
  variant: 'warning' | 'success'
  rows: { etapa: string; req: string; tempo: string }[]
  total: { req: string; tempo: string }
}) {
  const bgClass = variant === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-govbr-green-700'
  const titleClass = variant === 'warning' ? 'text-yellow-700' : 'text-govbr-green-700'
  const totalBg = variant === 'warning' ? 'bg-yellow-100' : 'bg-green-100'

  return (
    <div className={`p-4 rounded-lg border-2 ${bgClass}`}>
      <h3 className={`font-semibold mb-3 ${titleClass}`}>{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 text-gray-900">Etapa</th>
              <th className="text-left p-2 text-gray-900">Req.</th>
              <th className="text-left p-2 text-gray-900">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="p-2 text-gray-700">{row.etapa}</td>
                <td className="p-2 text-gray-700">{row.req}</td>
                <td className="p-2 text-gray-700">{row.tempo}</td>
              </tr>
            ))}
            <tr className={totalBg}>
              <td className="p-2 font-semibold text-gray-900">Total</td>
              <td className="p-2 font-semibold text-gray-900">{total.req}</td>
              <td className="p-2 font-semibold text-gray-900">{total.tempo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
