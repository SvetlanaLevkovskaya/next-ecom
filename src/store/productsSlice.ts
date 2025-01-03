import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { deleteProductAPI } from '@/services/clientApi'

import { removeFavourites } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { Product, SortOrderType } from '@/types'

interface ProductsState {
  products: Product[]
  searchQuery: string
  sortOrder: SortOrderType
  selectedCategories: string[]
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

const initialState: ProductsState = {
  products: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
  isLoading: false,
  error: null,
  isInitialized: true,
}

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteProductAPI(id)
      dispatch(removeFavourites(id))
      return id
    } catch (error) {
      return rejectWithValue(`Failed to delete product: ${error}`)
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<Product[]>) => {
      state.products = payload
      state.isInitialized = false
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
    },
    setSortOrder: (state, { payload }: PayloadAction<SortOrderType>) => {
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
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true
    })
    builder
      .addCase(deleteProduct.fulfilled, (state, { payload: id }) => {
        state.isLoading = false
        state.products = state.products.filter((product) => product.id !== Number(id))
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload as string
      })
  },
})

export const selectFilteredProducts = createSelector(
  (state: RootState) => state.products.products,
  (state: RootState) => state.products.selectedCategories,
  (state: RootState) => state.products.searchQuery,
  (state: RootState) => state.products.sortOrder,
  (products, selectedCategories, searchQuery, sortOrder) => {
    let filtered = selectedCategories.length
      ? products.filter((product) => selectedCategories.includes(product.category))
      : products

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
