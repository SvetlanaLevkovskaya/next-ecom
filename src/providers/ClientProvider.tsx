'use client'

import { Provider } from 'react-redux'

import { store } from '@/store/store'

import { DataInitializer } from '@/providers/DataInitializer'

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DataInitializer />
      {children}
    </Provider>
  )
}
