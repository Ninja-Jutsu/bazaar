import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchAllProducts } from '@/utils/actions'
import Link from 'next/link'
import SectionTitle from '../global/SectionTitle'

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string
  search: string
}) {
  const products = await fetchAllProducts()
  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ''
  return (
    <>
      <section>
        <div className='flex justify-between items-center'>
          <SectionTitle
            text={`${totalProducts} product${totalProducts > 1 && 's'}`}
            moreStyles='font-medium text-lg'
            useSeparator={false}
          />
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
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16 '>
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  )
}
export default ProductsContainer
