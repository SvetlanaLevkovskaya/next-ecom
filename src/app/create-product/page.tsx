import { CreateProduct } from '@/app/create-product/ui/CreateProduct'

export async function generateMetadata() {
  return { title: `Create Product` }
}

export default function CreateProductPage() {
  return <CreateProduct />
}
