import { Skeleton } from '../ui/skeleton'
import { Card, CardContent } from '../ui/card'
import SectionTitle from './SectionTitle'
import { Redacted_Script } from 'next/font/google'
const redacted = Redacted_Script({ subsets: ['latin'], weight: ['400'] })
function LoadingContainer() {
  return (
    <section className='pt-24'>
      <SectionTitle
        text='featured products'
        // moreStyles={redacted.className}
      />
      <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </section>
  )
}

function LoadingProduct() {
  return (
    <Card>
      <CardContent className='p-4'>
        <Skeleton className='h-48 w-full' />
        <div className='flex flex-col items-center justify-center'>
          <p className={`${redacted.className} text-lg  capitalize`}>
            Product Title
          </p>
          <p className={`text-muted-foreground  mt-2`}>
            $ <span className={redacted.className}>200</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
export default LoadingContainer
