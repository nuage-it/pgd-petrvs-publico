'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { PdfDocumentContext, PdfMetadata } from './context'

export interface PdfDocumentRootProps {
  children: ReactNode
  filename?: string
  metadata?: PdfMetadata
  className?: string
}

export function PdfDocumentRoot({
  children,
  filename = 'documento',
  metadata = {},
  className = ''
}: PdfDocumentRootProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [sections, setSections] = useState<Array<{ id: string; title: string; level: number }>>([])

  const registerSection = useCallback((id: string, title: string, level = 1) => {
    setSections(prev => {
      if (prev.some(s => s.id === id)) return prev
      return [...prev, { id, title, level }]
    })
  }, [])

  const exportPdf = useCallback(async () => {
    if (!contentRef.current || isExporting) return

    setIsExporting(true)
    try {
      // Dynamic import of html2pdf.js (which now uses html2canvas-pro via webpack alias)
      const html2pdf = (await import('html2pdf.js')).default

      const date = new Date().toISOString().split('T')[0]

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {
        margin: [15, 10, 15, 10],
        filename: `${filename}-${date}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          windowWidth: contentRef.current.scrollWidth,
          windowHeight: contentRef.current.scrollHeight
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          before: '.pdf-page-break-before, .pdf-figure-fullpage',
          after: '.pdf-page-break-after',
          avoid: ['.pdf-avoid-break', '.pdf-figure', '.pdf-table', 'tr', 'table']
        }
      }

      await html2pdf()
        .set(options)
        .from(contentRef.current)
        .save()

    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }, [filename, isExporting])

  return (
    <PdfDocumentContext.Provider value={{
      isExporting,
      contentRef,
      filename,
      metadata,
      exportPdf,
      sections,
      registerSection
    }}>
      <div className={`pdf-document ${className}`}>
        {children}
      </div>
    </PdfDocumentContext.Provider>
  )
}
