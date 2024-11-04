'use client'

import { memo } from 'react'

import Link from 'next/link'

import { FavouriteIcon } from '@/app/_ui/FavouriteIcon/FavouriteIcon'
import { ProductCardImage } from '@/app/_ui/ProductCardImage/ProductCardImage'
import { OptionalProduct } from '@/types'

const ProductCardComponent = ({ id, title, image, category, price }: OptionalProduct) => {
  const shouldTruncate = title && title.length > 30
  const displayedTitle = shouldTruncate ? `${title.slice(0, 30)}...` : title
  return (
    <Link
      href={`/product/${id}`}
      className="relative flex flex-col justify-between p-4 gap-2.5 outline outline-1 outline-slate-200 border"
    >
      <p className="text-sm text-gray-500">{category}</p>
      <h3 className="text-sm font-medium  min-h-10">{displayedTitle}</h3>

      <FavouriteIcon productId={String(id)} />
      <ProductCardImage title={title} image={image} />

      <div className="mt-auto pt-8">
        <p className="text-2xl font-black text-gray-900">{price}&#32;$</p>
      </div>
    </Link>
  )
}

ProductCardComponent.displayName = 'ProductCard'

export const ProductCard = memo(ProductCardComponent)
