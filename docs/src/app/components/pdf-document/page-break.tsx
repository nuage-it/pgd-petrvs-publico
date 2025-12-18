'use client'

export interface PdfPageBreakProps {
  className?: string
}

export function PdfPageBreak({ className = '' }: PdfPageBreakProps) {
  return (
    <div
      className={`pdf-page-break-after ${className}`}
      aria-hidden="true"
      style={{ height: 0, overflow: 'hidden' }}
    />
  )
}
