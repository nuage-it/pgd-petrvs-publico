'use client'

import { FileDown, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface ExportPdfButtonProps {
  contentId: string
  filename?: string
}

/**
 * Converts modern CSS color functions (lab, oklch, oklab) to RGB
 * by creating a temporary element and reading the computed style
 */
function convertColorToRgb(color: string): string {
  if (!color || color === 'transparent' || color === 'inherit' || color === 'initial') {
    return color
  }

  // Check if the color uses modern color functions that html2canvas doesn't support
  if (color.includes('lab(') || color.includes('oklch(') || color.includes('oklab(') || color.includes('color(')) {
    try {
      const temp = document.createElement('div')
      temp.style.color = color
      temp.style.display = 'none'
      document.body.appendChild(temp)
      const computed = getComputedStyle(temp).color
      document.body.removeChild(temp)
      return computed
    } catch {
      return color
    }
  }

  return color
}

/**
 * Recursively applies inline styles with RGB colors to avoid html2canvas color parsing issues
 */
function applyInlineStyles(element: HTMLElement): void {
  const computed = getComputedStyle(element)

  // Color properties that might use modern color functions
  const colorProps = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderTopColor',
    'borderRightColor',
    'borderBottomColor',
    'borderLeftColor',
    'outlineColor',
    'textDecorationColor',
    'boxShadow'
  ]

  colorProps.forEach(prop => {
    const value = computed.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase())
    if (value) {
      const converted = convertColorToRgb(value)
      if (converted !== value) {
        element.style.setProperty(prop.replace(/([A-Z])/g, '-$1').toLowerCase(), converted)
      }
    }
  })

  // Process children
  Array.from(element.children).forEach(child => {
    if (child instanceof HTMLElement) {
      applyInlineStyles(child)
    }
  })
}

export default function ExportPdfButton({ contentId, filename = 'documento' }: ExportPdfButtonProps) {
  const [loading, setLoading] = useState(false)

  const exportToPdf = async () => {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById(contentId)

      if (!element) {
        console.error(`Element with id "${contentId}" not found`)
        setLoading(false)
        return
      }

      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = element.offsetWidth + 'px'
      document.body.appendChild(clone)

      // Apply inline styles with RGB colors to avoid html2canvas issues
      applyInlineStyles(clone)

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
          scrollY: 0,
          logging: false,
          removeContainer: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: '.avoid-break'
        }
      }

      await html2pdf()
        .set(options)
        .from(clone)
        .save()

      // Clean up
      document.body.removeChild(clone)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={exportToPdf}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700
                 text-white rounded-lg transition-colors disabled:opacity-50
                 print-hidden"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {loading ? 'Gerando PDF...' : 'Exportar PDF'}
    </button>
  )
}
