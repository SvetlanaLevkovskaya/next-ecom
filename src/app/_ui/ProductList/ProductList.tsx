'use client'

import { useEffect, useMemo, useState } from 'react'

import { ProductCard } from '@/app/_ui'
import { FilterSection } from '@/app/_ui/FilterSection/FilterSection'
import { SortSelect } from '@/app/_ui/SortSelect/SortSelect'
import { Breadcrumb, Spinner } from '@/components'
import { useBreadcrumbs } from '@/hooks'
import { selectFilteredProducts, useAppSelector } from '@/store'
import { BreadcrumbItem } from '@/types'

export const ProductList = () => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog' }],
    []
  )

  useBreadcrumbs(breadcrumbs)

  const { isLoading, error } = useAppSelector((state) => state.products)
  const filteredItems = useAppSelector(selectFilteredProducts)

  useEffect(() => {
    if (!isLoading) {
      setHasLoaded(true)
    }
  }, [isLoading])

  const shouldShowNoProductsMessage = hasLoaded && !isLoading && filteredItems.length === 0
  const shouldShowProducts = filteredItems.length > 0

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-[946px] my-2 md:mx-auto w-full">
      <FilterSection />
      <section className="w-full md:w-3/4">
        <Breadcrumb items={breadcrumbs} className="mb-10" />

        <h1 className="text-xl font-medium mb-6">Catalog</h1>

        <SortSelect />

        {isLoading && <Spinner />}
        {error && <div>Error: {error}</div>}

        {shouldShowNoProductsMessage && (
          <div className="text-center text-sm mt-4">No products available.</div>
        )}

        {shouldShowProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {filteredItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
