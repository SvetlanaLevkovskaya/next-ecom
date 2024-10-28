import { Footer } from '@/components/MainLayout/Footer/Footer'
import { Header } from '@/components/MainLayout/Header/Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh mx-auto">
      <Header />
      <main className="flex flex-col flex-grow overflow-hidden">{children}</main>
      <Footer />
    </div>
  )
}
