'use client'

import { useMemo } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import clsx from 'clsx'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'

import { useBreadcrumbs } from '@/hooks/useBreadCrumbs'

import { toggleFavourite } from '@/store/favouritesSlice'
import { RootState } from '@/store/store'

import { ImageWithFallback } from '@/components'
import { BreadcrumbItem, Products } from '@/types'
import { getStarIcons } from '@/utils'

export const ProductDetails = ({ product }: { product: Products }) => {
  const dispatch = useDispatch()
  const isFavored = useSelector((state: RootState) =>
    state.favourites.items.includes(String(product.id))
  )

  const breadcrumbs: BreadcrumbItem[] = useMemo(
    () => [{ title: 'Main', path: '/' }, { title: 'Catalog', path: '/' }, { title: product.title }],
    [product.title]
  )

  useBreadcrumbs(breadcrumbs)

  return (
    <section className="flex flex-col md:flex-row justify-center items-center mx-auto gap-6 my-10">
      <div className="flex flex-col">
        <div className="text-sm pb-16 md:pb-8">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-[206px] h-[206px] flex justify-center items-center flex-shrink-0 my-10">
            <ImageWithFallback
              src={product.image}
              alt={product.title}
              width={226}
              height={226}
              className="object-cover w-auto h-auto"
            />
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto divide-y">
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

                <button
                  onClick={() => dispatch(toggleFavourite(String(product.id)))}
                  className="flex-center-center gap-3 w-48 border border-slate-200 h-9 px-2 text-sm rounded-md hover:bg-gray-100 transition-all whitespace-nowrap"
                >
                  <span>{isFavored ? 'Remove from Favourite' : 'Add to Favourite'}</span>
                  <FaHeart
                    size={20}
                    className={clsx('text-gray-300 cursor-pointer transition-all', {
                      'text-red-500': isFavored,
                    })}
                  />
                </button>
              </div>
            </div>

            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-10">
                <div className="w-full md:w-3/4 flex-grow">
                  <h3 className="text-sm font-bold mb-6">Description</h3>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4 self-start ">
                  <p className="text-2xl font-bold text-gray-900">{product.price}&#32;$</p>
                  <button className="px-8 py-2 bg-amber-400 text-white font-medium rounded-md hover:bg-amber-500 transition-all2">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
