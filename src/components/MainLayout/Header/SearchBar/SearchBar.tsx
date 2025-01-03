'use client'

import { ChangeEvent, memo, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { useDebounce } from '@/hooks'
import { setSearchQuery, setSelectedCategories, setSortOrder, useAppDispatch } from '@/store'

const SearchBarComponent = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  const [query, setQuery] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('searchQuery') || '' : ''
  )
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery))
    if (debouncedQuery && pathname !== '/') {
      router.push('/')
    }
  }, [debouncedQuery, dispatch, router])

  useEffect(() => {
    if (pathname !== '/') {
      setQuery('')
      dispatch(setSearchQuery(''))
      dispatch(setSelectedCategories([]))
      dispatch(setSortOrder('asc'))
    }
  }, [dispatch, pathname])

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value.trim())
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = inputRef.current.selectionEnd = query.length
    }
  }, [query])

  return (
    <div className="relative max-w-[428px]">
      <input
        ref={inputRef}
        className="w-[300px] sm:w-[428px] border border-slate-200 focus:border-amber-500 transition-all p-4 pl-6 rounded-lg text-sm placeholder-gray-500 outline-none"
        placeholder="Search"
        onChange={handleChangeQuery}
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

SearchBarComponent.displayName = 'SearchBar'

export const SearchBar = memo(SearchBarComponent)
