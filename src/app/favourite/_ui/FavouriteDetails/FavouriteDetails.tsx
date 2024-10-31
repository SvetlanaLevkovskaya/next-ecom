'use client'

import { useDispatch, useSelector } from 'react-redux'

import { getItemsText } from '@/utils/getItemsText'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { ImageWithFallback } from '@/components'

export const FavouriteDetails = () => {
  const dispatch = useDispatch()
  const favouriteItems = useSelector((state: RootState) => state.favourites.items)
  const allProducts = useSelector((state: RootState) => state.products.items)

  const favouriteProducts = allProducts.filter((product) =>
    favouriteItems.includes(String(product.id))
  )

  const formattedItemsText = getItemsText(favouriteProducts.length)

  return (
    <section className="flex flex-col gap-6 my-10 w-full divide-y">
      {favouriteProducts.length > 0 && <div className="text-2xl">{formattedItemsText}</div>}

      {favouriteProducts.map((product) => {
        return (
          <div key={product.id} className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4">
            <div className="w-[140px] h-[220px] flex justify-center items-center self-center flex-shrink-0">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                width={134}
                height={178}
                className="object-cover w-auto h-auto"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto flex-grow py-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div>
                  <p className="text-sm text-gray-500 pb-4">{product.category}</p>
                  <h2 className="text-xl font-bold">{product.title}</h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 py-2 md:py-6">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <p className="text-2xl font-bold">{product.price} $</p>
                <button
                  onClick={() => dispatch(toggleFavourite(String(product.id)))}
                  className="px-6 py-2 text-gray-500 rounded-md hover:bg-gray-100 transition-all2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
