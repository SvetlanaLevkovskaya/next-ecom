'use client'

import { ImageWithFallback, Spinner } from '@/components'
import { selectFavouriteProducts, toggleFavourite, useAppDispatch, useAppSelector } from '@/store'
import { getPluralisedItemsText } from '@/utils'

export const FavouriteDetails = () => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((state) => state.products.isInitialized)
  const favouriteProducts = useAppSelector(selectFavouriteProducts)

  const formattedItemsText = getPluralisedItemsText(favouriteProducts.length)

  console.log('isLoading', isInitialized)
  console.log('favouriteProducts', favouriteProducts)

  if (isInitialized)
    return (
      <div className="absolute inset-0 flex-center-center">
        <Spinner />
      </div>
    )

  if (!favouriteProducts.length) {
    return <div className="text-sm">No favourites added yet.</div>
  }

  return (
    <section className="flex flex-col gap-6 my-10 w-full divide-y">
      <div className="text-2xl">{formattedItemsText}</div>
      {favouriteProducts.map(({ id, image, title, category, price }) => (
        <div key={id} className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4">
          <div className="w-[140px] h-[220px] flex justify-center items-center self-center flex-shrink-0">
            <ImageWithFallback
              src={image}
              alt={`Image of ${title}`}
              width={134}
              height={178}
              className="object-cover w-auto h-auto"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto flex-grow py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <p className="text-sm text-gray-500 pb-4">{category}</p>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 py-2 md:py-6">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <p className="text-2xl font-bold">{price} $</p>
              <button
                onClick={() => dispatch(toggleFavourite(String(id)))}
                className="px-6 py-2 text-gray-500 rounded-md hover:bg-gray-100 transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
