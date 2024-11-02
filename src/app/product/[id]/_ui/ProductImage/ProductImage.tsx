import { ImageWithFallback } from '@/components'

export const ProductImage = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="w-[206px] h-[256px] flex justify-center items-center flex-shrink-0 my-10">
      <ImageWithFallback
        src={image}
        alt={title}
        width={192}
        height={192}
        className="object-cover w-auto h-auto"
      />
    </div>
  )
}
