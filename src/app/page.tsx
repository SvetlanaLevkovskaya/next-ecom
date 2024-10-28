import { getProducts } from '@/services/clientApi'

import { ProductList } from '@/app/_ui/ProductList'

export default async function Home() {
  const products = await getProducts()

  return <ProductList products={products} />
}
