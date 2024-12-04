'use client'

import { memo, useState } from 'react'

import { ArrowIcon } from '@/components'
import { setSortOrder, useAppDispatch, useAppSelector } from '@/store'
import { SortOrderType } from '@/types'
import { isSortOrder } from '@/utils'

const SortSelectComponent = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const sortOrder = useAppSelector((state) => state.products.sortOrder)

  const options: { value: SortOrderType; label: string }[] = [
    { value: 'asc', label: 'Price Up' },
    { value: 'desc', label: 'Price Down' },
  ]

  const handleSortChange = (value: string) => {
    if (isSortOrder(value)) {
      dispatch(setSortOrder(value))
    }
    setIsOpen(false)
  }

  return (
    <div className="relative w-[150px] text-sm">
      <div
        className="py-2 px-4 flex items-center justify-between cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find((o) => o.value === sortOrder)?.label}</span>

        <ArrowIcon
          className={`w-4 h-4 transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          color="orange"
        />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white rounded border-[2px] shadow-2xl z-10">
          {options.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`py-2 px-4 cursor-pointer hover:bg-orange-100 ${
                sortOrder === option.value ? 'bg-teal-50' : ''
              } ${index === 0 ? 'rounded-t' : index === options.length - 1 ? 'rounded-b' : ''}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

SortSelectComponent.displayName = 'SortSelect'

export const SortSelect = memo(SortSelectComponent)
