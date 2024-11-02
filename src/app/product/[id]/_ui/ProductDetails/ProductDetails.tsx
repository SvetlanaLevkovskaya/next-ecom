'use client'

import { useMemo } from 'react'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'

import { useBreadcrumbs } from '@/hooks/useBreadCrumbs'

import { FavouriteButton } from '@/app/product/[id]/_ui/FavouriteButton/FavouriteButton'
import { ProductImage } from '@/app/product/[id]/_ui/ProductImage/ProductImage'
import { ProductInfo } from '@/app/product/[id]/_ui/ProductInfo/ProductInfo'
import { PurchaseSection } from '@/app/product/[id]/_ui/PurchaseSection/PurchaseSection'
import { BreadcrumbItem, Products } from '@/types'

export const ProductDetails = ({ product }: { product: Products }) => {
  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog', path: '/' }, { title: product.title }],
    [product.title]
  )

  useBreadcrumbs(breadcrumbs)

  return (
    <section className="flex flex-col md:flex-row justify-center items-center mx-auto gap-6 my-10">
      <div className="flex flex-col">
        <Breadcrumb items={breadcrumbs} className="pb-16 md:pb-8" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <ProductImage productImage={product.image} productTitle={product.title} />

          <div className="flex flex-col gap-4 w-full md:w-auto divide-y">
            <div>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <ProductInfo productTitle={product.title} productRating={product.rating} />
                <FavouriteButton productId={product.id} />
              </div>
            </div>

            <PurchaseSection
              productDescription={product.description}
              productPrice={product.price}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
