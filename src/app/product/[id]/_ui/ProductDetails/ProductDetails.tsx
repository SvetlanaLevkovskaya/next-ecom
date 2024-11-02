'use client'

import { useMemo } from 'react'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'

import { useBreadcrumbs } from '@/hooks/useBreadCrumbs'

import { FavouriteButton } from '@/app/product/[id]/_ui/FavouriteButton/FavouriteButton'
import { ProductImage } from '@/app/product/[id]/_ui/ProductImage/ProductImage'
import { ProductInfo } from '@/app/product/[id]/_ui/ProductInfo/ProductInfo'
import { PurchaseSection } from '@/app/product/[id]/_ui/PurchaseSection/PurchaseSection'
import { BreadcrumbItem, OptionalProduct } from '@/types'

export const ProductDetails = ({ product }: { product: OptionalProduct }) => {
  const { id, title, image, description, price, rating } = product
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog', path: '/' }, { title }],
    [title]
  )

  useBreadcrumbs(breadcrumbs)

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
