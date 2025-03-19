"use client"
import ContinuousSmokeEffect from '@/app/_components/FramerMotion/ContinuousSmokeEffect'
import FeatureMotionWrapper from '@/app/_components/FramerMotion/FeatureMotionWrapperMap'
import SmokeEffect from '@/app/_components/FramerMotion/SmokeEffect'
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { RefreshCcw } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function VideoList() {

    const [videoList, setVideoList] = useState([])
    const convex = useConvex()
    const { user } = useAuthContext()

    useEffect(() => {
        user && GetUserVideoList()
    }, [user])

    const GetUserVideoList = async () => {
        // All Users Videos
        const result = await convex.query(api.videoData.GetUserVideos, {
            uid: user?._id
        })
        setVideoList(result)
        const isPendingVideo = result?.find((item) => item.status == 'pending')
        isPendingVideo && GetPedingVideoStatus(isPendingVideo)

    }

    const GetPedingVideoStatus = (pendingVideo) => {
        const intervalId = setInterval(async () => {
            // Get Video Data By ID
            const result = await convex.query(api.videoData.GetVideoById, {
                videoId: pendingVideo?._id
            })

            if (result?.status == 'completed') {
                clearInterval(intervalId)
                console.log("Video Completed")
                GetUserVideoList()
            }
            console.log("Still Pending...")

        }, 5000)
    }

    return (
        <div>
            {videoList?.length == 0 ?
                <div className='flex flex-col items-center justify-center mt-28 gap-5 p-5 border-2  border-indigo-600 rounded-xl py-16'>
                    <Image src={'/logo.svg'} alt='Logo' height={60} width={60} />
                    <h2 className='text-gray-200 text-lg'>You Dont Have Any Videos Created, Create A New One...</h2>
                    <Link href="/create-new-video">
                        <Button variant="sex2">+Create New Video</Button>
                    </Link>

                </div>
                :
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-10'>
                    {videoList?.map((video, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <Link href={'/play-video/' + video?._id}>
                                <div className='relative'>
                                    {video?.status == 'completed' ? <Image
                                        className='rounded-lg w-full object-cover aspect-[2/3]'
                                        src={video?.images[0]} alt='Images' height={500} width={500} /> :


                                        <div className='aspect-[2/3] p-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-900 to-black flex items-center justify-center gap-3'>
                                            <ContinuousSmokeEffect />
                                            <div className='gradient-background2 z-10 p-2 rounded-lg flex gap-3'>
                                                <RefreshCcw className='animate-spin h-10 w-10 text-teal-500' />
                                                <h2 className='text-xl font-bold zoom gradient-title overflow-hidden text-ellipsis w-full  '>
                                                    Generating...
                                                </h2>

                                            </div>

                                        </div>
                                    }
                                    <div className='absolute bottom-0 w-full gradient-background2 rounded-b-xl '>
                                        <h2 className='text-white font-bold text-center'>{video?.title}</h2>
                                        <h2 className='text-white text-sm text-center'>{moment(video?._creationTime).fromNow()}</h2>
                                    </div>
                                </div>
                            </Link>

                        </FeatureMotionWrapper>

                    ))}

                </div>
            }
        </div>
    )
}

export default VideoList