import { Rate } from '@/types'
import { getStarIcons } from '@/utils'

export const ProductInfo = ({
  productTitle,
  productRating,
}: {
  productTitle: string
  productRating: Rate
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{productTitle}</h2>
      <div className="flex items-center text-sm text-gray-700 gap-1">
        <div className="flex items-center gap-0.5">{getStarIcons(productRating.rate)}</div>
        <span>({productRating.count} rated)</span>
      </div>
    </div>
  )
}
