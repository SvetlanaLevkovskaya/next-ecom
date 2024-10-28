import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 py-3">
      <div className="flex items-center justify-between gap-4 max-w-[932px] px-2 mx-auto">
        <div className="flex items-center gap-x-28">
          <Image
            height={0}
            width={0}
            style={{ height: '40px', width: '116px' }}
            alt={'logo'}
            src="/logo.svg"
            priority
            unoptimized
            className="hidden md:block"
          />

          <div className="relative max-w-[428px]">
            <input
              className="w-[300px] sm:w-[428px] border border-slate-200 focus:border-amber-500 transition-colors duration-200 ease-in-out p-4 pl-6 rounded-lg text-sm placeholder-gray-500 outline-none"
              placeholder="Search"
            />
            <Image
              height={0}
              width={0}
              style={{ height: '16px', width: '16px' }}
              alt="search"
              src="/loop.svg"
              priority
              unoptimized
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        <Link href="/favorite" passHref className="flex flex-col items-center gap-[1px]">
          <Image
            height={0}
            width={0}
            style={{ height: '20px', width: '20px' }}
            alt={'favorite'}
            src="/favorite.svg"
            priority
            unoptimized
          />
          <span className="hidden md:block text-sm text-gray-700">Favorite</span>
        </Link>
      </div>
    </header>
  )
}
