import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Products } from '@/types'

interface ProductsState {
  items: Products[]
}

const initialState: ProductsState = {
  items: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.items = action.payload
    },
  },
})

export const { setProducts } = productsSlice.actions
export default productsSlice.reducer
