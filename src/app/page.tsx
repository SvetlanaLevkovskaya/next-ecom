import { getProducts } from '@/services/clientApi'

import { ProductList } from '@/app/(home)'

export default async function Home() {
  await getProducts()
  return <ProductList />
}
