'use client'

import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import Link from 'next/link'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { ImageWithFallback } from '@/components'
import { OptionalProduct } from '@/types'

export const ProductCard = ({ id, title, image, category, price }: OptionalProduct) => {
  const dispatch = useDispatch()
  const isFavored = useSelector((state: RootState) => state.favourites.items.includes(String(id)))

  const shouldTruncate = title && title.length > 30
  const displayedTitle = shouldTruncate ? `${title.slice(0, 30)}...` : title
  return (
    <Link
      href={`/product/${id}`}
      className="relative flex flex-col justify-between p-4 gap-2.5 outline outline-1 outline-slate-200 border"
    >
      <p className="text-sm text-gray-500">{category}</p>
      <h3 className="text-sm font-medium  min-h-10">{displayedTitle}</h3>

      <div className="absolute top-4 right-4">
        <FaHeart
          className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
            'text-red-500': isFavored,
          })}
          onClick={(e) => {
            e.preventDefault()
            dispatch(toggleFavourite(String(id)))
          }}
        />
      </div>

      <div className="flex-center-center w-[156px] h-[224px] self-center">
        <ImageWithFallback
          src={image}
          alt={title ?? 'Image'}
          width={100}
          height={100}
          className="object-cover mx-auto w-auto h-auto"
          priority
        />
      </div>
      <div className="mt-auto pt-8">
        <p className="text-2xl font-black text-gray-900">{price}&#32;$</p>
      </div>
    </Link>
  )
}
