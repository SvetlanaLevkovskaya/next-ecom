import Image from 'next/image'
import Link from 'next/link'

import { ImageWithFallback } from '@/components/ImageWithFallback/ImageWithFallback'

import { Products } from '@/types'

export const ProductCard = ({ product }: { product: Products }) => {
  const shouldTruncate = product.title.length > 30
  const displayedTitle = shouldTruncate ? `${product.title.slice(0, 30)}...` : product.title
  return (
    <Link
      href={`/product/${product.id}`}
      className="relative  flex flex-col justify-between border p-4 gap-2.5"
    >
      <p className="text-sm text-gray-500">{product.category}</p>
      <h3 className="text-sm font-medium  min-h-10">{displayedTitle}</h3>

      <div className="absolute top-4 right-4">
        <Image
          height={0}
          width={0}
          style={{ height: '20px', width: '20px' }}
          alt={'favorite'}
          src="/favorite.svg"
          priority
          unoptimized
        />
      </div>

      <ImageWithFallback
        src={product.image}
        alt={product.title}
        width={156}
        height={209}
        className="object-cover mx-auto"
      />

      <div className="mt-auto pt-8">
        <p className="text-2xl font-black text-gray-900">{product.price}&#32;$</p>
      </div>
    </Link>
  )
}
