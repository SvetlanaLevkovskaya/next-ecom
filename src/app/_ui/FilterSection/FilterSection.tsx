import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedCategories } from '@/store/productsSlice'
import { RootState } from '@/store/store'

import { categories } from '@/app/_ui'

export const FilterSection = () => {
  const dispatch = useDispatch()
  const { selectedCategories } = useSelector((state: RootState) => state.products)

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
      {categories &&
        categories.map((category) => (
          <div key={category} className="flex items-center mb-2 text-sm transition-all">
            <input
              type="checkbox"
              value={category}
              id={category}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category)}
              className="mr-2 h-3 w-3 accent-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all hover:scale-110"
            />
            <label htmlFor={category} className="text-sm">
              {category}
            </label>
          </div>
        ))}
    </aside>
  )
}