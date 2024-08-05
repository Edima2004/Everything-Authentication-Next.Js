import { auth } from '@/auth'
import React from 'react'
import { currentUser } from '@/lib/auth'
import { UserInfo } from '@/components/auth/user-info'

const ServerPage = async() => {
   const user = await currentUser()
  return (
    <div className='w-11/12'>
      <UserInfo label='Server component' user={user}/>
    </div>
  )
}

export default ServerPage
