'use client'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useProductContext } from '../contexts/ProductContext'
import FavoriteToggleButton from './FavoriteToggleButton'

function ProductsGrid() {
  const { displayedProducts } = useProductContext()
  if (displayedProducts.length === 0) {
    return (
      <h5 className='text-2xl mt-16 '>
        Sorry, no products matched your search...
      </h5>
    )
  }
  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {displayedProducts.map((product: Product) => {
        const { name, price, image } = product
        const productId = product.id
        const dollarsAmount = formatCurrency(price)
        return (
          <article
            key={productId}
            className='group relative'
          >
            <Link href={`/products/${productId}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-4'>
                  <div className='relative h-64 md:h-48 rounded overflow-hidden '>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
                      priority
                      className='rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>
                  <div className='mt-4 text-center'>
                    <h2 className='text-lg  capitalize'>{name}</h2>
                    <p className='text-muted-foreground  mt-2'>
                      {dollarsAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className='absolute top-7 right-7 z-5'>
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default ProductsGrid
