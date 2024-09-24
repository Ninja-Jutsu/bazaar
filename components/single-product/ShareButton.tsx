'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import { LuShare2 } from 'react-icons/lu'

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share'

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/products/${productId}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='p-2'
        >
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='end'
        sideOffset={10}
        className='flex items-center gap-x-2 justify-center w-full'
      >
        <TwitterShareButton
          url={shareLink}
          title={name}
        >
          <Button
            asChild
            variant='outline'
            size='icon'
          >
            <TwitterIcon
              size={48}
              round
            
            />
          </Button>
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareLink}
          title={name}
        >
          <Button
            asChild
            variant='outline'
            size='icon'
          >
            <LinkedinIcon
              size={32}
              round
            />
          </Button>
        </LinkedinShareButton>
        <EmailShareButton
          url={shareLink}
          subject={name}
        >
          <Button
            asChild
            variant='outline'
            size='icon'
          >
            <EmailIcon
              size={32}
              round
            />
          </Button>
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default ShareButton
