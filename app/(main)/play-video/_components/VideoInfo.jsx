import { Button } from '@/components/ui/button'
import { ArrowLeft, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function VideoInfo({ videoData }) {
    return (
        <div className='border p-4 rounded-lg' >
            <Link href={'/dashboard'}>
                <h2 className='flex gap-2 items-center text-white'>
                    <ArrowLeft />
                    Back To DashBoard
                </h2>
            </Link>

            <div className='flex flex-col gap-3 gradient-background2 p-4 rounded-lg mt-2'>
                <h2 className='mt-5 text-lg font-bold text-indigo-500'>Project Name: {videoData?.title}</h2>
                <p className='text-gray-200'>Script: {videoData?.script}</p>
                <h2 className='text-purple-600'>Video Style: {videoData?.videoStyle}</h2>
                <Button variant="sex2"><DownloadIcon />Export & Download</Button>
            </div>

        </div>
    )
}

export default VideoInfo