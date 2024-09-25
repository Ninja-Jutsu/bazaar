import Logo from './Logo'
import LinksDropdown from './LinksDropdown'
import DarkMode from './DarkMode'
import CartButton from './CartButton'
import NavSearch from './NavSearch'
import Container from '../global/Container'
import { Suspense } from 'react'
import { Merriweather } from 'next/font/google'

const merriweather = Merriweather({ subsets: ['latin'], weight: ['400'] })
function Navbar() {
  return (
    <nav className='border-b '>
      <Container className='flex  justify-between items-center flex-wrap gap-4 py-8'>
        <Logo />
        <div className='flex gap-4 items-center '>
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  )
}
export default Navbar
