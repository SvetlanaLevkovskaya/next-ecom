import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

import { RootState } from '@/store/store'

interface FavouritesState {
  items: Record<string, boolean>
}

const initialState: FavouritesState = {
  items: {},
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload.reduce(
        (acc, id) => {
          acc[id] = true
          return acc
        },
        {} as Record<string, boolean>
      )
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      if (state.items[productId]) {
        delete state.items[productId]
      } else {
        state.items[productId] = true
      }
    },
    removeFavourites: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      delete state.items[productId]
    },
  },
})

export const selectFavouriteProducts = createSelector(
  (state: RootState) => state.products.products,
  (state: RootState) => state.favourites.items,
  (products, favourites) => products.filter(({ id }) => favourites[id])
)

export const { setFavourites, toggleFavourite, removeFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer
