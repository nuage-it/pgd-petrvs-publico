'use client'

import { FileDown, Loader2 } from 'lucide-react'
import { usePdfDocument } from './context'
import { ReactNode } from 'react'

export interface PdfExportButtonProps {
  children?: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function PdfExportButton({
  children,
  className = '',
  variant = 'primary'
}: PdfExportButtonProps) {
  const { isExporting, exportPdf } = usePdfDocument()

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    ghost: 'hover:bg-gray-100 text-gray-700'
  }

  return (
    <button
      onClick={exportPdf}
      disabled={isExporting}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        transition-colors disabled:opacity-50 print-hidden
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {children || (isExporting ? 'Gerando PDF...' : 'Exportar PDF')}
    </button>
  )
}
