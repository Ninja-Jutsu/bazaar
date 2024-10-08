import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'
import { Button } from '../ui/button'
import { links } from '@/utils/links'
import UserIcon from './UserIcon'
import SignOutLink from './SignOutLink'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

function LinksDropdown() {
  const { userId } = auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='md:flex md:gap-4 md:max-w-[100px] w-12 h-12'
        >
          {/* <LuAlignLeft className='w-6 h-6 hidden sm:block mr-5 dark:text-white'/> */}
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-40 mr-5'
        align='start'
        sideOffset={10}
      >
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (link.label === 'dashboard' && !isAdmin) return null
            return (
              <DropdownMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className='capitalize w-full'
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
