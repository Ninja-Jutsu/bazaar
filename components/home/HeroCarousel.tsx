import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { fetchFeaturedProducts } from '@/utils/actions'
import Link from 'next/link'

async function HeroCarousel() {
  const carouselProducts = await fetchFeaturedProducts()
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselProducts.map((product) => {
            const { image, id } = product
            return (
              <CarouselItem key={id}>
                <Card>
                  <CardContent className='p-2'>
                    <Link href={`/products/${id}`}>
                      <Image
                        src={image}
                        alt='hero'
                        width={500}
                        height={500}
                        className='w-full h-[24rem] rounded-md object-cover'
                        priority
                      />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default HeroCarousel
