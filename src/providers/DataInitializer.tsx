'use client'

import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/store/store'

import { setFavourites, setSelectedCategories, setSortOrder } from '@/store'
import { isSortOrder } from '@/utils'

export function DataInitializer() {
  const dispatch = useAppDispatch()
  const isFetching = useRef(false)

  useEffect(() => {
    if (isFetching.current) return

    isFetching.current = true

    const savedFavourites = localStorage.getItem('favourites')
    if (savedFavourites) {
      dispatch(setFavourites(JSON.parse(savedFavourites)))
    }

    const savedSortOrder = localStorage.getItem('sortOrder')
    if (isSortOrder(savedSortOrder)) {
      dispatch(setSortOrder(savedSortOrder))
    }

    const savedCategories = localStorage.getItem('selectedCategories')
    if (savedCategories) {
      dispatch(setSelectedCategories(JSON.parse(savedCategories)))
    }
  }, [dispatch])

  return null
}
