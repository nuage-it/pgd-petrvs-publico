'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

export interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="hidden lg:block fixed left-4 top-32 w-56 max-h-[calc(100vh-160px)]
                    overflow-y-auto print-hidden bg-white rounded-lg border shadow-sm p-4 z-40">
      <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
        <List className="w-4 h-4" />
        Indice
      </div>
      <ul className="space-y-1">
        {items.map(({ id, title, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`
                w-full text-left text-sm py-1 px-2 rounded transition-colors
                ${level === 2 ? 'pl-4 text-gray-500' : ''}
                ${activeId === id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
