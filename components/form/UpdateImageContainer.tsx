'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import FormContainer from './FormContainer'
import ImageInput from './ImageInput'
import { SubmitButton } from './Buttons'
import { type actionFunction } from '@/utils/types'

type ImageInputContainerProps = {
  image: string
  name: string
  action: actionFunction
  text: string
  children?: React.ReactNode
}

function ImageInputContainer(props: ImageInputContainerProps) {
  const { image, name, action, text } = props
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)

  return (
    <div className='mb-8 flex justify-start gap-4'>
      <Image
        src={image}
        width={200}
        height={200}
        className='rounded-md object-cover mb-4 w-[200px] h-[200px]'
        alt={name}
      />

      <div className='flex flex-col justify-center'>
        <Button
          variant='outline'
          size='default'
          onClick={() => setUpdateFormVisible((prev) => !prev)}
          className='capitalize self-start'
        >
          {text}
        </Button>
        {isUpdateFormVisible && (
          <div className='max-w-md mt-4 items-stretch'>
            <FormContainer
              action={action}
              classNames='flex items-center gap-x-2'
            >
              {props.children}
              <ImageInput />
              <SubmitButton size='sm' />
            </FormContainer>
          </div>
        )}
      </div>
    </div>
  )
}
export default ImageInputContainer
