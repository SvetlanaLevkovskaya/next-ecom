import { useDispatch, useSelector, useStore } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import breadcrumbReducer from '@/store/breadcrumbSlice'
import favouritesReducer from '@/store/favouritesSlice'
import { localStorageMiddleware } from '@/store/localStorageMiddleware'
import productsReducer from '@/store/productsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      favourites: favouritesReducer,
      products: productsReducer,
      breadcrumbs: breadcrumbReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
