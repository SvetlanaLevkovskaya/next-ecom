'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setBreadcrumbs } from '@/store/productsSlice'

import { BreadcrumbItem } from '@/types'

export const useBreadcrumbs = (items: BreadcrumbItem[]) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBreadcrumbs(items))

    return () => {
      dispatch(setBreadcrumbs([]))
    }
  }, [dispatch, items])
}
