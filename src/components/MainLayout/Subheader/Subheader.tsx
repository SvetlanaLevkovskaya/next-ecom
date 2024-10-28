import Link from 'next/link'

export const SubHeader = () => {
  return (
    <nav className="border-b border-zinc-200 py-4 w-full">
      <div className="flex gap-8 text-sm max-w-[932px] mx-auto px-4">
        <Link
          href="/"
          passHref
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          Main Page
        </Link>
        <Link
          href="/delivery"
          passHref
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          Delivery
        </Link>
        <Link
          href="/contacts"
          passHref
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          Contacts
        </Link>
        <Link
          href="/blog"
          passHref
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          Blog
        </Link>
      </div>
    </nav>
  )
}
