'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { CATEGORIES } from '@/app/(home)'
import { ArrowIcon } from '@/components'

const CategorySelectComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { setValue, watch } = useFormContext()
  const selectedCategory = watch('category')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCategoryChange = (value: string) => {
    setValue('category', value, { shouldValidate: true })
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsFocused(false)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full text-sm">
      <div
        className={`py-2 px-4 flex items-center justify-between cursor-pointer bg-white border rounded ${
          isFocused ? 'border-amber-500' : 'border-slate-200'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={() => setIsFocused(true)}
      >
        <span>{selectedCategory || 'Select a category'}</span>

        <ArrowIcon
          className={`w-4 h-4 transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          color="orange"
        />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white rounded border-[2px] shadow-2xl z-10">
          {CATEGORIES &&
            CATEGORIES.map((category, index) => (
              <li
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`py-2 px-4 cursor-pointer hover:bg-orange-100  ${
                  selectedCategory === category ? 'bg-teal-50' : ''
                } ${index === 0 ? 'rounded-t' : index === CATEGORIES.length - 1 ? 'rounded-b' : ''}`}
              >
                {category}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

CategorySelectComponent.displayName = 'CategorySelect'

export const CategorySelect = memo(CategorySelectComponent)
