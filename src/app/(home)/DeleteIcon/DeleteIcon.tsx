import { MouseEvent } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'

import clsx from 'clsx'

import { deleteProduct, useAppDispatch } from '@/store'

export const DeleteIcon = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()

  if (!id) return null

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault()
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => console.log(`Product ${id} deleted`))
      .catch((err) => console.error(err))
  }

  return (
    <button
      type="button"
      className="absolute top-4 right-10"
      aria-label="Delete Product"
      onClick={handleDelete}
    >
      <FaRegTimesCircle
        className={clsx('text-gray-300 cursor-pointer transition-all hover:scale-110')}
      />
    </button>
  )
}
