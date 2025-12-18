import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface SectionTitleProps {
  icon?: LucideIcon
  iconColor?: string
  level?: 1 | 2 | 3
  children: ReactNode
  className?: string
}

export function SectionTitle({
  icon: Icon,
  iconColor = 'text-govbr-blue-600',
  level = 2,
  children,
  className = ''
}: SectionTitleProps) {
  const baseClasses = 'font-bold text-gray-900 flex items-center gap-2'

  const sizeClasses = {
    1: 'text-3xl mb-8',
    2: 'text-2xl mb-6',
    3: 'text-xl mb-4'
  }

  const iconSizes = {
    1: 'w-8 h-8',
    2: 'w-6 h-6',
    3: 'w-5 h-5'
  }

  const content = (
    <>
      {Icon && <Icon className={`${iconSizes[level]} ${iconColor}`} />}
      {children}
    </>
  )

  const classes = `${baseClasses} ${sizeClasses[level]} ${className}`

  if (level === 1) return <h1 className={classes}>{content}</h1>
  if (level === 3) return <h3 className={classes}>{content}</h3>
  return <h2 className={classes}>{content}</h2>
}
