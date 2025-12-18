'use client'

import { useEffect, ReactNode } from 'react'
import { usePdfDocument } from './context'

export interface PdfSectionProps {
  children: ReactNode
  id: string
  title?: string
  level?: 1 | 2 | 3
  className?: string
  pageBreakBefore?: boolean
  pageBreakAfter?: boolean
}

export function PdfSection({
  children,
  id,
  title,
  level = 1,
  className = '',
  pageBreakBefore = false,
  pageBreakAfter = false
}: PdfSectionProps) {
  const { registerSection } = usePdfDocument()

  useEffect(() => {
    if (title) {
      registerSection(id, title, level)
    }
  }, [id, title, level, registerSection])

  const breakClasses = [
    pageBreakBefore && 'pdf-page-break-before',
    pageBreakAfter && 'pdf-page-break-after',
    'pdf-avoid-break'
  ].filter(Boolean).join(' ')

  return (
    <section
      id={id}
      className={`pdf-section ${breakClasses} ${className}`}
    >
      {children}
    </section>
  )
}
