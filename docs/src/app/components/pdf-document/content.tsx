'use client'

import { ReactNode } from 'react'
import { usePdfDocument } from './context'

export interface PdfContentProps {
  children: ReactNode
  className?: string
}

export function PdfContent({ children, className = '' }: PdfContentProps) {
  const { contentRef } = usePdfDocument()

  return (
    <div
      ref={contentRef}
      className={`pdf-content ${className}`}
      data-pdf-content
    >
      {children}
    </div>
  )
}
