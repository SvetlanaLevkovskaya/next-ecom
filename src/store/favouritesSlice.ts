import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FavouritesState {
  items: string[]
}

const initialState: FavouritesState = {
  items: [],
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const productId = action.payload
      const index = state.items.indexOf(productId)
      if (index === -1) {
        state.items.push(productId)
      } else {
        state.items.splice(index, 1)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favourites', JSON.stringify(state.items))
      }
    },
  },
})

export const { setFavourites, toggleFavourite } = favouritesSlice.actions
export default favouritesSlice.reducer
