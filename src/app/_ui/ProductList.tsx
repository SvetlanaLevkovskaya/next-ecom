'use client'

import { useState } from 'react'

import { ProductCard } from '@/app/_ui/ProductCard'
import { Products } from '@/types'

const categories = ["women's clothing", "men's clothing", 'electronics', 'jewelery']

export const ProductList = ({ products }: { products: Products[] }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc')
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) => selectedCategories.includes(product.category))
      : products

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  })

  if (!sortedProducts.length) return null

  return (
    <div className="flex flex-col md:flex-row  gap-y-2.5 max-w-[946px] px-2 my-8 md:mx-auto">
      <div className="w-[241px]">
        <h2 className="text-lg font-medium mb-2">Filters:</h2>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={category}
              id={category}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category)}
              className="mr-2"
            />
            <label htmlFor={category} className="text-sm">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="">
        <h1 className="text-xl font-medium mb-8">Catalog</h1>

        <select value={sortOrder} onChange={handleSortChange} className="py-2 px-4 pl-0">
          <option value="asc">Price Up</option>
          <option value="desc">Price Down</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[705px] mt-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
