import { Products } from '@/types'

export const ProductDetails = ({ product }: { product: Products }) => {
  return <div>{product.description}</div>
}
