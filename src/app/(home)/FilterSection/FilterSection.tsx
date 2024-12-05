import { ChangeEvent, memo } from 'react'

import { CATEGORIES } from '@/app/(home)'
import { setSelectedCategories, useAppDispatch, useAppSelector } from '@/store'

const FilterSectionComponent = () => {
  const dispatch = useAppDispatch()
  const { selectedCategories } = useAppSelector((state) => state.products)

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    dispatch(setSelectedCategories(updatedCategories))
  }
  return (
    <aside className="w-full md:w-1/4">
      <h2 className="text-base font-medium mb-8">Filters</h2>
      {CATEGORIES &&
        CATEGORIES.map((category) => (
          <label
            key={category}
            htmlFor={category}
            className="flex items-center mb-2 text-sm cursor-pointer transition-all hover:bg-slate-100 rounded px-2 py-1"
          >
            <input
              type="checkbox"
              value={category}
              id={category}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category)}
              className="mr-2 h-3 w-3 accent-yellow-500 transition-all hover:scale-110"
            />
            {category}
          </label>
        ))}
    </aside>
  )
}

FilterSectionComponent.displayName = 'FilterSection'

export const FilterSection = memo(FilterSectionComponent)
