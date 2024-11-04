'use client'

import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '@/store/store'

import { DataInitializer } from '@/providers/DataInitializer'

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>
      <DataInitializer />
      {children}
    </Provider>
  )
}
