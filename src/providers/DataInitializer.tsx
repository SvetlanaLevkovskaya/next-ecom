'use client'

import { useEffect } from 'react'

import { getProducts } from '@/services/clientApi'

import { setFavourites } from '@/store/favouritesSlice'
import {
  setError,
  setLoading,
  setProducts,
  setSelectedCategories,
  setSortOrder,
} from '@/store/productsSlice'
import { useAppDispatch } from '@/store/store'

export function DataInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites')
    if (savedFavourites) {
      dispatch(setFavourites(JSON.parse(savedFavourites)))
    }

    const savedSortOrder = localStorage.getItem('sortOrder') as 'asc' | 'desc'
    if (savedSortOrder) {
      dispatch(setSortOrder(savedSortOrder))
    }

    const savedCategories = localStorage.getItem('selectedCategories')
    if (savedCategories) {
      dispatch(setSelectedCategories(JSON.parse(savedCategories)))
    }

    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true))

        const products = await getProducts()
        dispatch(setProducts(products))

        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setError(`Failed to fetch products: ${error}`))
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [dispatch])
  return null
}
