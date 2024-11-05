'use client'

import { useMemo } from 'react'

import { FavouriteButton, ProductImage, ProductInfo, PurchaseSection } from '@/app/product/[id]/_ui'
import { Breadcrumb } from '@/components'
import { useBreadcrumbs } from '@/hooks'
import { BreadcrumbItem, OptionalProduct } from '@/types'

export const ProductDetails = ({ product }: { product: OptionalProduct }) => {
  const { id, title, image, description, price, rating } = product
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog', path: '/' }, { title }],
    [title]
  )

  useBreadcrumbs(breadcrumbs)

  if (!product) {
    return (
      <section className="flex justify-center items-center mx-auto my-10 text-sm">
        Product not found.
      </section>
    )
  }

  return (
    <section className="flex flex-col md:flex-row justify-center items-center mx-auto gap-6 my-10">
      <div className="flex flex-col">
        <Breadcrumb items={breadcrumbs} className="pb-16 md:pb-8" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ProductImage image={image} title={title} />

          <div className="flex flex-col gap-4 w-full md:w-auto divide-y">
            <div>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <ProductInfo title={title} rating={rating} />
                <FavouriteButton id={id} />
              </div>
            </div>

            <PurchaseSection description={description} price={price} />
          </div>
        </div>
      </div>
    </section>
  )
}
