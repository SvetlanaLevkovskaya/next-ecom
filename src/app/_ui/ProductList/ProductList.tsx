'use client'

import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedCategories, setSortOrder } from '@/store/productsSlice'
import { RootState } from '@/store/store'

import { ProductCard, categories } from '@/app/_ui'
import { Spinner } from '@/components'

export const ProductList = () => {
  const dispatch = useDispatch()

  const { sortOrder, isLoading, error, filteredItems, selectedCategories } = useSelector(
    (state: RootState) => state.products
  )

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'asc' | 'desc'
    dispatch(setSortOrder(newSortOrder))
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    dispatch(setSelectedCategories(updatedCategories))
  }
  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[946px] my-2 md:mx-auto w-full">
      <aside className="w-full md:w-1/4">
        <h2 className="text-base font-medium mb-8">Filters</h2>
        {categories &&
          categories.map((category) => (
            <div key={category} className="flex items-center mb-2 text-sm">
              <input
                type="checkbox"
                value={category}
                id={category}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category)}
                className="mr-2 h-3 w-3 accent-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              />
              <label htmlFor={category} className="text-sm">
                {category}
              </label>
            </div>
          ))}
      </aside>

      <section className="w-full md:w-3/4">
        <div className="text-sm mb-10">
          Main {'>'} <strong>Catalog</strong>
        </div>
        <h1 className="text-xl font-medium mb-6">Catalog</h1>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="py-2 px-4 pl-0 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-sm"
        >
          <option value="asc" className="text-sm bg-amber-100">
            Price Up
          </option>
          <option value="desc" className="text-sm bg-amber-100">
            Price Down
          </option>
        </select>
        {isLoading && <Spinner />}
        {error && <div>Error: {error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 border-collapse border border-slate-100">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
