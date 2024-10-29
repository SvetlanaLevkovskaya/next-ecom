'use client'

import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import Link from 'next/link'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { ImageWithFallback } from '@/components'
import { Products } from '@/types'

export const ProductCard = ({ product }: { product: Products }) => {
  const dispatch = useDispatch()
  const isFavored = useSelector((state: RootState) =>
    state.favourites.items.includes(String(product.id))
  )

  const shouldTruncate = product.title.length > 30
  const displayedTitle = shouldTruncate ? `${product.title.slice(0, 30)}...` : product.title
  return (
    <Link
      href={`/product/${product.id}`}
      className="relative flex flex-col justify-between p-4 gap-2.5 border border-slate-200"
    >
      <p className="text-sm text-gray-500">{product.category}</p>
      <h3 className="text-sm font-medium  min-h-10">{displayedTitle}</h3>

      <div className="absolute top-4 right-4">
        <FaHeart
          className={clsx('text-gray-300 cursor-pointer transition-all2 hover:scale-110', {
            'text-red-500': isFavored,
          })}
          onClick={(e) => {
            e.preventDefault()
            dispatch(toggleFavourite(String(product.id)))
          }}
        />
      </div>

      <div className="flex-center-center w-[140px] h-[200px] self-center">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          className="object-cover mx-auto w-auto h-auto"
        />
      </div>
      <div className="mt-auto pt-8">
        <p className="text-2xl font-black text-gray-900">{product.price}&#32;$</p>
      </div>
    </Link>
  )
}
