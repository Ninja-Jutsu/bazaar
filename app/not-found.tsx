import Link from 'next/link'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
export default function NotFound() {
  return (
    <div className='flex flex-col gap-10'>
      <SectionTitle text='No such page or content' />
      <Alert
        variant='destructive'
        className='text-2xl'
      >
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription className='text-xl'>
          Could not find requested resource
        </AlertDescription>
      </Alert>
      <Button
        size='lg'
        variant='secondary'
        className='self-center'
      >
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  )
}
