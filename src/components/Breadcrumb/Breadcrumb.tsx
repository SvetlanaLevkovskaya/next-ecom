import Link from 'next/link'

import { BreadcrumbItem } from '@/types'

export const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center">
      {items.map((item, index) => {
        return (
          <span key={index} className="flex items-center">
            {item.path ? (
              <Link href={item.path} className="hover:text-gray-700 transition-all">
                {item.title}
              </Link>
            ) : (
              <span className="text-black font-black">{item.title}</span>
            )}
            {index < items.length - 1 && <div className="px-1">{'>'}</div>}
          </span>
        )
      })}
    </nav>
  )
}
