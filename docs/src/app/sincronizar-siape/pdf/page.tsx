'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { withBasePath } from '@/lib/basePath'

const DIAGRAMS = {
  pipeline: withBasePath('/mermaid/sincronizar-siape/pipeline.png'),
  architecture: withBasePath('/mermaid/sincronizar-siape/architecture.png'),
  sequence: withBasePath('/mermaid/sincronizar-siape/sequence.png'),
  dataflow: withBasePath('/mermaid/sincronizar-siape/dataflow.png'),
  specialCases: withBasePath('/mermaid/sincronizar-siape/special-cases.png'),
  timeline: withBasePath('/mermaid/sincronizar-siape/timeline.png'),
}

export default function SincronizarSiapePdfPage() {
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
          line-height: 1.4;
        }
        .page-break {
          page-break-before: always;
          break-before: page;
        }
        .avoid-break {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        h1, h2, h3, h4 {
          page-break-after: avoid;
          break-after: avoid;
        }
        table {
          page-break-inside: auto;
        }
        tr {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        img {
          max-width: 100% !important;
          height: auto !important;
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-govbr-blue-600 text-white py-6 px-8 avoid-break">
        <div className="flex items-center gap-4 mb-4">
          <img src={withBasePath('/govbr.webp')} alt="Gov.br" className="h-10" />
          <div className="border-l border-white/30 pl-4">
            <h1 className="text-2xl font-bold">Fluxo SincronizarSiapeJob</h1>
            <p className="text-sm opacity-80">Documentação Técnica - PETRVS-PGD</p>
          </div>
        </div>
        <div className="text-xs opacity-70">
          Gerado em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </div>
      </header>

      <main className="px-8 py-6">
        {/* Índice */}
        <section className="mb-8 avoid-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">Índice</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Visão Geral</li>
            <li>Arquitetura de Classes</li>
            <li>Fase 1: Sincronização de Unidades</li>
            <li>Fase 2: Sincronização de Servidores</li>
            <li>Fase 3: Atribuição de Gestores</li>
            <li>Fluxo de Dados</li>
            <li>Casos Especiais e Blacklist</li>
            <li>Timeline de Execução</li>
            <li>Métricas e Logs</li>
          </ol>
        </section>

        {/* 1. Visão Geral */}
        <section className="mb-8 avoid-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">1. Visão Geral</h2>

          <p className="text-sm text-gray-700 mb-4">
            O <strong>SincronizarSiapeJob</strong> é o segundo job do pipeline de integração SIAPE.
            Sua responsabilidade é processar os dados XML coletados pelo <code className="bg-gray-100 px-1 rounded text-xs">BuscarDadosSiapeJob</code> e
            sincronizá-los com as tabelas definitivas do sistema PETRVS-PGD.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>IMPORTANTE:</strong> Este job NÃO faz requisições à API SIAPE. Ele apenas processa dados que já foram
              coletados e armazenados nas tabelas temporárias pelo BuscarDadosSiapeJob.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-govbr-blue-50 p-3 rounded border border-govbr-blue-200 text-center">
              <p className="text-xs text-govbr-blue-600 font-semibold">Agendamento</p>
              <p className="text-sm font-bold text-govbr-blue-700">Diário às 03:00</p>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200 text-center">
              <p className="text-xs text-green-600 font-semibold">Fonte de Dados</p>
              <p className="text-sm font-bold text-green-700">Tabelas siape_*</p>
            </div>
            <div className="bg-purple-50 p-3 rounded border border-purple-200 text-center">
              <p className="text-xs text-purple-600 font-semibold">Destino</p>
              <p className="text-sm font-bold text-purple-700">usuarios, unidades</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-3">Pipeline de Sincronização</h3>
          <div className="border rounded-lg p-2 bg-gray-50">
            <Image src={DIAGRAMS.pipeline} alt="Pipeline de sincronização SIAPE" width={800} height={400} className="w-full h-auto" />
          </div>
        </section>

        {/* 2. Arquitetura */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">2. Arquitetura de Classes</h2>

          <p className="text-sm text-gray-700 mb-4">
            O sistema utiliza uma arquitetura em camadas com separação clara de responsabilidades.
            O Job orquestra o fluxo, delegando o processamento para services especializados.
          </p>

          <div className="border rounded-lg p-2 bg-gray-50 mb-6 avoid-break">
            <Image src={DIAGRAMS.architecture} alt="Diagrama de arquitetura de classes" width={800} height={400} className="w-full h-auto" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsabilidades por Classe</h3>
          <table className="w-full text-xs border-collapse avoid-break">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Classe</th>
                <th className="border p-2 text-left">Responsabilidade</th>
                <th className="border p-2 text-left">Localização</th>
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
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border p-2 font-mono text-govbr-blue-600">{row[0]}</td>
                  <td className="border p-2">{row[1]}</td>
                  <td className="border p-2 font-mono text-gray-500">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Diagrama de Sequência */}
        <section className="mb-8 avoid-break">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Diagrama de Sequência</h3>
          <div className="border rounded-lg p-2 bg-gray-50">
            <Image src={DIAGRAMS.sequence} alt="Diagrama de sequência" width={800} height={400} className="w-full h-auto" />
          </div>
        </section>

        {/* 3. Fase 1 */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">3. Fase 1: Sincronização de Unidades</h2>

          <div className="bg-govbr-blue-50 border-l-4 border-govbr-blue-600 p-4 mb-4 avoid-break">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-govbr-blue-600 text-white text-xs font-bold px-2 py-1 rounded">FASE 1</span>
              <h3 className="font-semibold text-govbr-blue-700">Sincronização de Unidades Organizacionais</h3>
            </div>
            <p className="text-sm text-gray-700">Processa dados da tabela siape_dadosUORG</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 avoid-break">
            <div className="bg-gray-50 p-3 rounded border">
              <h4 className="font-semibold text-sm mb-2 text-gray-800">Entrada</h4>
              <ul className="text-xs space-y-1 text-gray-600">
                <li>• Tabela: <code className="bg-gray-200 px-1">siape_dadosUORG</code></li>
                <li>• Filtro: <code className="bg-gray-200 px-1">processado = 0</code></li>
                <li>• Coluna: <code className="bg-gray-200 px-1">response</code> (XML)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <h4 className="font-semibold text-sm mb-2 text-green-800">Saída</h4>
              <ul className="text-xs space-y-1 text-gray-600">
                <li>• Tabela: <code className="bg-gray-200 px-1">integracao_unidades</code></li>
                <li>• Tabela: <code className="bg-gray-200 px-1">unidades</code></li>
                <li>• Atualização de hierarquia (path)</li>
              </ul>
            </div>
          </div>

          <h4 className="font-semibold text-sm mb-2 text-gray-800">Campos Mapeados do XML</h4>
          <div className="flex flex-wrap gap-1 mb-4">
            {['codigo', 'codigoPai', 'nomeUorg', 'siglaUorg', 'nomeAbreviado', 'codigoMunicipio', 'cpfTitularAutoridadeUorg', 'dataModificacao'].map(field => (
              <span key={field} className="bg-gray-100 text-xs px-2 py-1 rounded border">{field}</span>
            ))}
          </div>

          <h4 className="font-semibold text-sm mb-2 text-gray-800">Lógica de Processamento</h4>
          <ol className="list-decimal list-inside text-xs space-y-1 text-gray-700">
            <li>Ler XMLs da tabela <code className="bg-gray-100 px-1">siape_dadosUORG</code> onde <code className="bg-gray-100 px-1">processado = 0</code></li>
            <li>Parse XML usando XPath: <code className="bg-gray-100 px-1">{`//ns1:dadosUorgResponse/out`}</code></li>
            <li>Para cada UORG, verificar se já existe em <code className="bg-gray-100 px-1">integracao_unidades</code></li>
            <li>Se não existe: INSERT. Se existe e data_modificacao maior: UPDATE</li>
            <li>Atualizar hierarquia na tabela <code className="bg-gray-100 px-1">unidades</code> (campo path)</li>
            <li>Marcar registro como <code className="bg-gray-100 px-1">processado = 1</code></li>
          </ol>
        </section>

        {/* 4. Fase 2 */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-green-700 pb-2">4. Fase 2: Sincronização de Servidores</h2>

          <div className="bg-green-50 border-l-4 border-govbr-green-700 p-4 mb-4 avoid-break">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-govbr-green-700 text-white text-xs font-bold px-2 py-1 rounded">FASE 2</span>
              <h3 className="font-semibold text-govbr-green-700">Sincronização de Servidores</h3>
            </div>
            <p className="text-sm text-gray-700">Processa dados pessoais e funcionais</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 avoid-break">
            <div className="bg-gray-50 p-3 rounded border">
              <h4 className="font-semibold text-sm mb-2 text-gray-800">Entrada</h4>
              <ul className="text-xs space-y-1 text-gray-600">
                <li>• Tabela: <code className="bg-gray-200 px-1">siape_consultaDadosPessoais</code></li>
                <li>• Tabela: <code className="bg-gray-200 px-1">siape_consultaDadosFuncionais</code></li>
                <li>• JOIN por CPF, filtro: processado = 0</li>
              </ul>
            </div>
            <div className="bg-green-50 p-3 rounded border border-green-200">
              <h4 className="font-semibold text-sm mb-2 text-green-800">Saída</h4>
              <ul className="text-xs space-y-1 text-gray-600">
                <li>• Tabela: <code className="bg-gray-200 px-1">integracao_servidores</code></li>
                <li>• Tabela: <code className="bg-gray-200 px-1">usuarios</code></li>
                <li>• Tabela: <code className="bg-gray-200 px-1">unidades_integrantes</code></li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4 avoid-break">
            <h4 className="font-semibold text-sm mb-2 text-blue-800">Tratamento de Situações Funcionais</h4>
            <ul className="text-xs space-y-1 text-gray-700">
              <li><strong>Código 8</strong> (ATIVO_EM_OUTRO_ORGAO): Servidor ignorado</li>
              <li><strong>Código 76</strong> (CONTRATO_TEMPORARIO): Busca unidade por siglaUorgLotacao</li>
            </ul>
          </div>

          <h4 className="font-semibold text-sm mb-2 text-gray-800">Campos do XML de Dados Funcionais</h4>
          <div className="flex flex-wrap gap-1 mb-4">
            {['matriculaSiape', 'codSitFuncional', 'codUorgExercicio', 'siglaUorgLotacao', 'emailFuncional', 'modalidadePGD', 'participaPGD', 'jornadaTrabalho'].map(field => (
              <span key={field} className="bg-gray-100 text-xs px-2 py-1 rounded border">{field}</span>
            ))}
          </div>
        </section>

        {/* 5. Fase 3 */}
        <section className="mb-8 avoid-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-amber-500 pb-2">5. Fase 3: Atribuição de Gestores</h2>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">FASE 3</span>
              <h3 className="font-semibold text-amber-700">Atribuição de Gestores</h3>
            </div>
            <p className="text-sm text-gray-700">Vincula chefias às unidades</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 p-3 rounded mb-4">
            <p className="text-xs text-yellow-800">
              <strong>Pré-requisito:</strong> Esta fase só é executada se as Fases 1 e 2 forem concluídas com sucesso.
            </p>
          </div>

          <h4 className="font-semibold text-sm mb-2 text-gray-800">Lógica de Atribuição</h4>
          <ol className="list-decimal list-inside text-xs space-y-1 text-gray-700">
            <li>Query para identificar usuários com cpf_titular_autoridade_uorg sem GESTOR</li>
            <li>Para cada chefia encontrada:</li>
            <li className="ml-4">Se id_chefe vazio: remover GESTOR atual da unidade</li>
            <li className="ml-4">Se id_chefe preenchido: atribuir [LOTADO, GESTOR]</li>
            <li>Alterar perfil do usuário para Chefia</li>
          </ol>
        </section>

        {/* 6. Fluxo de Dados */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">6. Fluxo de Dados</h2>

          <p className="text-sm text-gray-700 mb-4">
            Visão completa do fluxo de dados desde os XMLs de entrada até as tabelas definitivas.
          </p>

          <div className="border rounded-lg p-2 bg-gray-50">
            <Image src={DIAGRAMS.dataflow} alt="Fluxo completo de dados do pipeline SIAPE" width={800} height={400} className="w-full h-auto" />
          </div>
        </section>

        {/* 7. Casos Especiais */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-red-600 pb-2">7. Casos Especiais e Blacklist</h2>

          <div className="border rounded-lg p-2 bg-gray-50 mb-6">
            <Image src={DIAGRAMS.specialCases} alt="Diagrama de tratamento de casos especiais" width={800} height={400} className="w-full h-auto" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-3">Mecanismo de Blacklist</h3>
          <p className="text-sm text-gray-700 mb-4">
            Quando a API SIAPE retorna um SOAP Fault com código 0002 (registro não encontrado),
            o CPF ou código é adicionado a uma blacklist para evitar requisições futuras desnecessárias.
          </p>

          <div className="grid grid-cols-2 gap-4 avoid-break">
            <div className="bg-gray-50 p-3 rounded border">
              <h4 className="font-semibold text-sm mb-2 text-gray-800">Tabela siape_blacklist</h4>
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b"><td className="py-1 font-mono">cpf</td><td className="py-1">CPF do servidor</td></tr>
                  <tr className="border-b"><td className="py-1 font-mono">operacao</td><td className="py-1">Nome da operação SOAP</td></tr>
                  <tr className="border-b"><td className="py-1 font-mono">response</td><td className="py-1">XML de erro</td></tr>
                  <tr><td className="py-1 font-mono">created_at</td><td className="py-1">Data de inclusão</td></tr>
                </tbody>
              </table>
            </div>
            <div className="bg-red-50 p-3 rounded border border-red-200">
              <h4 className="font-semibold text-sm mb-2 text-red-800">Exemplo de SOAP Fault</h4>
              <pre className="text-xs text-red-700 overflow-x-auto">{`<soap:Fault>
  <faultcode>0002</faultcode>
  <faultstring>
    Servidor não encontrado
  </faultstring>
</soap:Fault>`}</pre>
            </div>
          </div>
        </section>

        {/* 8. Timeline */}
        <section className="mb-8 page-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">8. Timeline de Execução</h2>

          <div className="border rounded-lg p-2 bg-gray-50">
            <Image src={DIAGRAMS.timeline} alt="Timeline de execução do SincronizarSiapeJob" width={800} height={400} className="w-full h-auto" />
          </div>
        </section>

        {/* 9. Métricas */}
        <section className="mb-8 avoid-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-govbr-blue-600 pb-2">9. Métricas e Logs</h2>

          <p className="text-sm text-gray-700 mb-4">
            O resultado de cada execução é salvo na tabela <code className="bg-gray-100 px-1 rounded text-xs">integracoes</code>
            com informações detalhadas sobre o processamento.
          </p>

          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Campo</th>
                <th className="border p-2 text-left">Descrição</th>
                <th className="border p-2 text-left">Exemplo</th>
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
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border p-2 font-mono text-govbr-blue-600">{row[0]}</td>
                  <td className="border p-2">{row[1]}</td>
                  <td className="border p-2 text-gray-500">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 px-8 text-center text-xs text-gray-500 avoid-break">
        <div className="flex justify-between items-center">
          <span>PETRVS-PGD - Documentação Técnica</span>
          <span>© {new Date().getFullYear()} Ministério da Gestão e da Inovação em Serviços Públicos</span>
        </div>
      </footer>
    </div>
  )
}
