import { setFavourites } from '@/store/favouritesSlice'
import { setSearchQuery, setSelectedCategories, setSortOrder } from '@/store/productsSlice'

export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action)
  const state = store.getState()

  if (action.type === setSearchQuery.type) {
    localStorage.setItem('searchQuery', state.products.searchQuery)
  } else if (action.type === setSortOrder.type) {
    localStorage.setItem('sortOrder', state.products.sortOrder)
  } else if (action.type === setSelectedCategories.type) {
    localStorage.setItem('selectedCategories', JSON.stringify(state.products.selectedCategories))
  } else if (action.type === setFavourites.type) {
    localStorage.setItem('favourites', JSON.stringify(state.favourites.items))
  }

  return result
}
