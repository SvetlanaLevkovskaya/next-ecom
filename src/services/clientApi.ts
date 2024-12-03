import axios from 'axios'

import { Product } from '@/types'

export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Unexpected Error'

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      errorMessage = error.message || error.response.statusText
    } else if (error.request) {
      console.error('No Response Error:', error.request.statusText)
      errorMessage = error.request.statusText || 'No Response from server'
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    errorMessage = error.message
  } else {
    console.error('Unexpected Error:', error)
    errorMessage = error as string
  }

  return errorMessage
}

const instanceAxios = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export async function getProducts(): Promise<Product[]> {
  const response = await instanceAxios.get(`/products`)
  return response.data
}

export async function getProduct(id: number): Promise<Product> {
  const response = await instanceAxios.get(`/products/${id}`)
  return response.data
}

export async function deleteProductAPI(id: string): Promise<string> {
  await instanceAxios.delete(`/products/${id}`)
  return id
}
