'use client'

import { ReactNode } from 'react'
import { usePdfDocumentOptional } from '../pdf-document/context'

interface DocHeaderProps {
  title: string
  subtitle?: string
  showExportButton?: boolean
  rightContent?: ReactNode
  className?: string
}

export function DocHeader({
  title,
  subtitle,
  showExportButton = true,
  rightContent,
  className = ''
}: DocHeaderProps) {
  const pdfContext = usePdfDocumentOptional()
  const isExporting = pdfContext?.isExporting ?? false

  const handleExport = () => {
    pdfContext?.exportPdf()
  }

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://www.gov.br/ds/assets/img/govbr-logo-large.png"
              alt="Logo gov.br"
              className="h-10"
            />
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 print-hidden">
            {rightContent}
            {showExportButton && pdfContext && (
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-govbr-blue-600 text-white rounded-lg hover:bg-govbr-blue-700 transition-colors disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Exportando...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exportar PDF
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
