import { Footer } from '@/components/MainLayout/Footer/Footer'
import { Header } from '@/components/MainLayout/Header/Header'
import { SubHeader } from '@/components/MainLayout/Subheader/Subheader'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh mx-auto">
      <Header />
      <SubHeader />
      <main className="flex flex-col flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
