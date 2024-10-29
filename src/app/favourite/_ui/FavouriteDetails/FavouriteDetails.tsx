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
    <section className="flex flex-col gap-6 my-10 w-full">
      {favouriteProducts.length > 0 && <div className="text-2xl">{formattedItemsText}</div>}

      {favouriteProducts.map((product) => {
        return (
          <div key={product.id} className="flex items-center flex-col md:flex-row gap-8 w-full">
            <div className="w-[134px] h-[178px]">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                width={134}
                height={178}
                className="object-cover w-auto h-auto"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto flex-grow">
              <div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <h2 className="text-xl font-bold">{product.title}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">{product.price} $</p>
                <button
                  onClick={() => dispatch(toggleFavourite(String(product.id)))}
                  className="px-8 py-2 text-gray-500 rounded-md hover:bg-gray-100 transition-colors"
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
