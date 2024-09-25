import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchAllProducts } from '@/utils/actions'
import Link from 'next/link'
import { Suspense } from 'react'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import NavSearch from '../navbar/NavSearch'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string
  search: string
}) {
  const products = await fetchAllProducts({ search })
  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ''
  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center my-4 gap-4'>
          <h4 className='font-medium text-lg lg:text-2xl text-nowrap'>
            {totalProducts} product{totalProducts > 1 && 's'} found
          </h4>
          <div className='hidden md:block'>
            <Suspense>
              <NavSearch />
            </Suspense>
          </div>
          <div className='flex gap-4'>
            <div className='md:hidden'>
              <Suspense>
                <NavSearch />
              </Suspense>
            </div>
            <div
              id='buttons'
              className='hidden md:flex gap-4'
            >
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
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  )
}
export default ProductsContainer
