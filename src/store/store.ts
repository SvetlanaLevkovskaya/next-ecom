import { configureStore } from '@reduxjs/toolkit'

import favouritesReducer from '@/store/favouritesSlice'
import productsReducer from '@/store/productsSlice'

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
