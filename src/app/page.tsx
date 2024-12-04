import { getProducts } from '@/services/clientApi'

import { ProductList } from '@/app/(home)'

export default async function Home() {
  const products = await getProducts()
  return <ProductList initialProducts={products} />
}
