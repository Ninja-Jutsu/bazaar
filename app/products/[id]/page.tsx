import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCart from '@/components/single-product/AddToCart'
import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import ProductRating from '@/components/single-product/ProductRating'
import { fetchSingleProduct, findExistingReview } from '@/utils/actions'
import { formatCurrency } from '@/utils/format'
import Image from 'next/image'
import ShareButton from '@/components/single-product/ShareButton'
import { auth } from '@clerk/nextjs/server'
import SubmitReview from '@/components/reviews/SubmitReview'
import ProductReviews from '@/components/reviews/ProductReviews'

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id)
  const { name, image, company, description, price } = product
  // Restrict Access
  const { userId } = auth()
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id))

  const dollarsAmount = formatCurrency(price)

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className='mt-6 grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
        {/* IMAGE FIRST COL */}
        <div className='relative h-full'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
            priority
            className='w-full rounded-md object-cover'
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div className='w-full'>
          {/* For small screens */}
          <div className='mb-10 lg:hidden'>
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              priority
              sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
              className='w-full rounded-md object-cover'
            />
          </div>
          <div className='w-full'>
            <div className='flex gap-x-8 items-center'>
              <div className='w-full flex justify-between'>
                <h1 className='capitalize text-2xl lg:text-3xl font-bold'>
                  {name}
                </h1>
                <div className='flex items-center gap-x-2'>
                  <FavoriteToggleButton productId={params.id} />
                  <ShareButton
                    name={product.name}
                    productId={params.id}
                  />
                </div>
              </div>
            </div>
            <ProductRating productId={params.id} />
            <h4 className='lg:text-xl mt-2 italic'>{company}</h4>
            <p className='mt-3 text-sm lg:text-md bg-muted inline-block p-2 rounded-md'>
              {dollarsAmount}
            </p>
          </div>

          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
          <AddToCart productId={params.id} />
        </div>
      </div>
      <div className='mt-10'>
        <ProductReviews productId={params.id} />
        {reviewDoesNotExist && <SubmitReview productId={params.id} />}
        <SubmitReview productId={params.id} />
      </div>
    </section>
  )
}
export default SingleProductPage
