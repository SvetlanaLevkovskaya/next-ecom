export interface Rate {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: Rate
}

export type OptionalProduct = Partial<Product>

export type Params = {
  params: {
    id: number
  }
}

export type BreadcrumbItem = {
  title?: string
  path?: string
}
