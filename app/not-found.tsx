import Link from 'next/link'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className='flex flex-col gap-10'>
      <SectionTitle text='No such page' />
      <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
        Could not find requested resource
      </p>
      <Button
        size='lg'
        variant='secondary'
      >
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  )
}
