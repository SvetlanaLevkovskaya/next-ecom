'use client'

import { ChangeEvent, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaRegTimesCircle } from 'react-icons/fa'

import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import * as yup from 'yup'

import { customToastError, customToastSuccess } from '@/components/CustomToast/CustomToast'

import { createProduct } from '@/services/clientApi'

import { CategorySelect } from '@/app/create-product/ui/CategorySelect'
import { ImageWithFallback, Spinner } from '@/components'
import { setProducts, useAppDispatch, useAppSelector } from '@/store'
import { ProductFormData } from '@/types'

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title must be less than 100 characters'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .max(10000, 'Price must not exceed 10,000')
    .required('Price is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(300, 'Description must be less than 300 characters'),
  category: yup.string().required('Category is required'),
})

export const CreateProduct = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputKey, setInputKey] = useState<number>(Date.now())
  const [fileValue, setFileValue] = useState<File | null>(null)
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)

  const formMethods = useForm<ProductFormData>({
    resolver: yupResolver(schema),
  })

  const { register, handleSubmit, reset, formState } = formMethods
  const { errors, isSubmitting } = formState

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
      setFileValue(file)
    }
  }

  const handleImageRemove = () => {
    setPreviewImage(null)
    setFileValue(null)
    setInputKey(Date.now())
  }

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    const productData = {
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: fileValue,
    }

    try {
      const newProduct = await createProduct(productData)
      customToastSuccess('Product created successfully!')
      dispatch(setProducts([...products, newProduct]))
      reset()
      setPreviewImage(null)
    } catch (error) {
      console.error('Error creating product:', error)
      customToastError('Failed to create product.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded min-w-80">
      <h1 className="text-lg font-bold mb-4">Create New Product (testing Redux)</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register('title')}
              type="text"
              placeholder="Title"
              className="p-2 border rounded w-full text-sm border-slate-200 focus:border-amber-500 transition-all placeholder-slate-400 outline-none"
            />
            {errors.title && <p className="text-rose-400  text-xs">{errors.title.message}</p>}
          </div>

          <div>
            <input
              {...register('price')}
              type="number"
              placeholder="Price"
              className="p-2 border rounded w-full text-sm border-slate-200 focus:border-amber-500 transition-all placeholder-slate-400 outline-none"
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          <div>
            <textarea
              {...register('description')}
              placeholder="Description"
              className="p-2 border rounded w-full text-sm border-slate-200 focus:border-amber-500 transition-all placeholder-slate-400 outline-none"
            />
            {errors.description && (
              <p className="text-rose-400 text-xs">{errors.description.message}</p>
            )}
          </div>

          <div>
            <div
              className={`p-2 border rounded w-full text-sm ${
                isFocused ? 'border-amber-500' : 'border-slate-200'
              } transition-all`}
            >
              <input
                key={inputKey}
                {...register('image')}
                type="file"
                accept="image/*"
                className="outline-none w-full"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(event) => {
                  register('image').onChange(event)
                  handleImageChange(event)
                }}
              />
            </div>
            {previewImage && (
              <div className="relative mt-2">
                <ImageWithFallback
                  width={128}
                  height={128}
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="absolute top-0 right-0 bg-white p-1 rounded-full"
                >
                  <FaRegTimesCircle
                    className={clsx(
                      'h-5 w-5 text-gray-300 cursor-pointer transition-all hover:scale-110',
                      {}
                    )}
                  />
                </button>
              </div>
            )}
            {errors.image && <p className="text-rose-400  text-xs">{errors.image.message}</p>}
          </div>

          <div>
            <CategorySelect />
            {errors.category && <p className="text-rose-400  text-xs">{errors.category.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-teal-400 text-white py-2 rounded hover:bg-teal-500 flex items-center justify-center disabled:bg-slate-200 disabled:pointer-events-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner size={24} /> : 'Create Product'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
