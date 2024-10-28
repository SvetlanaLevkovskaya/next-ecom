import Image from 'next/image'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 py-5 ">
      <div className="flex items-center justify-between gap-2  max-w-[932px] px-2 md:mx-auto">
        <div className="flex items-center gap-x-36">
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

          <div className="relative  w-[428px]">
            <input
              className="w-full border border-zinc-300 focus:border-blue-500 transition-colors duration-200 ease-in-out py-2 pl-6 pr-4 rounded-lg text-sm placeholder-gray-500 outline-none"
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

        <div className="flex flex-col items-center gap-[1px]">
          <Image
            height={0}
            width={0}
            style={{ height: '20px', width: '20px' }}
            alt={'logo'}
            src="/favorite.svg"
            priority
            unoptimized
          />
          <span className="text-sm text-gray-700">Favorite</span>
        </div>
      </div>
    </header>
  )
}
