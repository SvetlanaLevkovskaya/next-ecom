import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'
import Link from 'next/link'

import { useAppSelector } from '@/store/store'

export const FavouritesLink = () => {
  const favourites = useAppSelector((state) => state.favourites.items)
  return (
    <Link href="/favourite" className="flex flex-col items-center gap-[1px]">
      <FaHeart
        className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
          'text-rose-500': Object.keys(favourites).length > 0,
        })}
      />
      <span className="hidden md:block text-sm text-gray-700">Favourite</span>
    </Link>
  )
}
