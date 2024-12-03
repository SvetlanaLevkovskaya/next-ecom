import { removeFavourites, setFavourites, toggleFavourite } from '@/store/favouritesSlice'
import { setSearchQuery, setSelectedCategories, setSortOrder } from '@/store/productsSlice'
import { RootState } from '@/store/store'

export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  const state = store.getState() as RootState

  if (action.type === setSearchQuery.type) {
    localStorage.setItem('searchQuery', state.products.searchQuery)
  } else if (action.type === setSortOrder.type) {
    localStorage.setItem('sortOrder', state.products.sortOrder)
  } else if (action.type === setSelectedCategories.type) {
    localStorage.setItem('selectedCategories', JSON.stringify(state.products.selectedCategories))
  } else if (action.type === setFavourites.type || action.type === toggleFavourite.type) {
    localStorage.setItem('favourites', JSON.stringify(Object.keys(state.favourites.items)))
  } else if (action.type === setFavourites.type || action.type === removeFavourites.type) {
    localStorage.setItem('favourites', JSON.stringify(Object.keys(state.favourites.items)))
  }

  return result
}
