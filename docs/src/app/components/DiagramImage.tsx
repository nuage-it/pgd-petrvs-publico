'use client'

import { useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { withBasePath } from '@/lib/basePath'

interface DiagramImageProps {
  src: string
  alt: string
  className?: string
}

export function DiagramImage({ src, alt, className = '' }: DiagramImageProps) {
  const [imageError, setImageError] = useState(false)
  const imageSrc = withBasePath(src)

  if (imageError) {
    return (
      <div className={`diagram-error ${className}`}>
        <p className="text-red-600 text-sm">Erro ao carregar imagem: {src}</p>
      </div>
    )
  }

  return (
    <div className={`diagram-container ${className}`}>
      <InnerImageZoom
        src={imageSrc}
        zoomSrc={imageSrc}
        zoomScale={1.1}
        zoomType="click"
        hideHint={false}
        className="diagram-zoom"
        imgAttributes={{
          alt: alt,
          onError: () => setImageError(true)
        }}
      />
    </div>
  )
}
