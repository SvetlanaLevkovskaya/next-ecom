import { Footer } from '@/components/MainLayout/Footer/Footer'
import { Header } from '@/components/MainLayout/Header/Header'
import { SubHeader } from '@/components/MainLayout/Subheader/Subheader'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <SubHeader />
      <main className="w-full h-full flex flex-col flex-grow  max-w-[932px] p-2 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  )
}
