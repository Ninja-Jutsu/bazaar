import SectionTitle from '@/components/global/SectionTitle'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Redacted_Script } from 'next/font/google'

import React from 'react'
import { Button } from '@/components/ui/button'

const redacted = Redacted_Script({ subsets: ['latin'], weight: ['400'] })

export default function CartLoadingPage() {
  return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-8 flex  flex-col gap-5'>
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <div></div>
        </div>
      </div>
    </>
  )
}

function CartCard() {
  return (
    <Card className='flex flex-col sm:flex-row sm:justify-between'>
      <CardHeader className={`${redacted.className}`}>
        <Skeleton className='w-28 h-28' />
        <CardTitle className='text-inherit'>Product name</CardTitle>
        <CardDescription className='text-inherit'>Company.</CardDescription>
        <p className='text-inherit text-green-500'>price</p>
      </CardHeader>
      <CardContent className='self-end flex flex-col gap-5 sm:self-start sm:gap-40'>
        <div className='flex gap-x-4 sm:mt-4'>
          <p className='text-bold'>Amount:</p>
          <Skeleton className='w-28 h-8' />
        </div>
        <Button
          disabled
          variant='destructive'
          size='default'
          className='self-end'
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  )
}
