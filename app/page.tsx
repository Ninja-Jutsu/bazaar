import FeaturedProducts from '@/components/home/FeaturedProducts'
import Hero from '@/components/home/Hero'
import LoadingContainer from '@/components/global/LoadingContainer'
import { Suspense } from 'react'
import SectionTitle from '@/components/global/SectionTitle'

function HomPage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingFeatured />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
export default HomPage

function LoadingFeatured() {
  return (
    <section className='pt-10'>
      <SectionTitle text='Featured Products' />
      <LoadingContainer />
    </section>
  )
}
