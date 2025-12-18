'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
  id: string
  className?: string
}

export default function MermaidDiagram({ chart, id, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#e3f2fd',
        primaryTextColor: '#1565c0',
        primaryBorderColor: '#1976d2',
        lineColor: '#424242',
        secondaryColor: '#fff3e0',
        tertiaryColor: '#f3e5f5',
        background: '#ffffff',
        mainBkg: '#e3f2fd',
        secondBkg: '#fff3e0',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        nodeBorder: '#1976d2',
        clusterBkg: '#f5f5f5',
        clusterBorder: '#9e9e9e',
        edgeLabelBackground: '#ffffff',
        actorBorder: '#1976d2',
        actorBkg: '#e3f2fd',
        actorTextColor: '#1565c0',
        actorLineColor: '#424242',
        signalColor: '#424242',
        signalTextColor: '#1565c0',
        labelBoxBkgColor: '#e3f2fd',
        labelBoxBorderColor: '#1976d2',
        labelTextColor: '#1565c0',
        loopTextColor: '#424242',
        noteBorderColor: '#ffa000',
        noteBkgColor: '#fff8e1',
        noteTextColor: '#424242',
        sectionBkgColor: '#e3f2fd',
        altSectionBkgColor: '#f5f5f5',
        sectionBkgColor2: '#fff3e0',
        taskBorderColor: '#1976d2',
        taskBkgColor: '#e3f2fd',
        taskTextColor: '#1565c0',
        taskTextLightColor: '#424242',
        taskTextOutsideColor: '#1565c0',
        activeTaskBorderColor: '#1976d2',
        activeTaskBkgColor: '#bbdefb',
        gridColor: '#e0e0e0',
        doneTaskBkgColor: '#c8e6c9',
        doneTaskBorderColor: '#388e3c',
        critBorderColor: '#c62828',
        critBkgColor: '#ffebee',
        todayLineColor: '#f44336'
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 20,
        useMaxWidth: false,
        defaultRenderer: 'dagre-wrapper'
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 80,
        width: 180,
        height: 70,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 40,
        mirrorActors: true,
        useMaxWidth: false
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 25,
        barGap: 6,
        topPadding: 60,
        leftPadding: 100,
        gridLineStartPadding: 40,
        fontSize: 13,
        sectionFontSize: 13,
        numberSectionStyles: 4,
        useMaxWidth: false
      }
    })

    const renderDiagram = async () => {
      if (!containerRef.current) return

      try {
        setError(null)
        const { svg } = await mermaid.render(`mermaid-${id}`, chart)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
          const svgElement = containerRef.current.querySelector('svg')
          if (svgElement) {
            // Get the original viewBox to understand the diagram's intrinsic size
            const viewBox = svgElement.getAttribute('viewBox')
            console.log(`[MermaidDiagram ${id}] viewBox:`, viewBox)

            if (viewBox) {
              const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number)
              console.log(`[MermaidDiagram ${id}] Intrinsic size: ${vbWidth}x${vbHeight}`)

              // Scale factor to make diagrams larger (1.5x bigger)
              const scaleFactor = 1.5
              const newWidth = vbWidth * scaleFactor
              const newHeight = vbHeight * scaleFactor

              // Set explicit dimensions based on scaled viewBox
              svgElement.setAttribute('width', `${newWidth}`)
              svgElement.setAttribute('height', `${newHeight}`)
              svgElement.style.width = `${newWidth}px`
              svgElement.style.height = `${newHeight}px`
              svgElement.style.maxWidth = 'none'
              svgElement.style.minWidth = `${newWidth}px`
            }
          }
        }
      } catch (err) {
        console.error('Mermaid render error:', err)
        setError(err instanceof Error ? err.message : 'Erro ao renderizar diagrama')
      }
    }

    renderDiagram()
  }, [chart, id])

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <p className="text-red-600 text-sm">Erro ao renderizar diagrama: {error}</p>
        <pre className="mt-2 text-xs text-gray-600 overflow-x-auto">{chart.slice(0, 200)}...</pre>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-container overflow-x-auto avoid-break ${className}`}
    />
  )
}
