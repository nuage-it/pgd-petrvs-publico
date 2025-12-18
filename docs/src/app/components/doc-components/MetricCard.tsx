type MetricVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

interface MetricCardProps {
  value: string | number
  label: string
  description?: string
  variant?: MetricVariant
  className?: string
}

const variantConfig: Record<MetricVariant, {
  valueBg: string
  valueText: string
  labelColor: string
}> = {
  default: {
    valueBg: 'bg-gray-100',
    valueText: 'text-gray-900',
    labelColor: 'text-gray-700'
  },
  success: {
    valueBg: 'bg-green-100',
    valueText: 'text-govbr-green-700',
    labelColor: 'text-green-800'
  },
  warning: {
    valueBg: 'bg-yellow-100',
    valueText: 'text-yellow-700',
    labelColor: 'text-yellow-800'
  },
  error: {
    valueBg: 'bg-red-100',
    valueText: 'text-red-700',
    labelColor: 'text-red-800'
  },
  info: {
    valueBg: 'bg-blue-100',
    valueText: 'text-govbr-blue-700',
    labelColor: 'text-blue-800'
  }
}

export function MetricCard({
  value,
  label,
  description,
  variant = 'default',
  className = ''
}: MetricCardProps) {
  const config = variantConfig[variant]

  return (
    <div className={`text-center p-4 rounded-lg ${config.valueBg} ${className}`}>
      <div className={`text-3xl font-bold ${config.valueText} mb-1`}>
        {value}
      </div>
      <div className={`text-sm font-semibold ${config.labelColor}`}>
        {label}
      </div>
      {description && (
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      )}
    </div>
  )
}
