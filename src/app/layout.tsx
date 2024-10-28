import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import { MainLayout } from '@/components/MainLayout/MainLayout'

import './globals.css'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-comm',
  description: 'E-commerce App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
