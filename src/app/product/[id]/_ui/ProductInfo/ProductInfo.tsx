import { Rate } from '@/types'
import { getStarIcons } from '@/utils'

export const ProductInfo = ({ title, rating }: { title: string; rating: Rate }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex items-center text-sm text-gray-700 gap-1">
        <div className="flex items-center gap-0.5">{getStarIcons(rating.rate)}</div>
        <span>({rating.count} rated)</span>
      </div>
    </div>
  )
}
