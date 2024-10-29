'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getProducts } from '@/services/clientApi'

import { setFavourites } from '@/store/favouritesSlice'
import { setProducts } from '@/store/productsSlice'

import { customToastError } from '@/components'

export function DataInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites')
    if (savedFavourites) {
      dispatch(setFavourites(JSON.parse(savedFavourites)))
    }

    const fetchProducts = async () => {
      try {
        const products = await getProducts()
        dispatch(setProducts(products))
      } catch (error) {
        customToastError(`Failed to fetch products: ${error}`)
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [dispatch])
  return null
}
