import Link from 'next/link'
import { Button } from '../ui/button'
import { SiPrestashop } from 'react-icons/si'

function Logo() {
  return (
    <Link
      href='/'
      className='transition-all duration-1500 animate-pulse'
    >
      <SiPrestashop className='w-12 h-12' />
    </Link>
  )
}

export default Logo
