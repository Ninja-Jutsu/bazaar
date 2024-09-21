import React from 'react'
import LoadingContainer from '@/components/global/LoadingContainer'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import { Redacted_Script } from 'next/font/google'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
const redacted = Redacted_Script({ subsets: ['latin'], weight: ['400'] })

export default function Loading() {
  return <LoadingProducts />
}

function LoadingProducts() {
  return (
    <>
      <div className='flex justify-between items-center'>
        <SectionTitle
          text='products'
          moreStyles='font-medium text-lg'
          useSeparator={false}
        />
        <div className='flex gap-x-4'>
          <Button
            variant='default'
            size='icon'
            asChild
            disabled
          >
            <Link href={`/products`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button
            variant='ghost'
            size='icon'
            disabled
            asChild
          >
            <Link href={`/products`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </div>
      <Separator className='mt-4' />
      <LoadingContainer />
    </>
  )
}
