import Link from 'next/link'

import { GiMagicGate } from 'react-icons/gi'

function Logo() {
  return (
    <Link
      href='/'
      className='transition-all duration-1500 animate-pulse'
    >
      <GiMagicGate className='w-12 h-12' />
    </Link>
  )
}

export default Logo
