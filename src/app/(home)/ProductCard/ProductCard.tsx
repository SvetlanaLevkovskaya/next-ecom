'use client'

import { memo } from 'react'

import Link from 'next/link'

import { DeleteIcon } from '@/app/(home)/DeleteIcon/DeleteIcon'
import { FavouriteIcon } from '@/app/(home)/FavouriteIcon/FavouriteIcon'
import { ProductCardImage } from '@/app/(home)/ProductCardImage/ProductCardImage'
import { PartialProduct } from '@/types'
import { truncateTitle } from '@/utils'

const ProductCardComponent = ({ id, title, image, category, price }: PartialProduct) => {
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
      <DeleteIcon id={String(id)} />

      <ProductCardImage title={title} image={image} />

      <p className="text-2xl font-black text-gray-900">
        {price && `${new Intl.NumberFormat('en-US').format(price)} $`}
      </p>
    </Link>
  )
}

ProductCardComponent.displayName = 'ProductCard'

export const ProductCard = memo(ProductCardComponent)
