import { Product } from '@/types'

export async function getProductServer(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 }, // кеш на 60 секунд
    })

    if (!res.ok) {
      console.error(`Failed to fetch product: ${res.status}`)
      return null
    }

    return res.json()
  } catch (err) {
    console.error('Fetch product error:', err)
    return null
  }
}
