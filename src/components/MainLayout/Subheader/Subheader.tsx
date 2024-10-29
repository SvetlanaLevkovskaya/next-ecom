import Link from 'next/link'

export const SubHeader = () => {
  return (
    <nav className="border-b border-slate-200 py-4 w-full">
      <div className="flex gap-8 text-sm max-w-[932px] mx-auto px-4 whitespace-nowrap">
        <Link href="/" passHref className=" hover:text-gray-900 transition-all2">
          Main Page
        </Link>
        <Link href="/delivery" passHref className="hover:text-gray-700 transition-all2">
          Delivery
        </Link>
        <Link href="/contacts" passHref className=" hover:text-gray-700 transition-all2">
          Contacts
        </Link>
        <Link href="/blog" passHref className="hover:text-gray-700 transition-all2">
          Blog
        </Link>
      </div>
    </nav>
  )
}
