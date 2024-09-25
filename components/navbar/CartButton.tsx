import { Button } from '@/components/ui/button'
import { LuShoppingCart } from 'react-icons/lu'
import Link from 'next/link'
import { fetchCartItems } from '@/utils/actions'

async function CartButton() {
  const numItemsInCart = await fetchCartItems()
  return (
    <Button
      asChild
      variant='outline'
      size='icon'
      className='flex justify-center items-center relative w-12 h-12'
    >
      <Link href='/cart'>
        <LuShoppingCart className='h-8 w-8 p-1' />
        <span className='absolute -top-3 -right-3 bg-primary text-white dark:text-black rounded-full h-6 w-6 flex items-center justify-center text-xs'>
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  )
}
export default CartButton
