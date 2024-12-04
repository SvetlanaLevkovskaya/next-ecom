'use client'

import { ImageWithFallback } from '@/components'
import { PartialProduct } from '@/types'

export const ProductImage = ({ image, title }: PartialProduct) => {
  return (
    <div className="w-[206px] h-[256px] flex justify-center items-center flex-shrink-0 my-10">
      <ImageWithFallback
        src={image}
        alt={title ?? 'Image'}
        width={192}
        height={192}
        className="object-cover w-auto h-auto"
      />
    </div>
  )
}
