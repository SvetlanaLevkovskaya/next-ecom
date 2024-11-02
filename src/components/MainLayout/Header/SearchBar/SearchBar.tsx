import { ChangeEvent, KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { setSearchQuery } from '@/store/productsSlice'
import { RootState } from '@/store/store'

export const SearchBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()

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
  )
}
