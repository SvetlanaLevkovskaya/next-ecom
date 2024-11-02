export interface Rate {
  rate: number
  count: number
}

export interface Products {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: Rate
}

export type Params = {
  params: {
    id: number
  }
}

export type BreadcrumbItem = {
  title: string
  path?: string
}
