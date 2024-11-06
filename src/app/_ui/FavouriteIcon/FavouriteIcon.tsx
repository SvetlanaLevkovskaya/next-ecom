import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'

import { toggleFavourite, useAppDispatch, useAppSelector } from '@/store'

interface FavouriteIconProps {
  id: string
}

export const FavouriteIcon = ({ id }: FavouriteIconProps) => {
  const dispatch = useAppDispatch()
  const isFavored = useAppSelector((state) => state.favourites.items[id])

  if (!id) return null

  return (
    <button
      type="button"
      className="absolute top-4 right-4"
      aria-label="Toggle Favourite"
      onClick={(e) => {
        e.preventDefault()
        dispatch(toggleFavourite(id))
      }}
    >
      <FaHeart
        className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
          'text-red-500': isFavored,
        })}
      />
    </button>
  )
}
