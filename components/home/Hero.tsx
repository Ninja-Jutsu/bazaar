import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeroCarousel from './HeroCarousel'

function Hero() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mt-10'>
      <div>
        <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl'>
          Shop the latest trends and timeless classics at Bazaar.
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
          A curated marketplace offering a diverse and eclectic collection of
          products sourced globally, catering to every taste and passion.
          Discover unique finds, from handcrafted treasures to everyday
          essentials, all in one convenient destination.
        </p>
        <Button
          asChild
          size='lg'
          className='mt-10'
        >
          <Link href='/products'>Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}
export default Hero
