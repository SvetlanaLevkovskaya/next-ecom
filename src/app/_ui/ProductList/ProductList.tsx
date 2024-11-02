'use client'

import { ChangeEvent, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'

import { useBreadcrumbs } from '@/hooks/useBreadCrumbs'

import { setSortOrder } from '@/store/productsSlice'
import { RootState } from '@/store/store'

import { ProductCard } from '@/app/_ui'
import { FilterSection } from '@/app/_ui/FilterSection/FilterSection'
import { Spinner } from '@/components'
import { BreadcrumbItem } from '@/types'

export const ProductList = () => {
  const dispatch = useDispatch()

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog' }],
    []
  )

  useBreadcrumbs(breadcrumbs)

  const { sortOrder, isLoading, error, filteredItems } = useSelector(
    (state: RootState) => state.products
  )

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'asc' | 'desc'
    dispatch(setSortOrder(newSortOrder))
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[946px] my-2 md:mx-auto w-full">
      <FilterSection />
      <section className="w-full md:w-3/4">
        <div className="text-sm mb-10">
          <Breadcrumb items={breadcrumbs} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
