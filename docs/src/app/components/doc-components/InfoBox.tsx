import { ReactNode } from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle, LucideIcon } from 'lucide-react'

type InfoBoxVariant = 'info' | 'warning' | 'success' | 'error'

interface InfoBoxProps {
  variant: InfoBoxVariant
  title?: string
  children: ReactNode
  icon?: LucideIcon
  className?: string
}

const variantConfig: Record<InfoBoxVariant, {
  icon: LucideIcon
  bgColor: string
  borderColor: string
  iconColor: string
  titleColor: string
  textColor: string
}> = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-govbr-blue-600',
    iconColor: 'text-govbr-blue-600',
    titleColor: 'text-govbr-blue-800',
    textColor: 'text-govbr-blue-700'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    textColor: 'text-yellow-700'
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-govbr-green-600',
    iconColor: 'text-govbr-green-600',
    titleColor: 'text-govbr-green-800',
    textColor: 'text-govbr-green-700'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    textColor: 'text-red-700'
  }
}

export function InfoBox({
  variant,
  title,
  children,
  icon,
  className = ''
}: InfoBoxProps) {
  const config = variantConfig[variant]
  const Icon = icon || config.icon

  return (
    <div className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 min-w-0">
          {title && (
            <strong className={`block ${config.titleColor} mb-1`}>{title}</strong>
          )}
          <div className={`text-sm ${config.textColor}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
