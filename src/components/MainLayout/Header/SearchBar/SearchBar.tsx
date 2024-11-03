'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useDebounce } from '@/hooks/useDebounce'

import { setSearchQuery } from '@/store/productsSlice'
import { useAppDispatch } from '@/store/store'

export const SearchBar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const initialQuery =
    typeof window !== 'undefined' ? localStorage.getItem('searchQuery') || '' : ''

  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery))
    router.push(`/?search=${encodeURIComponent(debouncedQuery)}`)
  }, [debouncedQuery, dispatch, router])

  return (
    <div className="relative max-w-[428px]">
      <input
        className="w-[300px] sm:w-[428px] border border-slate-200 focus:border-amber-500 transition-all p-4 pl-6 rounded-lg text-sm placeholder-gray-500 outline-none"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
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
