'use client'

import { ChangeEvent, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isSortOrder } from '@/utils/isSortOrder'

import { setSortOrder } from '@/store/productsSlice'
import { RootState } from '@/store/store'

const SortSelectComponent = () => {
  const dispatch = useDispatch()
  const sortOrder = useSelector((state: RootState) => state.products.sortOrder)

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value
    if (isSortOrder(newSortOrder)) {
      dispatch(setSortOrder(newSortOrder))
    }
  }

  return (
    <select
      value={sortOrder}
      onChange={handleSortChange}
      className="py-2 px-4 pl-0 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-sm"
    >
      <option value="asc" className="text-sm bg-amber-100">
        Price Up
      </option>
      <option value="desc" className="text-sm bg-amber-100">
        Price Down
      </option>
    </select>
  )
}

SortSelectComponent.displayName = 'SortSelect'

export const SortSelect = memo(SortSelectComponent)
