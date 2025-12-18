import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

// InfoGrid container
interface InfoGridProps {
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  children: ReactNode
  className?: string
}

const columnClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4'
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6'
}

export function InfoGrid({
  columns = 3,
  gap = 'md',
  children,
  className = ''
}: InfoGridProps) {
  return (
    <div className={`grid grid-cols-1 ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

// InfoGridItem
type ItemVariant = 'blue' | 'green' | 'purple' | 'yellow' | 'gray'

interface InfoGridItemProps {
  icon: LucideIcon
  title: string
  description?: string
  value?: string
  variant?: ItemVariant
  children?: ReactNode
  className?: string
}

const variantConfig: Record<ItemVariant, {
  bg: string
  border: string
  iconColor: string
  titleColor: string
  textColor: string
}> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-govbr-blue-600',
    titleColor: 'text-blue-800',
    textColor: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-govbr-green-600',
    titleColor: 'text-green-800',
    textColor: 'text-green-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconColor: 'text-purple-600',
    titleColor: 'text-purple-800',
    textColor: 'text-purple-700'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    textColor: 'text-yellow-700'
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    iconColor: 'text-gray-600',
    titleColor: 'text-gray-800',
    textColor: 'text-gray-700'
  }
}

export function InfoGridItem({
  icon: Icon,
  title,
  description,
  value,
  variant = 'blue',
  children,
  className = ''
}: InfoGridItemProps) {
  const config = variantConfig[variant]

  return (
    <div className={`${config.bg} rounded-lg p-4 border ${config.border} ${className}`}>
      <div className={`flex items-center gap-2 ${config.titleColor} font-semibold mb-2`}>
        <Icon className={`w-4 h-4 ${config.iconColor}`} />
        {title}
      </div>
      {value && (
        <p className={`text-sm ${config.textColor}`}>{value}</p>
      )}
      {description && (
        <p className={`text-sm ${config.textColor}`}>{description}</p>
      )}
      {children}
    </div>
  )
}
