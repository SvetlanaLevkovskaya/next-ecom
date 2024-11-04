'use client'

import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'

import { toggleFavourite, useAppDispatch, useAppSelector } from '@/store'
import { OptionalProduct } from '@/types'

export const FavouriteButton = ({ id }: OptionalProduct) => {
  const dispatch = useAppDispatch()
  const isFavored = useAppSelector((state) => state.favourites.items.includes(String(id)))
  return (
    <button
      onClick={() => dispatch(toggleFavourite(String(id)))}
      className="flex-center-center gap-3 w-48 border border-slate-200 h-9 px-2 text-sm rounded-md hover:bg-gray-100 transition-all whitespace-nowrap"
    >
      <span>{isFavored ? 'Remove from Favourite' : 'Add to Favourite'}</span>
      <FaHeart
        size={20}
        className={clsx('text-gray-300 cursor-pointer transition-all', {
          'text-red-500': isFavored,
        })}
      />
    </button>
  )
}
