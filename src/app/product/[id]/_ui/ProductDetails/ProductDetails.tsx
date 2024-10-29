import Image from 'next/image'

import { ImageWithFallback } from '@/components'
import { Products } from '@/types'
import { getStarIcons } from '@/utils'

export const ProductDetails = ({ product }: { product: Products }) => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center mx-auto gap-6 my-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Изображение продукта */}
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          width={256}
          height={256}
          className="object-cover"
        />

        {/* Информация о продукте */}
        <div className="flex flex-col gap-4 w-full md:w-auto divide-y ">
          <div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <div className="flex items-center text-sm text-gray-700 gap-1">
                  <div className="flex items-center gap-0.5">
                    {getStarIcons(product.rating.rate)}
                  </div>
                  <span>({product.rating.count} rated)</span>
                </div>
              </div>

              {/* Кнопка 'Add to Favorite' */}
              <button className="flex items-center gap-2 w-44 border border-slate-200 h-9 px-6 text-sm rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap">
                <span>Add to Favorite</span>
                <Image
                  height={20}
                  width={20}
                  alt="favorite"
                  src="/favorite.svg"
                  priority
                  unoptimized
                />
              </button>
            </div>
          </div>

          {/* Описание и цена */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-10">
              <div className="w-full md:w-3/4">
                <h3 className="text-sm font-bold mb-8">Description</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <p className="text-2xl font-bold text-gray-900">{product.price} $</p>
                <button className="px-8 py-2 bg-amber-400 text-white font-medium rounded-md hover:bg-amber-500 transition-colors">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
