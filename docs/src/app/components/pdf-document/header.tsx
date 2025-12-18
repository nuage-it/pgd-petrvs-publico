'use client'

import { ReactNode } from 'react'

export interface PdfHeaderProps {
  children: ReactNode
  className?: string
}

export function PdfHeader({ children, className = '' }: PdfHeaderProps) {
  return (
    <header className={`pdf-header ${className}`}>
      {children}
    </header>
  )
}
