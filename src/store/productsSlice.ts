import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { RootState } from '@/store/store'

import { BreadcrumbItem, Product, SortOrder } from '@/types'

interface ProductsState {
  items: Product[]
  searchQuery: string
  sortOrder: SortOrder
  selectedCategories: string[]
  breadcrumbs: BreadcrumbItem[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
  breadcrumbs: [],
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setBreadcrumbs(state, { payload }: PayloadAction<BreadcrumbItem[]>) {
      state.breadcrumbs = payload
    },
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.items = payload
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
      localStorage.setItem('searchQuery', payload)
    },
    setSortOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.sortOrder = payload
      localStorage.setItem('sortOrder', payload)
    },
    setSelectedCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedCategories = payload
      localStorage.setItem('selectedCategories', JSON.stringify(payload))
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
  (state: RootState) => state.products.items || [],
  (state: RootState) => state.products.selectedCategories || [],
  (state: RootState) => state.products.searchQuery || '',
  (state: RootState) => state.products.sortOrder || 'asc',
  (items, selectedCategories, searchQuery, sortOrder) => {
    let filtered = items

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    }
    return filtered
      .slice()
      .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price))
  }
)
export const {
  setBreadcrumbs,
  setProducts,
  setSearchQuery,
  setSortOrder,
  setSelectedCategories,
  setLoading,
  setError,
} = productsSlice.actions
export default productsSlice.reducer
