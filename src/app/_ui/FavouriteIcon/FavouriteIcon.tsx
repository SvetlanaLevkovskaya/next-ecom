import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'

import { toggleFavourite } from '@/store/favouritesSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'

interface FavouriteIconProps {
  productId: string
}

export const FavouriteIcon = ({ productId }: FavouriteIconProps) => {
  const dispatch = useAppDispatch()
  const isFavored = useAppSelector((state) => state.favourites.items.includes(productId))

  return (
    <div className="absolute top-4 right-4">
      <FaHeart
        className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
          'text-red-500': isFavored,
        })}
        onClick={(e) => {
          e.preventDefault()
          dispatch(toggleFavourite(productId))
        }}
      />
    </div>
  )
}
