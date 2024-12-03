import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Main Page' },
  { href: '/create-product', label: 'Create Product' },
  { href: '/contacts', label: 'Contacts' },
  { href: '/blog', label: 'Blog' },
]

export const SubHeader = () => (
  <nav className="border-b border-slate-200 py-4 w-full">
    <div className="flex gap-8 text-sm max-w-[932px] mx-auto px-4 whitespace-nowrap">
      {navLinks.map(({ href, label }) => (
        <Link key={href} href={href} className="hover:text-gray-700 transition-all">
          {label}
        </Link>
      ))}
    </div>
  </nav>
)
