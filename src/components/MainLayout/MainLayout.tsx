'use client'

import { usePathname } from 'next/navigation'

import { FavouriteHeader } from '@/components/MainLayout/FavouriteHeader/FavouriteHeader'
import { Footer } from '@/components/MainLayout/Footer/Footer'
import { Header } from '@/components/MainLayout/Header/Header'
import { SubHeader } from '@/components/MainLayout/Subheader/Subheader'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <SubHeader />
      {pathname === '/favourite' && <FavouriteHeader />}
      <main className="flex-grow flex flex-col w-full max-w-[932px] p-4 mx-auto">{children}</main>
      <Footer />
    </div>
  )
}
