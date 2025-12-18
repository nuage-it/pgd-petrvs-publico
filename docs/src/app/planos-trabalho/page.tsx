'use client'

import {
  Home, FileText, Users, Target, CheckCircle, Clock, AlertCircle,
  XCircle, Pause, Calendar, Building, Settings, Package, Lightbulb,
  AlertTriangle, CheckSquare
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
  InfoGridItem,
  StepGuide,
  StepGuideItem
} from '../components/doc-components'

export default function PlanosTrabalho() {
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
          font-size: 12pt;
          line-height: 1.4;
        }
        .print-hide {
          display: none !important;
        }
        .page-break {
          page-break-before: always;
        }
        .avoid-break {
          page-break-inside: avoid;
        }
        h1, h2, h3 {
          page-break-after: avoid;
        }
        .container {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .grid {
          display: block !important;
        }
        .grid > div {
          margin-bottom: 1rem;
        }
      }
      @page {
        margin: 2cm;
        size: A4;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/', icon: Home },
    { label: 'Planos de Trabalho', icon: FileText }
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
        <div className="mb-8">
          <SectionTitle level={1}>Como Criar Planos de Trabalho</SectionTitle>
          <p className="text-lg text-gray-700">
            Guia completo para servidores públicos sobre a criação e gestão de planos de trabalho no sistema PGD Petrvs
          </p>
        </div>

        {/* Contexto Legal */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={AlertCircle}>Contexto Legal do PGD</SectionTitle>
          <p className="mb-4 text-gray-700">
            O Programa de Gestão e Desempenho (PGD) foi instituído pelo <strong>Decreto nº 11.072/2022</strong> e
            regulamentado pela <strong>Instrução Normativa MGI nº 88/2024</strong>, que revogou a IN nº 65/2020,
            estabelecendo novas diretrizes para o trabalho remoto e híbrido na Administração Pública Federal.
          </p>
          <InfoBox variant="info">
            <strong>Atualização Legal:</strong> A IN MGI nº 88/2024 trouxe importantes atualizações, incluindo
            novos critérios de elegibilidade, modalidades de trabalho e procedimentos de avaliação,
            modernizando o framework do PGD.
          </InfoBox>
        </WhiteCard>

        {/* O que é um Plano de Trabalho */}
        <WhiteCard className="avoid-break">
          <SectionTitle level={2}>O que é um Plano de Trabalho Individual?</SectionTitle>
          <p className="mb-4 text-gray-700">
            Conforme definido pelo MGI, o Plano de Trabalho Individual é o documento que estabelece as entregas
            esperadas do servidor, os prazos para execução e os critérios de avaliação, sendo requisito
            obrigatório para participação no PGD em modalidades de trabalho remoto e híbrido.
          </p>
          <InfoBox variant="warning" icon={Lightbulb} title="Importante">
            O plano deve estar alinhado com o Plano de Trabalho da Unidade e contribuir para o alcance
            dos objetivos estratégicos do órgão, conforme diretrizes da IN MGI nº 88/2024.
          </InfoBox>
          <InfoGrid columns={3} className="mt-6">
            <InfoGridItem icon={Users} title="Modalidades de Trabalho" variant="blue">
              <div className="text-sm text-gray-700">
                <p className="mb-2"><strong>Teletrabalho:</strong> 100% remoto</p>
                <p className="mb-2"><strong>Trabalho Híbrido:</strong> Combinação de presencial e remoto</p>
                <p><strong>Trabalho Presencial:</strong> Execução nas dependências do órgão</p>
              </div>
            </InfoGridItem>
            <InfoGridItem icon={Package} title="Entregas" variant="green">
              <p className="text-sm text-gray-700">Produtos e resultados esperados</p>
            </InfoGridItem>
            <InfoGridItem icon={Target} title="Avaliação" variant="yellow">
              <p className="text-sm text-gray-700">Critérios de acompanhamento</p>
            </InfoGridItem>
          </InfoGrid>
        </WhiteCard>

        {/* Passo a passo */}
        <WhiteCard className="page-break">
          <SectionTitle level={2}>Passo a Passo para Criar seu Plano</SectionTitle>
          <StepGuide>
            <StepGuideItem step={1} title="Verificar Elegibilidade e Pré-requisitos">
              <p className="mb-3 text-gray-700">
                Conforme Art. 4º do Decreto nº 11.072/2022, verifique se você atende aos critérios:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-3">
                <div className="p-3 rounded bg-green-50 border border-govbr-green-700">
                  <h4 className="font-semibold text-sm mb-2 text-govbr-green-700">Elegibilidade Legal</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                    <li>Servidor público federal ativo</li>
                    <li>Não estar em estágio probatório</li>
                    <li>Atividades compatíveis com trabalho remoto</li>
                    <li>Autorização da chefia imediata</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-govbr-blue-50 border border-govbr-blue-600">
                  <h4 className="font-semibold text-sm mb-2 text-govbr-blue-600">Pré-requisitos Técnicos</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                    <li>Programa de Gestão ativo na unidade</li>
                    <li>Plano de Trabalho da Unidade aprovado</li>
                    <li>Cadastro no sistema Petrvs</li>
                    <li>Perfil de participante habilitado</li>
                  </ul>
                </div>
              </div>
            </StepGuideItem>

            <StepGuideItem step={2} title="Definir Informações Básicas">
              <p className="mb-3 text-gray-700">
                Configure os dados fundamentais do seu plano:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded border border-gray-200 flex items-center gap-2">
                  <Calendar size={16} className="text-govbr-blue-600" />
                  <span><strong>Período:</strong> Data de início e fim</span>
                </div>
                <div className="p-3 rounded border border-gray-200 flex items-center gap-2">
                  <Clock size={16} className="text-govbr-blue-600" />
                  <span><strong>Carga Horária:</strong> Horas diárias de trabalho</span>
                </div>
                <div className="p-3 rounded border border-gray-200 flex items-center gap-2">
                  <Users size={16} className="text-govbr-blue-600" />
                  <span><strong>Modalidade:</strong> Remoto, híbrido ou presencial</span>
                </div>
                <div className="p-3 rounded border border-gray-200 flex items-center gap-2">
                  <Building size={16} className="text-govbr-blue-600" />
                  <span><strong>Unidade:</strong> Unidade executora do plano</span>
                </div>
              </div>
            </StepGuideItem>

            <StepGuideItem step={3} title="Cadastrar Entregas">
              <p className="mb-3 text-gray-700">
                Defina as entregas que você irá realizar durante o período:
              </p>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h4 className="font-semibold mb-2">Cada entrega deve conter:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
                  <li><strong>Descrição clara:</strong> O que será entregue</li>
                  <li><strong>Percentual de esforço:</strong> Quanto da sua jornada será dedicada</li>
                  <li><strong>Meta:</strong> Objetivo quantitativo ou qualitativo</li>
                  <li><strong>Vinculação:</strong> Conexão com planos institucionais (quando aplicável)</li>
                </ul>
              </div>
            </StepGuideItem>

            <StepGuideItem step={4} title="Processo de Aprovação">
              <p className="mb-3 text-gray-700">
                Após criar o plano, ele passará pelo processo de aprovação:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-yellow-400" />
                  <span className="text-sm"><strong>INCLUÍDO:</strong> Plano criado, aguardando assinaturas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-amber-500" />
                  <span className="text-sm"><strong>AGUARDANDO ASSINATURA:</strong> Enviado para aprovação dos gestores</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span className="text-sm"><strong>ATIVO:</strong> Aprovado e em execução</span>
                </div>
              </div>
            </StepGuideItem>
          </StepGuide>
        </WhiteCard>

        {/* Status do Plano */}
        <WhiteCard>
          <SectionTitle level={2}>Status do Plano de Trabalho</SectionTitle>
          <p className="mb-6 text-gray-700">
            Entenda os diferentes status que seu plano pode ter durante seu ciclo de vida:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: FileText, color: 'text-gray-500', title: 'INCLUÍDO', desc: 'Plano criado mas ainda não enviado para aprovação' },
              { icon: Clock, color: 'text-amber-500', title: 'AGUARDANDO ASSINATURA', desc: 'Enviado para aprovação, aguardando assinaturas necessárias' },
              { icon: CheckCircle, color: 'text-emerald-500', title: 'ATIVO', desc: 'Aprovado e em execução, você pode registrar atividades' },
              { icon: Pause, color: 'text-red-500', title: 'SUSPENSO', desc: 'Temporariamente suspenso pelo gestor' },
              { icon: CheckSquare, color: 'text-govbr-blue-600', title: 'CONCLUÍDO', desc: 'Período finalizado, todas as consolidações avaliadas' },
              { icon: XCircle, color: 'text-red-600', title: 'CANCELADO', desc: 'Cancelado pelo gestor antes da conclusão' }
            ].map((status, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <status.icon size={16} className={status.color} />
                  <strong>{status.title}</strong>
                </div>
                <p className="text-sm text-gray-500">{status.desc}</p>
              </div>
            ))}
          </div>
        </WhiteCard>

        {/* Requisitos Legais */}
        <WhiteCard>
          <SectionTitle level={2}>Requisitos Legais e Critérios de Avaliação</SectionTitle>
          <p className="mb-4 text-gray-700">
            Segundo a IN MGI nº 88/2024, o plano de trabalho individual deve atender aos seguintes requisitos atualizados:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                <CheckSquare size={16} className="text-govbr-green-700" />
                Conteúdo Obrigatório
              </h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Entregas esperadas com descrição clara</li>
                <li>• Prazos para execução das entregas</li>
                <li>• Critérios de avaliação de desempenho</li>
                <li>• Indicadores de produtividade</li>
                <li>• Metas quantitativas ou qualitativas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                <Target size={16} className="text-govbr-blue-600" />
                Critérios de Avaliação
              </h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Qualidade das entregas realizadas</li>
                <li>• Cumprimento de prazos estabelecidos</li>
                <li>• Alcance das metas definidas</li>
                <li>• Contribuição para objetivos da unidade</li>
                <li>• Aderência ao planejamento inicial</li>
              </ul>
            </div>
          </div>
          <InfoBox variant="success" icon={AlertCircle} title="Periodicidade de Avaliação">
            Conforme a IN MGI nº 88/2024, a avaliação deve ser realizada periodicamente, com
            consolidações que permitem acompanhamento contínuo do desempenho e das entregas.
          </InfoBox>
        </WhiteCard>

        {/* Dicas importantes */}
        <WhiteCard>
          <SectionTitle level={2}>Dicas Práticas para Elaboração</SectionTitle>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-govbr-blue-50 border-l-4 border-govbr-blue-600">
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-govbr-blue-600" />
                <h3 className="font-semibold text-govbr-blue-600">Planejamento das Entregas</h3>
              </div>
              <p className="text-sm text-gray-700">
                A soma dos percentuais de todas as entregas deve totalizar 100% da sua carga horária.
                Seja específico na descrição das entregas para facilitar a avaliação.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border-l-4 border-govbr-green-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare size={20} className="text-govbr-green-700" />
                <h3 className="font-semibold text-govbr-green-700">Vinculação com Planos Institucionais</h3>
              </div>
              <p className="text-sm text-gray-700">
                Sempre que possível, vincule suas entregas aos planos de entrega da unidade.
                Isso demonstra alinhamento com os objetivos organizacionais.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={20} className="text-yellow-700" />
                <h3 className="font-semibold text-yellow-700">Alterações no Plano</h3>
              </div>
              <p className="text-sm text-gray-700">
                Alterações em planos ativos podem exigir nova aprovação.
                Planeje bem desde o início para evitar retrabalho.
              </p>
            </div>
          </div>
        </WhiteCard>

        {/* Referências Oficiais */}
        <WhiteCard>
          <SectionTitle level={2}>Referências Oficiais MGI</SectionTitle>
          <p className="mb-4 text-gray-700">
            Consulte sempre as fontes oficiais do Ministério da Gestão e da Inovação em Serviços Públicos:
          </p>
          <div className="space-y-3">
            {[
              { icon: FileText, title: 'Decreto nº 11.072/2022', desc: 'Regulamenta o Programa de Gestão e Desempenho - PGD' },
              { icon: FileText, title: 'Instrução Normativa MGI nº 88/2024', desc: 'Estabelece diretrizes atualizadas para o PGD, teletrabalho e trabalho híbrido' }
            ].map((ref, i) => (
              <div key={i} className="p-3 rounded border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <ref.icon size={16} className="text-govbr-blue-600" />
                  <strong>{ref.title}</strong>
                </div>
                <p className="text-sm text-gray-500">{ref.desc}</p>
              </div>
            ))}
            <div className="p-3 rounded border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Package size={16} className="text-govbr-green-700" />
                <strong>Portal gov.br - PGD</strong>
              </div>
              <p className="text-sm text-gray-500">
                <a href="https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao"
                   className="hover:underline text-govbr-blue-600">
                  www.gov.br/servidor/pt-br/assuntos/programa-de-gestao
                </a>
              </p>
            </div>
          </div>
        </WhiteCard>

        {/* Próximos passos */}
        <WhiteCard>
          <SectionTitle level={2}>Próximos Passos</SectionTitle>
          <p className="mb-4 text-gray-700">
            Após criar e ativar seu plano de trabalho:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: FileText, color: 'bg-govbr-blue-600', title: 'Registre Atividades', desc: 'Documente suas atividades diárias relacionadas às entregas' },
              { icon: Target, color: 'bg-govbr-green-700', title: 'Acompanhe Consolidações', desc: 'Monitore os períodos de avaliação e suas notas' },
              { icon: Settings, color: 'bg-amber-500', title: 'Prepare Relatórios', desc: 'Gere relatórios de desempenho e produtividade' }
            ].map((step, i) => (
              <div key={i} className="text-center p-4">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white ${step.color}`}>
                  <step.icon size={24} />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
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
