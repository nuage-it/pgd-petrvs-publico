// PDF Document Component System
// A reusable compound component pattern for PDF-exportable documents

import { PdfDocumentRoot } from './root'
import { PdfContent } from './content'
import { PdfSection } from './section'
import { PdfExportButton } from './export-button'
import { PdfHeader } from './header'
import { PdfFooter } from './footer'
import { PdfTable } from './table'
import { PdfFigure } from './figure'
import { PdfPageBreak } from './page-break'

// Import styles
import './styles.css'

// Compound Component Pattern Export
// Usage: <PdfDocument.Root><PdfDocument.Content>...</PdfDocument.Content></PdfDocument.Root>
export const PdfDocument = {
  Root: PdfDocumentRoot,
  Content: PdfContent,
  Section: PdfSection,
  ExportButton: PdfExportButton,
  Header: PdfHeader,
  Footer: PdfFooter,
  Table: PdfTable,
  Figure: PdfFigure,
  PageBreak: PdfPageBreak,
}

// Hook exports
export { usePdfDocument, usePdfDocumentOptional } from './context'

// Type exports
export type { PdfMetadata, PdfDocumentContextValue } from './context'
export type { PdfDocumentRootProps } from './root'
export type { PdfContentProps } from './content'
export type { PdfSectionProps } from './section'
export type { PdfExportButtonProps } from './export-button'
export type { PdfHeaderProps } from './header'
export type { PdfFooterProps } from './footer'
export type { PdfTableProps } from './table'
export type { PdfFigureProps } from './figure'
export type { PdfPageBreakProps } from './page-break'
