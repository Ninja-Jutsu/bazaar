'use client'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Redacted_Script } from 'next/font/google'
import { FaStar } from 'react-icons/fa'
const redacted = Redacted_Script({ subsets: ['latin'], weight: ['400'] })

export default function LoadingSingleProductPage() {
  return (
    <section className={`${redacted.className}`}>
      <p className={`text-inherit capitalize text-lg mt-5`}>
        name - name - name
      </p>
      <div className='mt-6 grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
        <div className='h-full mt-6 grid gap-y-4 lg:grid-cols-2 lg:gap-x-8'>
          <Skeleton className='hidden md:block h-[400px] w-[450px] ' />
          <Skeleton className=' md:hidden h-[50vw] w-[100%] m-auto' />
        </div>
        <div className='w-full'>
          <div className='flex gap-x-8 items-center'>
            <div className='w-full flex justify-between'>
              <h1 className='text-inherit capitalize text-2xl lg:text-3xl font-bold'>
                name name name
              </h1>
              <div className='flex items-center gap-x-2'>
                <Button
                  size='icon'
                  variant='outline'
                />
                <Button
                  size='icon'
                  variant='outline'
                />
              </div>
            </div>
          </div>
          <div className='text-inherit'>
            <span className='flex gap-1 items-center text-md mt-1 mb-4'>
              <FaStar className='w-3 h-3' />
              text text
            </span>
          </div>
          <h4 className='text-inherit lg:text-xl mt-2 italic'>company</h4>
          <p className='text-inherit mt-3 text-sm lg:text-md bg-muted inline-block p-2 rounded-md'>
            dollarsAmount
          </p>
          <p className='mt-6 leading-8 text-muted-foreground'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem provident{' '}
          </p>
          <Skeleton className='w-[250px] h-[36px] mb-5' />
          <Button size='lg'>Add to cart</Button>
        </div>
      </div>
      <div className='mt-4'>
        <SectionTitle text='product reviews' />
      </div>
    </section>
  )
}
