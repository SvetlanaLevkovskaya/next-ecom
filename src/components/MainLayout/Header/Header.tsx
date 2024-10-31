'use client'

import { ChangeEvent, KeyboardEvent } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { setSearchQuery } from '@/store/productsSlice'
import { RootState } from '@/store/store'

export const Header = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const favouritesCount = useSelector((state: RootState) => state.favourites.items.length)
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    dispatch(setSearchQuery(query))
    router.push(`/?search=${encodeURIComponent(searchQuery)}`)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 py-3">
      <div className="flex items-center justify-between gap-4 max-w-[932px] px-4 mx-auto">
        <div className="flex items-center justify-between w-3/4">
          <Link href={'/'}>
            <Image
              height={0}
              width={0}
              style={{ height: '40px', width: '116px' }}
              alt={'logo'}
              src="/logo.svg"
              priority
              unoptimized
              className="hidden md:block"
            />
          </Link>

          <div className="relative max-w-[428px]">
            <input
              className="w-[300px] sm:w-[428px] border border-slate-200 focus:border-amber-500 transition-all p-4 pl-6 rounded-lg text-sm placeholder-gray-500 outline-none"
              placeholder="Search"
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              value={searchQuery}
              autoFocus
            />
            <Image
              height={0}
              width={0}
              style={{ height: '16px', width: '16px' }}
              alt="search"
              src="/loop.svg"
              priority
              unoptimized
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        <Link href="/favourite" passHref className="flex flex-col items-center gap-[1px]">
          <FaHeart
            className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110', {
              'text-red-500': favouritesCount > 0,
            })}
          />

          <span className="hidden md:block text-sm text-gray-700">Favourite</span>
        </Link>
      </div>
    </header>
  )
}
