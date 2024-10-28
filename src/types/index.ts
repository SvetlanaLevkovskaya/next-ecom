export interface Products {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export type Params = {
  params: {
    id: number
  }
}
