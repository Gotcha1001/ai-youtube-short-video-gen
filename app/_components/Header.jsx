"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'

import MotionWrapperDelay from './FramerMotion/MotionWrapperDelay'
import SmokeEffect from './FramerMotion/SmokeEffect'
import Link from 'next/link';

function Header() {
  const { user } = useAuthContext();

  console.log("User Picture URL:", user?.pictureURL);

  return (
    <MotionWrapperDelay
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    variants={{
      hidden: { opacity: 0, x: -100 },
      visible: { opacity: 1, x: 0 },
    }}
  >
    <div className="p-4 flex items-center relative gradient-background2 justify-between overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SmokeEffect isVisible={true} />
      </div>
      <div className="flex items-center gap-5 relative z-10">
        <Image src="/logo.svg" alt="logo" height={40} width={40} />
        <h2 className="text-2xl font-bold text-white">Video Gen</h2>
      </div>
      <div className="relative z-10">
        {!user ? (
          <Authentication>
            <Button>Get Started</Button>
          </Authentication>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
                <Button>Dashboard</Button>
            </Link>
          

           {user?.pictureURL && <Image src={user?.pictureURL} alt="userImage" width={40} height={40} className="rounded-full" />} 
          </div>
        )}
      </div>
    </div>
  </MotionWrapperDelay>
  
  );
}

export default Header;