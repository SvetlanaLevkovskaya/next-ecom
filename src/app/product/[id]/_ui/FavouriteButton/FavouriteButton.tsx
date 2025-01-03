'use client'

import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'

import { toggleFavourite, useAppDispatch, useAppSelector } from '@/store'

export const FavouriteButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()

  const isFavored = useAppSelector((state) => (id ? state.favourites.items[id] : false))

  if (!id) return null

  return (
    <button
      type="button"
      className="flex-center-center gap-3 w-48 border border-slate-200 h-9 px-2 text-sm rounded-md hover:bg-gray-100 transition-all whitespace-nowrap"
      aria-label="Toggle Favourite"
      onClick={() => dispatch(toggleFavourite(id))}
    >
      <span>{isFavored ? 'Remove from Favourite' : 'Make Favourite'}</span>
      <FaHeart
        size={20}
        className={clsx('text-gray-300 cursor-pointer transition-all', {
          'text-rose-500': isFavored,
        })}
      />
    </button>
  )
}
