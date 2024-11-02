import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href={'/'}>
      <Image
        height={40}
        width={116}
        alt={'logo'}
        src="/logo.svg"
        priority
        unoptimized
        className="hidden md:block w-auto h-auto"
      />
    </Link>
  )
}
