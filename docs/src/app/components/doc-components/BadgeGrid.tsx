interface BadgeGridProps {
  items: string[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'outline' | 'code'
  className?: string
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4'
}

const variantClasses = {
  default: 'bg-white border border-gray-200 text-gray-700',
  outline: 'bg-transparent border border-gray-300 text-gray-600',
  code: 'bg-gray-100 border border-gray-200 text-gray-800 font-mono'
}

export function BadgeGrid({
  items,
  columns = 4,
  variant = 'default',
  className = ''
}: BadgeGridProps) {
  return (
    <div className={`grid ${columnClasses[columns]} gap-2 text-xs ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className={`px-2 py-1 rounded ${variantClasses[variant]} text-center`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
