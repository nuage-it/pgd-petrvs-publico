import { ReactNode } from 'react'

interface DataColumnProps {
  title: string
  items: (string | ReactNode)[]
}

interface DataComparisonProps {
  input: DataColumnProps
  output: DataColumnProps
  className?: string
}

export function DataComparison({
  input,
  output,
  className = ''
}: DataComparisonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <DataColumn title={input.title} items={input.items} />
      <DataColumn title={output.title} items={output.items} />
    </div>
  )
}

function DataColumn({ title, items }: DataColumnProps) {
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-1">
            <span className="text-gray-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
