import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

function ProductsContainer({
  layout,
  search,
}: {
  layout: string
  search: string
}) {
  const searchTerm = search ? `&search=${search}` : ''
  return (
    <>
      <section>
        <div className='flex justify-between items-center'>
          <div className='flex gap-x-4'>
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>{layout === 'grid' ? <ProductsGrid /> : <ProductsList />}</div>
    </>
  )
}
export default ProductsContainer
