import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { RootState } from '@/store/store'

import { Product, SortOrder } from '@/types'

interface ProductsState {
  items: Product[]
  searchQuery: string
  sortOrder: SortOrder
  selectedCategories: string[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.items = payload
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
    },
    setSortOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.sortOrder = payload
    },
    setSelectedCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedCategories = payload
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload
      state.isLoading = false
    },
  },
})

export const selectFilteredProducts = createSelector(
  (state: RootState) => state.products.items,
  (state: RootState) => state.products.selectedCategories,
  (state: RootState) => state.products.searchQuery,
  (state: RootState) => state.products.sortOrder,
  (items, selectedCategories, searchQuery, sortOrder) => {
    let filtered = selectedCategories.length
      ? items.filter((product) => selectedCategories.includes(product.category))
      : items

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    }

    return [...filtered].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    )
  }
)

export const {
  setProducts,
  setSearchQuery,
  setSortOrder,
  setSelectedCategories,
  setLoading,
  setError,
} = productsSlice.actions
export default productsSlice.reducer
