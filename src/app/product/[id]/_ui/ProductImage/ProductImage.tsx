import { ImageWithFallback } from '@/components'

export const ProductImage = ({
  productImage,
  productTitle,
}: {
  productImage: string
  productTitle: string
}) => {
  return (
    <div className="flex justify-center items-center my-10 flex-shrink-0 w-[206px] h-[206px]">
      <ImageWithFallback
        src={productImage}
        alt={productTitle}
        width={206}
        height={206}
        className="object-cover w-auto h-auto"
      />
    </div>
  )
}
