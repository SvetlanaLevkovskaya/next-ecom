import { CreateProductForm } from '@/app/create-product/_ui/CreateProductForm'

export async function generateMetadata() {
  return { title: `Create Product` }
}

export default function CreateProductPage() {
  return <CreateProductForm />
}
