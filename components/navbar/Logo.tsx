import Link from 'next/link'
import { Button } from '../ui/button'
import { SiPrestashop } from 'react-icons/si'

function Logo() {
  return (
    <Button
      size='icon'
      variant='ghost'
      asChild
    >
      <Link href='/'>
        <SiPrestashop className='w-20 h-20' />
      </Link>
    </Button>
  )
}

export default Logo
