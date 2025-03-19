"use client"
import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import React from 'react'

function AppHeader() {
  const { user } = useAuthContext()

  return (
    <div className='p-3 flex justify-between items-center relative w-full h-40 overflow-hidden'>
      <div className="dynamic-bg " />
      <SidebarTrigger className="text-white z-10" />
      <Image
        className='rounded-full z-10'
        src={user?.pictureURL} alt='User' width={60} height={60} />
    </div>
  )
}

export default AppHeader