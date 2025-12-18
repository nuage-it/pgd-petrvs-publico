import Link from 'next/link'
import { ChevronRight, Home, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: LucideIcon
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

export function Breadcrumb({
  items,
  separator,
  className = ''
}: BreadcrumbProps) {
  const SeparatorIcon = () => (
    separator ? <>{separator}</> : <ChevronRight className="w-4 h-4 text-gray-400" />
  )

  return (
    <nav className={`bg-white border-b border-gray-200 print-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {/* Home link */}
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Início
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const Icon = item.icon

            return (
              <li key={index} className="flex items-center gap-2">
                <SeparatorIcon />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                ) : (
                  <span className={`flex items-center gap-1 ${isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
