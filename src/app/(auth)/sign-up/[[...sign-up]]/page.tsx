import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function Page() {
  return(
    <div className='flex items-center justify-center h-screen'>
      <SignUp path='/sign-up' />
    </div>
  )
}