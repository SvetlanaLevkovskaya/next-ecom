import { FavouriteDetails } from '@/app/favourite/_ui'

export async function generateMetadata() {
  return { title: `Favourite` }
}

export default function FavouritePage() {
  return <FavouriteDetails />
}
