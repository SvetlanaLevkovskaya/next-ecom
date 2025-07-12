import type { Metadata } from 'next'

import { getProductServer } from '@/services/serverApi'

import { ProductDetails } from '@/app/product/[id]/_ui'
import { Params } from '@/types'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProductServer(params.id)
  return { title: product ? product.title : `Product ${params.id}` }
}

export default async function ProductPage({ params }: Params) {
  const product = await getProductServer(params.id)

  if (!product) return <div>Товар не найден</div>

  return <ProductDetails product={product} />
}
