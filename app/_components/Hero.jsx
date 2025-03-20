// import { Button } from '@/components/ui/button'
// import React from 'react'
// import Authentication from './Authentication'
// import MotionWrapperDelay from './FramerMotion/MotionWrapperDelay'
// import Link from '@/node_modules/next/link'

// function Hero() {
//   return (
//     <div className='p-10 flex flex-col items-center justify-center mt-24
//     md:px-20 lg:px-36 xl:px-48
//     '>
//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, x: -100 },
//           visible: { opacity: 1, x: 0 },
//         }}
//       >
//         <h2 className='font-bold text-5xl gradient-title text-center'>AI YouTube Short Video Generator</h2>
//       </MotionWrapperDelay>
//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, y: -100 },
//           visible: { opacity: 1, y: 0 },
//         }}
//       >
//         <p className='mt-4 text-2xl text-center'>AI Generates scripts, images and voice overs in seconds. Create , edit, and publish engaging short Videos with ease...</p>
//       </MotionWrapperDelay>

//       <MotionWrapperDelay
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//         variants={{
//           hidden: { opacity: 0, x: -100 },
//           visible: { opacity: 1, x: 0 },
//         }}
//       >

//         <div className='mt-7 flex gap-8'>
//           <Link href="/explore">
//             <Button size="lg" variant="sex1">Explore</Button>
//           </Link>


//           <Authentication>
//             <Button size="lg" variant="sex1">Get Started</Button>
//           </Authentication>

//         </div>
//       </MotionWrapperDelay>

//     </div>
//   )
// }

// export default Hero


"use client";

import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'
import MotionWrapperDelay from './FramerMotion/MotionWrapperDelay'
import Link from 'next/link'
import { useAuthContext } from '../provider'

function Hero() {
  const { user } = useAuthContext();

  return (
    <div className='p-10 flex flex-col items-center justify-center mt-24
    md:px-20 lg:px-36 xl:px-48
    '>
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
        <h2 className='font-bold text-5xl gradient-title text-center'>AI YouTube Short Video Generator</h2>
      </MotionWrapperDelay>
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <p className='mt-4 text-2xl text-center'>AI Generates scripts, images and voice overs in seconds. Create, edit, and publish engaging short Videos with ease...</p>
      </MotionWrapperDelay>

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
        <div className='mt-7 flex gap-8'>
          <Link href="/explore">
            <Button size="lg" variant="sex1">Explore</Button>
          </Link>

          {user ? (
            <Link href="/dashboard">
              <Button size="lg" variant="sex1">Get Started</Button>
            </Link>
          ) : (
            <Authentication>
              <Button size="lg" variant="sex1">Get Started</Button>
            </Authentication>
          )}
        </div>
      </MotionWrapperDelay>
    </div>
  )
}

export default Hero