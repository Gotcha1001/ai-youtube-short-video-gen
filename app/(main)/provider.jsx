"use client"
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import Appsidebar from './_components/Appsidebar'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../provider'
import { useRouter } from 'next/navigation'

function DashboardProvider({children}) {
   const {user} = useAuthContext()
   const router = useRouter()

   useEffect(() => {
    user && CheckUserAuthentication()
   },[user])

   const CheckUserAuthentication = () => {
    if(!user) {
      router.replace('/')
    }
   }

  return (
    <SidebarProvider> 
      <Appsidebar />
      <div className='w-full'>
        <AppHeader />
        <div className='p-10'>
           {children} 
        </div>
      
        </div>
      </SidebarProvider>
   
  )
}

export default DashboardProvider