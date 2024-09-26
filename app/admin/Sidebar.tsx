'use client'
import { adminLinks } from '@/utils/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='flex justify-around md:block md:border-r pr-4'>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href
        const variant = isActivePage ? 'default' : 'ghost'
        return (
          <Button
            key={link.label}
            asChild
            className='md:w-full mb-2 capitalize font-normal justify-start'
            variant={variant}
          >
            <Link
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          </Button>
        )
      })}
    </aside>
  )
}
export default Sidebar
