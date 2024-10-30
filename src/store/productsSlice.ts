import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Products } from '@/types'

interface ProductsState {
  items: Products[]
  filteredItems: Products[]
  searchQuery: string
  sortOrder: 'asc' | 'desc'
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  sortOrder: 'asc',
  isLoading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.items = action.payload
      state.filteredItems = action.payload
      state.isLoading = false
      state.error = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      state.filteredItems = state.items.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload
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

export const { setProducts, setSearchQuery, setSortOrder, setLoading, setError } =
  productsSlice.actions
export default productsSlice.reducer
