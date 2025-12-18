'use client'

import { ReactNode } from 'react'

export interface PdfTableProps {
  headers: string[]
  rows: (string | ReactNode)[][]
  className?: string
  caption?: string
}

export function PdfTable({ headers, rows, className = '', caption }: PdfTableProps) {
  return (
    <div className={`pdf-table-container pdf-avoid-break ${className}`}>
      {caption && (
        <div className="pdf-table-caption text-sm text-gray-600 mb-2">{caption}</div>
      )}
      <table className="pdf-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
