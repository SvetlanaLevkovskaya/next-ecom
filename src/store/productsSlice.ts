import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { BreadcrumbItem, Product } from '@/types'

interface ProductsState {
  items: Product[]
  filteredItems: Product[]
  searchQuery: string
  sortOrder: 'asc' | 'desc'
  selectedCategories: string[]
  breadcrumbs: BreadcrumbItem[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
  breadcrumbs: [],
  isLoading: false,
  error: null,
}

const applyFilters = (state: ProductsState) => {
  let filtered = state.items

  if (state.selectedCategories.length > 0) {
    filtered = filtered.filter((product) => state.selectedCategories.includes(product.category))
  }

  if (state.searchQuery) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  }

  filtered = filtered.sort((a, b) => {
    return state.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  })

  state.filteredItems = filtered
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
      applyFilters(state)
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
      applyFilters(state)
      localStorage.setItem('searchQuery', payload)
    },
    setSortOrder: (state, { payload }: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = payload
      applyFilters(state)
      localStorage.setItem('sortOrder', payload)
    },
    setSelectedCategories: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedCategories = payload
      applyFilters(state)
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
