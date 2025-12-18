import { ReactNode } from 'react'

interface WhiteCardProps {
  children: ReactNode
  title?: string
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  id?: string
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

export function WhiteCard({
  children,
  title,
  padding = 'md',
  className = '',
  id
}: WhiteCardProps) {
  return (
    <div id={id} className={`bg-white rounded-lg shadow-sm border border-gray-200 ${paddingClasses[padding]} ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
