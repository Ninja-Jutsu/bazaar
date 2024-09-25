'use client'
import { useState } from 'react'
import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import { Card } from '@/components/ui/card'
import RatingInput from '@/components/reviews/RatingInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { Button } from '@/components/ui/button'
import { createReviewAction } from '@/utils/actions'

// as this is a client compo, we use useUser hook to access the user id and image
import { useUser } from '@clerk/nextjs'

//! Todo: Separate Leave review button from the review form

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  const { user } = useUser()
  return (
    <div className='flex'>
      <Button
        size='lg'
        className='capitalize self-end'
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input
              type='hidden'
              name='productId'
              value={productId}
            />
            <input
              type='hidden'
              name='authorName'
              value={user?.firstName || 'user'} // in case user didn't set up a firstName
            />
            <input
              type='hidden'
              name='authorImageUrl'
              value={user?.imageUrl || ''} // in case user doesn't have an image (clerk provides one)
            />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              labelText='feedback'
              defaultValue='Outstanding product!!!'
            />
            <SubmitButton className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
