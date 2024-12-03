'use client'

import { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

import { FavouriteHeader, Footer, Header, SubHeader } from '@/components/MainLayout'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      <SubHeader />
      {pathname === '/favourite' && <FavouriteHeader />}
      <main className="flex-grow flex flex-col w-full max-w-[932px] p-4 mx-auto relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}
