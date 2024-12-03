import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { deleteProductAPI } from '@/services/clientApi'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { Product, SortOrder } from '@/types'

interface ProductsState {
  products: Product[]
  searchQuery: string
  sortOrder: SortOrder
  selectedCategories: string[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  searchQuery: '',
  sortOrder: 'asc',
  selectedCategories: [],
  isLoading: false,
  error: null,
}

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteProductAPI(id)
      dispatch(toggleFavourite(id))
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
    console.log('Products:', products)
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

export const { setProducts, setSearchQuery, setSortOrder, setSelectedCategories } =
  productsSlice.actions
export default productsSlice.reducer
