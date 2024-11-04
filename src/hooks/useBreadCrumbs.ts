'use client'

import { useEffect } from 'react'

import { setBreadcrumbs } from '@/store/breadcrumbSlice'
import { useAppDispatch } from '@/store/store'

import { BreadcrumbItem } from '@/types'

export const useBreadcrumbs = (items: BreadcrumbItem[]) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setBreadcrumbs(items))

    return () => {
      dispatch(setBreadcrumbs([]))
    }
  }, [dispatch, items])
}
