import type { Metadata } from 'next'

import { getProduct } from '@/services/clientApi'

import { ProductDetails } from '@/app/product/[id]/_ui'
import { Params } from '@/types'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProduct(params.id)
  return { title: product ? product.title : `Product ${params.id}` }
}

export default async function ProductPage({ params }: Params) {
  const { id } = params

  const product = await getProduct(id)

  return <ProductDetails product={product} />
}
