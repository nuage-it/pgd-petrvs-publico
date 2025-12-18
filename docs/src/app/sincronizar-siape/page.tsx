'use client'

import { Database, Server, Users, Building2, Clock, GitBranch, FileCode, Cog, AlertTriangle, FileDown } from 'lucide-react'
import Link from 'next/link'
import TableOfContents, { TocItem } from '../components/TableOfContents'
import { DiagramImage } from '../components/DiagramImage'
import {
  DocHeader,
  Breadcrumb,
  InfoBox,
  SectionTitle,
  WhiteCard,
  PhaseCard,
  InfoGrid,
  InfoGridItem,
  DataComparison,
  BadgeGrid
} from '../components/doc-components'

const tocItems: TocItem[] = [
  { id: 'visao-geral', title: 'Visão Geral', level: 1 },
  { id: 'arquitetura', title: 'Arquitetura de Classes', level: 1 },
  { id: 'fase-1', title: 'Fase 1: Unidades', level: 1 },
  { id: 'fase-2', title: 'Fase 2: Servidores', level: 1 },
  { id: 'fase-3', title: 'Fase 3: Gestores', level: 1 },
  { id: 'fluxo-dados', title: 'Fluxo de Dados', level: 1 },
  { id: 'casos-especiais', title: 'Casos Especiais', level: 1 },
  { id: 'blacklist', title: 'Blacklist', level: 2 },
  { id: 'timeline', title: 'Timeline', level: 1 },
  { id: 'metricas', title: 'Métricas', level: 1 },
]

const DIAGRAMS = {
  pipeline: '/mermaid/sincronizar-siape/pipeline.png',
  architecture: '/mermaid/sincronizar-siape/architecture.png',
  sequence: '/mermaid/sincronizar-siape/sequence.png',
  dataflow: '/mermaid/sincronizar-siape/dataflow.png',
  specialCases: '/mermaid/sincronizar-siape/special-cases.png',
  timeline: '/mermaid/sincronizar-siape/timeline.png',
}

