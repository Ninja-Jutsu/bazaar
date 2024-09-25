import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero4 from '@/public/images/hero4.jpg'
import { fetchFeaturedProducts } from '@/utils/actions'
import Link from 'next/link'

const carouselImages = [hero1, hero2, hero3, hero4]

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
                        width={200}
                        height={200}
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
