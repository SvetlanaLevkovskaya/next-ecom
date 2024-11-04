import { FaHeart } from 'react-icons/fa'

import clsx from 'clsx'
import Link from 'next/link'

import { useAppSelector } from '@/store/store'

export const FavouritesLink = () => {
  const favouritesCount = useAppSelector((state) => state.favourites.items.length)
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
