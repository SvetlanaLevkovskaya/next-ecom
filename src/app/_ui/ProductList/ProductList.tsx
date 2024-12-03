'use client'

import { useEffect, useMemo } from 'react'

import { ProductCard } from '@/app/_ui'
import { FilterSection } from '@/app/_ui/FilterSection/FilterSection'
import { SortSelect } from '@/app/_ui/SortSelect/SortSelect'
import { Breadcrumb, Spinner } from '@/components'
import { useBreadcrumbs } from '@/hooks'
import { selectFilteredProducts, setProducts, useAppDispatch, useAppSelector } from '@/store'
import { BreadcrumbItem, Product } from '@/types'

export const ProductList = ({ initialProducts }: { initialProducts: Product[] }) => {
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog' }],
    []
  )

  useBreadcrumbs(breadcrumbs)

  const dispatch = useAppDispatch()
  const filteredItems = useAppSelector(selectFilteredProducts)
  const { isLoading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (initialProducts.length) {
      dispatch(setProducts(initialProducts))
    }
  }, [dispatch, initialProducts])

  console.log('Filtered items:', filteredItems)
  console.log(
    'Redux state:',
    useAppSelector((state) => state.products.products)
  )

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div
      className="flex flex-col md:flex-row gap-6 max-w-[946px] my-2 md:mx-auto w-full"
      key={filteredItems.length}
    >
      <FilterSection />
      <section className="w-full md:w-3/4">
        <Breadcrumb items={breadcrumbs} className="mb-10" />
        <h1 className="text-xl font-medium mb-6">Catalog</h1>
        <SortSelect />
        {!filteredItems.length && (
          <div className="text-center text-sm mt-4">No products available.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  )
}
