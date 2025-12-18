'use client'

import { ReactNode } from 'react'

export interface PdfFooterProps {
  children: ReactNode
  className?: string
}

export function PdfFooter({ children, className = '' }: PdfFooterProps) {
  return (
    <footer className={`pdf-footer ${className}`}>
      {children}
    </footer>
  )
}
