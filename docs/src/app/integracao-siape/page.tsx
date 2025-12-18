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
import { withBasePath } from '@/lib/basePath'

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
          <SectionTitle level={1}>Integração SIAPE - Documentação Técnica</SectionTitle>
          <p className="text-lg text-gray-700">
            Documentação hierárquica completa da integração PGD Petrvs com SIAPE via ConectaGov
          </p>
          <div className="mt-4 p-4 rounded-lg bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-govbr-blue-600">📋 Estrutura da Documentação</h3>
            <div className="grid md:grid-cols-4 gap-3 text-sm">
              <div className="text-center">
                <div className="font-semibold text-govbr-blue-600">Nível 1</div>
                <div className="text-xs text-gray-600">Contexto Geral</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-govbr-blue-600">Nível 2</div>
                <div className="text-xs text-gray-600">Arquitetura</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-govbr-blue-600">Nível 3</div>
                <div className="text-xs text-gray-600">Processos</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-govbr-blue-600">Nível 4</div>
                <div className="text-xs text-gray-600">Detalhes Técnicos</div>
              </div>
            </div>
          </div>
        </div>

        {/* NÍVEL 1: CONTEXTO GERAL */}
        <div className="page-break">
          <SectionTitle level={2} className="text-govbr-blue-600">📋 NÍVEL 1: CONTEXTO GERAL</SectionTitle>
          
          {/* Contexto do Sistema */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Database}>Contexto do Sistema PGD-SIAPE</SectionTitle>
            <p className="mb-4 text-gray-700">
              Visão geral da integração entre o Sistema PGD Petrvs e o SIAPE no contexto do Governo Federal.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-1-contexto/sistema-contexto.png')} alt="Contexto geral do sistema PGD-SIAPE" className="w-full rounded-lg border border-gray-200" />
            </div>
            <InfoBox variant="info" icon={Activity} title="INTEGRAÇÃO GOVERNAMENTAL">
              O PGD Petrvs integra-se com o SIAPE através do ConectaGov, garantindo dados oficiais e atualizados
              para o Programa de Gestão e Desempenho dos órgãos públicos federais.
            </InfoBox>
          </WhiteCard>

          {/* Atores Principais */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={User}>Atores e Responsabilidades</SectionTitle>
            <p className="mb-4 text-gray-700">
              Mapeamento completo dos atores envolvidos na integração e suas responsabilidades.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-1-contexto/atores-principais.png')} alt="Atores principais da integração" className="w-full rounded-lg border border-gray-200" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-govbr-blue-600">
                <h3 className="font-semibold mb-2 text-govbr-blue-600">🌐 Externos</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• MGI/SIAPE (fonte oficial)</li>
                  <li>• ConectaGov (gateway)</li>
                  <li>• Órgãos públicos</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
                <h3 className="font-semibold mb-2 text-govbr-green-700">⚙️ Sistema PGD</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Módulo integração</li>
                  <li>• Módulo gestão</li>
                  <li>• Camada de dados</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 border border-orange-500">
                <h3 className="font-semibold mb-2 text-orange-600">👥 Usuários</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Gestores e chefias</li>
                  <li>• Servidores públicos</li>
                  <li>• Administradores</li>
                </ul>
              </div>
            </div>
          </WhiteCard>
        </div>

        {/* NÍVEL 2: ARQUITETURA */}
        <div className="page-break">
          <SectionTitle level={2} className="text-govbr-green-700">⚙️ NÍVEL 2: ARQUITETURA TÉCNICA</SectionTitle>
          
          {/* Componentes Técnicos */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Layers}>Componentes Técnicos</SectionTitle>
            <p className="mb-4 text-gray-700">
              Arquitetura em camadas da integração SIAPE com detalhamento de componentes técnicos.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-2-arquitetura/componentes-tecnicos.png')} alt="Componentes técnicos da arquitetura" className="w-full rounded-lg border border-gray-200" />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-blue-50 border border-govbr-blue-600 text-center">
                <h4 className="font-semibold text-govbr-blue-600 mb-2">🌐 Externa</h4>
                <p className="text-xs text-gray-600">API SIAPE, Protocolos</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-govbr-green-700 text-center">
                <h4 className="font-semibold text-govbr-green-700 mb-2">⚙️ Aplicação</h4>
                <p className="text-xs text-gray-600">Jobs, Services, Classes</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-500 text-center">
                <h4 className="font-semibold text-orange-600 mb-2">💾 Dados</h4>
                <p className="text-xs text-gray-600">Temp, Produção, Backup</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-500 text-center">
                <h4 className="font-semibold text-purple-600 mb-2">🖥️ Infraestrutura</h4>
                <p className="text-xs text-gray-600">Runtime, BD, Monitoring</p>
              </div>
            </div>
          </WhiteCard>

          {/* APIs e Endpoints */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Code}>APIs e Endpoints</SectionTitle>
            <p className="mb-4 text-gray-700">
              Detalhamento completo das APIs ConectaGov/SIAPE e configurações de comunicação.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-2-arquitetura/apis-endpoints.png')} alt="APIs e endpoints detalhados" className="w-full rounded-lg border border-gray-200" />
            </div>
            <InfoBox variant="warning" icon={Lock} title="SEGURANÇA">
              Todas as comunicações utilizam HTTPS/TLS 1.3, OAuth 2.0 e controle de taxa para garantir
              segurança e disponibilidade dos serviços.
            </InfoBox>
          </WhiteCard>

          {/* Pipeline Completo */}
          <WhiteCard className="avoid-break">
            <SectionTitle level={3}>Pipeline Completo de Sincronização</SectionTitle>
            <p className="mb-4 text-gray-700">
              Visão geral do fluxo completo desde a API SIAPE até as tabelas definitivas do sistema.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-2-arquitetura/pipeline.png')} alt="Pipeline completo de integração SIAPE" className="w-full rounded-lg border border-gray-200" />
            </div>
          <div className="grid md:grid-cols-2 gap-6">
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
        </WhiteCard>

          {/* Arquitetura de Classes */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Layers}>Arquitetura de Classes</SectionTitle>
            <p className="mb-4 text-gray-700">
              Estrutura de herança e relacionamentos entre as classes do BuscarDadosSiapeJob.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-2-arquitetura/architecture.png')} alt="Arquitetura de classes da integração SIAPE" className="w-full rounded-lg border border-gray-200" />
            </div>
          <div className="grid md:grid-cols-4 gap-4">
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

        </div>

        {/* NÍVEL 3: PROCESSOS */}
        <div className="page-break">
          <SectionTitle level={2} className="text-orange-600">🔄 NÍVEL 3: FLUXOS DE PROCESSO</SectionTitle>
          
          {/* Fluxo Completo */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Activity}>Fluxo Completo de Execução</SectionTitle>
            <p className="mb-4 text-gray-700">
              Processo completo desde o gatilho inicial até a finalização, incluindo todas as fases.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-3-processos/fluxo-completo.png')} alt="Fluxo completo de execução" className="w-full rounded-lg border border-gray-200" />
            </div>
            <div className="grid md:grid-cols-5 gap-3">
              {[
                { fase: 'Gatilhos', desc: 'Cron, Manual, Evento', color: 'bg-blue-50 border-govbr-blue-600' },
                { fase: 'Preparação', desc: 'Config, Recursos', color: 'bg-purple-50 border-purple-500' },
                { fase: 'Execução', desc: '4 Etapas SIAPE', color: 'bg-green-50 border-govbr-green-700' },
                { fase: 'Sincronização', desc: 'Parse, Sync, Cleanup', color: 'bg-orange-50 border-orange-500' },
                { fase: 'Finalização', desc: 'Relatórios, Notificações', color: 'bg-pink-50 border-pink-500' }
              ].map((fase, i) => (
                <div key={i} className={`p-3 rounded-lg border text-center ${fase.color}`}>
                  <div className="font-semibold text-sm mb-1">{fase.fase}</div>
                  <div className="text-xs text-gray-600">{fase.desc}</div>
                </div>
              ))}
            </div>
          </WhiteCard>

          {/* Tratamento de Erros */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Zap}>Tratamento de Erros e Recuperação</SectionTitle>
            <p className="mb-4 text-gray-700">
              Estratégias abrangentes para tratamento de erros, recuperação e monitoramento.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-3-processos/tratamento-erros.png')} alt="Tratamento de erros e recuperação" className="w-full rounded-lg border border-gray-200" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-500">
                <h4 className="font-semibold text-red-600 mb-2">❌ Tipos de Erro</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Rede (timeout, conexão)</li>
                  <li>• Autenticação (token, credenciais)</li>
                  <li>• Dados (XML, schema, regras)</li>
                  <li>• Sistema (memória, BD, disco)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
                <h4 className="font-semibold text-govbr-green-700 mb-2">🛠️ Estratégias</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Retry com backoff</li>
                  <li>• Circuit breaker</li>
                  <li>• Fallback e recovery</li>
                  <li>• Checkpoint system</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-govbr-blue-600">
                <h4 className="font-semibold text-govbr-blue-600 mb-2">📊 Monitoramento</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Health checks</li>
                  <li>• Alertas automáticos</li>
                  <li>• Logs estruturados</li>
                  <li>• Métricas de performance</li>
                </ul>
              </div>
            </div>
          </WhiteCard>

          {/* Sequência de Execução */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={GitBranch}>Sequência Detalhada das Etapas</SectionTitle>
            <p className="mb-4 text-gray-700">
              Fluxo detalhado de execução das 4 etapas sequenciais com interações entre componentes.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-3-processos/sequence.png')} alt="Sequência de execução das etapas" className="w-full rounded-lg border border-gray-200" />
            </div>
          </WhiteCard>

          {/* Fluxo de Dados */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Database}>Fluxo de Dados</SectionTitle>
            <p className="mb-4 text-gray-700">
              Visualização do fluxo de dados desde a API SIAPE até as tabelas definitivas do sistema.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-3-processos/dataflow.png')} alt="Fluxo de dados da integração SIAPE" className="w-full rounded-lg border border-gray-200" />
            </div>
          </WhiteCard>
        </div>

        {/* NÍVEL 4: DETALHES TÉCNICOS */}
        <div className="page-break">
          <SectionTitle level={2} className="text-purple-600">🔧 NÍVEL 4: DETALHES TÉCNICOS</SectionTitle>
          
          {/* Estruturas de Dados */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Database}>Estruturas de Dados</SectionTitle>
            <p className="mb-4 text-gray-700">
              Modelo de dados completo com relacionamentos entre tabelas temporárias, controle e produção.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-4-detalhes/estruturas-dados.png')} alt="Estruturas de dados detalhadas" className="w-full rounded-lg border border-gray-200" />
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-500 text-center">
                <h4 className="font-semibold text-yellow-600 mb-2">🗃️ Temporárias</h4>
                <p className="text-xs text-gray-600">5 tabelas XMLs SIAPE</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-govbr-blue-600 text-center">
                <h4 className="font-semibold text-govbr-blue-600 mb-2">🎯 Controle</h4>
                <p className="text-xs text-gray-600">Status sincronização</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-govbr-green-700 text-center">
                <h4 className="font-semibold text-govbr-green-700 mb-2">🏛️ Produção</h4>
                <p className="text-xs text-gray-600">Dados oficiais finais</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-400 text-center">
                <h4 className="font-semibold text-gray-600 mb-2">📋 Auditoria</h4>
                <p className="text-xs text-gray-600">Logs e configurações</p>
              </div>
            </div>
          </WhiteCard>

          {/* Mapeamento de Campos */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Code}>Mapeamento de Campos XML</SectionTitle>
            <p className="mb-4 text-gray-700">
              Transformação detalhada dos dados XML SIAPE para as estruturas do banco de dados PGD.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-4-detalhes/mapeamento-campos.png')} alt="Mapeamento detalhado de campos" className="w-full rounded-lg border border-gray-200" />
            </div>
            <InfoBox variant="info" icon={Filter} title="TRANSFORMAÇÕES APLICADAS">
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="font-semibold text-sm mb-2">📄 Processamento XML</h4>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>• XPath queries para extração</li>
                    <li>• Normalização de strings</li>
                    <li>• Validação de schemas</li>
                    <li>• Conversão de tipos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">🔍 Regras de Negócio</h4>
                  <ul className="text-xs space-y-1 text-gray-600">
                    <li>• Filtros de situação</li>
                    <li>• Validação de CPF</li>
                    <li>• Mapeamento de enums</li>
                    <li>• Hierarquia de unidades</li>
                  </ul>
                </div>
              </div>
            </InfoBox>
          </WhiteCard>

          {/* Otimizações */}
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Zap} iconColor="text-govbr-green-700">Mecanismos de Otimização</SectionTitle>
            <p className="mb-4 text-gray-700">
              5 mecanismos implementados para reduzir tempo de execução e volume de requisições.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-4-detalhes/optimization.png')} alt="Mecanismos de otimização" className="w-full rounded-lg border border-gray-200" />
            </div>
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
          <WhiteCard className="avoid-break">
            <SectionTitle icon={Settings}>Configurações Detalhadas</SectionTitle>
            <p className="mb-4 text-gray-700">
              Configurações completas do sistema incluindo variáveis de ambiente, limites e monitoramento.
            </p>
            <div className="mb-6">
              <img src={withBasePath('/mermaid/integracao-siape/nivel-4-detalhes/configuration.png')} alt="Configurações do sistema" className="w-full rounded-lg border border-gray-200" />
            </div>
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

        </div>

        {/* Resumo Final */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle level={2}>📋 Resumo da Documentação Hierárquica</SectionTitle>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Database, color: 'bg-govbr-blue-600', title: 'Nível 1: Contexto', desc: 'Visão geral e atores do sistema governamental' },
              { icon: Layers, color: 'bg-govbr-green-700', title: 'Nível 2: Arquitetura', desc: 'Componentes técnicos e APIs detalhadas' },
              { icon: Activity, color: 'bg-orange-500', title: 'Nível 3: Processos', desc: 'Fluxos completos e tratamento de erros' },
              { icon: Code, color: 'bg-purple-600', title: 'Nível 4: Detalhes', desc: 'Estruturas de dados e mapeamentos' }
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
          <div className="mt-6 p-4 rounded-lg bg-govbr-blue-50 border border-govbr-blue-600">
            <h3 className="font-semibold mb-2 text-govbr-blue-600">📊 Cobertura Documental Completa</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">✅ Documentado</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• 12 diagramas Mermaid hierárquicos</li>
                  <li>• 4 níveis de abstração</li>
                  <li>• Contexto governamental completo</li>
                  <li>• Arquitetura técnica detalhada</li>
                  <li>• Fluxos de processo e erros</li>
                  <li>• Estruturas de dados e mapeamentos</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Benefícios</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Documentação auto-explicativa</li>
                  <li>• Facilita manutenção e evolução</li>
                  <li>• Onboarding de novos desenvolvedores</li>
                  <li>• Alinhamento com padrões MGI</li>
                  <li>• Suporte a decisões técnicas</li>
                  <li>• Auditoria e compliance</li>
                </ul>
              </div>
            </div>
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
