import type { Metadata } from 'next'

import { getProduct } from '@/services/clientApi'

import { ProductDetails } from '@/app/product/[id]/_ui'
import { Params } from '@/types'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const product = await getProduct(params.id)
    return { title: product ? product.title : `Product ${params.id}` }
  } catch (err) {
    console.error('Metadata error:', err)
    return { title: `Product ${params.id}` }
  }
}

export default async function ProductPage({ params }: Params) {
  try {
    const product = await getProduct(params.id)
    return <ProductDetails product={product} />
  } catch (err) {
    console.error('ProductPage error:', err)
    return <div>Ошибка загрузки продукта</div>
  }
}