export default function SincronizarSiapePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TableOfContents items={tocItems} />

      <div className="lg:ml-64">
        <DocHeader
          title="Fluxo SincronizarSiapeJob"
          subtitle="Documentação Técnica - PETRVS-PGD"
          rightContent={
            <Link
              href="/sincronizar-siape/pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-govbr-blue-600 text-white rounded-lg hover:bg-govbr-blue-700 transition-colors text-sm font-medium"
            >
              <FileDown size={18} />
              Versão para Impressão
            </Link>
          }
        />

        <Breadcrumb
          items={[
            { label: 'SincronizarSiapeJob' }
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Visão Geral */}
          <section id="visao-geral">
            <SectionTitle icon={Cog}>Visão Geral</SectionTitle>

            <WhiteCard className="mb-6">
              <p className="text-gray-700 mb-4">
                O <strong>SincronizarSiapeJob</strong> é o segundo job do pipeline de integração SIAPE.
                Sua responsabilidade é processar os dados XML coletados pelo <code className="bg-gray-100 px-1 rounded">BuscarDadosSiapeJob</code> e
                sincronizá-los com as tabelas definitivas do sistema PETRVS-PGD.
              </p>

              <InfoBox variant="warning" title="IMPORTANTE" className="mb-4">
                Este job NÃO faz requisições à API SIAPE. Ele apenas processa dados que já foram
                coletados e armazenados nas tabelas temporárias pelo BuscarDadosSiapeJob.
              </InfoBox>

              <InfoGrid columns={3}>
                <InfoGridItem icon={Clock} title="Agendamento" value="Diário às 03:00" variant="blue" />
                <InfoGridItem icon={Database} title="Fonte de Dados" value="Tabelas siape_*" variant="green" />
                <InfoGridItem icon={Server} title="Destino" value="usuarios, unidades" variant="purple" />
              </InfoGrid>
            </WhiteCard>

            <WhiteCard title="Pipeline de Sincronização">
              <DiagramImage src={DIAGRAMS.pipeline} alt="Pipeline de sincronização SIAPE" />
            </WhiteCard>
          </section>

          {/* Arquitetura */}
          <section id="arquitetura">
            <SectionTitle icon={GitBranch}>Arquitetura de Classes</SectionTitle>

            <WhiteCard className="mb-6">
              <p className="text-gray-700 mb-4">
                O sistema utiliza uma arquitetura em camadas com separação clara de responsabilidades.
                O Job orquestra o fluxo, delegando o processamento para services especializados.
              </p>

              <DiagramImage src={DIAGRAMS.architecture} alt="Diagrama de arquitetura de classes" />
            </WhiteCard>

            <WhiteCard title="Responsabilidades por Classe">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left p-3 font-semibold">Classe</th>
                      <th className="text-left p-3 font-semibold">Responsabilidade</th>
                      <th className="text-left p-3 font-semibold">Localização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['SincronizarSiapeJob', 'Orquestração e agendamento', 'Jobs/SincronizarSiapeJob.php'],
                      ['IntegracaoService', 'Coordenação das 3 fases', 'Services/IntegracaoService.php'],
                      ['IntegracaoSiapeService', 'Transformação de dados', 'Services/IntegracaoSiapeService.php'],
                      ['ProcessaDadosSiapeBD', 'Parse XML com XPath', 'Services/ProcessaDadosSiapeBD.php'],
                      ['Servidor\\Integracao', 'Processamento de servidores', 'Models/Servidor/Integracao.php'],
                      ['Gestor\\Integracao', 'Atribuição de gestores', 'Models/Gestor/Integracao.php'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-mono text-govbr-blue-600">{row[0]}</td>
                        <td className="p-3 text-gray-700">{row[1]}</td>
                        <td className="p-3 text-gray-500 font-mono text-xs">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </WhiteCard>
          </section>

          {/* Diagrama de Sequência */}
          <section id="sequencia">
            <WhiteCard title="Diagrama de Sequência - Interação entre Classes">
              <DiagramImage src={DIAGRAMS.sequence} alt="Diagrama de sequência mostrando a interação entre as camadas" />
            </WhiteCard>
          </section>

          {/* Fase 1: Unidades */}
          <section id="fase-1">
            <SectionTitle icon={Building2}>Fase 1: Unidades</SectionTitle>

            <PhaseCard phase={1} title="Sincronização de Unidades Organizacionais" subtitle="Processa dados da tabela siape_dadosUORG" className="mb-6">
              <DataComparison
                input={{
                  title: 'Entrada',
                  items: [
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">siape_dadosUORG</code></>,
                    <>Filtro: <code className="bg-gray-100 px-1 rounded">processado = 0</code></>,
                    <>Coluna: <code className="bg-gray-100 px-1 rounded">response</code> (XML)</>
                  ]
                }}
                output={{
                  title: 'Saída',
                  items: [
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">integracao_unidades</code></>,
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">unidades</code></>,
                    'Atualização de hierarquia (path)'
                  ]
                }}
                className="mb-4"
              />

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Campos Mapeados do XML</h4>
                <BadgeGrid
                  items={['codigo', 'codigoPai', 'nomeUorg', 'siglaUorg', 'nomeAbreviado', 'codigoMunicipio', 'cpfTitularAutoridadeUorg', 'dataModificacao']}
                  columns={4}
                />
              </div>
            </PhaseCard>

            <WhiteCard>
              <h4 className="font-semibold text-gray-800 mb-3">Lógica de Processamento</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Ler XMLs da tabela <code className="bg-gray-100 px-1 rounded">siape_dadosUORG</code> onde <code className="bg-gray-100 px-1 rounded">processado = 0</code></li>
                <li>Parse XML usando XPath: <code className="bg-gray-100 px-1 rounded">{`//ns1:dadosUorgResponse/out`}</code></li>
                <li>Para cada UORG, verificar se já existe em <code className="bg-gray-100 px-1 rounded">integracao_unidades</code></li>
                <li>Se não existe: INSERT. Se existe e data_modificacao maior: UPDATE</li>
                <li>Atualizar hierarquia na tabela <code className="bg-gray-100 px-1 rounded">unidades</code> (campo path)</li>
                <li>Marcar registro como <code className="bg-gray-100 px-1 rounded">processado = 1</code></li>
              </ol>
            </WhiteCard>
          </section>

          {/* Fase 2: Servidores */}
          <section id="fase-2">
            <SectionTitle icon={Users} iconColor="text-govbr-green-600">Fase 2: Servidores</SectionTitle>

            <PhaseCard phase={2} title="Sincronização de Servidores" subtitle="Processa dados pessoais e funcionais">
              <DataComparison
                input={{
                  title: 'Entrada',
                  items: [
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">siape_consultaDadosPessoais</code></>,
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">siape_consultaDadosFuncionais</code></>,
                    'JOIN por CPF, filtro: processado = 0'
                  ]
                }}
                output={{
                  title: 'Saída',
                  items: [
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">integracao_servidores</code></>,
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">usuarios</code></>,
                    <>Tabela: <code className="bg-gray-100 px-1 rounded">unidades_integrantes</code></>
                  ]
                }}
                className="mb-4"
              />

              <InfoBox variant="info" className="mb-4">
                <strong className="block mb-1">Tratamento de Situações Funcionais</strong>
                <ul className="text-sm space-y-1">
                  <li><strong>Código 8</strong> (ATIVO_EM_OUTRO_ORGAO): Servidor ignorado</li>
                  <li><strong>Código 76</strong> (CONTRATO_TEMPORARIO): Busca unidade por siglaUorgLotacao</li>
                </ul>
              </InfoBox>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Campos do XML de Dados Funcionais</h4>
                <BadgeGrid
                  items={['matriculaSiape', 'codSitFuncional', 'codUorgExercicio', 'siglaUorgLotacao', 'emailFuncional', 'modalidadePGD', 'participaPGD', 'jornadaTrabalho']}
                  columns={4}
                />
              </div>
            </PhaseCard>
          </section>

          {/* Fase 3: Gestores */}
          <section id="fase-3">
            <SectionTitle icon={Users} iconColor="text-amber-600">Fase 3: Gestores</SectionTitle>

            <PhaseCard phase={3} title="Atribuição de Gestores" subtitle="Vincula chefias às unidades">
              <InfoBox variant="warning" title="Pré-requisito" className="mb-4">
                Esta fase só é executada se as Fases 1 e 2 forem concluídas com sucesso.
              </InfoBox>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Lógica de Atribuição</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Query para identificar usuários com cpf_titular_autoridade_uorg sem GESTOR</li>
                  <li>Para cada chefia encontrada:</li>
                  <li className="ml-4">Se id_chefe vazio: remover GESTOR atual da unidade</li>
                  <li className="ml-4">Se id_chefe preenchido: atribuir [LOTADO, GESTOR]</li>
                  <li>Alterar perfil do usuário para Chefia</li>
                </ol>
              </div>
            </PhaseCard>
          </section>

          {/* Fluxo de Dados */}
          <section id="fluxo-dados">
            <SectionTitle icon={Database}>Fluxo de Dados</SectionTitle>

            <WhiteCard>
              <p className="text-gray-700 mb-4">
                Visão completa do fluxo de dados desde os XMLs de entrada até as tabelas definitivas.
              </p>
              <DiagramImage src={DIAGRAMS.dataflow} alt="Fluxo completo de dados do pipeline SIAPE" />
            </WhiteCard>
          </section>

          {/* Casos Especiais */}
          <section id="casos-especiais">
            <SectionTitle icon={AlertTriangle} iconColor="text-red-600">Casos Especiais</SectionTitle>

            <WhiteCard className="mb-6">
              <DiagramImage src={DIAGRAMS.specialCases} alt="Diagrama de tratamento de casos especiais" />
            </WhiteCard>

            <WhiteCard title="Mecanismo de Blacklist" id="blacklist">
              <p className="text-gray-700 mb-4">
                Quando a API SIAPE retorna um SOAP Fault com código 0002 (registro não encontrado),
                o CPF ou código é adicionado a uma blacklist para evitar requisições futuras desnecessárias.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Tabela siape_blacklist</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b"><td className="py-1 font-mono">cpf</td><td className="py-1 text-gray-600">CPF do servidor</td></tr>
                      <tr className="border-b"><td className="py-1 font-mono">operacao</td><td className="py-1 text-gray-600">Nome da operação SOAP</td></tr>
                      <tr className="border-b"><td className="py-1 font-mono">response</td><td className="py-1 text-gray-600">XML de erro</td></tr>
                      <tr><td className="py-1 font-mono">created_at</td><td className="py-1 text-gray-600">Data de inclusão</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Exemplo de SOAP Fault</h4>
                  <pre className="text-xs text-red-700 overflow-x-auto">{`<soap:Fault>
  <faultcode>0002</faultcode>
  <faultstring>
    Servidor não encontrado
  </faultstring>
</soap:Fault>`}</pre>
                </div>
              </div>
            </WhiteCard>
          </section>

          {/* Timeline */}
          <section id="timeline">
            <SectionTitle icon={Clock}>Timeline de Execução</SectionTitle>

            <WhiteCard>
              <DiagramImage src={DIAGRAMS.timeline} alt="Timeline de execução do SincronizarSiapeJob" />
            </WhiteCard>
          </section>

          {/* Métricas */}
          <section id="metricas">
            <SectionTitle icon={FileCode}>Métricas e Logs</SectionTitle>

            <WhiteCard>
              <p className="text-gray-700 mb-4">
                O resultado de cada execução é salvo na tabela <code className="bg-gray-100 px-1 rounded">integracoes</code>
                com informações detalhadas sobre o processamento.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left p-3 font-semibold">Campo</th>
                      <th className="text-left p-3 font-semibold">Descrição</th>
                      <th className="text-left p-3 font-semibold">Exemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['tipo', 'Tipo de integração', 'SIAPE'],
                      ['unidades_sucesso', 'Resultado fase 1', 'true/false'],
                      ['servidores_sucesso', 'Resultado fase 2', 'true/false'],
                      ['gestores_sucesso', 'Resultado fase 3', 'true/false'],
                      ['mensagem', 'Detalhes da execução', 'Sincronização concluída'],
                      ['data_execucao', 'Timestamp', '2025-12-17 03:00:00'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-mono text-govbr-blue-600">{row[0]}</td>
                        <td className="p-3 text-gray-700">{row[1]}</td>
                        <td className="p-3 text-gray-500">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </WhiteCard>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <img src="https://www.gov.br/ds/assets/img/govbr-logo-large.png" alt="Logo gov.br" className="h-8 brightness-0 invert" />
                <span className="text-sm text-gray-400">PETRVS-PGD</span>
              </div>
              <p className="text-sm text-gray-400">
                Documentação técnica gerada em {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
