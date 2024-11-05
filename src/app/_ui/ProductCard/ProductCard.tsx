'use client'

import { memo } from 'react'

import Link from 'next/link'

import { FavouriteIcon } from '@/app/_ui/FavouriteIcon/FavouriteIcon'
import { ProductCardImage } from '@/app/_ui/ProductCardImage/ProductCardImage'
import { OptionalProduct } from '@/types'
import { truncateTitle } from '@/utils'

const ProductCardComponent = ({ id, title, image, category, price }: OptionalProduct) => {
  if (!id || !title || !image || !category || price == null) return null
  const displayedTitle = truncateTitle(title, 30)
  return (
    <Link
      href={`/product/${id}`}
      className="relative flex flex-col justify-between p-4 gap-2.5 outline outline-1 outline-slate-200 border"
    >
      <p className="text-sm text-gray-500">{category}</p>
      <h3 className="text-sm font-medium  min-h-10">{displayedTitle}</h3>

      <FavouriteIcon id={String(id)} />
      <ProductCardImage title={title} image={image} />

      <p className="text-2xl font-black text-gray-900">
        {price && `${new Intl.NumberFormat('en-US').format(price)} $`}
      </p>
    </Link>
  )
}

ProductCardComponent.displayName = 'ProductCard'

export const ProductCard = memo(ProductCardComponent)
