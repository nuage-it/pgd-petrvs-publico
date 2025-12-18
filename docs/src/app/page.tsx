import { withBasePath } from '@/lib/basePath'
import { Database, Building, FileText, GitBranch, ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const documentacoes = [
  {
    id: 'integracao-siape',
    titulo: 'Integração SIAPE',
    subtitulo: 'Documentação Técnica',
    descricao: 'Fluxo técnico completo do BuscarDadosSiapeJob - Coleta de dados do SIAPE via ConectaGov',
    href: '/integracao-siape',
    icon: Database,
    tags: ['Técnico', 'SIAPE', 'Jobs'],
    cor: 'blue'
  },
  {
    id: 'integracao-siape-negocio',
    titulo: 'Integração SIAPE',
    subtitulo: 'Visão de Negócio',
    descricao: 'Entenda como funciona a sincronização automática de dados de servidores e unidades',
    href: '/integracao-siape-negocio',
    icon: Building,
    tags: ['Negócio', 'SIAPE', 'Gestão'],
    cor: 'green'
  },
  {
    id: 'sincronizar-siape',
    titulo: 'Sincronizar SIAPE',
    subtitulo: 'Processamento de Dados',
    descricao: 'Documentação do SincronizarSiapeJob - Processamento e persistência dos dados coletados',
    href: '/sincronizar-siape',
    icon: GitBranch,
    tags: ['Técnico', 'SIAPE', 'Sincronização'],
    cor: 'yellow'
  },
  {
    id: 'planos-trabalho',
    titulo: 'Planos de Trabalho',
    subtitulo: 'Gestão de PGD',
    descricao: 'Documentação sobre gestão de planos de trabalho e programa de gestão e desempenho',
    href: '/planos-trabalho',
    icon: FileText,
    tags: ['Negócio', 'PGD', 'Gestão'],
    cor: 'blue'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f9fafb'}}>
      {/* Header gov.br */}
      <header className="py-4" style={{backgroundColor: 'white', color: '#0066cc', borderBottom: '2px solid #0066cc'}}>
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <img src={withBasePath('/govbr.webp')} alt="Gov.br" className="h-12" />
            <div>
              <h1 className="text-2xl font-semibold">PGD Petrvs MGI - Documentação</h1>
              <p className="opacity-70">Sistema de Programa de Gestão e Desempenho</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{color: '#111827'}}>
            Documentação Técnica e de Negócio
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{color: '#6b7280'}}>
            Acesse guias completos sobre integração SIAPE, sincronização de dados e gestão de planos de trabalho
          </p>
        </div>

        {/* Grid de Documentações */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {documentacoes.map((doc) => {
            const Icon = doc.icon
            const corClassesMap = {
              blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', hover: 'hover:border-blue-400' },
              green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', hover: 'hover:border-green-400' },
              yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', hover: 'hover:border-yellow-400' }
            }
            const corClasses = corClassesMap[doc.cor as keyof typeof corClassesMap]

            return (
              <Link
                key={doc.id}
                href={doc.href}
                className={`block bg-white rounded-lg border-2 p-6 transition-all ${corClasses.border} ${corClasses.hover} hover:shadow-lg`}
                style={{textDecoration: 'none'}}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${corClasses.bg}`}>
                    <Icon size={32} className={corClasses.text} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1" style={{color: '#111827'}}>
                      {doc.titulo}
                    </h3>
                    <p className="text-sm font-medium mb-2" style={{color: '#6b7280'}}>
                      {doc.subtitulo}
                    </p>
                    <p className="text-sm mb-3" style={{color: '#374151'}}>
                      {doc.descricao}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{backgroundColor: '#f3f4f6', color: '#4b5563'}}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Links Úteis */}
        <div className="bg-white rounded-lg border p-6" style={{borderColor: '#e5e7eb'}}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} style={{color: '#0066cc'}} />
            <h3 className="text-xl font-semibold" style={{color: '#111827'}}>Links Úteis</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border transition-colors hover:bg-blue-50"
              style={{borderColor: '#e5e7eb', textDecoration: 'none'}}
            >
              <ExternalLink size={20} style={{color: '#0066cc'}} />
              <div>
                <p className="font-semibold" style={{color: '#0066cc'}}>Portal PGD - MGI</p>
                <p className="text-sm" style={{color: '#6b7280'}}>Documentação oficial do programa</p>
              </div>
            </a>
            <a
              href="https://www.gov.br/servidor/pt-br/assuntos/programa-de-gestao/sistemas-e-api-de-dados/sistema-pgd-petrvs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border transition-colors hover:bg-blue-50"
              style={{borderColor: '#e5e7eb', textDecoration: 'none'}}
            >
              <ExternalLink size={20} style={{color: '#0066cc'}} />
              <div>
                <p className="font-semibold" style={{color: '#0066cc'}}>Sistema PGD Petrvs</p>
                <p className="text-sm" style={{color: '#6b7280'}}>Manuais e configuração</p>
              </div>
            </a>
          </div>
        </div>
      </main>

      <footer className="text-white py-8 mt-12" style={{backgroundColor: '#111827'}}>
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