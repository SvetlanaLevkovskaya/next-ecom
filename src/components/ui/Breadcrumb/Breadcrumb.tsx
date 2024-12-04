'use client'

import { Fragment, memo } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import { BreadcrumbItem } from '@/types'

const BreadcrumbComponent = ({
  items,
  className,
}: {
  items: BreadcrumbItem[]
  className?: string
}) => {
  return (
    <nav className={clsx('flex items-center text-sm', className)}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.path ? (
            <Link href={item.path} className="hover:text-gray-700 transition-all">
              {item.title}
            </Link>
          ) : (
            <span className="text-black font-black">{item.title}</span>
          )}
          {index < items.length - 1 && <div className="px-1">{'>'}</div>}
        </Fragment>
      ))}
    </nav>
  )
}

BreadcrumbComponent.displayName = 'Breadcrumb'

export const Breadcrumb = memo(BreadcrumbComponent)
