"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Gem, HomeIcon, LucideFileVideo, Search, WalletCards } from 'lucide-react'
import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import { usePathname } from 'next/navigation'
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect'
import { useAuthContext } from '@/app/provider'
import Link from 'next/link'

const MenuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon
  },
  {
    title: 'Create New Video',
    url: '/create-new-video',
    icon: LucideFileVideo
  },
  {
    title: 'Explore',
    url: '/explore',
    icon: Search
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: WalletCards
  },
]

function Appsidebar() {
  const path = usePathname()
  const { user } = useAuthContext()


  // Handle navigation with full page refresh
  const handleNavigation = (url) => {
    // This will cause a full page refresh instead of client-side navigation
    window.location.href = url;
  }

  // Handle the Create New Video button click
  const handleCreateNewVideo = () => {
    window.location.href = '/create-new-video';
  }

  // Handle the Buy Credits button click
  const handleBuyCredits = () => {
    window.location.href = '/billing';
  }

  return (
    <Sidebar >
      <SmokeEffect isVisible={true} />
      <SidebarHeader>
        <Link href="/">
          <div className="">
            <div className='flex items-center gap-3 w-full justify-center mt-5 cursor-pointer'>
              <Image
                className='p-1'
                src='/logo.svg' alt='logo2' height={40} width={40} />
              <Image
                className='bg-indigo-600 border border-indigo-500 p-1 rounded-lg '
                src="/logo.jpg" alt='logo' height={200} width={180} />
            </div>
          </div>
        </Link>

      </SidebarHeader>
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='mx-3 mt-10 '>
              <Link href="/create-new-video">
                <Button
                  className="w-full"
                  variant="sex2"
                  onClick={handleCreateNewVideo}
                >
                  +Create New Video
                </Button>
              </Link>

            </div>
            <SidebarMenu>
              {MenuItems.map((menu, index) => (
                <FeatureMotionWrapper key={index} index={index}>
                  <SidebarMenuItem className="mt-3 mx-3">
                    <SidebarMenuButton
                      isActive={path === menu.url}
                      className="p-5 rounded-lg overflow-hidden relative"
                      onClick={() => handleNavigation(menu.url)}
                    >
                      <div className="absolute inset-0 rounded-lg overflow-hidden">

                      </div>
                      <div className='flex items-center gap-4 p-3 relative z-10'>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </FeatureMotionWrapper>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className='p-5 border rounded-lg mb-6 bg-gray-800'>
          <div className='flex items-center justify-between'>
            <Gem />
            <Image
              className='horizontal-spin'
              src="/coin.png" alt='coin' height={40} width={40} />
            <h2>{user?.credits} Credits Left</h2>
          </div>
          <Button
            className="w-full mt-3"
            variant="sex2"
            onClick={handleBuyCredits}
          >
            Buy Credits
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default Appsidebar