import { ReactNode } from 'react'

interface PhaseCardProps {
  phase: 1 | 2 | 3
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

const phaseConfig = {
  1: {
    borderColor: 'border-l-govbr-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800'
  },
  2: {
    borderColor: 'border-l-govbr-green-600',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-800'
  },
  3: {
    borderColor: 'border-l-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800'
  }
}

export function PhaseCard({
  phase,
  title,
  subtitle,
  children,
  className = ''
}: PhaseCardProps) {
  const config = phaseConfig[phase]

  return (
    <div
      className={`
        bg-gradient-to-br from-white to-gray-50
        border-l-4 ${config.borderColor}
        p-6 rounded-lg shadow-sm
        ${className}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        <span className={`px-3 py-1 ${config.badgeBg} ${config.badgeText} rounded-full text-sm font-medium`}>
          FASE {phase}
        </span>
      </div>
      {children}
    </div>
  )
}
