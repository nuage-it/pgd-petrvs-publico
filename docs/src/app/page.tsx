import { withBasePath } from '@/lib/basePath';

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f9fafb'}}>
      {/* Header gov.br */}
      <header className="py-4" style={{backgroundColor: 'white', color: '#0066cc'}}>
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

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg border p-6 mb-8" style={{borderColor: '#e5e7eb'}}>
          <h2 className="text-xl font-semibold mb-4" style={{color: '#111827'}}>Tema gov.br Configurado</h2>
          <p className="mb-4" style={{color: '#374151'}}>
            Este projeto está configurado com o tema oficial do gov.br, seguindo as diretrizes 
            do Design System do Governo Federal.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="h-16 rounded-md mb-2" style={{backgroundColor: '#0066cc'}}></div>
              <p className="text-sm font-medium">Azul Principal</p>
              <p className="text-xs" style={{color: '#6b7280'}}>#0066cc</p>
            </div>
            <div className="text-center">
              <div className="h-16 rounded-md mb-2" style={{backgroundColor: '#168821'}}></div>
              <p className="text-sm font-medium">Verde</p>
              <p className="text-xs" style={{color: '#6b7280'}}>#168821</p>
            </div>
            <div className="text-center">
              <div className="h-16 rounded-md mb-2" style={{backgroundColor: '#ffcd07'}}></div>
              <p className="text-sm font-medium">Amarelo</p>
              <p className="text-xs" style={{color: '#6b7280'}}>#ffcd07</p>
            </div>
            <div className="text-center">
              <div className="h-16 rounded-md mb-2" style={{backgroundColor: '#4b5563'}}></div>
              <p className="text-sm font-medium">Cinza</p>
              <p className="text-xs" style={{color: '#6b7280'}}>#4b5563</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm font-medium rounded-md text-white transition-colors" 
                    style={{backgroundColor: '#0066cc'}}>
              Botão Primário
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md border transition-colors" 
                    style={{color: '#0066cc', borderColor: '#0066cc'}}>
              Botão Secundário
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-md text-white" 
                    style={{backgroundColor: '#168821'}}>
              Sucesso
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6" style={{borderColor: '#e5e7eb'}}>
          <h2 className="text-xl font-semibold mb-4" style={{color: '#111827'}}>Tipografia</h2>
          <h1 className="text-4xl font-semibold mb-4" style={{color: '#111827'}}>Título H1 - Fonte Inter 600</h1>
          <h2 className="text-3xl font-semibold mb-4" style={{color: '#111827'}}>Título H2 - Fonte Inter 600</h2>
          <h3 className="text-2xl font-semibold mb-4" style={{color: '#111827'}}>Título H3 - Fonte Inter 600</h3>
          <p className="mb-4" style={{color: '#374151'}}>
            Parágrafo regular com fonte Inter 400. Texto legível e acessível seguindo as diretrizes do gov.br.
          </p>
          <p className="text-sm" style={{color: '#6b7280'}}>
            Texto secundário em tamanho menor.
          </p>
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