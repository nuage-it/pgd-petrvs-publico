import { ReactNode } from 'react'

// StepGuide container
interface StepGuideProps {
  children: ReactNode
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function StepGuide({
  children,
  orientation = 'vertical',
  className = ''
}: StepGuideProps) {
  const orientationClasses = orientation === 'vertical'
    ? 'flex flex-col space-y-6'
    : 'flex flex-row flex-wrap gap-6'

  return (
    <div className={`${orientationClasses} ${className}`}>
      {children}
    </div>
  )
}

// StepGuideItem
interface StepGuideItemProps {
  step: number
  title: string
  children: ReactNode
  status?: 'pending' | 'active' | 'completed'
  className?: string
}

const statusConfig = {
  pending: {
    circleBg: 'bg-gray-200',
    circleText: 'text-gray-600',
    titleColor: 'text-gray-700'
  },
  active: {
    circleBg: 'bg-govbr-blue-600',
    circleText: 'text-white',
    titleColor: 'text-gray-900'
  },
  completed: {
    circleBg: 'bg-govbr-green-600',
    circleText: 'text-white',
    titleColor: 'text-gray-900'
  }
}

export function StepGuideItem({
  step,
  title,
  children,
  status = 'active',
  className = ''
}: StepGuideItemProps) {
  const config = statusConfig[status]

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 ${config.circleBg} ${config.circleText} rounded-full flex items-center justify-center font-bold text-lg`}>
          {step}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <h4 className={`font-semibold ${config.titleColor} mb-2`}>{title}</h4>
        <div className="text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  )
}
