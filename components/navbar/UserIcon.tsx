/* eslint-disable @next/next/no-img-element */
import { LuUser2 } from 'react-icons/lu'
import { currentUser } from '@clerk/nextjs/server'
async function UserIcon() {
  const user = await currentUser()
  const profileImage = user?.imageUrl
  if (profileImage)
    return (
      <img
        src={profileImage}
        alt='user profile image'
        className='w-full h-full min-w-8 min-h-8 rounded-full object-cover'
      />
    )
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />
}
export default UserIcon
