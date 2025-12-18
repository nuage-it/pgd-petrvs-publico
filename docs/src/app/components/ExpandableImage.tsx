'use client'

import { useState, useEffect, ReactNode } from 'react'
import { X, ZoomIn } from 'lucide-react'

interface ExpandableImageProps {
  children: ReactNode
  title?: string
  className?: string
}

export function ExpandableImage({ children, title, className = '' }: ExpandableImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Fechar com ESC e bloquear scroll quando modal aberto
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false)
      }
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Trigger - Imagem clicavel */}
      <div
        className={`expandable-image-trigger ${className}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
      >
        {children}
        <div className="expandable-image-hint print-hidden">
          <ZoomIn className="w-5 h-5" />
          <span>Clique para expandir</span>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="expandable-image-modal" onClick={() => setIsOpen(false)}>
          <button
            className="expandable-image-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
          {title && <h3 className="expandable-image-title">{title}</h3>}
          <div
            className="expandable-image-content"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}
