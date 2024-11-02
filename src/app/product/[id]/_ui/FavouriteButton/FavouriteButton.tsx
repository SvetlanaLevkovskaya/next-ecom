import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

export const FavouriteButton = ({ productId }: { productId: number }) => {
  const dispatch = useDispatch()
  const isFavored = useSelector((state: RootState) =>
    state.favourites.items.includes(String(productId))
  )
  return (
    <button
      onClick={() => dispatch(toggleFavourite(String(productId)))}
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
