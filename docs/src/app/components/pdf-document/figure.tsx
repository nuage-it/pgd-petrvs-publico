'use client'

import { ReactNode } from 'react'

export interface PdfFigureProps {
  children: ReactNode
  caption?: string
  className?: string
  /** Quando true, a figura ocupa uma pagina inteira no PDF */
  fullPage?: boolean
}

export function PdfFigure({
  children,
  caption,
  className = '',
  fullPage = false
}: PdfFigureProps) {
  const figureClass = fullPage
    ? `pdf-figure pdf-figure-fullpage ${className}`
    : `pdf-figure pdf-avoid-break ${className}`

  return (
    <figure className={figureClass}>
      <div className="pdf-figure-content">
        {children}
      </div>
      {caption && (
        <figcaption className="pdf-figure-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
