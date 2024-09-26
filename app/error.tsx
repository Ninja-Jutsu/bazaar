'use client'

import { useEffect } from 'react'
import SectionTitle from '@/components/global/SectionTitle'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <SectionTitle text='Something went wrong!' />
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant='secondary'
        size='lg'
        className='text-green-400 capitalize'
      >
        Try again
      </Button>
    </div>
  )
}
