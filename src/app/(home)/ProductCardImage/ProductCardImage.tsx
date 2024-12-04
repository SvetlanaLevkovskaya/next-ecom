import { ImageWithFallback } from '@/components'
import { PartialProduct } from '@/types'

export const ProductCardImage = ({ image, title }: PartialProduct) => {
  return (
    <div className="flex-center-center w-[156px] h-[224px] self-center">
      <ImageWithFallback
        src={image}
        alt={title ?? 'Image'}
        width={100}
        height={100}
        className="object-cover mx-auto w-auto h-auto"
        priority
      />
    </div>
  )
}
