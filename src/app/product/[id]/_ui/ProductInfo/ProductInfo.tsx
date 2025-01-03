'use client'

import { PartialProduct } from '@/types'
import { getStarIcons } from '@/utils'

export const ProductInfo = ({ title, rating }: PartialProduct) => {
  if (!title || !rating) return null
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {rating && (
        <div className="flex items-center text-sm text-gray-700 gap-1">
          <div className="flex items-center gap-0.5">{getStarIcons(rating.rate)}</div>
          <span>({rating.count} rated)</span>
        </div>
      )}
    </div>
  )
}
