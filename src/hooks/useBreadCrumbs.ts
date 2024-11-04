'use client'

import { useEffect } from 'react'

import { setBreadcrumbs, useAppDispatch } from '@/store'
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
