import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
  },
})

export const { setFavourites, toggleFavourite } = favouritesSlice.actions
export default favouritesSlice.reducer
