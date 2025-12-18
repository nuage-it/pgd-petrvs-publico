'use client'

import { createContext, useContext, RefObject } from 'react'

export interface PdfMetadata {
  title?: string
  author?: string
  subject?: string
  keywords?: string[]
}

export interface PdfDocumentContextValue {
  // Estado
  isExporting: boolean
  contentRef: RefObject<HTMLDivElement | null>

  // Metadata
  filename: string
  metadata: PdfMetadata

  // Acoes
  exportPdf: () => Promise<void>

  // Registro de secoes (para ToC automatico)
  sections: Array<{ id: string; title: string; level: number }>
  registerSection: (id: string, title: string, level?: number) => void
}

export const PdfDocumentContext = createContext<PdfDocumentContextValue | null>(null)

export function usePdfDocument(): PdfDocumentContextValue {
  const context = useContext(PdfDocumentContext)
  if (!context) {
    throw new Error('usePdfDocument must be used within PdfDocument.Root')
  }
  return context
}

/**
 * Optional hook that returns null if not within PdfDocument context
 * Useful for components that can work both inside and outside PDF context
 */
export function usePdfDocumentOptional(): PdfDocumentContextValue | null {
  return useContext(PdfDocumentContext)
}
