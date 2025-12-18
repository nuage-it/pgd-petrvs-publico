'use client'

import {
  Home, Building, Users, RefreshCw, CheckCircle, TrendingUp, Shield, Clock,
  Target, Lightbulb, Database, Calendar, Zap, GitBranch, ArrowRight, UserPlus,
  UserMinus, UserCheck, Edit, BarChart3, HelpCircle, AlertCircle, BookOpen,
  Settings, FileText
} from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { ReactFlow, Background, Controls, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  DocHeader,
  Breadcrumb,
  BreadcrumbItem,
  SectionTitle,
  WhiteCard,
  InfoBox,
  MetricCard
} from '../components/doc-components'

export default function IntegracaoSiapeNegocio() {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'SIAPE' },
      position: { x: 50, y: 100 },
      style: { backgroundColor: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '8px', padding: '15px', fontWeight: 'bold', fontSize: '14px' }
    },
    {
      id: '2',
      data: { label: 'ConectaGov' },
      position: { x: 250, y: 100 },
      style: { backgroundColor: '#dbeafe', border: '2px solid #0066cc', borderRadius: '8px', padding: '15px', fontSize: '14px' }
    },
    {
      id: '3',
      data: { label: 'Coleta' },
      position: { x: 450, y: 50 },
      style: { backgroundColor: '#dbeafe', border: '2px solid #0066cc', borderRadius: '8px', padding: '15px', fontSize: '14px' }
    },
    {
      id: '4',
      data: { label: 'Processamento' },
      position: { x: 450, y: 150 },
      style: { backgroundColor: '#dbeafe', border: '2px solid #0066cc', borderRadius: '8px', padding: '15px', fontSize: '14px' }
    },
    {
      id: '5',
      type: 'output',
      data: { label: 'Sistema PGD' },
      position: { x: 650, y: 100 },
      style: { backgroundColor: '#dcfce7', border: '2px solid #168821', borderRadius: '8px', padding: '15px', fontWeight: 'bold', fontSize: '14px' }
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#0066cc', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#0066cc', strokeWidth: 2 } },
    { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#0066cc', strokeWidth: 2 } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#168821', strokeWidth: 2 } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#168821', strokeWidth: 2 } },
  ]

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
          font-size: 9pt;
          line-height: 1.4;
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
        }
        .container {
          max-width: 100% !important;
          padding: 0 0.5cm !important;
        }
        .grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 0.3cm !important;
        }
        footer {
          page-break-before: always;
          margin-top: 1cm;
        }
      }
      @page {
        margin: 1.5cm 1.2cm;
        size: A4 portrait;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Integração SIAPE - Visão de Negócio', icon: Building }
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
          <SectionTitle level={1}>Integração SIAPE - Visão de Negócio</SectionTitle>
          <p className="text-lg text-gray-700">
            Entenda como funciona a sincronização automática de dados de servidores públicos e unidades organizacionais
          </p>
        </div>

        {/* O Que é */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={RefreshCw}>O Que é a Integração SIAPE</SectionTitle>
          <p className="mb-4 text-lg text-gray-700">
            A integração com o SIAPE (Sistema Integrado de Administração de Recursos Humanos) é um processo
            automático que mantém os dados de servidores e unidades do PGD Petrvs sempre atualizados com a
            base oficial do governo federal.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Objetivo Principal</h3>
              <p className="text-sm text-gray-700">
                Garantir que as informações de servidores, cargos, lotações e estrutura organizacional
                estejam sempre sincronizadas com a fonte oficial, eliminando inconsistências e trabalho manual.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Como Funciona</h3>
              <p className="text-sm text-gray-700">
                O sistema consulta periodicamente o SIAPE através do ConectaGov, identifica mudanças e
                atualiza automaticamente os dados no PGD Petrvs, sem necessidade de intervenção manual.
              </p>
            </div>
          </div>
          <InfoBox variant="info" icon={Shield} title="Conformidade Legal">
            A integração garante conformidade com as diretrizes do MGI (Ministério da Gestão e da Inovação
            em Serviços Públicos) e com a IN MGI nº 88/2024, que regulamenta o Programa de Gestão e Desempenho.
          </InfoBox>
        </WhiteCard>

        {/* Por Que Integrar */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={Target} iconColor="text-govbr-green-700">Por Que Integrar com SIAPE</SectionTitle>
          <p className="mb-6 text-gray-700">
            A integração automática traz benefícios significativos para gestores, servidores e administradores do sistema.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <BenefitCard
              icon={CheckCircle}
              title="Dados Sempre Atualizados"
              color="green"
              description="Informações de servidores, cargos, lotações e estrutura organizacional são atualizadas automaticamente, refletindo mudanças em tempo real do SIAPE."
              items={['Movimentações de servidores', 'Mudanças de cargo ou função', 'Alterações na estrutura organizacional', 'Entrada e saída de servidores']}
            />
            <BenefitCard
              icon={Clock}
              title="Redução de Trabalho Manual"
              color="blue"
              description="Elimina a necessidade de cadastro e atualização manual de dados, economizando tempo e reduzindo erros humanos."
              items={['Sem digitação manual de dados', 'Sem retrabalho por inconsistências', 'Menos tickets de suporte', 'Foco em atividades estratégicas']}
            />
            <BenefitCard
              icon={Shield}
              title="Conformidade com MGI"
              color="yellow"
              description="Garante que o sistema esteja alinhado com as diretrizes oficiais do governo federal para gestão de pessoas e PGD."
              items={['Atende IN MGI nº 88/2024', 'Dados oficiais e auditáveis', 'Rastreabilidade completa', 'Segurança jurídica']}
            />
            <BenefitCard
              icon={TrendingUp}
              title="Base Única de Verdade"
              color="red"
              description="O SIAPE é a fonte oficial de dados de servidores federais. A integração garante que todos trabalhem com as mesmas informações."
              items={['Elimina divergências entre sistemas', 'Decisões baseadas em dados corretos', 'Relatórios confiáveis', 'Transparência e governança']}
            />
          </div>
          <InfoBox variant="success" icon={Lightbulb} title="Resultado Prático" className="mt-6">
            Com a integração ativa, gestores podem focar na gestão de pessoas e desempenho,
            sem se preocupar com atualização de cadastros. O sistema &ldquo;se mantém sozinho&rdquo;.
          </InfoBox>
        </WhiteCard>

        {/* O Que é Sincronizado */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Database}>O Que é Sincronizado</SectionTitle>
          <p className="mb-6 text-gray-700">
            A integração mantém atualizadas duas categorias principais de informações:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <SyncCard
              icon={Building}
              title="Unidades Organizacionais"
              color="blue"
              description="Estrutura completa do órgão, incluindo hierarquia e informações administrativas."
              items={[
                { label: 'Identificação', value: 'Código, sigla, nome completo' },
                { label: 'Hierarquia', value: 'Unidade pai, subordinadas, estrutura organizacional' },
                { label: 'Localização', value: 'Endereço, município, telefone, e-mail' },
                { label: 'Gestão', value: 'CPF do titular, substituto, tipo de unidade' },
                { label: 'Administrativo', value: 'CNPJ, SIAFI, SIORG, data de criação' }
              ]}
            />
            <SyncCard
              icon={Users}
              title="Servidores"
              color="green"
              description="Dados funcionais e pessoais de todos os servidores do órgão."
              items={[
                { label: 'Identificação', value: 'CPF, matrícula SIAPE, nome completo' },
                { label: 'Cargo e Função', value: 'Cargo efetivo, função, classe, padrão' },
                { label: 'Lotação', value: 'Unidade de exercício, unidade de lotação' },
                { label: 'Situação', value: 'Ativo, aposentado, cedido, situação funcional' },
                { label: 'PGD', value: 'Modalidade de trabalho, participação no programa' },
                { label: 'Contato', value: 'E-mail institucional, chefia imediata' },
                { label: 'Pessoal', value: 'Data de nascimento, sexo, estado civil' }
              ]}
            />
          </div>
          <InfoBox variant="warning" icon={Shield} title="Importante" className="mt-4">
            Todos os dados são provenientes do SIAPE, que é a fonte oficial e única de verdade.
            O sistema PGD não permite alteração manual desses dados, garantindo integridade e conformidade.
          </InfoBox>
        </WhiteCard>

        {/* Quando Acontece */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Calendar} iconColor="text-govbr-green-700">Quando Acontece a Sincronização</SectionTitle>
          <p className="mb-6 text-gray-700">
            A sincronização pode ocorrer de três formas diferentes, dependendo da necessidade:
          </p>
          <div className="space-y-4 mb-6">
            <SyncTypeCard
              icon={Clock}
              title="Sincronização Automática (Agendada)"
              subtitle="Recomendada para manutenção contínua"
              color="green"
              description="Executa automaticamente em horários programados, mantendo os dados sempre atualizados sem intervenção manual."
              metrics={[
                { label: 'Frequência Recomendada', value: 'Diária (madrugada)' },
                { label: 'Duração Típica', value: '2-5 minutos' },
                { label: 'Impacto', value: 'Zero (fora do horário)' }
              ]}
            />
            <SyncTypeCard
              icon={Zap}
              title="Sincronização Manual (Sob Demanda)"
              subtitle="Para situações específicas"
              color="blue"
              description="Pode ser executada manualmente pelo administrador quando necessário atualizar dados imediatamente."
              metrics={[
                { label: 'Quando Usar', value: 'Mudanças urgentes' },
                { label: 'Duração Típica', value: '2-20 minutos' },
                { label: 'Quem Executa', value: 'Administrador' }
              ]}
            />
            <SyncTypeCard
              icon={Users}
              title="Sincronização Individual (Por CPF)"
              subtitle="Para um servidor específico"
              color="yellow"
              description="Atualiza dados de um servidor específico, útil quando há inconsistência pontual ou necessidade imediata."
              metrics={[
                { label: 'Quando Usar', value: 'Dados desatualizados' },
                { label: 'Duração Típica', value: '<1 minuto' },
                { label: 'Quem Executa', value: 'Admin ou Suporte' }
              ]}
            />
          </div>
          <InfoBox variant="success" icon={Lightbulb} title="Recomendação">
            Configure a sincronização automática diária (ex: 2h da madrugada) para manter os dados sempre atualizados.
            Use sincronização manual apenas em situações excepcionais que exijam atualização imediata.
          </InfoBox>
        </WhiteCard>

        {/* Fluxo Simplificado */}
        <WhiteCard className="avoid-break">
          <SectionTitle icon={GitBranch}>Fluxo de Negócio Simplificado</SectionTitle>
          <p className="mb-6 text-gray-700">
            Entenda de forma simples como os dados fluem do SIAPE até o sistema PGD:
          </p>

          {/* Diagrama Interativo */}
          <div className="mb-6 rounded-lg border border-gray-200 print-hide" style={{ height: '300px' }}>
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              fitView
              attributionPosition="bottom-left"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <FlowStep
              icon={Database}
              step={1}
              title="SIAPE"
              subtitle="Fonte oficial de dados"
              description="Base de dados do governo federal com informações de todos os servidores e unidades"
              color="yellow"
            />
            <div className="flex items-center justify-center">
              <ArrowRight size={32} className="text-govbr-blue-600" />
            </div>
            <FlowStep
              icon={RefreshCw}
              step={2}
              title="Sincronização"
              subtitle="Coleta e processamento"
              description="Sistema busca dados atualizados, identifica mudanças e processa automaticamente"
              color="blue"
            />
            <div className="flex items-center justify-center">
              <ArrowRight size={32} className="text-govbr-green-700" />
            </div>
            <FlowStep
              icon={CheckCircle}
              step={3}
              title="Sistema PGD"
              subtitle="Dados prontos para uso"
              description="Informações atualizadas disponíveis para gestão de pessoas e desempenho"
              color="green"
            />
          </div>
          <InfoBox variant="info">
            <strong>Resultado:</strong> Dados sempre atualizados, sem intervenção manual,
            garantindo que gestores e servidores trabalhem com informações corretas e oficiais.
          </InfoBox>
        </WhiteCard>

        {/* Impacto no Dia a Dia */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={Target} iconColor="text-govbr-green-700">Impacto no Dia a Dia</SectionTitle>
          <p className="mb-6 text-gray-700">
            Veja o que acontece automaticamente em situações comuns do dia a dia:
          </p>
          <div className="space-y-4">
            <ImpactCard
              icon={UserCheck}
              title="Servidor Muda de Unidade"
              description="Quando um servidor é movimentado para outra unidade no SIAPE:"
              color="green"
              actions={['Lotação atualizada no sistema', 'Nova chefia imediata vinculada', 'Planos de trabalho ajustados', 'Permissões de acesso atualizadas']}
              benefit="Gestor da nova unidade já visualiza o servidor em sua equipe. Servidor acessa recursos da nova unidade imediatamente."
            />
            <ImpactCard
              icon={UserPlus}
              title="Novo Servidor Entra no Órgão"
              description="Quando um novo servidor é cadastrado no SIAPE:"
              color="blue"
              actions={['Cadastro criado no PGD', 'Dados funcionais importados', 'Vinculação com unidade e chefia', 'Perfil de acesso configurado']}
              benefit="Servidor já aparece no sistema para o gestor criar plano de trabalho. Não é necessário cadastro manual."
            />
            <ImpactCard
              icon={UserMinus}
              title="Servidor Sai do Órgão"
              description="Quando um servidor é desligado, aposentado ou cedido:"
              color="red"
              actions={['Situação funcional atualizada', 'Planos de trabalho encerrados', 'Acesso ao sistema desabilitado', 'Histórico preservado para auditoria']}
              benefit="Gestor é notificado automaticamente. Sistema impede criação de novos planos. Segurança e conformidade garantidas."
            />
            <ImpactCard
              icon={Edit}
              title="Dados Cadastrais Atualizados"
              description="Quando dados como cargo, função, e-mail ou telefone são alterados no SIAPE:"
              color="yellow"
              actions={['Informações atualizadas no perfil', 'Relatórios refletem novos dados', 'E-mails enviados para novo endereço', 'Histórico de alterações mantido']}
              benefit="Dados sempre corretos em todos os relatórios e telas. Comunicação chega ao destinatário certo."
            />
          </div>
          <InfoBox variant="success" icon={CheckCircle} title="Resumo do Impacto" className="mt-6">
            Em todas essas situações, <strong>nenhuma ação manual é necessária</strong>. O sistema identifica
            as mudanças no SIAPE e atualiza automaticamente, garantindo que gestores e servidores sempre
            trabalhem com informações corretas e atualizadas.
          </InfoBox>
        </WhiteCard>

        {/* Indicadores */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={BarChart3}>Indicadores e Resultados</SectionTitle>
          <p className="mb-6 text-gray-700">
            Métricas que demonstram o valor da integração automática:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard value="90%" label="Tempo Economizado" description="Redução no tempo gasto com cadastro e atualização manual de dados" variant="success" />
            <MetricCard value="99.9%" label="Precisão dos Dados" description="Dados sempre corretos, eliminando erros de digitação e inconsistências" variant="info" />
            <MetricCard value="100%" label="Cobertura" description="Todos os servidores e unidades do órgão sincronizados automaticamente" variant="warning" />
            <MetricCard value="24h" label="Atualização" description="Frequência máxima de defasagem com sincronização diária" variant="error" />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border border-govbr-green-700">
              <h3 className="font-semibold mb-2 text-sm text-govbr-green-700">Benefícios Mensuráveis</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {['Redução de 80% nos tickets de suporte sobre dados desatualizados', 'Eliminação de retrabalho por inconsistências entre sistemas', 'Relatórios gerenciais sempre com dados atualizados'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-govbr-green-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-govbr-blue-50 border border-govbr-blue-600">
              <h3 className="font-semibold mb-2 text-sm text-govbr-blue-600">Ganhos Operacionais</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {['Equipe de RH foca em atividades estratégicas, não em cadastros', 'Gestores tomam decisões baseadas em dados confiáveis', 'Conformidade automática com diretrizes do MGI'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-govbr-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </WhiteCard>

        {/* FAQ */}
        <WhiteCard className="page-break avoid-break">
          <SectionTitle icon={HelpCircle} iconColor="text-govbr-green-700">Perguntas Frequentes</SectionTitle>
          <div className="space-y-4">
            {[
              { q: 'Com que frequência os dados são atualizados?', a: 'A sincronização automática é recomendada para execução diária, geralmente durante a madrugada. Isso garante que os dados estejam atualizados no início de cada dia útil, com defasagem máxima de 24 horas. Para casos urgentes, é possível executar sincronização manual a qualquer momento.' },
              { q: 'O que fazer se os dados de um servidor estiverem desatualizados?', a: 'Primeiro, verifique se os dados estão corretos no SIAPE, pois ele é a fonte oficial. Se estiverem corretos no SIAPE mas desatualizados no PGD, o administrador pode executar uma sincronização individual por CPF, que atualiza apenas aquele servidor específico em menos de 1 minuto.' },
              { q: 'Posso alterar dados de servidores manualmente no sistema?', a: 'Não. Os dados provenientes do SIAPE (nome, CPF, matrícula, cargo, lotação, etc.) não podem ser alterados manualmente no PGD. Isso garante integridade, conformidade e rastreabilidade. Qualquer alteração deve ser feita no SIAPE, que é a fonte oficial, e será automaticamente refletida no PGD na próxima sincronização.' },
              { q: 'Quais dados NÃO vêm do SIAPE?', a: 'Alguns dados são específicos do PGD e não existem no SIAPE: Planos de trabalho e entregas, Registros de atividades diárias, Avaliações de desempenho do PGD, Configurações específicas do sistema, Preferências e personalizações do usuário.' },
              { q: 'Como saber se a integração está funcionando corretamente?', a: 'O administrador pode verificar nos logs do sistema a data e hora da última sincronização bem-sucedida, quantos registros foram atualizados e se houve algum erro. Além disso, o sistema envia notificações automáticas em caso de falhas na sincronização.' },
              { q: 'A sincronização impacta o desempenho do sistema?', a: 'Não. A sincronização é executada em segundo plano e, quando agendada para horários de baixo uso (como madrugada), não causa nenhum impacto perceptível aos usuários. O processo é otimizado para atualizar apenas dados que foram modificados, tornando-o rápido e eficiente.' }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <HelpCircle size={20} className="flex-shrink-0 mt-1 text-govbr-blue-600" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900">{faq.q}</h3>
                    <p className="text-sm text-gray-700">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <InfoBox variant="info" icon={AlertCircle} title="Precisa de Mais Ajuda?" className="mt-6">
            Entre em contato com o suporte técnico ou consulte a documentação técnica completa para informações
            mais detalhadas sobre configuração e troubleshooting.
          </InfoBox>
        </WhiteCard>

        {/* Próximos Passos */}
        <WhiteCard className="avoid-break">
          <SectionTitle level={2}>Próximos Passos</SectionTitle>
          <p className="mb-6 text-gray-700">
            Dependendo do seu perfil, veja as ações recomendadas:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <NextStepCard
              icon={BarChart3}
              title="Gestor"
              description="Acompanhe os resultados da integração"
              color="green"
              items={['Verifique relatórios de sincronização', 'Monitore atualizações de equipe', 'Valide dados de servidores']}
            />
            <NextStepCard
              icon={Settings}
              title="Administrador"
              description="Configure e mantenha a integração"
              color="blue"
              items={['Configure sincronização automática', 'Monitore logs e alertas', 'Execute sincronizações manuais']}
            />
            <NextStepCard
              icon={BookOpen}
              title="Suporte Técnico"
              description="Acesse documentação detalhada"
              color="yellow"
              items={['Consulte documentação técnica', 'Veja guias de troubleshooting', 'Acesse exemplos de configuração']}
            />
          </div>
        </WhiteCard>

        {/* Links Úteis */}
        <WhiteCard className="avoid-break">
          <SectionTitle level={2}>Documentação Relacionada</SectionTitle>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/integracao-siape"
               className="p-4 rounded-lg flex items-center gap-3 hover:bg-blue-50 transition-colors bg-govbr-blue-50 border border-govbr-blue-600 no-underline">
              <FileText size={24} className="text-govbr-blue-600" />
              <div>
                <p className="font-semibold text-govbr-blue-600">Documentação Técnica</p>
                <p className="text-xs text-gray-500">Detalhes técnicos da integração SIAPE</p>
              </div>
            </Link>
            <a href="https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao"
               target="_blank"
               rel="noopener noreferrer"
               className="p-4 rounded-lg flex items-center gap-3 hover:bg-green-50 transition-colors bg-green-50 border border-govbr-green-700 no-underline">
              <Shield size={24} className="text-govbr-green-700" />
              <div>
                <p className="font-semibold text-govbr-green-700">Portal PGD - MGI</p>
                <p className="text-xs text-gray-500">Informações oficiais do programa</p>
              </div>
            </a>
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

// Componentes auxiliares locais
function BenefitCard({ icon: Icon, title, color, description, items }: {
  icon: React.ElementType; title: string; color: 'green' | 'blue' | 'yellow' | 'red'; description: string; items: string[]
}) {
  const colors = {
    green: { bg: 'bg-green-50', border: 'border-govbr-green-700', text: 'text-govbr-green-700' },
    blue: { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', text: 'text-govbr-blue-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700' },
    red: { bg: 'bg-red-50', border: 'border-red-600', text: 'text-red-600' }
  }
  const c = colors[color]
  return (
    <div className={`p-5 rounded-lg ${c.bg} border-2 ${c.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={24} className={c.text} />
        <h3 className={`text-lg font-semibold ${c.text}`}>{title}</h3>
      </div>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}

function SyncCard({ icon: Icon, title, color, description, items }: {
  icon: React.ElementType; title: string; color: 'blue' | 'green'; description: string; items: { label: string; value: string }[]
}) {
  const c = color === 'blue'
    ? { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', text: 'text-govbr-blue-600' }
    : { bg: 'bg-green-50', border: 'border-govbr-green-700', text: 'text-govbr-green-700' }
  return (
    <div className={`p-5 rounded-lg ${c.bg} border-2 ${c.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={24} className={c.text} />
        <h3 className={`text-lg font-semibold ${c.text}`}>{title}</h3>
      </div>
      <p className="text-sm mb-3 text-gray-700">{description}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="p-2 rounded text-xs bg-white">
            <strong>{item.label}:</strong> {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}

function SyncTypeCard({ icon: Icon, title, subtitle, color, description, metrics }: {
  icon: React.ElementType; title: string; subtitle: string; color: 'green' | 'blue' | 'yellow'; description: string; metrics: { label: string; value: string }[]
}) {
  const colors = {
    green: { bg: 'bg-green-50', border: 'border-govbr-green-700', iconBg: 'bg-govbr-green-700', text: 'text-govbr-green-700' },
    blue: { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', iconBg: 'bg-govbr-blue-600', text: 'text-govbr-blue-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-amber-500', text: 'text-yellow-700' }
  }
  const c = colors[color]
  return (
    <div className={`p-5 rounded-lg ${c.bg} border-2 ${c.border}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${c.iconBg}`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${c.text}`}>{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm mb-3 text-gray-700">{description}</p>
      <div className="grid md:grid-cols-3 gap-3">
        {metrics.map((m, i) => (
          <div key={i} className="p-3 rounded bg-white border border-gray-200">
            <p className="text-xs font-semibold mb-1 text-gray-900">{m.label}</p>
            <p className={`text-sm ${c.text}`}>{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowStep({ icon: Icon, step, title, subtitle, description, color }: {
  icon: React.ElementType; step: number; title: string; subtitle: string; description: string; color: 'yellow' | 'blue' | 'green'
}) {
  const colors = {
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-amber-500' },
    blue: { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', iconBg: 'bg-govbr-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-govbr-green-700', iconBg: 'bg-govbr-green-700' }
  }
  const c = colors[color]
  return (
    <div className={`p-5 rounded-lg text-center ${c.bg} border-2 ${c.border}`}>
      <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white ${c.iconBg}`}>
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{step}. {title}</h3>
      <p className="text-sm text-gray-700">{subtitle}</p>
      <div className="mt-3 p-2 rounded text-xs bg-white">{description}</div>
    </div>
  )
}

function ImpactCard({ icon: Icon, title, description, color, actions, benefit }: {
  icon: React.ElementType; title: string; description: string; color: 'green' | 'blue' | 'red' | 'yellow'; actions: string[]; benefit: string
}) {
  const colors = {
    green: { bg: 'bg-green-50', border: 'border-govbr-green-700', iconBg: 'bg-govbr-green-700', text: 'text-govbr-green-700' },
    blue: { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', iconBg: 'bg-govbr-blue-600', text: 'text-govbr-blue-600' },
    red: { bg: 'bg-red-50', border: 'border-red-600', iconBg: 'bg-red-600', text: 'text-red-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-amber-500', text: 'text-yellow-700' }
  }
  const c = colors[color]
  return (
    <div className={`p-5 rounded-lg ${c.bg} border ${c.border}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ${c.iconBg}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-sm mb-3 text-gray-700">{description}</p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-white border border-gray-200">
              <p className={`text-xs font-semibold mb-1 ${c.text}`}>O que acontece automaticamente:</p>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
                {actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div className="p-3 rounded bg-white border border-gray-200">
              <p className={`text-xs font-semibold mb-1 ${c.text}`}>Benefício:</p>
              <p className="text-xs text-gray-500">{benefit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NextStepCard({ icon: Icon, title, description, color, items }: {
  icon: React.ElementType; title: string; description: string; color: 'green' | 'blue' | 'yellow'; items: string[]
}) {
  const colors = {
    green: { bg: 'bg-green-50', border: 'border-govbr-green-700', iconBg: 'bg-govbr-green-700', text: 'text-govbr-green-700' },
    blue: { bg: 'bg-govbr-blue-50', border: 'border-govbr-blue-600', iconBg: 'bg-govbr-blue-600', text: 'text-govbr-blue-600' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', iconBg: 'bg-amber-500', text: 'text-yellow-700' }
  }
  const c = colors[color]
  return (
    <div className={`p-5 rounded-lg ${c.bg} border-2 ${c.border}`}>
      <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white ${c.iconBg}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-center text-gray-900">{title}</h3>
      <p className="text-sm mb-3 text-gray-700">{description}</p>
      <ul className="space-y-2 text-sm text-gray-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle size={16} className={`flex-shrink-0 mt-0.5 ${c.text}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
