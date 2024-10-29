import { ReactNode, Suspense } from 'react'

import { Spinner } from '@/components'

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>
}
