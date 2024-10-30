import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Products } from '@/types'

interface ProductsState {
  items: Products[]
  filteredItems: Products[]
  searchQuery: string
  sortOrder: 'asc' | 'desc'
  selectedCategories: string[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
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
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.items = action.payload
      applyFilters(state)
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      applyFilters(state)
      localStorage.setItem('searchQuery', action.payload)
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
      applyFilters(state)
      localStorage.setItem('sortOrder', action.payload)
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload
      applyFilters(state)
      localStorage.setItem('selectedCategories', JSON.stringify(action.payload))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const {
  setProducts,
  setSearchQuery,
  setSortOrder,
  setSelectedCategories,
  setLoading,
  setError,
} = productsSlice.actions
export default productsSlice.reducer
