import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import Link from 'next/link'

import { RootState } from '@/store/store'

export const FavouritesLink = () => {
  const favouritesCount = useSelector((state: RootState) => state.favourites.items.length)
  return (
    <Link href="/favourite" passHref className="flex flex-col items-center gap-[1px]">
      <FaHeart
        className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
          'text-red-500': favouritesCount > 0,
        })}
      />
      <span className="hidden md:block text-sm text-gray-700">Favourite</span>
    </Link>
  )
}
